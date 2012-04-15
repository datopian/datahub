(function ($) {
module("Backend");

var memoryData = {
  metadata: {
    title: 'My Test Dataset'
    , name: '1-my-test-dataset' 
    , id: 'test-dataset'
  },
  fields: [{id: 'x'}, {id: 'y'}, {id: 'z'}, {id: 'country'}, {id: 'label'}],
  documents: [
    {id: 0, x: 1, y: 2, z: 3, country: 'DE', label: 'first'}
    , {id: 1, x: 2, y: 4, z: 6, country: 'UK', label: 'second'}
    , {id: 2, x: 3, y: 6, z: 9, country: 'US', label: 'third'}
    , {id: 3, x: 4, y: 8, z: 12, country: 'UK', label: 'fourth'}
    , {id: 4, x: 5, y: 10, z: 15, country: 'UK', label: 'fifth'}
    , {id: 5, x: 6, y: 12, z: 18, country: 'DE', label: 'sixth'}
  ]
};

function makeBackendDataset() {
  var backend = new recline.Backend.Memory();
  backend.addDataset(memoryData);
  var dataset = new recline.Model.Dataset({id: memoryData.metadata.id}, backend);
  return dataset;
}

test('Memory Backend: createDataset', function () {
  var dataset = recline.Backend.createDataset(memoryData.documents, memoryData.fields, memoryData.metadata);
  equal(memoryData.metadata.id, dataset.id);
});

test('Memory Backend: createDataset 2', function () {
  var dataset = recline.Backend.createDataset(memoryData.documents);
  equal(dataset.fields.length, 6);
  deepEqual(['id', 'x', 'y', 'z', 'country', 'label'], dataset.fields.pluck('id'));
  dataset.query();
  equal(memoryData.documents.length, dataset.currentDocuments.length);
});

test('Memory Backend: basics', function () {
  var dataset = makeBackendDataset();
  expect(3);
  // convenience for tests - get the data that should get changed
  var data = dataset.backend.datasets[memoryData.metadata.id];
  dataset.fetch().then(function(datasetAgain) {
    equal(dataset.get('name'), data.metadata.name);
    deepEqual(_.pluck(dataset.fields.toJSON(), 'id'), _.pluck(data.fields, 'id'));
    equal(dataset.docCount, 6);
  });
});

test('Memory Backend: query', function () {
  var dataset = makeBackendDataset();
  // convenience for tests - get the data that should get changed
  var data = dataset.backend.datasets[memoryData.metadata.id];
  var dataset = makeBackendDataset();
  var queryObj = {
    size: 4
    , from: 2
  };
  dataset.query(queryObj).then(function(documentList) {
    deepEqual(data.documents[2], documentList.models[0].toJSON());
  });
});

test('Memory Backend: query sort', function () {
  var dataset = makeBackendDataset();
  // convenience for tests - get the data that should get changed
  var data = dataset.backend.datasets[memoryData.metadata.id];
  var queryObj = {
    sort: [
      {'y': {order: 'desc'}}
    ]
  };
  dataset.query(queryObj).then(function() {
    var doc0 = dataset.currentDocuments.models[0].toJSON();
    equal(doc0.x, 6);
  });
});

test('Memory Backend: query string', function () {
  var dataset = makeBackendDataset();
  dataset.fetch();
  dataset.query({q: 'UK'}).then(function() {
    equal(dataset.currentDocuments.length, 3);
    deepEqual(dataset.currentDocuments.pluck('country'), ['UK', 'UK', 'UK']);
  });

  dataset.query({q: 'UK 6'}).then(function() {
    equal(dataset.currentDocuments.length, 1);
    deepEqual(dataset.currentDocuments.models[0].id, 1);
  });
});

test('Memory Backend: filters', function () {
  var dataset = makeBackendDataset();
  dataset.queryState.addTermFilter('country', 'UK');
  dataset.query().then(function() {
    equal(dataset.currentDocuments.length, 3);
    deepEqual(dataset.currentDocuments.pluck('country'), ['UK', 'UK', 'UK']);
  });
});

test('Memory Backend: facet', function () {
  console.log('here');
  var dataset = makeBackendDataset();
  dataset.queryState.addFacet('country');
  dataset.query().then(function() {
    equal(dataset.facets.length, 1);
    var exp = [
      {
        term: 'UK',
        count: 3
      },
      {
        term: 'DE',
        count: 2
      },
      {
        term: 'US',
        count: 1
      }
    ];
    deepEqual(dataset.facets.get('country').toJSON().terms, exp);
  });
});
 
test('Memory Backend: update and delete', function () {
  var dataset = makeBackendDataset();
  // convenience for tests - get the data that should get changed
  var data = dataset.backend.datasets[memoryData.metadata.id];
  dataset.query().then(function(docList) {
    equal(docList.length, Math.min(100, data.documents.length));
    var doc1 = docList.models[0];
    deepEqual(doc1.toJSON(), data.documents[0]);

    // Test UPDATE
    var newVal = 10;
    doc1.set({x: newVal});
    doc1.save().then(function() {
      equal(data.documents[0].x, newVal);
    })

    // Test Delete
    doc1.destroy().then(function() {
      equal(data.documents.length, 5);
      equal(data.documents[0].x, memoryData.documents[1].x);
    });
  });
});


var dataProxyData = {
  "data": [
    [
    "1", 
  "1950-01", 
  "34.73"
    ], 
  [
    "2", 
  "1950-02", 
  "34.73"
    ], 
  [
    "3", 
  "1950-03", 
  "34.73"
    ], 
  [
    "4", 
  "1950-04", 
  "34.73"
    ], 
  [
    "5", 
  "1950-05", 
  "34.73"
    ], 
  [
    "6", 
  "1950-06", 
  "34.73"
    ], 
  [
    "7", 
  "1950-07", 
  "34.73"
    ], 
  [
    "8", 
  "1950-08", 
  "34.73"
    ], 
  [
    "9", 
  "1950-09", 
  "34.73"
    ], 
  [
    "10", 
  "1950-10", 
  "34.73"
    ]
    ], 
  "fields": [
    "__id__", 
  "date", 
  "price"
    ], 
  "length": null, 
  "max_results": 10, 
  "url": "http://webstore.thedatahub.org/rufuspollock/gold_prices/data.csv"
};

test('DataProxy Backend', function() {
  // needed only if not stubbing
  // stop();
  var backend = new recline.Backend.DataProxy();
  var dataset = new recline.Model.Dataset({
      url: 'http://webstore.thedatahub.org/rufuspollock/gold_prices/data.csv'
    },
    backend
  );

  var stub = sinon.stub($, 'ajax', function(options) {
    var partialUrl = 'jsonpdataproxy.appspot.com';
    if (options.url.indexOf(partialUrl) != -1) {
      return {
        done: function(callback) {
          callback(dataProxyData);
          return this;
        }, 
        fail: function() {
          return this;
        }
      }
    }
  });

  dataset.fetch().done(function(dataset) {
    dataset.query().done(function(docList) {
      deepEqual(['__id__', 'date', 'price'], _.pluck(dataset.fields.toJSON(), 'id'));
      equal(null, dataset.docCount)
      equal(10, docList.length)
      equal("1950-01", docList.models[0].get('date'));
      // needed only if not stubbing
      start();
    });
  });
  $.ajax.restore();
});


var sample_gdocs_spreadsheet_data = {
  "feed": {
    "category": [
    {
      "term": "http://schemas.google.com/spreadsheets/2006#list", 
      "scheme": "http://schemas.google.com/spreadsheets/2006"
    }
    ], 
      "updated": {
        "$t": "2010-07-12T18:32:16.200Z"
      }, 
      "xmlns": "http://www.w3.org/2005/Atom", 
      "xmlns$gsx": "http://schemas.google.com/spreadsheets/2006/extended", 
      "title": {
        "$t": "Sheet1", 
        "type": "text"
      }, 
      "author": [
      {
        "name": {
          "$t": "okfn.rufus.pollock"
        }, 
        "email": {
          "$t": "okfn.rufus.pollock@gmail.com"
        }
      }
    ], 
      "openSearch$startIndex": {
        "$t": "1"
      }, 
      "link": [
      {
        "href": "http://spreadsheets.google.com/pub?key=0Aon3JiuouxLUdDQwZE1JdV94cUd6NWtuZ0IyWTBjLWc", 
        "type": "text/html", 
        "rel": "alternate"
      }, 
      {
        "href": "http://spreadsheets.google.com/feeds/list/0Aon3JiuouxLUdDQwZE1JdV94cUd6NWtuZ0IyWTBjLWc/od6/public/values", 
        "type": "application/atom+xml", 
        "rel": "http://schemas.google.com/g/2005#feed"
      }, 
      {
        "href": "http://spreadsheets.google.com/feeds/list/0Aon3JiuouxLUdDQwZE1JdV94cUd6NWtuZ0IyWTBjLWc/od6/public/values?alt=json-in-script", 
        "type": "application/atom+xml", 
        "rel": "self"
      }
    ], 
      "xmlns$openSearch": "http://a9.com/-/spec/opensearchrss/1.0/", 
      "entry": [
      {
        "category": [
        {
          "term": "http://schemas.google.com/spreadsheets/2006#list", 
          "scheme": "http://schemas.google.com/spreadsheets/2006"
        }
        ], 
          "updated": {
            "$t": "2010-07-12T18:32:16.200Z"
          }, 
          "gsx$column-2": {
            "$t": "1"
          }, 
          "gsx$column-1": {
            "$t": "A"
          }, 
          "title": {
            "$t": "A", 
            "type": "text"
          }, 
          "content": {
            "$t": "column-2: 1", 
            "type": "text"
          }, 
          "link": [
          {
            "href": "http://spreadsheets.google.com/feeds/list/0Aon3JiuouxLUdDQwZE1JdV94cUd6NWtuZ0IyWTBjLWc/od6/public/values/cokwr", 
            "type": "application/atom+xml", 
            "rel": "self"
          }
        ], 
          "id": {
            "$t": "http://spreadsheets.google.com/feeds/list/0Aon3JiuouxLUdDQwZE1JdV94cUd6NWtuZ0IyWTBjLWc/od6/public/values/cokwr"
          }
      }, 
      {
        "category": [
        {
          "term": "http://schemas.google.com/spreadsheets/2006#list", 
          "scheme": "http://schemas.google.com/spreadsheets/2006"
        }
        ], 
          "updated": {
            "$t": "2010-07-12T18:32:16.200Z"
          }, 
          "gsx$column-2": {
            "$t": "2"
          }, 
          "gsx$column-1": {
            "$t": "b"
          }, 
          "title": {
            "$t": "b", 
            "type": "text"
          }, 
          "content": {
            "$t": "column-2: 2", 
            "type": "text"
          }, 
          "link": [
          {
            "href": "http://spreadsheets.google.com/feeds/list/0Aon3JiuouxLUdDQwZE1JdV94cUd6NWtuZ0IyWTBjLWc/od6/public/values/cpzh4", 
            "type": "application/atom+xml", 
            "rel": "self"
          }
        ], 
          "id": {
            "$t": "http://spreadsheets.google.com/feeds/list/0Aon3JiuouxLUdDQwZE1JdV94cUd6NWtuZ0IyWTBjLWc/od6/public/values/cpzh4"
          }
      }, 
      {
        "category": [
        {
          "term": "http://schemas.google.com/spreadsheets/2006#list", 
          "scheme": "http://schemas.google.com/spreadsheets/2006"
        }
        ], 
          "updated": {
            "$t": "2010-07-12T18:32:16.200Z"
          }, 
          "gsx$column-2": {
            "$t": "3"
          }, 
          "gsx$column-1": {
            "$t": "c"
          }, 
          "title": {
            "$t": "c", 
            "type": "text"
          }, 
          "content": {
            "$t": "column-2: 3", 
            "type": "text"
          }, 
          "link": [
          {
            "href": "http://spreadsheets.google.com/feeds/list/0Aon3JiuouxLUdDQwZE1JdV94cUd6NWtuZ0IyWTBjLWc/od6/public/values/cre1l", 
            "type": "application/atom+xml", 
            "rel": "self"
          }
        ], 
          "id": {
            "$t": "http://spreadsheets.google.com/feeds/list/0Aon3JiuouxLUdDQwZE1JdV94cUd6NWtuZ0IyWTBjLWc/od6/public/values/cre1l"
          }
      }
    ], 
      "openSearch$totalResults": {
        "$t": "3"
      }, 
      "id": {
        "$t": "http://spreadsheets.google.com/feeds/list/0Aon3JiuouxLUdDQwZE1JdV94cUd6NWtuZ0IyWTBjLWc/od6/public/values"
      }
  }, 
  "version": "1.0", 
  "encoding": "UTF-8"
}

test("GDoc Backend", function() { 
  var backend = new recline.Backend.GDoc();
  var dataset = new recline.Model.Dataset({
      url: 'https://spreadsheets.google.com/feeds/list/0Aon3JiuouxLUdDQwZE1JdV94cUd6NWtuZ0IyWTBjLWc/od6/public/values?alt=json'
    },
    backend
  );

  var stub = sinon.stub($, 'getJSON', function(options, cb) {
    var partialUrl = 'spreadsheets.google.com';
    if (options.indexOf(partialUrl) != -1) {
      cb(sample_gdocs_spreadsheet_data)
    }
  });

  dataset.fetch().then(function(dataset) {
    deepEqual(['column-2', 'column-1'], _.pluck(dataset.fields.toJSON(), 'id'));
    //equal(null, dataset.docCount)
    dataset.query().then(function(docList) {
      equal(3, docList.length);
      equal("A", docList.models[0].get('column-1'));
      // needed only if not stubbing
      start();
    });
  });
  $.getJSON.restore();
});

test("GDoc Backend.getUrl", function() { 
  var key = 'Abc_dajkdkjdafkj';
  var dataset = new recline.Model.Dataset({
    url: 'https://docs.google.com/spreadsheet/ccc?key=' + key + '#gid=0'
  });
  var backend = new recline.Backend.GDoc();
  var out = backend.getUrl(dataset);
  var exp = 'https://spreadsheets.google.com/feeds/list/' + key + '/1/public/values?alt=json'
  equal(exp, out);
});

})(this.jQuery);
