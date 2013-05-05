(function ($) {

module("Backend Memory - Store");

var memoryData = [
  {id: 0, date: '2011-01-01', x: 1, y: 2, z: 3, country: 'DE', label: 'first'}
  , {id: 1, date: '2011-02-03', x: 2, y: 4, z: 6, country: 'UK', label: 'second'}
  , {id: 2, date: '2011-04-05', x: 3, y: 6, z: 9, country: 'US', label: 'third'}
  , {id: 3, date: '2011-06-07', x: 4, y: 8, z: 12, country: 'UK', label: 'fourth'}
  , {id: 4, date: '2011-08-09', x: 5, y: 10, z: 15, country: 'UK', label: 'fifth'}
  , {id: 5, date: '2011-10-11', x: 6, y: 12, z: 18, country: 'DE', label: 'sixth'}
];

var memoryFields = [
  {id: 'id'},
  {id: 'date', type: 'date'},
  {id: 'x', type: 'integer'},
  {id: 'y', type: 'integer'},
  {id: 'z', type: 'integer'},
  {id: 'country'},
  {id: 'label'}
];

var _wrapData = function() {
  var recordsCopy = $.extend(true, [], memoryData);
  // return new recline.Backend.Memory.Store(dataCopy, fields);
  return new recline.Backend.Memory.Store(recordsCopy, memoryFields);
}

test('basics', function () {
  var data = _wrapData();
  equal(data.fields.length, 7);
  deepEqual(['id', 'date', 'x', 'y', 'z', 'country', 'label'], _.pluck(data.fields, 'id'));
  equal(memoryData.length, data.records.length);
});

test('query', function () {
  var data = _wrapData();
  var queryObj = {
    size: 4
    , from: 2
  };
  data.query(queryObj).then(function(out) {
    deepEqual(out.hits[0], memoryData[2]);
    equal(out.hits.length, 4);
    equal(out.total, 6);
  });
});

test('query sort', function () {
  var data = _wrapData();
  var queryObj = {
    sort: [
      {field: 'y', order: 'desc'}
    ]
  };
  data.query(queryObj).then(function(out) {
    equal(out.hits[0].x, 6);
  });

  var queryObj = {
    sort: [
      {field: 'country', order: 'desc'}
    ]
  };
  data.query(queryObj).then(function(out) {
    equal(out.hits[0].country, 'US');
  });

  var queryObj = {
    sort: [
      {field: 'country', order: 'asc'}
    ]
  };
  data.query(queryObj).then(function(out) {
    equal(out.hits[0].country, 'DE');
  });
});

test('query string', function () {
  var data = _wrapData();
  data.query({q: 'UK'}).then(function(out) {
    equal(out.total, 3);
    deepEqual(_.pluck(out.hits, 'country'), ['UK', 'UK', 'UK']);
  });

  data.query({q: 'UK 6'}).then(function(out) {
    equal(out.total, 2); // the new regex support will find 2 hits
    deepEqual(out.hits[0].id, 1);
  });
});

test('filters', function () {
  var data = _wrapData();
  var query = new recline.Model.Query();
  query.addFilter({type: 'term', field: 'country', term: 'UK'});
  data.query(query.toJSON()).then(function(out) {
    equal(out.total, 3);
    deepEqual(_.pluck(out.hits, 'country'), ['UK','UK','UK']);
  });

  query = new recline.Model.Query();
  query.addFilter({type: 'range', field: 'date', start: '2011-01-01', stop: '2011-05-01'});
  data.query(query.toJSON()).then(function(out) {
    equal(out.total, 3);
    deepEqual(_.pluck(out.hits, 'date'), ['2011-01-01','2011-02-03','2011-04-05']);
  });
  
  query = new recline.Model.Query();
  query.addFilter({type: 'range', field: 'z', start: '0', stop: '10'});
  data.query(query.toJSON()).then(function(out) {
    equal(out.total, 3);
    deepEqual(_.pluck(out.hits, 'z'), [3,6,9]);
  });
});


test('filters with nulls', function () {
  var data = _wrapData();

  query = new recline.Model.Query();
  query.addFilter({type: 'range', field: 'z', start: '', stop: null});
  data.query(query.toJSON()).then(function(out) {
    equal(out.total, 6);
  });

  query = new recline.Model.Query();
  query.addFilter({type: 'range', field: 'x', start: '', stop: '3'});
  data.query(query.toJSON()).then(function(out) {
    equal(out.total, 3);
  });

  query = new recline.Model.Query();
  query.addFilter({type: 'range', field: 'x', start: '3', stop: ''});
  data.query(query.toJSON()).then(function(out) {
    equal(out.total, 4);
  });

  data.records[5].country = '';
  query = new recline.Model.Query();
  query.addFilter({type: 'range', field: 'country', start: '', stop: 'Z'});
  data.query(query.toJSON()).then(function(out) {
    equal(out.total, 5);
  });

  query = new recline.Model.Query();
  query.addFilter({type: 'range', field: 'x', start: '', stop: ''});
  data.query(query.toJSON()).then(function(out) {
    equal(out.total, 6);
  });
});

test('facet', function () {
  var data = _wrapData();
  var query = new recline.Model.Query();
  query.addFacet('country');
  var out = data.computeFacets(data.records, query.toJSON());
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
  deepEqual(out['country'].terms, exp);
});
 
test('update and delete', function () {
  var data = _wrapData();
  // Test UPDATE
  var newVal = 10;
  doc1 = $.extend(true, {}, memoryData[0]);
  doc1.x = newVal;
  data.update(doc1);
  equal(data.records[0].x, newVal);

  // Test Delete
  data.remove(doc1);
  equal(data.records.length, 5);
  equal(data.records[0].x, memoryData[1].x);
});

})(this.jQuery);

