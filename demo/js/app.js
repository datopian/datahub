$(function() {
  var $el = $('<div />');
  $el.appendTo($('.data-explorer-here'));
  var dataset = demoDataset();
  window.dataExplorer = new recline.View.DataExplorer({
    el: $el
    , model: dataset
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
      , headers: ['x', 'y', 'z']
    },
    documents: [
      {id: 0, x: 1, y: 2, z: 3}
      , {id: 1, x: 2, y: 4, z: 6}
      , {id: 2, x: 3, y: 6, z: 9}
      , {id: 3, x: 4, y: 8, z: 12}
      , {id: 4, x: 5, y: 10, z: 15}
      , {id: 5, x: 6, y: 12, z: 18}
    ]
  };
  var backend = new recline.Model.BackendMemory();
  backend.addDataset(inData);
  var dataset = new recline.Model.Dataset({id: datasetId}, backend);
  return dataset;
}

function setupLoadFromWebstore(callback) {
  // pre-populate webstore load form with an example url
  var demoUrl = 'http://webstore.thedatahub.org/rufuspollock/gold_prices/data';
  $('form.webstore-load input[name="source"]').val(demoUrl);
  $('form.webstore-load').submit(function(e) {
    e.preventDefault();
    var $form = $(e.target);
    var source = $form.find('input[name="source"]').val();
    var dataset = new recline.Model.Dataset({
        id: 'gold-prices',
        webstore_url: source
      },
      'webstore'
    );
    callback(dataset);
  });
}

