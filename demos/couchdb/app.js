jQuery(function($) {
  window.dataExplorer = null;
  window.explorerDiv = $('.data-explorer-here');

  var queryParameters = recline.View.parseQueryString(decodeURIComponent(window.location.search));

  var dataset = new recline.Model.Dataset({
    db_url: queryParameters['url'] || '/couchdb/yourcouchdb',
    view_url: queryParameters['view_url'] || '/couchdb/yourcouchdb/_design/yourdesigndoc/_view/yourview',
    backend: 'couchdb',
    query_options: {
      'key': '_id'
    }
  });

  dataset.fetch().done(function(dataset) {
    console.log('records: ' + dataset.records);
  });

  createExplorer(dataset);
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
      }),
    },
    {
      id: 'graph',
      label: 'Graph',
      view: new recline.View.Graph({
        model: dataset
      }),
    },
    {
      id: 'map',
      label: 'Map',
      view: new recline.View.Map({
        model: dataset
      }),
    },
    {
      id: 'transform',
      label: 'Transform',
      view: new recline.View.Transform({
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
