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
  };

  // ## recline.Backend.Base
  //
  // Base class for backends providing a template and convenience functions.
  // You do not have to inherit from this class but even when not it does
  // provide guidance on the functions you must implement.
  //
  // Note also that while this (and other Backends) are implemented as Backbone models this is just a convenience.
  my.Base = Backbone.Model.extend({
    // ### __type__
    //
    // 'type' of this backend. This should be either the class path for this
    // object as a string (e.g. recline.Backend.Memory) or for Backends within
    // recline.Backend module it may be their class name.
    //
    // This value is used as an identifier for this backend when initializing
    // backends (see recline.Model.Dataset.initialize).
    __type__: 'base',


    // ### readonly
    //
    // Class level attribute indicating that this backend is read-only (that
    // is, cannot be written to).
    readonly: true,

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
    // Query the backend for documents returning them in bulk. This method will
    // be used by the Dataset.query method to search the backend for documents,
    // retrieving the results in bulk.
    //
    // @param {recline.model.Dataset} model: Dataset model.
    //
    // @param {Object} queryObj: object describing a query (usually produced by
    // using recline.Model.Query and calling toJSON on it).
    //
    // The structure of data in the Query object or
    // Hash should follow that defined in <a
    // href="http://github.com/okfn/recline/issues/34">issue 34</a>.
    // (Of course, if you are writing your own backend, and hence
    // have control over the interpretation of the query object, you
    // can use whatever structure you like).
    //
    // @returns {Promise} promise API object. The promise resolve method will
    // be called on query completion with a QueryResult object.
    // 
    // A QueryResult has the following structure (modelled closely on
    // ElasticSearch - see <a
    // href="https://github.com/okfn/recline/issues/57">this issue for more
    // details</a>):
    //
    // <pre>
    // {
    //   total: // (required) total number of results (can be null)
    //   hits: [ // (required) one entry for each result document
    //     {
    //        _score:   // (optional) match score for document
    //        _type: // (optional) document type
    //        _source: // (required) document/row object
    //     } 
    //   ],
    //   facets: { // (optional) 
    //     // facet results (as per <http://www.elasticsearch.org/guide/reference/api/search/facets/>)
    //   }
    // }
    // </pre>
    query: function(model, queryObj) {
    },

    // ### _makeRequest
    // 
    // Just $.ajax but in any headers in the 'headers' attribute of this
    // Backend instance. Example:
    //
    // <pre>
    // var jqxhr = this._makeRequest({
    //   url: the-url
    // });
    // </pre>
    _makeRequest: function(data) {
      var headers = this.get('headers');
      var extras = {};
      if (headers) {
        extras = {
          beforeSend: function(req) {
            _.each(headers, function(value, key) {
              req.setRequestHeader(key, value);
            });
          }
        };
      }
      var data = _.extend(extras, data);
      return $.ajax(data);
    },

    // convenience method to convert simple set of documents / rows to a QueryResult
    _docsToQueryResult: function(rows) {
      var hits = _.map(rows, function(row) {
        return { _source: row };
      });
      return {
        total: null,
        hits: hits
      };
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

