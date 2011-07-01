var removalist = function() {
  
  function formatDiskSize(bytes) {
    return (parseFloat(bytes)/1024/1024).toString().substr(0,4) + "MB"
  }
  
  function renderRows(err, resp, body) {
    var response = JSON.parse(body);
    var rows = [];
    response.rows.map(function(row) {
      var cells = [];
      app.headers.map(function(header) {
        var value = "";
        if (row.value[header]) {
          value = row.value[header];
          if (typeof(value) == "object") value = JSON.stringify(value);
        }
        cells.push(value);
      })
      rows.push({cells: cells});
    })
    util.render('dataTable', 'dataTableContainer', {
      rows: rows,
      headers: app.headers
    })
    
  }
  
  function gotHeaders( err, resp, body ) {
    app.csvUrl = app.baseURL + 'api/csv?headers=' + escape(body);
    util.render( 'actions', 'project-controls', $.extend({}, app.dbInfo, {url: app.csvUrl}) );          
    app.headers = JSON.parse(body);
    $.request($.extend({}, app.reqOpts, {uri: app.baseURL + 'api/rows?limit=10'}), renderRows);
  }
  
  function gotDb( err, resp, body ) {
    
    app.dbInfo = JSON.parse(body);
    
    $.extend(app.dbInfo, {
      "host": window.location.host,
      "disk_size": formatDiskSize(app.dbInfo.disk_size)
    });
            
    if( util.inURL("_rewrite", app.baseURL) ) app.dbInfo.db_name = "api";
    
    util.render('tableContainer', app.container, app.dbInfo);
    util.render('title', 'project-title', app.dbInfo);
    util.render( 'generating', 'project-controls' );
    
    $.request($.extend({}, app.reqOpts, {uri: app.baseURL + 'api/headers'}), gotHeaders);
    
  }
  
  return {
    formatDiskSize: formatDiskSize,
    renderRows: renderRows,
    gotHeaders: gotHeaders,
    gotDb: gotDb
  };
}();