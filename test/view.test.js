(function ($) {

module("View - Explorer");

test('basic explorer functionality', function () {
  var $el = $('<div class="test-view-explorer-basic" />');
  $('.fixtures .data-explorer-here').append($el);
  var dataset = Fixture.getDataset();
  var explorer = new recline.View.DataExplorer({
    model: dataset,
    el: $el
  });
  var $explorer = $el.find('.recline-data-explorer');
  equal($explorer.length, 1);
  $el.remove();
});

test('get State', function () {
  var $el = $('<div class="test-view-explorer-getstate" />');
  $('.fixtures .data-explorer-here').append($el);
  var dataset = Fixture.getDataset();
  var explorer = new recline.View.DataExplorer({
    model: dataset,
    el: $el
  });
  var state = explorer.state;
  ok(state.get('query'));
  equal(state.get('readOnly'), false);
  equal(state.get('query').size, 100);
  deepEqual(state.get('view-grid').hiddenFields, []);
  equal(state.get('backend'), 'memory');
  ok(state.get('dataset').id !== null);
  $el.remove();
});

test('initialize state', function () {
  var dataset = Fixture.getDataset();
  var explorer = new recline.View.DataExplorer({
    model: dataset,
    state: {
      readOnly: true,
      'view-grid': {
        hiddenFields: ['x']
      }
    }
  });
  ok(explorer.state.get('readOnly'));
});

test('restore (from serialized state)', function() {
  var dataset = Fixture.getDataset();
  var explorer = new recline.View.DataExplorer({
    model: dataset,
  });
  var state = explorer.state.toJSON();
  var explorerNew = recline.View.DataExplorer.restore(state);
  var out = explorerNew.state.toJSON();
  equal(out.backend, state.backend);
});

})(this.jQuery);

