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
    var dataset = new recline.Model.Dataset(metadata);
    dataset.backendConfig = { 
      type: 'memory'
      // deep copy so we do not touch original data ...
      , data: $.extend(true, {}, indata)
    };
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
          equal(dataset.backendConfig.data.rows[0].x, newVal);
        })

        // Test Delete
        doc1.destroy().then(function() {
          equal(dataset.backendConfig.data.rows.length, 5);
          equal(dataset.backendConfig.data.rows[0].x, indata.rows[1].x);
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
    var dataset = new recline.Model.Dataset();
    dataset.backendConfig = {
      type: 'webstore',
      url: 'http://webstore.test.ckan.org/rufuspollock/demo/data'
    };

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
    $.ajax.restore();
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
    var dataset = new recline.Model.Dataset();
    dataset.backendConfig = {
      type: 'dataproxy',
      url: 'http://webstore.thedatahub.org/rufuspollock/gold_prices/data.csv'
    };

    var stub = sinon.stub($, 'ajax', function(options) {
      var partialUrl = 'jsonpdataproxy.appspot.com';
      if (options.url.indexOf(partialUrl) != -1) {
        return {
          then: function(callback) {
            callback(dataProxyData);
          }
        }
      }
    });

    dataset.fetch().then(function(dataset) {
      deepEqual(['__id__', 'date', 'price'], dataset.get('headers'));
      equal(null, dataset.docCount)
      dataset.getDocuments().then(function(docList) {
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
    var dataset = new recline.Model.Dataset();
    dataset.backendConfig = {
      type: 'gdocs',
      url: 'https://spreadsheets.google.com/feeds/list/0Aon3JiuouxLUdDQwZE1JdV94cUd6NWtuZ0IyWTBjLWc/od6/public/values?alt=json'
    };

    console.log('got gdoc dataset', dataset);

    var stub = sinon.stub($, 'getJSON', function(options, cb) {
      console.log('options are', options, cb);
      var partialUrl = 'spreadsheets.google.com';
      if (options.indexOf(partialUrl) != -1) {
        cb(sample_gdocs_spreadsheet_data)

      }
    });

    dataset.fetch().then(function(dataset) {
      console.log('inside dataset:', dataset, dataset.get('headers'), dataset.get('data'));
      deepEqual(['column-2', 'column-1'], dataset.get('headers'));
      //equal(null, dataset.docCount)
      dataset.getDocuments().then(function(docList) {
        equal(3, docList.length);
        console.log(docList.models[0]);
        equal("A", docList.models[0].get('column-1'));
        // needed only if not stubbing
        start();
      });
    });
    $.getJSON.restore();


  });


})(this.jQuery);
