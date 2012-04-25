module("View - Graph");

test('basics', function () {
  var dataset = Fixture.getDataset();
  var view = new recline.View.Graph({
    model: dataset
  });
  $('.fixtures').append(view.el);
  equal(view.state.get('graphType'), 'lines-and-points');
  // view will auto render ...
  assertPresent('.editor', view.el);
  view.remove();
});

test('initialize', function () {
  var dataset = Fixture.getDataset();
  var view = new recline.View.Graph({
    model: dataset,
    state: {
      'graphType': 'lines',
      'group': 'x',
      'series': ['y', 'z']
    }
  });
  $('.fixtures').append(view.el);
  equal(view.state.get('graphType'), 'lines');
  deepEqual(view.state.get('series'), ['y', 'z']);

  // check we have updated editor with state info
  equal(view.el.find('.editor-type select').val(), 'lines');
  equal(view.el.find('.editor-group select').val(), 'x');
  var out = _.map(view.el.find('.editor-series select'), function($el) {
    return $($el).val();
  });
  deepEqual(out, ['y', 'z']);

  // view.remove();
});
