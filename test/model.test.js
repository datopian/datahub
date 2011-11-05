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
        {x: 1, y: 2, z: 3}
      , {x: 2, y: 4, z: 6}
      , {x: 3, y: 6, z: 9}
      , {x: 4, y: 8, z: 12}
      , {x: 5, y: 10, z: 15}
      , {x: 6, y: 12, z: 18}
    ]
  };
  // this is all rather artificial here but would make more sense with more complex backend
  backend = new recline.BackendMemory();
  backend.addDataset({
    metadata: metadata,
    data: indata
    });
  recline.setBackend(backend);
  var dataset = backend.getDataset(datasetId);
  expect(6);
  dataset.fetch().then(function(dataset) {
    equal(dataset.get('name'), metadata.name);
    equal(dataset.get('headers'), indata.headers);
    equal(dataset.getLength(), 6);
    dataset.getRows(4, 2).then(function(rows) {
      equal(rows[0], indata.rows[2]);
    });
    dataset.getRows().then(function(rows) {
      equal(rows.length, Math.min(10, indata.rows.length));
      equal(rows[0], indata.rows[0]);
      });
  });
});

test('Local Data Sync', function() {
});

})(this.jQuery);
