this.recline = this.recline || {};
this.recline.Backend = this.recline.Backend || {};

(function($, my) {
  // ## ElasticSearch Backend
  //
  // Connecting to [ElasticSearch](http://www.elasticsearch.org/).
  //
  // Usage:
  //
  // <pre>
  // var backend = new recline.Backend.ElasticSearch({
  //   // optional as can also be provided by Dataset/Document
  //   url: {url to ElasticSearch endpoint i.e. ES 'type/table' url - more info below}
  //   // optional
  //   headers: {dict of headers to add to each request}
  // });
  //
  // @param {String} url: url for ElasticSearch type/table, e.g. for ES running
  // on localhost:9200 with index // twitter and type tweet it would be:
  // 
  // <pre>http://localhost:9200/twitter/tweet</pre>
  //
  // This url is optional since the ES endpoint url may be specified on the the
  // dataset (and on a Document by the document having a dataset attribute) by
  // having one of the following (see also `_getESUrl` function):
  //
  // <pre>
  // elasticsearch_url
  // webstore_url
  // url
  // </pre>
  my.ElasticSearch = my.Base.extend({
    __type__: 'elasticsearch',
    readonly: false,
    sync: function(method, model, options) {
      var self = this;
      if (method === "read") {
        if (model.__type__ == 'Dataset') {
          var schemaUrl = self._getESUrl(model) + '/_mapping';
          var jqxhr = this._makeRequest({
            url: schemaUrl,
            dataType: 'jsonp'
          });
          var dfd = $.Deferred();
          this._wrapInTimeout(jqxhr).done(function(schema) {
            // only one top level key in ES = the type so we can ignore it
            var key = _.keys(schema)[0];
            var fieldData = _.map(schema[key].properties, function(dict, fieldName) {
              dict.id = fieldName;
              return dict;
            });
            model.fields.reset(fieldData);
            dfd.resolve(model, jqxhr);
          })
          .fail(function(arguments) {
            dfd.reject(arguments);
          });
          return dfd.promise();
        } else if (model.__type__ == 'Document') {
          var base = this._getESUrl(model.dataset) + '/' + model.id;
          return this._makeRequest({
            url: base,
            dataType: 'json'
          });
        }
      } else if (method === 'update') {
        if (model.__type__ == 'Document') {
          return this.upsert(model.toJSON(), this._getESUrl(model.dataset));
        }
      } else if (method === 'delete') {
        if (model.__type__ == 'Document') {
          var url = this._getESUrl(model.dataset);
          return this.delete(model.id, url);
        }
      }
    },

    // ### upsert
    //
    // create / update a document to ElasticSearch backend
    //
    // @param {Object} doc an object to insert to the index.
    // @param {string} url (optional) url for ElasticSearch endpoint (if not
    // defined called this._getESUrl()
    upsert: function(doc, url) {
      var data = JSON.stringify(doc);
      url = url ? url : this._getESUrl();
      if (doc.id) {
        url += '/' + doc.id;
      }
      return this._makeRequest({
        url: url,
        type: 'POST',
        data: data,
        dataType: 'json'
      });
    },

    // ### delete
    //
    // Delete a document from the ElasticSearch backend.
    //
    // @param {Object} id id of object to delete
    // @param {string} url (optional) url for ElasticSearch endpoint (if not
    // provided called this._getESUrl()
    delete: function(id, url) {
      url = url ? url : this._getESUrl();
      url += '/' + id;
      return this._makeRequest({
        url: url,
        type: 'DELETE',
        dataType: 'json'
      });
    },

    // ### _getESUrl
    //
    // get url to ElasticSearch endpoint (see above)
    _getESUrl: function(dataset) {
      if (dataset) {
        var out = dataset.get('elasticsearch_url');
        if (out) return out;
        out = dataset.get('webstore_url');
        if (out) return out;
        out = dataset.get('url');
        return out;
      }
      return this.get('url');
    },
    _normalizeQuery: function(queryObj) {
      var out = queryObj.toJSON ? queryObj.toJSON() : _.extend({}, queryObj);
      if (out.q !== undefined && out.q.trim() === '') {
        delete out.q;
      }
      if (!out.q) {
        out.query = {
          match_all: {}
        };
      } else {
        out.query = {
          query_string: {
            query: out.q
          }
        };
        delete out.q;
      }
      // now do filters (note the *plural*)
      if (out.filters && out.filters.length) {
        if (!out.filter) {
          out.filter = {};
        }
        if (!out.filter.and) {
          out.filter.and = [];
        }
        out.filter.and = out.filter.and.concat(out.filters);
      }
      if (out.filters !== undefined) {
        delete out.filters;
      }
      return out;
    },
    query: function(model, queryObj) {
      var queryNormalized = this._normalizeQuery(queryObj);
      var data = {source: JSON.stringify(queryNormalized)};
      var base = this._getESUrl(model);
      var jqxhr = this._makeRequest({
        url: base + '/_search',
        data: data,
        dataType: 'jsonp'
      });
      var dfd = $.Deferred();
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
      });
      return dfd.promise();
    }
  });

}(jQuery, this.recline.Backend));

