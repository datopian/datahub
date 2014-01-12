module("View - Timeline");

test('extract dates and timelineJSON', function () {
  var dataset = new recline.Model.Dataset({
    records: [
      {'Date': '2012-03-20', 'title': '1'},
      {'Date': '2012-03-25', 'title': '2'}
    ]
  });
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
            'startDate': '2012,03,20',
            'endDate': null,
            'headline': '1',
            'text': '<div class="recline-record-summary"><div class="Date"><strong>Date</strong>: 2012-03-20</div><div class="title"><strong>title</strong>: 1</div></div>'
          },
          {
            'startDate': '2012,03,25',
            'endDate': null,
            'headline': '2',
            'text': '<div class="recline-record-summary"><div class="Date"><strong>Date</strong>: 2012-03-25</div><div class="title"><strong>title</strong>: 2</div></div>'
          }
        ]
      }
    };
  deepEqual(out, exp);
});

test('render etc', function () {
  var dataset = new recline.Model.Dataset({
    records: [
      {'Date': '-10000', 'title': 'first'},
      {'Date': '2012-03-20', 'title': 'second'},
      {'Date': '2012-03-25', 'title': 'third'}
    ]
  });
  var view = new recline.View.Timeline({
    model: dataset
  });
  $('.fixtures').append(view.el);
  view.render();
  assertPresent('.vco-timeline', view.el);
  assertPresent('.timenav', view.el);
  assertPresent('.timenav', view.el);
  equal(view.$el.find('.marker.active h3').text(), 'first');
  view.remove();
});

test('_parseDate', function () {
  var dataset = Fixture.getDataset();
  var view = new recline.View.Timeline({
    model: dataset
  });
  var testData = [
    // [ '1st August 1914', '1914-08-01T00:00:00.000Z' ],
    // [ '1 August 1914', '1914-08-01T00:00:00.000Z' ],
    // [ 'August 1st 1914', '1914-08-01T00:00:00.000Z' ],
    [ '1914-08-01', '1914,08,01' ],
    [ '1914-08-01T08:00', '1914,08,01,08,00' ],
    [ '03-20-1914', '03/20/1914' ],
    [ '20/03/1914', '20/03/1914' ],
    [ '-10000', '-10000' ],
    [ null, null ]
  ];
  _.each(testData, function(item) {
    var out = view._parseDate(item[0]);
    equal(out, item[1]);
  });
  view.state.set({'nonUSDates': true});
  var out = view._parseDate('20/03/1914');
  equal(out, '03/20/1914');
});

