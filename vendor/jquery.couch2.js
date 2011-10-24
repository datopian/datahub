(function($) {

  window.couch = {};

  var defaults = {
    headers: {"Accept":"application/json"},
    dataType:"json",
    contentType: "application/json",
    type: "GET",
    url: "/"
  };  

  couch.errors = {
    forbidden: "You aren't allowed to do that."
  }

  couch.responseError = function(response) {
    if(_.isArray(response) && (response.length > 0) ) response = response[0];
    if (response.error) return couch.errors[response.error];
  }

  couch.request = function(opts) {
    var ajaxOpts = $.extend({}, defaults, opts)
      , dfd = $.Deferred()
      ;
      
    $.ajax(ajaxOpts).then(
      function(successResponse) {
        var error = couch.responseError(successResponse);
        if (error) app.emitter.emit(error, 'error');
        dfd.resolve(successResponse);
      }, 
      function(errorResponse) {
        app.emitter.emit("Fatal XHR Error", 'error');
      }
    )
    
    return dfd.promise();
  }

  couch.get = function(url) {
    return couch.request({url:url, type:'GET'});
  };
  
  couch.login = function(credentials) {
    return couch.request({
      url: "/_session",
      type: 'POST',
      data: JSON.stringify({name: credentials.username, password: credentials.password})
    })
  }
  
  couch.logout = function() {
    return couch.request({url: "/_session", type: 'DELETE'});
  }
  
  couch.session = function() {
    return couch.request({url: "/_session"});    
  }

  couch.db = function(name, couchRoot) {
    if(!couchRoot) couchRoot = "";
    return {
      name: name,
      uri: couchRoot + "/" + encodeURIComponent(name) + "/",

      get: function(id) {
        return couch.request({url:this.uri + id, type:"GET"});
      },

      put: function(id, data) {
        return couch.request({url:this.uri + id, type:"PUT", data:data});
      },

      designDocs: function(opts) {
        return couch.request($.extend(defaults, {
          url: this.uri + "_all_docs",
          data: {startkey:'"_design/"', endkey:'"_design0"', include_docs:true}
        }));
      }

    };
  };

})(jQuery);