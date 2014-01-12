(function ($) {

module("View - Explorer");

test('basic explorer functionality', function () {
  var $el = $('<div class="test-view-explorer-basic" />');
  $('.fixtures .data-explorer-here').append($el);
  var dataset = Fixture.getDataset();
  var explorer = new recline.View.MultiView({
    model: dataset,
    el: $el
  });
  var $explorer = $el.find('.recline-data-explorer');
  equal($explorer.length, 1);
  explorer.remove();
});

test('get State', function () {
  var $el = $('<div class="test-view-explorer-getstate" />');
  $('.fixtures .data-explorer-here').append($el);
  var dataset = Fixture.getDataset();
  var url = 'xyz';
  dataset.set({url: url});
  var explorer = new recline.View.MultiView({
    model: dataset,
    el: $el
  });
  var state = explorer.state;
  ok(state.get('query'));
  equal(state.get('readOnly'), false);
  equal(state.get('currentView'), null);
  equal(state.get('query').size, 100);
  deepEqual(state.get('view-graph').group, null);
  equal(state.get('backend'), 'memory');
  equal(state.get('dataset').url, 'xyz');
  ok(state.get('url') === url);
  explorer.remove();
});

test('initialize state', function () {
  var $el = $('<div class="test-view-explorer-init-state" />');
  $('.fixtures .data-explorer-here').append($el);
  var dataset = Fixture.getDataset();
  var explorer = new recline.View.MultiView({
    model: dataset,
    el: $el,
    state: {
      readOnly: true,
      currentView: 'graph',
      'view-grid': {
        hiddenFields: ['x']
      },
      'view-map': {
        latField: 'lat1',
        lonField: 'lon1'
      }
    }
  });
  ok(explorer.state.get('readOnly'));
  ok(explorer.state.get('currentView'), 'graph');

  // check the correct view is visible
  var css = explorer.$el.find('.navigation a[data-view="graph"]').attr('class').split(' ');
  ok(_.contains(css, 'active'), css);
  var css = explorer.$el.find('.navigation a[data-view="grid"]').attr('class').split(' ');
  ok(!(_.contains(css, 'active')), css);

  // check pass through of view config
  deepEqual(explorer.state.get('view-grid')['hiddenFields'], ['x']);
  equal(explorer.state.get('view-map')['lonField'], 'lon1');

  explorer.remove();
});

test('restore (from serialized state)', function() {
  var dataset = Fixture.getDataset();
  var explorer = new recline.View.MultiView({
    model: dataset,
  });
  var state = explorer.state.toJSON();
  var explorerNew = recline.View.MultiView.restore(state);
  equal(explorerNew.model.get('backend'), 'memory');
  var out = explorerNew.state.toJSON();
  equal(out.backend, state.backend);

  explorer.remove();
  explorerNew.remove();

  var dataset = new recline.Model.Dataset({
    url: 'http://data.london.gov.uk/datafiles/transport/tfl_passengers.csv',
    format: 'csv',
    backend: 'dataproxy'
  });
  var explorer = new recline.View.MultiView({
    model: dataset,
  });
  var state = explorer.state.toJSON();
  var explorerNew = recline.View.MultiView.restore(state);
  equal(explorerNew.model.get('backend'), 'dataproxy');
  equal(explorerNew.model.get('format'), 'csv');

  explorer.remove();
  explorerNew.remove();
});

})(this.jQuery);

