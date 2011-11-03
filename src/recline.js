window.recline = {};

recline.Document = Backbone.Model.extend({});

recline.DocumentList = Backbone.Collection.extend({
  webStore: new WebStore(this.url),
  model: recline.Document
});

recline.DataTable = Backbone.View.extend({

  el:  ".data-table-container",
  
  documents: new recline.DocumentList(this.url),
  
  // template: TODO ???

  events: {

  },

  initialize: function() {
    var that = this;
    this.documents.fetch({
      success: function(collection, resp) {
        that.render()
      }
    })
  },

  render: function() {
    var template = $( ".dataTableTemplate:first" ).html()
      , htmls = $.mustache(template, {rows: this.documents.toJSON()} )
      ;
    $(this.el).html(htmls);
    return this;
  }
});

// var recline = function() {
//   
//   function showDialog(template, data) {
//     if (!data) data = {};
//     util.show('dialog');
//     util.render(template, 'dialog-content', data);
//     util.observeExit($('.dialog-content'), function() {
//       util.hide('dialog');
//     })
//     $('.dialog').draggable({ handle: '.dialog-header', cursor: 'move' });
//   }
//   
//   function handleMenuClick() {
//     $( '.menu li' ).click(function(e) {
//       var actions = {
//         bulkEdit: function() { showDialog('bulkEdit', {name: app.currentColumn}) },
//         transform: function() { showDialog('transform') },
//         csv: function() { window.location.href = app.csvUrl },
//         json: function() { window.location.href = "_rewrite/api/json" },
//         urlImport: function() { showDialog('urlImport') },
//         pasteImport: function() { showDialog('pasteImport') },
//         uploadImport: function() { showDialog('uploadImport') },
//         deleteColumn: function() {
//           var msg = "Are you sure? This will delete '" + app.currentColumn + "' from all documents.";
//           if (confirm(msg)) costco.deleteColumn(app.currentColumn);
//         },
//         deleteRow: function() {
//           var doc = _.find(app.cache, function(doc) { return doc._id === app.currentRow });
//           doc._deleted = true;
//           costco.uploadDocs([doc]).then(
//             function(updatedDocs) { 
//               util.notify("Row deleted successfully");
//               recline.initializeTable(app.offset);
//             },
//             function(err) { util.notify("Errorz! " + err) }
//           )
//         }
//       }
//       
//       util.hide('menu');
//       actions[$(e.target).attr('data-action')]();
//       
//       e.preventDefault();
//     }) 
//   }
//   
//   function renderRows(rows) {
//     var rows = rows;
//     
//     if (rows.length < 1) {
//       util.render('dataTable', 'data-table-container');
//       return;
//     };
//     
//     var tableRows = [];
//     
//     rows.map(function(row) {
//       var cells = [];
//       app.headers.map(function(header) {
//         var value = "";
//         if (row[header]) {
//           value = row[header];
//           if (typeof(value) == "object") value = JSON.stringify(value);
//         }
//         cells.push({header: header, value: value});
//       })
//       tableRows.push({id: row.id, cells: cells});
//     })
//     
//     util.render('dataTable', 'data-table-container', {
//       rows: tableRows,
//       headers: app.headers,
//       notEmpty: function() { return app.headers.length > 0 }
//     })
//     
//     // TODO: sort out how we carry around offset info
//     // app.offset = response.offset;
// 
//     function activate(e) {
//       e.removeClass('inaction').addClass('action');
//     }
//     
//     function deactivate(e) {
//       e.removeClass('action').addClass('inaction');
//     }
//         
//     if (app.offset + getPageSize() >= app.rowCount) {
//       deactivate($( '.viewpanel-paging .last'));
//       deactivate($( '.viewpanel-paging .next'));
//     } else {
//       activate($( '.viewpanel-paging .last'));
//       activate($( '.viewpanel-paging .next'));
//     }
//     
//     if (app.offset === 0) {
//       deactivate($( '.viewpanel-paging .previous'));
//       deactivate($( '.viewpanel-paging .first'));
//     } else {
//       activate($( '.viewpanel-paging .previous'));
//       activate($( '.viewpanel-paging .first'));
//     }
//   }
//   
//   function activateControls() {
//     $( '.viewPanel-pagingControls-page' ).click(function( e ) {      
//       $(".viewpanel-pagesize .selected").removeClass('selected');
//       $(e.target).addClass('selected');
//       fetchRows(app.offset);
//     });
//     $( '.viewpanel-paging a' ).click(function( e ) {
//       var action = $(e.target);
//       if (action.hasClass("last")) fetchRows(app.rowCount - getPageSize());
//       if (action.hasClass("next")) fetchRows(app.offset + getPageSize());
//       if (action.hasClass("previous")) fetchRows(app.offset - getPageSize());
//       if (action.hasClass("first")) fetchRows(0);
//     });
//   }
//   
//   function getPageSize() {
//     var pagination = $(".viewpanel-pagesize .selected");
//     if (pagination.length > 0) {
//       return parseInt(pagination.text())
//     } else {
//       return 10;
//     }
//   }
//   
//   function fetchRows(offset) {
//     if (offset != undefined) {
//       app.offset = offset;
//     }
//     var numRows = getPageSize();
//     app.tabularData.getRows(numRows, offset).then(function(rows) {
//       $('.viewpanel-pagingcount').text(offset + " - " + ((offset - 1) + getPageSize()));
//       app.cache = rows;
//       renderRows(rows);
//     });
//   }
//   
//   function bootstrap(dataset) {
//     util.listenFor(['esc', 'return']);
//     initializeTable(dataset);
//   }
//   
//   function initializeTable(dataset) {
//     util.render( 'tableContainer', 'right-panel' );
//     showDialog('busy');
//     dataset.getTabularData().then(function ( tabularData ) {
//       util.hide('dialog');
//       app.headers = tabularData.headers;
//       // TODO: should this be callback like
//       app.rowCount = tabularData.getLength();
//       util.render( 'actions', 'project-actions', $.extend({}, app.dbInfo, {url: app.csvUrl}) );    
//       var offset = 0;
//       app.tabularData = tabularData;
//       fetchRows(offset);
//     })
//   }
//   
//   return {
//     handleMenuClick: handleMenuClick,
//     showDialog: showDialog,
//     bootstrap: bootstrap,
//     fetchRows: fetchRows,
//     activateControls: activateControls,
//     getPageSize: getPageSize,
//     renderRows: renderRows,
//     initializeTable: initializeTable
//   };
// }();
