var app = {
	baseURL: util.getBaseURL(document.location.pathname),
	container: 'main_content',
	emitter: util.registerEmitter()
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
    // HACK: this should be in the html file (and really we need a much simpler example and keep this as recline-full example)
    var demoData = {
        headers: ['x', 'y', 'z']
      , rows: [
          {x: 1, y: 2, z: 3}
        , {x: 2, y: 4, z: 6}
        , {x: 3, y: 6, z: 9}
        , {x: 4, y: 8, z: 12}
        , {x: 5, y: 10, z: 15}
        , {x: 6, y: 12, z: 18}
      ]
    };
    var dataset = new RECLINE.Model.Dataset({
        title: 'My Demo Dataset'
      },
      demoData);
    recline.bootstrap(dataset);
  }
}

app.after = {
  tableContainer: function() {
    recline.activateControls();
  },
  dataTable: function() {
    $('.column-header-menu').click(function(e) { 
      app.currentColumn = $(e.target).siblings().text();
      util.position('menu', e);
      util.render('columnActions', 'menu');
    });
    
    $('.row-header-menu').click(function(e) { 
      app.currentRow = $(e.target).parents('tr:first').attr('data-id');
      util.position('menu', e);
      util.render('rowActions', 'menu');
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
  columnActions: function() { recline.handleMenuClick() },
  rowActions: function() { recline.handleMenuClick() },
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
      costco.updateDoc(doc).then(function(response) {
        util.notify("Row updated successfully");
        recline.initializeTable();
      })
    })
    $('.data-table-cell-editor .cancelButton').click(function(e) {
      var cell = $(e.target).parents('.data-table-cell-value');
      cell.html(cell.data('previousContents')).siblings('.data-table-cell-edit').removeClass("hidden");
    })
  },
  actions: function() {
    $('.button').click(function(e) { 
      var action = $(e.target).attr('data-action');
      util.position('menu', e, {left: -60, top: 5});
      util.render(action + 'Actions', 'menu');
      recline.handleMenuClick();
    });
  },
  controls: function() {
    $('#logged-in-status').click(function(e) { 
      if ($(e.target).text() === "Sign in") {
        recline.showDialog("signIn");
      } else if ($(e.target).text() === "Sign out") {
        util.notify("Signing you out...", {persist: true, loader: true});
        couch.logout().then(function(response) {
          util.notify("Signed out");
          util.render('controls', 'project-controls', {text: "Sign in"});
        })
      }
    });
  },
  signIn: function() {
    
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
    $('.dialog-content .okButton').click(function(e) {
      var funcText = $('.expression-preview-code').val();
      var editFunc = costco.evalFunction(funcText);
      ;
      if (editFunc.errorMessage) {
        util.notify("Error with function! " + editFunc.errorMessage);
        return;
      }
      util.hide('dialog');
      costco.updateDocs(editFunc);
    })
    
    var editor = $('.expression-preview-code');
    editor.val("function(doc) {\n  doc['"+ app.currentColumn+"'] = doc['"+ app.currentColumn+"'];\n  return doc;\n}");
    editor.focus().get(0).setSelectionRange(18, 18);
    editor.keydown(function(e) {
      // if you don't setTimeout it won't grab the latest character if you call e.target.value
      window.setTimeout( function() {
        var errors = $('.expression-preview-parsing-status');
        var editFunc = costco.evalFunction(e.target.value);
        if (!editFunc.errorMessage) {
          errors.text('No syntax error.');
          costco.previewTransform(app.cache, editFunc, app.currentColumn);
        } else {
          errors.text(editFunc.errorMessage);
        }
      }, 1, true);
    });
    editor.keydown();
  },
  transform: function() {
    $('.dialog-content .okButton').click(function(e) {
      util.notify("Not implemented yet, sorry! :D");
      util.hide('dialog');
    })
    
    var editor = $('.expression-preview-code');
    editor.val("function(val) {\n  if(_.isString(val)) this.update(\"pizza\")\n}");
    editor.focus().get(0).setSelectionRange(62,62);
    editor.keydown(function(e) {
      // if you don't setTimeout it won't grab the latest character if you call e.target.value
      window.setTimeout( function() {
        var errors = $('.expression-preview-parsing-status');
        var editFunc = costco.evalFunction(e.target.value);
        if (!editFunc.errorMessage) {
          errors.text('No syntax error.');
          var traverseFunc = function(doc) {
            util.traverse(doc).forEach(editFunc);
            return doc;
          }
          costco.previewTransform(app.cache, traverseFunc);
        } else {
          errors.text(editFunc.errorMessage);
        }
      }, 1, true);
    });
    editor.keydown();
  },
  urlImport: function() {
    $('.dialog-content .okButton').click(function(e) {
      app.apiURL = $('#url-input').val().trim();
      util.notify("Fetching data...", {persist: true, loader: true});
      $.getJSON(app.apiURL + "?callback=?").then(
        function(docs) {
          app.apiDocs = docs;
          util.notify("Data fetched successfully!");
          recline.showDialog('jsonTree');
        },
        function (err) {
          util.hide('dialog');
          util.notify("Data fetch error: " + err.responseText);
        }
      );
    })
  },
  uploadImport: function() {
    $('.dialog-content .okButton').click(function(e) {
      util.hide('dialog');
      util.notify("Saving documents...", {persist: true, loader: true});
      costco.uploadCSV();
    })
  },
  jsonTree: function() {
    util.renderTree(app.apiDocs);
    $('.dialog-content .okButton').click(function(e) {
      util.hide('dialog');
      util.notify("Saving documents...", {persist: true, loader: true});
      costco.uploadDocs(util.lookupPath(util.selectedTreePath())).then(function(msg) {
        util.notify("Docs saved successfully!");
        recline.initializeTable(app.offset);
      });
    })
  },
  pasteImport: function() {
    $('.dialog-content .okButton').click(function(e) {
      util.notify("Uploading documents...", {persist: true, loader: true});
      try {
        var docs = JSON.parse($('.data-table-cell-copypaste-editor').val());        
      } catch(e) {
        util.notify("JSON parse error: " + e);
      }
      if (docs) {
        if(_.isArray(docs)) {
          costco.uploadDocs(docs).then(
            function(docs) {
              util.notify("Data uploaded successfully!");
              recline.initializeTable(app.offset);
              util.hide('dialog');
            },
            function (err) {
              util.hide('dialog');
            }
          );        
        } else {
          util.notify("Error: JSON must be an array of objects");
        } 
      }
    })
  }
}

