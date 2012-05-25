module("Backend Memory");

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

test('Memory Backend: readonly', function () {
  var backend = new recline.Backend.Memory();
  equal(backend.readonly, false);
});

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

