// # Recline Backends
//
// Backends are connectors to backend data sources and stores
//
// This is just the base module containing various convenience methods.
this.recline = this.recline || {};
this.recline.Backend = this.recline.Backend || {};

(function($, my) {
  // ## Backbone.sync
  //
  // Override Backbone.sync to hand off to sync function in relevant backend
  Backbone.sync = function(method, model, options) {
    return model.backend.sync(method, model, options);
  }

  // ## recline.Backend.Base
  //
  // Base class for backends providing a template and convenience functions.
  // You do not have to inherit from this class but even when not it does provide guidance on the functions you must implement.
  my.Base = Backbone.Model.extend({
    sync: function(method, model, options) {
    },
    query: function(model, queryObj) {
    },

    // ## _wrapInTimeout
    // 
    // Convenience method providing a crude way to catch backend errors on JSONP calls.
    // Many of backends use JSONP and so will not get error messages and this is
    // a crude way to catch those errors.
    _wrapInTimeout: function(ourFunction) {
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
  });

}(jQuery, this.recline.Backend));

