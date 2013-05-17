this.recline = this.recline || {};
this.recline.Backend = this.recline.Backend || {};
this.recline.Backend.DataProxy = this.recline.Backend.DataProxy || {};

(function(my) {
  "use strict";
  my.__type__ = 'dataproxy';
  // URL for the dataproxy
  my.dataproxy_url = '//jsonpdataproxy.appspot.com';
  // Timeout for dataproxy (after this time if no response we error)
  // Needed because use JSONP so do not receive e.g. 500 errors 
  my.timeout = 5000;

  
  // use either jQuery or Underscore Deferred depending on what is available
  var Deferred = (typeof jQuery !== "undefined" && jQuery.Deferred) || _.Deferred;

  // ## load
  //
  // Load data from a URL via the [DataProxy](http://github.com/okfn/dataproxy).
  //
  // Returns array of field names and array of arrays for records
  my.fetch = function(dataset) {
    var data = {
      url: dataset.url,
      'max-results':  dataset.size || dataset.rows || 1000,
      type: dataset.format || ''
    };
    var jqxhr = jQuery.ajax({
      url: my.dataproxy_url,
      data: data,
      dataType: 'jsonp'
    });
    var dfd = new Deferred();
    _wrapInTimeout(jqxhr).done(function(results) {
      if (results.error) {
        dfd.reject(results.error);
      }

      dfd.resolve({
        records: results.data,
        fields: results.fields,
        useMemoryStore: true
      });
    })
    .fail(function(args) {
      dfd.reject(args);
    });
    return dfd.promise();
  };

  // ## _wrapInTimeout
  // 
  // Convenience method providing a crude way to catch backend errors on JSONP calls.
  // Many of backends use JSONP and so will not get error messages and this is
  // a crude way to catch those errors.
  var _wrapInTimeout = function(ourFunction) {
    var dfd = new Deferred();
    var timer = setTimeout(function() {
      dfd.reject({
        message: 'Request Error: Backend did not respond after ' + (my.timeout / 1000) + ' seconds'
      });
    }, my.timeout);
    ourFunction.done(function(args) {
        clearTimeout(timer);
        dfd.resolve(args);
      })
      .fail(function(args) {
        clearTimeout(timer);
        dfd.reject(args);
      })
      ;
    return dfd.promise();
  };

}(this.recline.Backend.DataProxy));
