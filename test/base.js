var Fixture = {
  getDataset: function() {
    var fields = [
      {id: 'id'},
      {id: 'date', type: 'date'},
      {id: 'x'},
      {id: 'y'},
      {id: 'z'},
      {id: 'country'},
      {id: 'label'},
      {id: 'lat'},
      {id: 'lon'}
    ];
    var documents = [
      {id: 0, date: '2011-01-01', x: 1, y: 2, z: 3, country: 'DE', label: 'first', lat:52.56, lon:13.40},
      {id: 1, date: '2011-02-02', x: 2, y: 4, z: 24, country: 'UK', label: 'second', lat:54.97, lon:-1.60},
      {id: 2, date: '2011-03-03', x: 3, y: 6, z: 9, country: 'US', label: 'third', lat:40.00, lon:-75.5},
      {id: 3, date: '2011-04-04', x: 4, y: 8, z: 6, country: 'UK', label: 'fourth', lat:57.27, lon:-6.20},
      {id: 4, date: '2011-05-04', x: 5, y: 10, z: 15, country: 'UK', label: 'fifth', lat:51.58, lon:0},
      {id: 5, date: '2011-06-02', x: 6, y: 12, z: 18, country: 'DE', label: 'sixth', lat:51.04, lon:7.9}
    ];
    var dataset = recline.Backend.createDataset(documents, fields);
    return dataset;
  }
};

function assertPresent(selector, el) {
  var found = el ? $(el).find(selector) : $(selector);
  ok(found.length > 0);
}

function assertNotPresent(selector, el) {
  var found = el ? $(el).find(selector) : $(selector);
  equal(found.length, 0);
}

