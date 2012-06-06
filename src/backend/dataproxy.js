this.recline = this.recline || {};
this.recline.Backend = this.recline.Backend || {};
this.recline.Backend.DataProxy = this.recline.Backend.DataProxy || {};

(function($, my) {
  // ## DataProxy Backend
  // 
  // For connecting to [DataProxy-s](http://github.com/okfn/dataproxy).
  //
  // When initializing the DataProxy backend you can set the following
  // attributes in the options object:
  //
  // * dataproxy: {url-to-proxy} (optional). Defaults to http://jsonpdataproxy.appspot.com
  //
  // Datasets using using this backend should set the following attributes:
  //
  // * url: (required) url-of-data-to-proxy
  // * format: (optional) csv | xls (defaults to csv if not specified)
  //
  // Note that this is a **read-only** backend.
  my.Backbone = function(options) {
    var self = this;
    this.__type__ = 'dataproxy';
    this.readonly = true;

    this.dataproxy_url = options && options.dataproxy_url ? options.dataproxy_url : 'http://jsonpdataproxy.appspot.com';

    this.sync = function(method, model, options) {
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
    };

    this.query = function(dataset, queryObj) {
      var self = this;
      var data = {
        url: dataset.get('url'),
        'max-results':  queryObj.size,
        type: dataset.get('format')
      };
      var jqxhr = $.ajax({
        url: this.dataproxy_url,
        data: data,
        dataType: 'jsonp'
      });
      var dfd = $.Deferred();
      _wrapInTimeout(jqxhr).done(function(results) {
        if (results.error) {
          dfd.reject(results.error);
        }

        // Rename duplicate fieldIds as each field name needs to be
        // unique.
        var seen = {};
        _.map(results.fields, function(fieldId, index) {
          if (fieldId in seen) {
            seen[fieldId] += 1;
            results.fields[index] = fieldId + "("+seen[fieldId]+")";
          } else {
            seen[fieldId] = 1;
          }
        });

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
        dfd.resolve({
          total: null,
          hits: _.map(_out, function(row) {
            return { _source: row };
          })
        });
      })
      .fail(function(arguments) {
        dfd.reject(arguments);
      });
      return dfd.promise();
    };
  };

  // ## _wrapInTimeout
  // 
  // Convenience method providing a crude way to catch backend errors on JSONP calls.
  // Many of backends use JSONP and so will not get error messages and this is
  // a crude way to catch those errors.
  var _wrapInTimeout = function(ourFunction) {
    var dfd = $.Deferred();
    var timeout = 5000;
    var timer = setTimeout(function() {
      dfd.reject({
        message: 'Request Error: Backend did not respond after ' + (timeout / 1000) + ' seconds'
      });
    }, timeout);
    ourFunction.done(function(arguments) {
        clearTimeout(timer);
        dfd.resolve(arguments);
      })
      .fail(function(arguments) {
        clearTimeout(timer);
        dfd.reject(arguments);
      })
      ;
    return dfd.promise();
  }

}(jQuery, this.recline.Backend.DataProxy));
