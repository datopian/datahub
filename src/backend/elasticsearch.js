this.recline = this.recline || {};
this.recline.Backend = this.recline.Backend || {};

(function($, my) {
  // ## ElasticSearch Backend
  //
  // Connecting to [ElasticSearch](http://www.elasticsearch.org/)
  //
  // To use this backend ensure your Dataset has a elasticsearch_url,
  // webstore_url or url attribute (used in that order)
  my.ElasticSearch = Backbone.Model.extend({
    _getESUrl: function(dataset) {
      var out = dataset.get('elasticsearch_url');
      if (out) return out;
      out = dataset.get('webstore_url');
      if (out) return out;
      out = dataset.get('url');
      return out;
    },
    sync: function(method, model, options) {
      var self = this;
      if (method === "read") {
        if (model.__type__ == 'Dataset') {
          var base = self._getESUrl(model);
          var schemaUrl = base + '/_mapping';
          var jqxhr = $.ajax({
            url: schemaUrl,
            dataType: 'jsonp'
          });
          var dfd = $.Deferred();
          my.wrapInTimeout(jqxhr).done(function(schema) {
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
        }
      } else {
        alert('This backend currently only supports read operations');
      }
    },
    _normalizeQuery: function(queryObj) {
      if (queryObj.toJSON) {
        var out = queryObj.toJSON();
      } else {
        var out = _.extend({}, queryObj);
      }
      if (out.q != undefined && out.q.trim() === '') {
        delete out.q;
      }
      if (!out.q) {
        out.query = {
          match_all: {}
        }
      } else {
        out.query = {
          query_string: {
            query: out.q
          }
        }
        delete out.q;
      }
      return out;
    },
    query: function(model, queryObj) {
      var queryNormalized = this._normalizeQuery(queryObj);
      var data = {source: JSON.stringify(queryNormalized)};
      var base = this._getESUrl(model);
      var jqxhr = $.ajax({
        url: base + '/_search',
        data: data,
        dataType: 'jsonp'
      });
      var dfd = $.Deferred();
      // TODO: fail case
      jqxhr.done(function(results) {
        model.docCount = results.hits.total;
        var docs = _.map(results.hits.hits, function(result) {
          var _out = result._source;
          _out.id = result._id;
          return _out;
        });
        dfd.resolve(docs);
      });
      return dfd.promise();
    }
  });
  recline.Model.backends['elasticsearch'] = new my.ElasticSearch();

}(jQuery, this.recline.Backend));

