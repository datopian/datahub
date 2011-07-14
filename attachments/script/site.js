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
      cell.data("previousContents", cell.text());
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
      couch.request({type: "PUT", url: app.baseURL + "api/" + doc._id, data: doc}).then(function(response) {
        util.notify("Row updated successfully");
        removalist.fetchRows(false, app.offset);
      })
    })
    $('.data-table-cell-editor .cancelButton').click(function(e) {
      var cell = $(e.target).parents('.data-table-cell-value');
      cell.html(cell.data('previousContents')).siblings('.data-table-cell-edit').removeClass("hidden");
    })
  },
  actions: function() {
    $('.button').click(function(e) { 
      util.position('menu', e, {left: -60});
      util.render('exportActions', 'menu');
    });
  },
  controls: function() {
    $('#logged-in-status').click(function(e) { 
      if ($(e.target).text() === "Sign in") {
        util.show('dialog');
        util.render('signIn', 'dialog-content');
      } else if ($(e.target).text() === "Sign out") {
        util.notify("Signing you out...", {persist: true, loader: true});
        couch.logout().then(function(response) {
          util.notify("Signed out");
          util.render('controls', 'project-controls', {text: "Sign in"});
        })
      }
    });
  },
  exportActions: removalist.handleMenuClick,
  columnActions: removalist.handleMenuClick,
  signIn: function() {
    
    util.observeExit($('.dialog-content'), function() {
      util.hide('dialog');
    })
    
    $('.dialog-content #username-input').focus();
    
    $('.dialog-content').find('#sign-in-form').submit(function(e) {
      $('.dialog-content .okButton').click();
      return false;
    })
    
    $('.dialog-content .okButton').click(function(e) {
      util.hide('dialog');
      util.notify("Signing you in...", {persist: true, loader: true});
      var form = $(e.target).parents('.dialog-content').find('#sign-in-form');
      var credentials = {
        username: form.find('#username-input').val(), 
        password: form.find('#password-input').val()
      }
      couch.login(credentials).then(function(response) {
        util.notify("Signed in");
        util.render('controls', 'project-controls', {text: "Sign out"});
      }, function(error) {
        if (error.statusText === "error") util.notify(JSON.parse(error.responseText).reason);
      })
    })
    
  },
  bulkEdit: function() {
    
    util.observeExit($('.dialog-content'), function() {
      util.hide('dialog');
    })
    
    $('.dialog-content .okButton').click(function(e) {
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