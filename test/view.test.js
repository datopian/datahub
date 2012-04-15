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

test('getState', function () {
  var $el = $('<div class="test-view-explorer-getstate" />');
  $('.fixtures .data-explorer-here').append($el);
  var dataset = Fixture.getDataset();
  var explorer = new recline.View.DataExplorer({
    model: dataset,
    el: $el
  });
  var state = explorer.getState();
  ok(state.get('query'));
  equal(state.get('readOnly'), false);
  equal(state.get('query').size, 100);
  deepEqual(state.get('view-grid').hiddenFields, []);
  $el.remove();
});

test('initialize state', function () {
  var dataset = Fixture.getDataset();
  var explorer = new recline.View.DataExplorer({
    model: dataset,
    state: {
      readOnly: true
    }
  });
  var state = explorer.getState();
  ok(state.get('readOnly'));
});

})(this.jQuery);

