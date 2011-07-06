var app = {
	baseURL: util.getBaseURL(document.location.pathname),
	container: 'main_content'
};

app.handler = function(route) {
  if (route.params && route.params.route) {
    var path = route.params.route;
    app.routes[path](route.params.id);
  } else {
    app.routes['home']();
  }  
};

app.routes = {
  home: function() {
    removalist.bootstrap();
  },
  page: function(id) {
    removalist.getPageSize();
  }
}

app.after = {
  tableContainer: function() {
    removalist.activateControls();
  },
  dataTable: function() {
    $('.column-header-menu').click(function(e) { 
      app.currentColumn = $(e.target).siblings().text();
      util.position('menu', e);
      util.render('columnActions', 'menu');
    });
    
    $('.data-table-cell-edit').click(function(e) {
      var editing = $('.data-table-cell-editor-editor');
      if (editing.length > 0) {
        editing.parents('.data-table-cell-value').html(editing.text()).siblings('.data-table-cell-edit').removeClass("hidden");
      }
      $(e.target).addClass("hidden");
      var cell = $(e.target).siblings('.data-table-cell-value');
      util.render('cellEditor', cell, {value: cell.text()});
    })
  },
  cellEditor: function() {
    $('.data-table-cell-editor .okButton').click(function(e) {
      var cell = $(e.target);
      var rowId = cell.parents('tr').attr('data-id');
      var header = cell.parents('td').attr('data-header');
      var doc = _.find(app.cache, function(cacheDoc) {
        return cacheDoc._id === rowId;
      });
      doc[header] = cell.parents('.data-table-cell-editor').find('.data-table-cell-editor-editor').val();
      util.notify("Updating row...", {persist: true, loader: true});
      couch.request({type: "PUT", url: app.baseURL + "api/" + doc._id, data: JSON.stringify(doc)}).then(function(response) {
        util.notify("Row updated successfully");
        removalist.fetchRows(false, app.offset);
      })
    })
  },
  actions: function() {
    $('.button').click(function(e) { 
      util.position('menu', e, {left: -60});
      util.render('exportActions', 'menu');
    });
  },
  exportActions: removalist.handleMenuClick,
  columnActions: removalist.handleMenuClick,
  bulkEdit: function() {
    $('.dialog-body .cancelButton').click(function(e) {
      util.hide('dialog');
    })
    $('.dialog-body .okButton').click(function(e) {
      var funcText = $('.expression-preview-code').val();
      util.hide('dialog');
      util.notify("Updating documents...", {persist: true, loader: true});
      couch.request({url: app.baseURL + "api/json"}).then(function(docs) {
        var toUpdate = costco.mapDocs(docs.docs, funcText);
        costco.updateDocs(toUpdate, function(msg) { 
          util.notify(msg.length + " documents updated successfully");
          removalist.fetchRows(false, app.offset);
        });
      });
    })
    
    var editor = $('.expression-preview-code');
    editor.val("function(doc) {\n  doc['"+ app.currentColumn+"'] = doc['"+ app.currentColumn+"'];\n  return doc;\n}");
    editor.focus().get(0).setSelectionRange(18, 18);
    editor.keydown(function(e) {
      // if you don't setTimeout it won't grab the latest character if you call e.target.value
      window.setTimeout(function(){costco.handleEditorChange(e)}, 1, true);
    });
    editor.keydown();
  }
}

app.sammy = $.sammy(function () {
  this.get('', app.handler);
  this.get("#/", app.handler);
  this.get("#:route", app.handler);
  this.get("#:route/:id", app.handler);
});

$(function() {
  app.sammy.run();  
})