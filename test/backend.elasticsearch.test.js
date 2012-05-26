(function ($) {
module("Backend ElasticSearch - Wrapper");

test("queryNormalize", function() { 
  var backend = new recline.Backend.ElasticSearch.Wrapper();
  var in_ = new recline.Model.Query();
  var out = backend._normalizeQuery(in_);
  equal(out.size, 100);

  var in_ = new recline.Model.Query();
  in_.set({q: ''});
  var out = backend._normalizeQuery(in_);
  equal(out.q, undefined);
  deepEqual(out.query.match_all, {});

  var in_ = new recline.Model.Query().toJSON();
  in_.q = '';
  var out = backend._normalizeQuery(in_);
  equal(out.q, undefined);
  deepEqual(out.query.match_all, {});

  var in_ = new recline.Model.Query().toJSON();
  in_.q = 'abc';
  var out = backend._normalizeQuery(in_);
  equal(out.query.query_string.query, 'abc');

  var in_ = new recline.Model.Query();
  in_.addTermFilter('xyz', 'XXX');
  in_ = in_.toJSON();
  var out = backend._normalizeQuery(in_);
  deepEqual(out.filter.and[0], {term: { xyz: 'XXX'}});
});

var mapping_data = {
  "note": {
    "properties": {
      "_created": {
        "format": "dateOptionalTime", 
        "type": "date"
      }, 
      "_last_modified": {
        "format": "dateOptionalTime", 
        "type": "date"
      }, 
      "end": {
        "type": "string"
      }, 
      "owner": {
        "type": "string"
      }, 
      "start": {
        "type": "string"
      }, 
      "title": {
        "type": "string"
      }
    }
  }
};

var sample_data = {
  "_shards": {
    "failed": 0, 
    "successful": 5, 
    "total": 5
  }, 
  "hits": {
    "hits": [
      {
        "_id": "u3rpLyuFS3yLNXrtxWkMwg", 
        "_index": "hypernotes", 
        "_score": 1.0, 
        "_source": {
          "_created": "2012-02-24T17:53:57.286Z", 
          "_last_modified": "2012-02-24T17:53:57.286Z", 
          "owner": "tester", 
          "title": "Note 1"
        }, 
        "_type": "note"
      }, 
      {
        "_id": "n7JMkFOHSASJCVTXgcpqkA", 
        "_index": "hypernotes", 
        "_score": 1.0, 
        "_source": {
          "_created": "2012-02-24T17:53:57.290Z", 
          "_last_modified": "2012-02-24T17:53:57.290Z", 
          "owner": "tester", 
          "title": "Note 3"
        }, 
        "_type": "note"
      }, 
      {
        "_id": "g7UMA55gTJijvsB3dFitzw", 
        "_index": "hypernotes", 
        "_score": 1.0, 
        "_source": {
          "_created": "2012-02-24T17:53:57.289Z", 
          "_last_modified": "2012-02-24T17:53:57.289Z", 
          "owner": "tester", 
          "title": "Note 2"
        }, 
        "_type": "note"
      }
    ], 
    "max_score": 1.0, 
    "total": 3
  }, 
  "timed_out": false, 
  "took": 2
};

test("query", function() { 
  var backend = new recline.Backend.ElasticSearch.Wrapper('https://localhost:9200/my-es-db/my-es-type');

  var stub = sinon.stub($, 'ajax', function(options) {
    if (options.url.indexOf('_mapping') != -1) {
      return {
        done: function(callback) {
          callback(mapping_data);
          return this;
        },
        fail: function() {
          return this;
        }
      }
    } else {
      return {
        done: function(callback) {
          callback(sample_data);
        },
        fail: function() {
        }
      }
    }
  });

  backend.mapping().done(function(data) {
    var fields = _.keys(data.note.properties);
    deepEqual(['_created', '_last_modified', 'end', 'owner', 'start', 'title'], fields);
  });

  backend.query().done(function(queryResult) {
    equal(3, queryResult.hits.total);
    equal(3, queryResult.hits.hits.length);
    equal('Note 1', queryResult.hits.hits[0]._source['title']);
    start();
  });
  $.ajax.restore();
});

test("write", function() { 
  var url = 'http://localhost:9200/recline-test/es-write';
  var backend = new recline.Backend.ElasticSearch.Wrapper(url);
  stop();

  var id = parseInt(Math.random()*100000000).toString();
  var doc = {
    id: id,
    title: 'my title'
  };
  var jqxhr = backend.upsert(doc);
  jqxhr.done(function(data) {
    ok(data.ok);
    equal(data._id, id);
    equal(data._type, 'es-write');
    equal(data._version, 1);
    
    // update
    doc.title = 'new title';
    var jqxhr = backend.upsert(doc);
    jqxhr.done(function(data) {
      equal(data._version, 2);

      // delete
      var jqxhr = backend.delete(doc.id);
      jqxhr.done(function(data) {
        ok(data.ok);
        doc = null;

        // try to get ...
        var jqxhr = backend.get(id);
        jqxhr.done(function(data) {
          // should not be here
          ok(false, 'Should have got 404');
        }).error(function(error) {
          equal(error.status, 404);
          start();
        });
      });
    });
  }).fail(function(error) {
    console.log(error);
    ok(false, 'Basic request failed - is ElasticSearch running locally on port 9200 (required for this test!)');
    start();
  });
});


// ==================================================

module("Backend ElasticSearch - Backbone");

test("query", function() { 
  var backend = new recline.Backend.ElasticSearch.Backbone();
  var dataset = new recline.Model.Dataset({
      url: 'https://localhost:9200/my-es-db/my-es-type'
    },
    backend
  );

  var stub = sinon.stub($, 'ajax', function(options) {
    if (options.url.indexOf('_mapping') != -1) {
      return {
        done: function(callback) {
          callback(mapping_data);
          return this;
        },
        fail: function() {
          return this;
        }
      }
    } else {
      return {
        done: function(callback) {
          callback(sample_data);
        },
        fail: function() {
        }
      }
    }
  });

  dataset.fetch().done(function(dataset) {
    deepEqual(['_created', '_last_modified', 'end', 'owner', 'start', 'title'], _.pluck(dataset.fields.toJSON(), 'id'));
    dataset.query().then(function(docList) {
      equal(3, dataset.docCount);
      equal(3, docList.length);
      equal('Note 1', docList.models[0].get('title'));
      start();
    });
  });
  $.ajax.restore();
});

test("write", function() { 
  var backend = new recline.Backend.ElasticSearch.Backbone();
  var dataset = new recline.Model.Dataset({
      url: 'http://localhost:9200/recline-test/es-write'
    },
    backend
  );

  stop();

  var id = parseInt(Math.random()*100000000).toString();
  var doc = new recline.Model.Document({
    id: id,
    title: 'my title'
  });
  doc.backend = backend;
  doc.dataset = dataset;
  dataset.currentDocuments.add(doc);
  var jqxhr = doc.save();
  jqxhr.done(function(data) {
    ok(data.ok);
    equal(data._id, id);
    equal(data._type, 'es-write');
    equal(data._version, 1);
    
    // update
    doc.set({title: 'new title'});
    var jqxhr = doc.save();
    jqxhr.done(function(data) {
      equal(data._version, 2);

      // delete
      var jqxhr = doc.destroy();
      jqxhr.done(function(data) {
        ok(data.ok);
        doc = null;

        // try to get ...
        var olddoc = new recline.Model.Document({id: id});
        equal(olddoc.get('title'), null);
        olddoc.dataset = dataset;
        olddoc.backend = backend;
        var jqxhr = olddoc.fetch();
        jqxhr.done(function(data) {
          // should not be here
          ok(false, 'Should have got 404');
        }).error(function(error) {
          equal(error.status, 404);
          equal(typeof olddoc.get('title'), 'undefined');
          start();
        });
      });
    });
  }).fail(function(error) {
    console.log(error);
    ok(false, 'Basic request failed - is ElasticSearch running locally on port 9200 (required for this test!)');
    start();
  });
});

})(this.jQuery);
