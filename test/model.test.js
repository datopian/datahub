(function ($) {

module("Dataset");

test('new Dataset', function () {
  var metadata = {
    title: 'My Test Dataset'
    , name: '1-my-test-dataset' 
    , id: 1
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
  var dataset = new recline.Dataset(metadata, indata);
  equal(dataset.get('name'), metadata.name);
  expect(6);
  setTimeout(2);
  dataset.getTabularData().then(function(tabularData) {
    equal(tabularData.get('headers'), indata.headers);
    equal(tabularData.getLength(), 6);
    tabularData.getRows(4, 2).then(function(rows) {
      equal(rows[0], indata.rows[2]);
    });
    tabularData.getRows().then(function(rows) {
      equal(rows.length, Math.min(10, indata.rows.length));
      equal(rows[0], indata.rows[0]);
    });
  });
});

})(this.jQuery);
