module("View - Flot");

test('basics', function () {
  var dataset = Fixture.getDataset();
  var view = new recline.View.Flot({
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
  var view = new recline.View.Flot({
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
  var out = _.map(view.elSidebar.find('.editor-series select'), function(el) {
    return $(el).val();
  });
  deepEqual(out, ['y', 'z']);

  view.remove();
});

test('dates in graph view', function () {
  expect(0);
  var dataset = Fixture.getDataset();
  var view = new recline.View.Flot({
    model: dataset,
    state: {
      'graphType': 'lines',
      'group': 'date',
      'series': ['y', 'z']
    }
  });
  view.render();
  $('.fixtures').append(view.el);
  view.redraw();

  view.remove();
});

test('FlotControls basics', function () {
  var dataset = Fixture.getDataset();
  var view = new recline.View.FlotControls({
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

