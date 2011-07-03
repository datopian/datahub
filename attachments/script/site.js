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
    $('.cancelButton').click(function(e) {
      util.hide('dialog');
    })
    $('.okButton').click(function(e) {
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