this.recline = this.recline || {};
this.recline.Backend = this.recline.Backend || {};

(function($, my) {
  // ## BackendDataProxy
  // 
  // For connecting to [DataProxy-s](http://github.com/okfn/dataproxy).
  //
  // When initializing the DataProxy backend you can set the following attributes:
  //
  // * dataproxy: {url-to-proxy} (optional). Defaults to http://jsonpdataproxy.appspot.com
  //
  // Datasets using using this backend should set the following attributes:
  //
  // * url: (required) url-of-data-to-proxy
  // * format: (optional) csv | xls (defaults to csv if not specified)
  //
  // Note that this is a **read-only** backend.
  my.BackendDataProxy = Backbone.Model.extend({
    defaults: {
      dataproxy_url: 'http://jsonpdataproxy.appspot.com'
    },
    sync: function(method, model, options) {
      var self = this;
      if (method === "read") {
        if (model.__type__ == 'Dataset') {
          var base = self.get('dataproxy_url');
          // TODO: should we cache for extra efficiency
          var data = {
            url: model.get('url')
            , 'max-results':  1
            , type: model.get('format') || 'csv'
          };
          var jqxhr = $.ajax({
            url: base
            , data: data
            , dataType: 'jsonp'
          });
          var dfd = $.Deferred();
          my.wrapInTimeout(jqxhr).done(function(results) {
            model.fields.reset(_.map(results.fields, function(fieldId) {
              return {id: fieldId};
              })
            );
            dfd.resolve(model, jqxhr);
          })
          .fail(function(arguments) {
            dfd.reject(arguments);
          });
          return dfd.promise();
        }
      } else {
        alert('This backend only supports read operations');
      }
    },
    query: function(dataset, queryObj) {
      var base = this.get('dataproxy_url');
      var data = {
        url: dataset.get('url')
        , 'max-results':  queryObj.size
        , type: dataset.get('format')
      };
      var jqxhr = $.ajax({
        url: base
        , data: data
        , dataType: 'jsonp'
      });
      var dfd = $.Deferred();
      jqxhr.done(function(results) {
        var _out = _.map(results.data, function(doc) {
          var tmp = {};
          _.each(results.fields, function(key, idx) {
            tmp[key] = doc[idx];
          });
          return tmp;
        });
        dfd.resolve(_out);
      });
      return dfd.promise();
    }
  });
  recline.Model.backends['dataproxy'] = new my.BackendDataProxy();


}(jQuery, this.recline.Backend));
