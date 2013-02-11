module("View - Flotr2");

test('basics', function () {
  var dataset = Fixture.getDataset();
  var view = new recline.View.Flotr2({
    model: dataset
  });
  $('.fixtures').append(view.el);
  equal(view.state.get('graphType'), 'lines-and-points');
  // view will auto render ...
  assertPresent('.editor', view.elSidebar);
  view.remove();
});

test('initialize', function () {
  var dataset = Fixture.getDataset();
  var view = new recline.View.Flotr2({
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
  equal(view.elSidebar.find('.editor-type select').val(), 'lines');
  equal(view.elSidebar.find('.editor-group select').val(), 'x');
  var out = _.map(view.elSidebar.find('.editor-series select'), function($el) {
    return $($el).val();
  });
  deepEqual(out, ['y', 'z']);

  view.remove();
});

test('dates in graph view', function () {
  expect(0);
  var dataset = Fixture.getDataset();
  var view = new recline.View.Flotr2({
    model: dataset,
    state: {
      'graphType': 'lines',
      'group': 'date',
      'series': ['y', 'z']
    }
  });
  $('.fixtures').append(view.el);

  view.remove();
});

test('Flotr2Controls basics', function () {
  var dataset = Fixture.getDataset();
  var view = new recline.View.Flotr2Controls({
    model: dataset,
    state: {
      graphType: 'bars',
      series: [] 
    }
  });
  $('.fixtures').append(view.el);
  equal(view.state.get('graphType'), 'bars');
  // view will auto render ...
  assertPresent('.editor', view.el);
  view.remove();
});

test('Overriding graph options', function () {
  var dataset = Fixture.getDataset();
  var randomWidth = Math.random();
  var view = new recline.View.Flotr2({
    model: dataset,
    state: {
      'graphType': 'bars',
      'group': 'date',
      'series': ['y', 'z'],
      'graphOptions': { bars: {barWidth: randomWidth}}
    }
  });
  equal(view.getGraphOptions('bars').bars.barWidth, randomWidth)
  view.remove();
});
