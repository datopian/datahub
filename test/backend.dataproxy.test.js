(function ($) {
module("Backend DataProxy");

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
  var backend = recline.Backend.DataProxy;
  equal(backend.__type__, 'dataproxy');

  var dataset = new recline.Model.Dataset({
      url: 'http://webstore.thedatahub.org/rufuspollock/gold_prices/data.csv',
      backend: 'dataproxy'
    }
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

  expect(6);
  dataset.fetch().then(function() {
    deepEqual(['__id__', 'date', 'price'], _.pluck(dataset.fields.toJSON(), 'id'));
    equal(10, dataset.recordCount)
    equal(dataset.records.models[0].get('date'), "1950-01");
    // needed only if not stubbing
    // start();
  });

  dataset.query({q: '1950-01'}).then(function() {
    equal(dataset.recordCount, 1);
    equal(dataset.records.models[0].get('price'), '34.73');
  });
  $.ajax.restore();
});

})(this.jQuery);
