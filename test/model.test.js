(function ($) {

module("Dataset");

test('new Dataset', function () {
  var datasetId = 'test-dataset';
  var metadata = {
    title: 'My Test Dataset'
    , name: '1-my-test-dataset' 
    , id: datasetId
  };
  var indata = {
      headers: ['x', 'y', 'z']
    , rows: [
        {id: 0, x: 1, y: 2, z: 3}
      , {id: 1, x: 2, y: 4, z: 6}
      , {id: 2, x: 3, y: 6, z: 9}
      , {id: 3, x: 4, y: 8, z: 12}
      , {id: 4, x: 5, y: 10, z: 15}
      , {id: 5, x: 6, y: 12, z: 18}
    ]
  };
  // this is all rather artificial here but would make more sense with more complex backend
  backend = new recline.Model.BackendMemory({
    metadata: metadata,
    data: indata
    });
  recline.Model.setBackend(backend);
  var dataset = backend.getDataset(datasetId);
  expect(9);
  dataset.fetch().then(function(dataset) {
    equal(dataset.get('name'), metadata.name);
    deepEqual(dataset.get('headers'), indata.headers);
    equal(dataset.docCount, 6);
    dataset.getDocuments(4, 2).then(function(documentList) {
      deepEqual(indata.rows[2], documentList.models[0].toJSON());
    });
    dataset.getDocuments().then(function(docList) {
      // Test getDocuments
      equal(docList.length, Math.min(10, indata.rows.length));
      var doc1 = docList.models[0];
      deepEqual(doc1.toJSON(), indata.rows[0]);

      // Test UPDATA
      var newVal = 10;
      doc1.set({x: newVal});
      doc1.save().then(function() {
        equal(backend._datasetAsData.data.rows[0].x, newVal);
      })
      
      // Test Delete
      doc1.destroy().then(function() {
        equal(backend._datasetAsData.data.rows.length, 5);
        equal(backend._datasetAsData.data.rows[0].x, indata.rows[1].x);
      });
    });
  });
});

// TODO: move to fixtures
var webstoreSchema = {
  "count": 3, 
  "data": [
    {
      "name": "__id__", 
      "type": "integer", 
      "values_url": "/rufuspollock/demo/data/distinct/__id__"
    }, 
    {
      "name": "date", 
      "type": "text", 
      "values_url": "/rufuspollock/demo/data/distinct/date"
    }, 
    {
      "name": "geometry", 
      "type": "text", 
      "values_url": "/rufuspollock/demo/data/distinct/geometry"
    }, 
    {
      "name": "amount", 
      "type": "text", 
      "values_url": "/rufuspollock/demo/data/distinct/amount"
    }
  ], 
  "fields": [
    {
      "name": "type"
    }, 
    {
      "name": "name"
    }, 
    {
      "name": "values_url"
    }
  ]
};

webstoreData = {
  "count": null, 
  "data": [
    {
      "__id__": 1, 
      "amount": "100", 
      "date": "2009-01-01", 
      "geometry": null
    }, 
    {
      "__id__": 2, 
      "amount": "200", 
      "date": "2010-01-01", 
      "geometry": null
    }, 
    {
      "__id__": 3, 
      "amount": "300", 
      "date": "2011-01-01", 
      "geometry": null
    }
  ], 
  "fields": [
    {
      "name": "__id__"
    }, 
    {
      "name": "date"
    }, 
    {
      "name": "geometry"
    }, 
    {
      "name": "amount"
    }
  ]
};
 
test('Webstore Backend', function() {
  var backend = new recline.Model.BackendWebstore({
    url: 'http://webstore.test.ckan.org/rufuspollock/demo/data'
  });
  recline.Model.setBackend(backend);
  dataset = backend.getDataset();

  var stub = sinon.stub($, 'ajax', function(options) {
    if (options.url.indexOf('schema.json') != -1) {
      return {
        then: function(callback) {
          callback(webstoreSchema);
        }
      }
    } else {
      return {
        then: function(callback) {
          callback(webstoreData);
        }
      }
    }
  });

  dataset.fetch().then(function(dataset) {
    deepEqual(['__id__', 'date', 'geometry', 'amount'], dataset.get('headers'));
    equal(3, dataset.docCount)
    dataset.getDocuments().then(function(docList) {
      equal(3, docList.length)
      equal("2009-01-01", docList.models[0].get('date'));
    });
  });
});

})(this.jQuery);
