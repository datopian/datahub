var removalist = function() {
  
  function formatDiskSize(bytes) {
    return (parseFloat(bytes)/1024/1024).toString().substr(0,4) + "MB"
  }
  
  function renderRows(rows) {
    var tableRows = [];
    rows.map(function(row) {
      var cells = [];
      app.headers.map(function(header) {
        var value = "";
        if (row.value[header]) {
          value = row.value[header];
          if (typeof(value) == "object") value = JSON.stringify(value);
        }
        cells.push(value);
      })
      tableRows.push({cells: cells});
    })
    util.render('dataTable', 'dataTableContainer', {
      rows: tableRows,
      headers: app.headers
    })
    app.newest = rows[0].id;
    app.oldest = rows[rows.length - 1].id;
  }
  
  function getPageSize() {
    return parseInt($(".viewpanel-pagesize .selected").text());
  }
  
  function fetchRows(id) {
    
    var query = {
      "limit" : getPageSize()
    }
    
    if ( id ) {
      $.extend( query, {
        "startkey": '"' + id + '"',
        "skip": 1
      })
    }
    
    var req = {url: app.baseURL + 'api/rows?' + $.param(query)};
    
    couch.request(req).then(function(response) {
      var offset = response.offset + 1;
      $('.viewpanel-pagingcount').text(offset + " - " + ((offset - 1) + getPageSize()));
      removalist.renderRows(response.rows);
    });

  }
  
  function bootstrap() {
    couch.request({url: app.baseURL + "api"}).then(function( dbInfo ) {

      app.dbInfo = dbInfo;

      $.extend(app.dbInfo, {
        "host": window.location.host,
        "disk_size": formatDiskSize(app.dbInfo.disk_size)
      });

      if( util.inURL("_rewrite", app.baseURL) ) app.dbInfo.db_name = "api";

      util.render('tableContainer', app.container, app.dbInfo);
      util.render('title', 'project-title', app.dbInfo);
      util.render( 'generating', 'project-controls' );    
      
      couch.request({url: app.baseURL + 'api/headers'}).then(function ( headers ) {
        app.headers = headers;
        app.csvUrl = app.baseURL + 'api/csv?headers=' + escape(JSON.stringify(headers));
        util.render( 'actions', 'project-controls', $.extend({}, app.dbInfo, {url: app.csvUrl}) );    
        fetchRows();
      })
    })
  }
  
  return {
    formatDiskSize: formatDiskSize,
    bootstrap: bootstrap,
    fetchRows: fetchRows,
    getPageSize: getPageSize,
    renderRows: renderRows
  };
}();