this.recline = this.recline || {};
this.recline.Backend = this.recline.Backend || {};
this.recline.Backend.ElasticSearch = this.recline.Backend.ElasticSearch || {};

(function($, my) {
  my.__type__ = 'elasticsearch';

  // ## ElasticSearch Wrapper
  //
  // A simple JS wrapper around an [ElasticSearch](http://www.elasticsearch.org/) endpoints.
  //
  // @param {String} endpoint: url for ElasticSearch type/table, e.g. for ES running
  // on http://localhost:9200 with index twitter and type tweet it would be:
  // 
  // <pre>http://localhost:9200/twitter/tweet</pre>
  //
  // @param {Object} options: set of options such as:
  //
  // * headers - {dict of headers to add to each request}
  // * dataType: dataType for AJAx requests e.g. set to jsonp to make jsonp requests (default is json requests)
  my.Wrapper = function(endpoint, options) { 
    var self = this;
    this.endpoint = endpoint;
    this.options = _.extend({
        dataType: 'json'
      },
      options);

    // ### mapping
    //
    // Get ES mapping for this type/table
    //
    // @return promise compatible deferred object.
    this.mapping = function() {
      var schemaUrl = self.endpoint + '/_mapping';
      var jqxhr = makeRequest({
        url: schemaUrl,
        dataType: this.options.dataType
      });
      return jqxhr;
    };

    // ### get
    //
    // Get record corresponding to specified id
    //
    // @return promise compatible deferred object.
    this.get = function(id) {
      var base = this.endpoint + '/' + id;
      return makeRequest({
        url: base,
        dataType: 'json'
      });
    };

    // ### upsert
    //
    // create / update a record to ElasticSearch backend
    //
    // @param {Object} doc an object to insert to the index.
    // @return deferred supporting promise API
    this.upsert = function(doc) {
      var data = JSON.stringify(doc);
      url = this.endpoint;
      if (doc.id) {
        url += '/' + doc.id;
      }
      return makeRequest({
        url: url,
        type: 'POST',
        data: data,
        dataType: 'json'
      });
    };

    // ### delete
    //
    // Delete a record from the ElasticSearch backend.
    //
    // @param {Object} id id of object to delete
    // @return deferred supporting promise API
    this.delete = function(id) {
      url = this.endpoint;
      url += '/' + id;
      return makeRequest({
        url: url,
        type: 'DELETE',
        dataType: 'json'
      });
    };

    this._normalizeQuery = function(queryObj) {
      var self = this;
      var queryInfo = (queryObj && queryObj.toJSON) ? queryObj.toJSON() : _.extend({}, queryObj);
      var out = {
        constant_score: {
          query: {}
        }
      };
      if (!queryInfo.q) {
        out.constant_score.query = {
          match_all: {}
        };
      } else {
        out.constant_score.query = {
          query_string: {
            query: queryInfo.q
          }
        };
      }
      if (queryInfo.filters && queryInfo.filters.length) {
        out.constant_score.filter = {
          and: []
        };
        _.each(queryInfo.filters, function(filter) {
          out.constant_score.filter.and.push(self._convertFilter(filter));
        });
      }
      return out;
    },

    this._convertFilter = function(filter) {
      var out = {};
      out[filter.type] = {}
      if (filter.type === 'term') {
        out.term[filter.field] = filter.term.toLowerCase();
      } else if (filter.type === 'geo_distance') {
        out.geo_distance[filter.field] = filter.point;
        out.geo_distance.distance = filter.distance;
        out.geo_distance.unit = filter.unit;
      }
      return out;
    },

    // ### query
    //
    // @return deferred supporting promise API
    this.query = function(queryObj) {
      var esQuery = (queryObj && queryObj.toJSON) ? queryObj.toJSON() : _.extend({}, queryObj);
      var queryNormalized = this._normalizeQuery(queryObj);
      delete esQuery.q;
      delete esQuery.filters;
      esQuery.query = queryNormalized;
      var data = {source: JSON.stringify(esQuery)};
      var url = this.endpoint + '/_search';
      var jqxhr = makeRequest({
        url: url,
        data: data,
        dataType: this.options.dataType
      });
      return jqxhr;
    }
  };


  // ## Recline Connectors 
  //
  // Requires URL of ElasticSearch endpoint to be specified on the dataset
  // via the url attribute.

  // ES options which are passed through to `options` on Wrapper (see Wrapper for details)
  my.esOptions = {};

  // ### fetch
  my.fetch = function(dataset) {
    var es = new my.Wrapper(dataset.url, my.esOptions);
    var dfd = $.Deferred();
    es.mapping().done(function(schema) {

      if (!schema){
        dfd.reject({'message':'Elastic Search did not return a mapping'});
        return;
      }

      // only one top level key in ES = the type so we can ignore it
      var key = _.keys(schema)[0];
      var fieldData = _.map(schema[key].properties, function(dict, fieldName) {
        dict.id = fieldName;
        return dict;
      });
      dfd.resolve({
        fields: fieldData
      });
    })
    .fail(function(arguments) {
      dfd.reject(arguments);
    });
    return dfd.promise();
  };

  // ### save
  my.save = function(changes, dataset) {
    var es = new my.Wrapper(dataset.url, my.esOptions);
    if (changes.creates.length + changes.updates.length + changes.deletes.length > 1) {
      var dfd = $.Deferred();
      msg = 'Saving more than one item at a time not yet supported';
      alert(msg);
      dfd.reject(msg);
      return dfd.promise();
    }
    if (changes.creates.length > 0) {
      return es.upsert(changes.creates[0]);
    }
    else if (changes.updates.length >0) {
      return es.upsert(changes.updates[0]);
    } else if (changes.deletes.length > 0) {
      return es.delete(changes.deletes[0].id);
    }
  };

  // ### query
  my.query = function(queryObj, dataset) {
    var dfd = $.Deferred();
    var es = new my.Wrapper(dataset.url, my.esOptions);
    var jqxhr = es.query(queryObj);
    jqxhr.done(function(results) {
      var out = {
        total: results.hits.total,
      };
      out.hits = _.map(results.hits.hits, function(hit) {
        if (!('id' in hit._source) && hit._id) {
          hit._source.id = hit._id;
        }
        return hit._source;
      });
      if (results.facets) {
        out.facets = results.facets;
      }
      dfd.resolve(out);
    }).fail(function(errorObj) {
      var out = {
        title: 'Failed: ' + errorObj.status + ' code',
        message: errorObj.responseText
      };
      dfd.reject(out);
    });
    return dfd.promise();
  };


// ### makeRequest
// 
// Just $.ajax but in any headers in the 'headers' attribute of this
// Backend instance. Example:
//
// <pre>
// var jqxhr = this._makeRequest({
//   url: the-url
// });
// </pre>
var makeRequest = function(data, headers) {
  var extras = {};
  if (headers) {
    extras = {
      beforeSend: function(req) {
        _.each(headers, function(value, key) {
          req.setRequestHeader(key, value);
        });
      }
    };
  }
  var data = _.extend(extras, data);
  return $.ajax(data);
};

}(jQuery, this.recline.Backend.ElasticSearch));