// ======================================

(function ($) {

module("Backend Memory - Model Integration");

var memoryFields = [
  {id: 'id'},
  {id: 'date', type: 'date'},
  {id: 'x', type: 'integer'},
  {id: 'y', type: 'integer'},
  {id: 'z', type: 'integer'},
  {id: 'country'},
  {id: 'label'}
];

var memoryData = {
  metadata: {
    title: 'My Test Dataset'
    , name: '1-my-test-dataset' 
    , id: 'test-dataset'
  },
  fields: memoryFields,
  records: [
    {id: 0, x: 1, y: 2, z: 3, country: 'DE', label: 'first'}
    , {id: 1, x: 2, y: 4, z: 6, country: 'UK', label: 'second'}
    , {id: 2, x: 3, y: 6, z: 9, country: 'US', label: 'third'}
    , {id: 3, x: 4, y: 8, z: 12, country: 'UK', label: 'fourth'}
    , {id: 4, x: 5, y: 10, z: 15, country: 'UK', label: 'fifth'}
    , {id: 5, x: 6, y: 12, z: 18, country: 'DE', label: 'sixth'}
  ]
};

function makeBackendDataset() {
  var dataset = new recline.Model.Dataset({
    id: 'test-dataset',
    title: 'My Test Dataset',
    name: '1-my-test-dataset',
    fields: memoryFields,
    records: [
      {id: 0, date: '2011-01-01', x: 1, y: 2, z: 3, country: 'DE', label: 'first'}
      , {id: 1, date: '2011-02-03', x: 2, y: 4, z: 6, country: 'UK', label: 'second'}
      , {id: 2, date: '2011-04-05', x: 3, y: 6, z: 9, country: 'US', label: 'third'}
      , {id: 3, date: '2011-06-07', x: 4, y: 8, z: 12, country: 'UK', label: 'fourth'}
      , {id: 4, date: '2011-08-09', x: 5, y: 10, z: 15, country: 'UK', label: 'fifth'}
      , {id: 5, date: '2011-10-11', x: 6, y: 12, z: 18, country: 'DE', label: 'sixth'}
    ]
  });
  dataset.fetch();
  return dataset;
}

test('basics', function () {
  var dataset = makeBackendDataset();
  expect(3);
  // convenience for tests - get the data that should get changed
  var data = dataset._store;
  dataset.fetch().then(function(datasetAgain) {
    equal(dataset.get('name'), memoryData.metadata.name);
    deepEqual(_.pluck(dataset.fields.toJSON(), 'id'), _.pluck(data.fields, 'id'));
    equal(dataset.recordCount, 6);
  });
});

test('query', function () {
  var dataset = makeBackendDataset();
  // convenience for tests - get the data that should get changed
  var data = dataset._store.records;
  var dataset = makeBackendDataset();
  var queryObj = {
    size: 4
    , from: 2
  };
  dataset.query(queryObj).then(function(recordList) {
    deepEqual(recordList.models[0].toJSON(), data[2]);
  });
});

test('query sort', function () {
  var dataset = makeBackendDataset();
  // convenience for tests - get the data that should get changed
  var data = dataset._store.records;
  var queryObj = {
    sort: [
      {field: 'y', order: 'desc'}
    ]
  };
  dataset.query(queryObj).then(function() {
    var doc0 = dataset.records.models[0].toJSON();
    equal(doc0.x, 6);
  });
});

test('query string', function () {
  var dataset = makeBackendDataset();
  dataset.fetch();
  dataset.query({q: 'UK'}).then(function() {
    equal(dataset.records.length, 3);
    deepEqual(dataset.records.pluck('country'), ['UK', 'UK', 'UK']);
  });

  dataset.query({q: 'UK 6'}).then(function() {
    equal(dataset.records.length, 2);
    deepEqual(dataset.records.models[0].id, 1);
  });
});

test('filters', function () {
  var dataset = makeBackendDataset();
  dataset.queryState.addFilter({type: 'term', field: 'country', term: 'UK'});
  dataset.query().then(function() {
    equal(dataset.records.length, 3);
    deepEqual(dataset.records.pluck('country'), ['UK', 'UK', 'UK']);
  });

  dataset = makeBackendDataset();
  dataset.queryState.addFilter({type: 'range', field: 'date', start: '2011-01-01', stop: '2011-05-01'});
  dataset.query().then(function() {
    equal(dataset.records.length, 3);
    deepEqual(dataset.records.pluck('date'), ['2011-01-01','2011-02-03','2011-04-05']);
  });
  
  dataset = makeBackendDataset();
  dataset.queryState.addFilter({type: 'range', field: 'z', start: '0', stop: '10'});
  dataset.query().then(function() {
    equal(dataset.records.length, 3);
    deepEqual(dataset.records.pluck('z'), [3,6,9]);
  });
});

test('facet', function () {
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
 
test('update and delete', function () {
  var dataset = makeBackendDataset();
  // convenience for tests - get the data that should get changed
  var data = dataset._store;
  dataset.query().then(function(docList) {
    equal(docList.length, Math.min(100, data.records.length));
    var doc1 = docList.models[0];
    deepEqual(doc1.toJSON(), data.records[0]);

    // Test UPDATE
    var newVal = 10;
    doc1.set({x: newVal});
    doc1.save();
    equal(dataset._changes.updates[0].x, newVal);

    doc1.destroy();
    deepEqual(dataset._changes.deletes[0], doc1.toJSON());

    dataset.save().then(function() {
      equal(data.records.length, 5);
      equal(data.records[0].x, memoryData.records[1].x);
    });
  });
});

})(this.jQuery);
