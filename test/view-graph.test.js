module("View - FlotGraph");

test('basics', function () {
  var dataset = Fixture.getDataset();
  var view = new recline.View.FlotGraph({
    model: dataset
  });
  $('.fixtures').append(view.el);
  equal(view.state.get('graphType'), 'lines-and-points');
  // view will auto render ...
  assertPresent('.editor', view.el);
  view.remove();
});
