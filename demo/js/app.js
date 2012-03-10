$(function() {
  var $el = $('<div />');
  $el.appendTo($('.data-explorer-here'));
  var dataset = demoDataset();
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
    }
  ];
  window.dataExplorer = new recline.View.DataExplorer({
    el: $el
    , model: dataset
    , views: views
  });
  Backbone.history.start();
  setupLoadFromWebstore(function(dataset) {
    window.dataExplorer.remove();
    var $el = $('<div />');
    $el.appendTo($('.data-explorer-here'));
    window.dataExplorer = null;
    window.dataExplorer = new recline.View.DataExplorer({
      el: $el
      , model: dataset
    });
    // HACK (a bit). Issue is that Backbone will not trigger the route
    // if you are already at that location so we have to make sure we genuinely switch
    window.dataExplorer.router.navigate('graph');
    window.dataExplorer.router.navigate('', true);
  });
  $('a.set-read-only').click(function() {
    window.dataExplorer.setReadOnly();
    alert('Read-only mode set');
  });
})

function demoDataset() {
  var datasetId = 'test-dataset';
  var inData = {
    metadata: {
      title: 'My Test Dataset'
      , name: '1-my-test-dataset' 
      , id: datasetId
    },
    fields: [{id: 'x'}, {id: 'y'}, {id: 'z'}],
    documents: [
      {id: 0, x: 1, y: 2, z: 3}
      , {id: 1, x: 2, y: 4, z: 6}
      , {id: 2, x: 3, y: 6, z: 9}
      , {id: 3, x: 4, y: 8, z: 12}
      , {id: 4, x: 5, y: 10, z: 15}
      , {id: 5, x: 6, y: 12, z: 18}
    ]
  };
  var backend = new recline.Backend.Memory();
  backend.addDataset(inData);
  var dataset = new recline.Model.Dataset({id: datasetId}, backend);
  return dataset;
}

function setupLoadFromWebstore(callback) {
  // pre-populate webstore load form with an example url
  var demoUrl = 'http://thedatahub.org/api/data/b9aae52b-b082-4159-b46f-7bb9c158d013';
  $('form.webstore-load input[name="source"]').val(demoUrl);
  $('form.webstore-load').submit(function(e) {
    e.preventDefault();
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
}

