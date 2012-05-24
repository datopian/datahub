module("View - Timeline");

test('extract dates and timelineJSON', function () {
  var dataset = recline.Backend.createDataset([
    {'Date': '2012-03-20', 'title': '1'},
    {'Date': '2012-03-25', 'title': '2'},
  ]);
  var view = new recline.View.Timeline({
    model: dataset
  });
  equal(view.state.get('startField'), 'Date');

  var out = view._timelineJSON();
  var exp = {
      'timeline': {
        'type': 'default',
        'headline': '',
        'date': [
          {
            'startDate': '2012-03-20',
            'endDate': null,
            'headline': '2012-03-20',
            'text': ''
          },
          {
            'startDate': '2012-03-25',
            'endDate': null,
            'headline': '2012-03-25',
            'text': ''
          }
        ]
      }
    };
  deepEqual(out, exp);
});

test('render etc', function () {
  var dataset = Fixture.getDataset();
  var view = new recline.View.Timeline({
    model: dataset
  });
  $('.fixtures').append(view.el);
  view._initTimeline();
  assertPresent('.vmm-timeline', view.el);
  assertPresent('.timenav', view.el);
  assertPresent('.timenav', view.el);
  equal('2011', view.el.find('.marker.active h4').text());
  view.remove();
});