app.sammy = $.sammy(function () {
  this.get('', app.handler);
  this.get("#/", app.handler);
  this.get("#:route", app.handler);
  this.get("#:route/:id", app.handler);
});

$(function() {
  var qs = recline.View.parseQueryString(window.location.search);
  if (qs.url) {
    var dataset = new recline.Model.Dataset({
        id: 'my-dataset',
        url: qs.url,
        webstore_url: qs.url 
      },
      qs.backend || 'elasticsearch'
    );
  } else {
    dataset = localDataset();
  }

  createExplorer(dataset);
  Backbone.history.start();

  // setup the loader menu in top bar
  setupLoader(createExplorer);
});

// make Explorer creation / initialization in a function so we can call it
// again and again
function createExplorer(dataset) {
  // remove existing data explorer view
  var reload = false;
  if (window.dataExplorer) {
    window.dataExplorer.remove();
    reload = true;
  }
  window.dataExplorer = null;
  var $el = $('<div />');
  $el.appendTo($('.data-explorer-here'));
  var views = standardViews(dataset);
  window.dataExplorer = new recline.View.DataExplorer({
    el: $el
    , model: dataset
    , views: views
  });
  // HACK (a bit). Issue is that Backbone will not trigger the route
  // if you are already at that location so we have to make sure we genuinely switch
  if (reload) {
    window.dataExplorer.router.navigate('graph');
    window.dataExplorer.router.navigate('', true);
  }
}

// convenience function
function standardViews(dataset) {
  var views = [
    {
      id: 'grid',
      label: 'Grid',
      view: new recline.View.DataGrid({
        model: dataset
      })
    },
    {
      id: 'graph',
      label: 'Graph',
      view: new recline.View.FlotGraph({
        model: dataset
      })
    },
    {
      id: 'map',
      label: 'Map',
      view: new recline.View.Map({
        model: dataset
      })
    }

  ];
  return views;
}

// provide a demonstration in memory dataset
function localDataset() {
  var datasetId = 'test-dataset';
  var inData = {
    metadata: {
      title: 'My Test Dataset'
      , name: '1-my-test-dataset' 
      , id: datasetId
    },
fields: [{id: 'x'}, {id: 'y'}, {id: 'z'}, {id: 'country'}, {id: 'label'},{id: 'lat'},{id: 'lon'}],
    documents: [
      {id: 0, x: 1, y: 2, z: 3, country: 'DE', label: 'first', lat:52.56, lon:13.40}
      , {id: 1, x: 2, y: 4, z: 6, country: 'UK', label: 'second', lat:54.97, lon:-1.60}
      , {id: 2, x: 3, y: 6, z: 9, country: 'US', label: 'third', lat:40.00, lon:-75.5}
      , {id: 3, x: 4, y: 8, z: 12, country: 'UK', label: 'fourth', lat:57.27, lon:-6.20}
      , {id: 4, x: 5, y: 10, z: 15, country: 'UK', label: 'fifth', lat:51.58, lon:0}
      , {id: 5, x: 6, y: 12, z: 18, country: 'DE', label: 'sixth', lat:51.04, lon:7.9}
    ]
  };
  var backend = new recline.Backend.Memory();
  backend.addDataset(inData);
  var dataset = new recline.Model.Dataset({id: datasetId}, backend);
  dataset.queryState.addFacet('country');
  return dataset;
}

// setup the loader menu in top bar
function setupLoader(callback) {
  // pre-populate webstore load form with an example url
  var demoUrl = 'http://thedatahub.org/api/data/b9aae52b-b082-4159-b46f-7bb9c158d013';
  $('form.js-import-url input[name="source"]').val(demoUrl);
  $('form.js-import-url').submit(function(e) {
    e.preventDefault();
    $('.modal.js-import-dialog-url').modal('hide');
    var $form = $(e.target);
    var source = $form.find('input[name="source"]').val();
    var type = $form.find('select[name="backend_type"]').val();
    var dataset = new recline.Model.Dataset({
        id: 'my-dataset',
        url: source,
        webstore_url: source
      },
      type
    );
    callback(dataset);
  });

  $('.js-import-dialog-file form').submit(function(e) {
    e.preventDefault();
    var $form = $(e.target);
    $('.modal.js-import-dialog-file').modal('hide');
    var $file = $form.find('input[type="file"]')[0];
    var file = $file.files[0];
    var options = {
        separator : $form.find('input[name="separator"]').val(),
        encoding : $form.find('input[name="encoding"]').val()
    };
    recline.Backend.loadFromCSVFile(file, function(dataset) {
      callback(dataset)
    }, options);
  });
}

