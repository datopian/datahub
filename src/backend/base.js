// # Recline Backends
//
// Backends are connectors to backend data sources and stores
//
// This is just the base module containing a template Base class and convenience methods.
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
  //
  // Note also that while this (and other Backends) are implemented as Backbone models this is just a convenience.
  my.Base = Backbone.Model.extend({

    // ### sync
    //
    // An implementation of Backbone.sync that will be used to override
    // Backbone.sync on operations for Datasets and Documents which are using this backend.
    //
    // For read-only implementations you will need only to implement read method
    // for Dataset models (and even this can be a null operation). The read method
    // should return relevant metadata for the Dataset. We do not require read support
    // for Documents because they are loaded in bulk by the query method.
    //
    // For backends supporting write operations you must implement update and delete support for Document objects.
    //
    // All code paths should return an object conforming to the jquery promise API.
    sync: function(method, model, options) {
    },
    
    // ### query
    //
    // Query the backend for documents returning them in bulk. This method will be used by the Dataset.query method to search the backend for documents, retrieving the results in bulk. This method should also set the docCount attribute on the dataset.
    //
    // <code>queryObj</code> should be either a recline.Model.Query
    // object or a Hash. The structure of data in the Query object or
    // Hash should follow that defined in <a
    // href="http://github.com/okfn/recline/issues/34">issue 34</a>.
    // (Of course, if you are writing your own backend, and hence
    // have control over the interpretation of the query object, you
    // can use whatever structure you like).
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

