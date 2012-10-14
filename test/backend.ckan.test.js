(function ($) {
module("Backend CKAN");

test('_parseCkanResourceUrl', function() {
  var resid = 'eb23e809-ccbb-4ad1-820a-19586fc4bebd';
  var url = 'http://demo.ckan.org/dataset/some-dataset/resource/' + resid;
  var out = recline.Backend.Ckan._parseCkanResourceUrl(url);
  var exp = {
    resource_id: resid,
    endpoint: 'http://demo.ckan.org/api'
  }
  deepEqual(out, exp);
});

test('_normalizeQuery', function() {
  var dataset = new recline.Model.Dataset({
    url: 'does-not-matter',
    id: 'xyz',
    backend: 'ckan'
  });

  var queryObj = {
    q: 'abc',
    sort: [
      { field: 'location', order: 'desc' },
      { field: 'last' }
    ]
  };
  var out = recline.Backend.Ckan._normalizeQuery(queryObj, dataset);
  var exp = {
    resource_id: dataset.id,
    q: 'abc',
    sort: 'location desc,last ',
    limit: 10,
    offset: 0
  };
  deepEqual(out, exp);
});

test("fetch", function() { 
  var dataset = new recline.Model.Dataset({
    url: 'http://localhost:5000/dataset/test-data-viewer/resource/4f1299ab-a100-4e5f-ba81-e6d234a2f3bd',
    backend: 'ckan'
  });

  var stub = sinon.stub($, 'ajax', function(options) {
    if (options.url.indexOf('datastore_search') != -1) {
      return {
        done: function(callback) {
          callback(sample_data);
          return this;
        },
        fail: function() {
        }
      };
    }
  });

  dataset.fetch().done(function(dataset) {
    deepEqual(
      _.pluck(dataset.fields.toJSON(), 'id'),
      _.pluck(sample_data.result.fields, 'id')
    );
    // check we've mapped types correctly
    equal(dataset.fields.get('x').get('type'), 'integer');
    equal(dataset.fields.get('country').get('type'), 'string');

    // fetch does a query so we can check for records
    equal(dataset.recordCount, 6);
    equal(dataset.records.length, 6);
    equal(dataset.records.at(0).get('id'), 0);
    equal(dataset.records.at(0).get('country'), 'DE');
  });
  $.ajax.restore();
});

var sample_data = {
  "help": "",
  "result": {
    "fields": [
      {
        "id": "_id", 
        "type": "int4"
      }, 
      {
        "id": "id", 
        "type": "int4"
      }, 
      {
        "id": "date", 
        "type": "date"
      }, 
      {
        "id": "x", 
        "type": "int4"
      }, 
      {
        "id": "y", 
        "type": "int4"
      }, 
      {
        "id": "z", 
        "type": "int4"
      }, 
      {
        "id": "country", 
        "type": "text"
      }, 
      {
        "id": "title", 
        "type": "text"
      }, 
      {
        "id": "lat", 
        "type": "float8"
      }, 
      {
        "id": "lon", 
        "type": "float8"
      }
    ], 
    "records": [
      {
        "_id": 1, 
        "country": "DE", 
        "date": "2011-01-01", 
        "id": 0, 
        "lat": 52.56, 
        "lon": 13.4, 
        "title": "first", 
        "x": 1, 
        "y": 2, 
        "z": 3
      }, 
      {
        "_id": 2, 
        "country": "UK", 
        "date": "2011-02-02", 
        "id": 1, 
        "lat": 54.97, 
        "lon": -1.6, 
        "title": "second", 
        "x": 2, 
        "y": 4, 
        "z": 24
      }, 
      {
        "_id": 3, 
        "country": "US", 
        "date": "2011-03-03", 
        "id": 2, 
        "lat": 40.0, 
        "lon": -75.5, 
        "title": "third", 
        "x": 3, 
        "y": 6, 
        "z": 9
      }, 
      {
        "_id": 4, 
        "country": "UK", 
        "date": "2011-04-04", 
        "id": 3, 
        "lat": 57.27, 
        "lon": -6.2, 
        "title": "fourth", 
        "x": 4, 
        "y": 8, 
        "z": 6
      }, 
      {
        "_id": 5, 
        "country": "UK", 
        "date": "2011-05-04", 
        "id": 4, 
        "lat": 51.58, 
        "lon": 0.0, 
        "title": "fifth", 
        "x": 5, 
        "y": 10, 
        "z": 15
      }, 
      {
        "_id": 6, 
        "country": "DE", 
        "date": "2011-06-02", 
        "id": 5, 
        "lat": 51.04, 
        "lon": 7.9, 
        "title": "sixth", 
        "x": 6, 
        "y": 12, 
        "z": 18
      }
    ], 
    "resource_id": "4f1299ab-a100-4e5f-ba81-e6d234a2f3bd", 
    "total": 6
  }, 
  "success": true
};

})(this.jQuery);
