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
    
  }
  
  function gotHeaders( headers ) {
    app.headers = headers;
    app.csvUrl = app.baseURL + 'api/csv?headers=' + escape(JSON.stringify(headers));
    util.render( 'actions', 'project-controls', $.extend({}, app.dbInfo, {url: app.csvUrl}) );          
  }
  
  function gotDb( dbInfo ) {

    app.dbInfo = dbInfo;
    
    $.extend(app.dbInfo, {
      "host": window.location.host,
      "disk_size": formatDiskSize(app.dbInfo.disk_size)
    });
            
    if( util.inURL("_rewrite", app.baseURL) ) app.dbInfo.db_name = "api";
    
    util.render('tableContainer', app.container, app.dbInfo);
    util.render('title', 'project-title', app.dbInfo);
    util.render( 'generating', 'project-controls' );    
  }
  
  return {
    formatDiskSize: formatDiskSize,
    renderRows: renderRows,
    gotHeaders: gotHeaders,
    gotDb: gotDb
  };
}();