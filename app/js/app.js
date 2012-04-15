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
      view: new recline.View.Grid({
        model: dataset
      })
    },
    {
      id: 'graph',
      label: 'Graph',
      view: new recline.View.Graph({
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

