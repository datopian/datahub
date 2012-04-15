var Fixture = {
  getDataset: function() {
    var fields = [{id: 'x'}, {id: 'y'}, {id: 'z'}, {id: 'country'}, {id: 'label'},{id: 'lat'},{id: 'lon'}];
    var documents = [
      {id: 0, x: 1, y: 2, z: 3, country: 'DE', lat:52.56, lon:13.40}
      , {id: 1, x: 2, y: 4, z: 6, country: 'UK', lat:54.97, lon:-1.60}
      , {id: 2, x: 3, y: 6, z: 9, country: 'US', lat:40.00, lon:-75.5}
      , {id: 3, x: 4, y: 8, z: 12, country: 'UK', lat:57.27, lon:-6.20}
      , {id: 4, x: 5, y: 10, z: 15, country: 'UK', lat:51.58, lon:0}
      , {id: 5, x: 6, y: 12, z: 18, country: 'DE', lat:51.04, lon:7.9}
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
  ok(found.length > 0);
  equal(found.length, 0);
}

