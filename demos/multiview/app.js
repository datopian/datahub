jQuery(function($) {
  window.dataExplorer = null;
  window.explorerDiv = $('.data-explorer-here');

  // see if we have any configuration from query string
  var state = recline.View.parseQueryString(decodeURIComponent(window.location.search));
  if (state) {
    _.each(state, function(value, key) {
      try {
        value = JSON.parse(value);
      } catch(e) {}
      state[key] = value;
    });
  } else {
    state.url = 'demo';
  }
  var dataset = null;
  if (state.dataset || state.url) {
    dataset = recline.Model.Dataset.restore(state);
  } else {
    dataset = localDataset();
  }
  createExplorer(dataset, state);
});


// make Explorer creation / initialization in a function so we can call it
// again and again
var createExplorer = function(dataset, state) {
  // remove existing data explorer view
  var reload = false;
  if (window.dataExplorer) {
    window.dataExplorer.remove();
    reload = true;
  }
  window.dataExplorer = null;
  var $el = $('<div />');
  $el.appendTo(window.explorerDiv);
  var views = [
     {
       id: 'grid',
       label: 'Grid', 
       view: new recline.View.SlickGrid({
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
     },
     {
       id: 'timeline',
       label: 'Timeline',
       view: new recline.View.Timeline({
         model: dataset
       })
     }
  ];

  window.dataExplorer = new recline.View.MultiView({
    model: dataset,
    el: $el,
    state: state,
    views: views
  });
}

// provide a demonstration in memory dataset
function localDataset() {
  var dataset = Fixture.getDataset();
  return dataset;
}

