this.recline = this.recline || {};
this.recline.Backend = this.recline.Backend || {};
this.recline.Backend.ElasticSearch = this.recline.Backend.ElasticSearch || {};

(function($, my) {
  // ## ElasticSearch Wrapper
  //
  // Connecting to [ElasticSearch](http://www.elasticsearch.org/) endpoints.
  // @param {String} endpoint: url for ElasticSearch type/table, e.g. for ES running
  // on localhost:9200 with index // twitter and type tweet it would be:
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
      var jqxhr = recline.Backend.makeRequest({
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
      return recline.Backend.makeRequest({
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
      return recline.Backend.makeRequest({
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
      return recline.Backend.makeRequest({
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
        out.term[filter.field] = filter.term;
      } else if (filter.type === 'geo_distance') {
        out.geo_distance[filter.field] = filter.point;
        out.geo_distance.distance = filter.distance;
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
      var jqxhr = recline.Backend.makeRequest({
        url: url,
        data: data,
        dataType: this.options.dataType
      });
      return jqxhr;
    }
  };

  // ## ElasticSearch Backbone Backend
  //
  // Backbone connector for an ES backend.
  //
  // Usage:
  //
  // var backend = new recline.Backend.ElasticSearch(options);
  //
  // `options` are passed through to Wrapper
  my.Backbone = function(options) {
    var self = this;
    var esOptions = options;
    this.__type__ = 'elasticsearch';

    // ### sync
    //
    // Backbone sync implementation for this backend.
    //
    // URL of ElasticSearch endpoint to use must be specified on the dataset
    // (and on a Record via its dataset attribute) by the dataset having a
    // url attribute.
    this.sync = function(method, model, options) {
      if (model.__type__ == 'Dataset') {
        var endpoint = model.get('url');
      } else {
        var endpoint = model.dataset.get('url');
      }
      var es = new my.Wrapper(endpoint, esOptions);
      if (method === "read") {
        if (model.__type__ == 'Dataset') {
          var dfd = $.Deferred();
          es.mapping().done(function(schema) {
            // only one top level key in ES = the type so we can ignore it
            var key = _.keys(schema)[0];
            var fieldData = _.map(schema[key].properties, function(dict, fieldName) {
              dict.id = fieldName;
              return dict;
            });
            model.fields.reset(fieldData);
            dfd.resolve(model);
          })
          .fail(function(arguments) {
            dfd.reject(arguments);
          });
          return dfd.promise();
        } else if (model.__type__ == 'Record') {
          return es.get(model.dataset.id);
        }
      } else if (method === 'update') {
        if (model.__type__ == 'Record') {
          return es.upsert(model.toJSON());
        }
      } else if (method === 'delete') {
        if (model.__type__ == 'Record') {
          return es.delete(model.id);
        }
      }
    };

    // ### query
    //
    // query the ES backend
    this.query = function(model, queryObj) {
      var dfd = $.Deferred();
      var url = model.get('url');
      var es = new my.Wrapper(url, esOptions);
      var jqxhr = es.query(queryObj);
      // TODO: fail case
      jqxhr.done(function(results) {
        _.each(results.hits.hits, function(hit) {
          if (!('id' in hit._source) && hit._id) {
            hit._source.id = hit._id;
          }
        });
        if (results.facets) {
          results.hits.facets = results.facets;
        }
        dfd.resolve(results.hits);
      }).fail(function(errorObj) {
        var out = {
          title: 'Failed: ' + errorObj.status + ' code',
          message: errorObj.responseText
        };
        dfd.reject(out);
      });
      return dfd.promise();
    };
  };

}(jQuery, this.recline.Backend.ElasticSearch));

