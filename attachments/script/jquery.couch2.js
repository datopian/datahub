(function($) {

  window.couch = {};

  var defaults = {
    headers: {"Accept":"application/json"},
    dataType:"json",
    contentType: "application/json",
    type: "GET",
    url: "/"
  };  

  couch.request = function(opts) {
    var ajaxOpts = $.extend({}, defaults, opts);
    return $.ajax(ajaxOpts).promise();
  }

  couch.get = function(url) {
    return couch.request({url:url, type:'GET'});
  };
  
  couch.login = function(credentials) {
    return couch.request({
      url: "/_session",
      type: 'POST',
      data: {name: credentials.username, password: credentials.password}
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