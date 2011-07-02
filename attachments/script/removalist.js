var removalist = function() {
  
  function formatDiskSize(bytes) {
    return (parseFloat(bytes)/1024/1024).toString().substr(0,4) + "MB"
  }
  
  function handleMenuClick() {
    $( '.menu li' ).click(function(e) {
      if ($(e.target).hasClass('transform')) {
        util.show('dialog');
        util.render('bulkEdit', 'dialog-content');
        $('.cancelButton').click(function(e) {
          util.hide('dialog');
        })
        util.hide('menu');
      }
      
      if ($(e.target).hasClass('csv'))  window.location.href = app.csvUrl;
      
      if ($(e.target).hasClass('json')) window.location.href = "_rewrite/api/json";
      
      e.preventDefault();
      
      util.hide('menu');
    }) 
  }
  
  function renderRows(response) {
    var rows = response.rows;
    
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
    app.offset = response.offset;

    function activate(e) {
      e.removeClass('inaction').addClass('action');
    }
    
    function deactivate(e) {
      e.removeClass('action').addClass('inaction');
    }
        
    if (app.offset + getPageSize() >= app.dbInfo.doc_count) {
      deactivate($( '.viewpanel-paging .last'));
      deactivate($( '.viewpanel-paging .next'));
    } else {
      activate($( '.viewpanel-paging .last'));
      activate($( '.viewpanel-paging .next'));
    }
    
    if (app.offset === 0) {
      deactivate($( '.viewpanel-paging .previous'));
      deactivate($( '.viewpanel-paging .first'));
    } else {
      activate($( '.viewpanel-paging .previous'));
      activate($( '.viewpanel-paging .first'));
    }
  }
  
  function activateControls() {
    $( '.viewPanel-pagingControls-page' ).click(function( e ) {      
      $(".viewpanel-pagesize .selected").removeClass('selected');
      $(e.target).addClass('selected');
      fetchRows(app.newest);
    });
    $( '.viewpanel-paging a' ).click(function( e ) {
      var action = $(e.target);
      if (action.hasClass("last")) fetchRows(false, app.dbInfo.doc_count - getPageSize());
      if (action.hasClass("next")) fetchRows(app.oldest);
      if (action.hasClass("previous")) fetchRows(false, app.offset - getPageSize());
      if (action.hasClass("first")) fetchRows();
    });
  }
  
  function getPageSize() {
    return parseInt($(".viewpanel-pagesize .selected").text());
  }
  
  function fetchRows(id, skip) {

    var query = {
      "limit" : getPageSize()
    }
    
    if (id) {
      $.extend( query, {"startkey": '"' + id + '"'});
      if (id !== app.newest) $.extend( query, {"skip": 1});
    }
    
    if (skip) $.extend( query, {"skip": skip});
    
    var req = {url: app.baseURL + 'api/rows?' + $.param(query)};
    
    couch.request(req).then(function(response) {
      var offset = response.offset + 1;
      $('.viewpanel-pagingcount').text(offset + " - " + ((offset - 1) + getPageSize()));
      removalist.renderRows(response);
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
    handleMenuClick: handleMenuClick,
    bootstrap: bootstrap,
    fetchRows: fetchRows,
    activateControls: activateControls,
    getPageSize: getPageSize,
    renderRows: renderRows
  };
}();