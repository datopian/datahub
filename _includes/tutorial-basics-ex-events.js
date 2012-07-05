function onChange() {
  $('.ex-events').append('Queried: ' + dataset.queryState.get('q') + '. Records matching: ' + dataset.recordCount);
  $('.ex-events').append('<br />');
}

dataset.records.bind('reset', onChange);

dataset.query({q: 'DE'});
dataset.query({q: 'UK'});
dataset.query({q: 'US'});

dataset.unbind('reset', onChange);

