this.recline = this.recline || {};
this.recline.Backend = this.recline.Backend || {};

(function($, my) {
  // ## DataProxy Backend
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
  my.DataProxy = my.Base.extend({
    defaults: {
      dataproxy_url: 'http://jsonpdataproxy.appspot.com'
    },
    sync: function(method, model, options) {
      var self = this;
      if (method === "read") {
        if (model.__type__ == 'Dataset') {
          // Do nothing as we will get fields in query step (and no metadata to
          // retrieve)
          var dfd = $.Deferred();
          dfd.resolve(model);
          return dfd.promise();
        }
      } else {
        alert('This backend only supports read operations');
      }
    },
    query: function(dataset, queryObj) {
      var self = this;
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
      this._wrapInTimeout(jqxhr).done(function(results) {
        if (results.error) {
          dfd.reject(results.error);
        }
        dataset.fields.reset(_.map(results.fields, function(fieldId) {
          return {id: fieldId};
          })
        );
        var _out = _.map(results.data, function(doc) {
          var tmp = {};
          _.each(results.fields, function(key, idx) {
            tmp[key] = doc[idx];
          });
          return tmp;
        });
        dfd.resolve(self._docsToQueryResult(_out));
      })
      .fail(function(arguments) {
        dfd.reject(arguments);
      });
      return dfd.promise();
    }
  });
  recline.Model.backends['dataproxy'] = new my.DataProxy();


}(jQuery, this.recline.Backend));
