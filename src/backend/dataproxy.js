this.recline = this.recline || {};
this.recline.Backend = this.recline.Backend || {};
this.recline.Backend.DataProxy = this.recline.Backend.DataProxy || {};

(function($, my) {
  my.__type__ = 'dataproxy';
  // URL for the dataproxy
  my.dataproxy_url = 'http://jsonpdataproxy.appspot.com';

  // ## load
  //
  // Load data from a URL via the [DataProxy](http://github.com/okfn/dataproxy).
  my.fetch = function(dataset) {
    var data = {
      url: dataset.get('url'),
      'max-results':  dataset.get('size') || dataset.get('rows') || 1000,
      type: dataset.get('format') || ''
    };
    var jqxhr = $.ajax({
      url: my.dataproxy_url,
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
      var fields = _.map(results.fields, function(field, index) {
        var fieldId = field;
        while (fieldId in seen) {
          seen[field] += 1;
          fieldId = field + seen[field];
        }
        if (!(field in seen)) {
          seen[field] = 0;
        }
        return { id: fieldId, label: field }
      });

      // data is provided as arrays so need to zip together with fields
      var records = _.map(results.data, function(doc) {
        var tmp = {};
        _.each(results.fields, function(key, idx) {
          tmp[key] = doc[idx];
        });
        return tmp;
      });
      var store = new recline.Backend.Memory.Store(records, fields);
      dataset._dataCache = store;
      dataset.fields.reset(fields);
      dataset.query();
      dfd.resolve(dataset);
    })
    .fail(function(arguments) {
      dfd.reject(arguments);
    });
    return dfd.promise();
  };

  my.query = function(dataset, queryObj) {
    var dfd = $.Deferred();
    var results = dataset._dataCache.query(queryObj);
    var hits = _.map(results.records, function(row) {
      return { _source: row };
    });
    var out = {
      total: results.total,
      hits: hits,
      facets: results.facets
    };
    dfd.resolve(out);
    return dfd.promise();
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
