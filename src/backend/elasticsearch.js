this.recline = this.recline || {};
this.recline.Backend = this.recline.Backend || {};

(function($, my) {
  // ## ElasticSearch Backend
  //
  // Connecting to [ElasticSearch](http://www.elasticsearch.org/).
  //
  // To use this backend ensure your Dataset has one of the following
  // attributes (first one found is used):
  //
  // <pre>
  // elasticsearch_url
  // webstore_url
  // url
  // </pre>
  //
  // This should point to the ES type url. E.G. for ES running on
  // localhost:9200 with index twitter and type tweet it would be
  //
  // <pre>http://localhost:9200/twitter/tweet</pre>
  my.ElasticSearch = my.Base.extend({
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
        _.each(results.hits.hits, function(hit) {
          if (!'id' in hit._source && hit._id) {
            hit._source.id = hit._id;
          }
        })
        dfd.resolve(results.hits);
      });
      return dfd.promise();
    }
  });
  recline.Model.backends['elasticsearch'] = new my.ElasticSearch();

}(jQuery, this.recline.Backend));

