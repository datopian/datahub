module("View - Timeline");

test('basics', function () {
  var dataset = Fixture.getDataset();
  var view = new recline.View.Timeline({
    model: dataset
  });
  $('.fixtures').append(view.el);
  view.initTimeline();
  assertPresent('.vmm-timeline', view.el);
  assertPresent('.timenav', view.el);
  assertPresent('.timenav', view.el);
  equal('2011', view.el.find('.marker.active h4').text());
  view.remove();
});

