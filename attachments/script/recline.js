var recline = function() {
  
  function formatDiskSize(bytes) {
    return (parseFloat(bytes)/1024/1024).toString().substr(0,4) + "MB"
  }
  
  function showDialog(template, data) {
    if (!data) data = {};
    util.show('dialog');
    util.render(template, 'dialog-content', data);
    util.observeExit($('.dialog-content'), function() {
      util.hide('dialog');
    })
    $('.dialog').draggable({ handle: '.dialog-header', cursor: 'move' });
  }
  
  function handleMenuClick() {
    $( '.menu li' ).click(function(e) {
      var actions = {
        bulkEdit: function() { showDialog('bulkEdit', {name: app.currentColumn}) },
        transform: function() { showDialog('transform') },
        csv: function() { window.location.href = app.csvUrl },
        json: function() { window.location.href = "_rewrite/api/json" },
        urlImport: function() { showDialog('urlImport') },
        pasteImport: function() { showDialog('pasteImport') },
        uploadImport: function() { showDialog('uploadImport') },
        deleteColumn: function() {
          var msg = "Are you sure? This will delete '" + app.currentColumn + "' from all documents.";
          if (confirm(msg)) costco.deleteColumn(app.currentColumn);
        },
        deleteRow: function() {
          var doc = _.find(app.cache, function(doc) { return doc._id === app.currentRow });
          doc._deleted = true;
          costco.uploadDocs([doc]).then(
            function(updatedDocs) { 
              util.notify("Row deleted successfully");
              recline.initializeTable(app.offset);
            },
            function(err) { util.notify("Errorz! " + err) }
          )
        }
      }
      
      util.hide('menu');
      actions[$(e.target).attr('data-action')]();
      
      e.preventDefault();
    }) 
  }
  
  function renderRows(response) {
    var rows = response.rows;
    
    if (rows.length < 1) {
      util.render('dataTable', 'data-table-container');
      return;
    };
    
    var tableRows = [];
    
    rows.map(function(row) {
      var cells = [];
      app.headers.map(function(header) {
        var value = "";
        if (row.value[header]) {
          value = row.value[header];
          if (typeof(value) == "object") value = JSON.stringify(value);
        }
        cells.push({header: header, value: value});
      })
      tableRows.push({id: row.value._id, cells: cells});
    })
    
    util.render('dataTable', 'data-table-container', {
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
      app.cache = response.rows.map(function(row) { return row.value; } );
      renderRows(response);
    });

  }
  
  function updateDocCount(totalDocs) {
    return couch.request({url: app.baseURL + 'api/_all_docs?' + $.param({startkey: '"_design/"', endkey: '"_design0"'})}).then(
      function ( data ) {
        var ddocCount = data.rows.length;
        $('#docCount').text(totalDocs - ddocCount + " documents");
      }
    )    
  }
  
  function getDbInfo() {
    var dfd = $.Deferred();
    return couch.request({url: app.baseURL + "api"}).then(function(dbInfo) {
      app.dbInfo = dbInfo;

      $.extend(app.dbInfo, {
        "host": window.location.host,
        "disk_size": formatDiskSize(app.dbInfo.disk_size)
      });

      if( util.inURL("_rewrite", app.baseURL) ) app.dbInfo.db_name = "api";
      
      dfd.resolve(dbInfo);
    });
    return dfd.promise();
  }

  
  function bootstrap() {
    util.registerEmitter();
    util.listenFor(['esc', 'return']);
    
    getDbInfo().then(function( dbInfo ) {

      util.render('tableContainer', app.container);
      util.render('title', 'project-title', app.dbInfo);
      util.render( 'generating', 'project-actions' );    
      
      updateDocCount(app.dbInfo.doc_count);
      
      couch.session().then(function(session) {
        if ( session.userCtx.name ) {
          var text = "Sign out";
        } else {
          var text = "Sign in";
        }
        util.render('controls', 'project-controls', {text: text});
      })
      
      initializeTable();
    })
  }
  
  function initializeTable(offset) {
    showDialog('busy');
    couch.request({url: app.baseURL + 'api/headers'}).then(function ( headers ) {
      util.hide('dialog');
      getDbInfo().then(function(dbInfo) { 
        updateDocCount(dbInfo.doc_count);
      });
      app.headers = headers;
      app.csvUrl = app.baseURL + 'api/csv?headers=' + escape(JSON.stringify(headers));
      util.render( 'actions', 'project-actions', $.extend({}, app.dbInfo, {url: app.csvUrl}) );    
      fetchRows(false, offset);
    })
  }
  
  return {
    formatDiskSize: formatDiskSize,
    handleMenuClick: handleMenuClick,
    showDialog: showDialog,
    updateDocCount: updateDocCount,
    bootstrap: bootstrap,
    fetchRows: fetchRows,
    activateControls: activateControls,
    getPageSize: getPageSize,
    renderRows: renderRows,
    initializeTable: initializeTable
  };
}();