(function ($) {
module("Backend SOLR");

test("fetch", function() { 
  var dataset = new recline.Model.Dataset({
    url: 'http://openspending.org/api/search',
    backend: 'solr'
  });
  // stop();

  var stub = sinon.stub($, 'ajax', function(options) {
    return {
      done: function(callback) {
        callback(sample_data);
        return this;
      },
      fail: function() {
      }
    };
  });

  dataset.fetch().done(function(dataset) {
    var exp = [
      "_id",
      "amount",
      "category.label_facet",
      "dataset",
      "from.label_facet",
      "id",
      "subcategory.label_facet",
      "time.label_facet",
      "to.label_facet"
    ];
    deepEqual(
      exp,
      _.pluck(dataset.fields.toJSON(), 'id')
    );
    // check we've mapped types correctly
    equal(dataset.fields.get('amount').get('type'), 'string');

    // fetch does a query so we can check for records
    equal(dataset.recordCount, 10342132);
    equal(dataset.records.length, 2);
    equal(dataset.records.at(0).get('id'), '3e3e25d7737634127b76d5ee4a7df280987013c7');
    // start();
  });
  $.ajax.restore();
});

var sample_data = {
  "response": {
    "docs": [
      {
        "_id": "south-african-national-gov-budget-2012-13::3e3e25d7737634127b76d5ee4a7df280987013c7", 
        "amount": 30905738200000.0, 
        "category.label_facet": "General public services", 
        "dataset": "south-african-national-gov-budget-2012-13", 
        "from.label_facet": "National Treasury", 
        "id": "3e3e25d7737634127b76d5ee4a7df280987013c7", 
        "subcategory.label_facet": "Transfers of a general character between different levels of government", 
        "time.label_facet": "01. April 2012", 
        "to.label_facet": "Provincial Equitable Share"
      }, 
      {
        "_id": "south-african-national-gov-budget-2012-13::738849e28e6b3c45e5b0001e142b51479b3a3e41", 
        "amount": 8938807300000.0, 
        "category.label_facet": "General public services", 
        "dataset": "south-african-national-gov-budget-2012-13", 
        "from.label_facet": "National Treasury", 
        "id": "738849e28e6b3c45e5b0001e142b51479b3a3e41", 
        "subcategory.label_facet": "Public debt transactions", 
        "time.label_facet": "01. April 2012", 
        "to.label_facet": "State Debt Costs"
      }
    ], 
    "numFound": 10342132, 
    "start": 0
  }, 
  "responseHeader": {
    "QTime": 578, 
    "status": 0
  }
};

})(this.jQuery);
