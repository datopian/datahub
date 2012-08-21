this.recline = this.recline || {};
this.recline.Backend = this.recline.Backend || {};
this.recline.Backend.Ckan = this.recline.Backend.Ckan || {};

(function($, my) {
  // ## CKAN Backend
  //
  // This provides connection to the CKAN DataStore (v2)
  //
  // General notes
  // 
  // * Every dataset must have an id equal to its resource id on the CKAN instance
  // * You should set the CKAN API endpoint for requests by setting API_ENDPOINT value on this module (recline.Backend.Ckan.API_ENDPOINT)

  my.__type__ = 'ckan';

  // Default CKAN API endpoint used for requests (you can change this but it will affect every request!)
  my.API_ENDPOINT = 'http://datahub.io/api';

  // ### fetch
  my.fetch = function(dataset) {
    var wrapper = my.DataStore();
    var dfd = $.Deferred();
    var jqxhr = wrapper.search({resource_id: dataset.id, limit: 0});
    jqxhr.done(function(results) {
      // map ckan types to our usual types ...
      var fields = _.map(results.result.fields, function(field) {
        field.type = field.type in CKAN_TYPES_MAP ? CKAN_TYPES_MAP[field.type] : field.type;
        return field;
      });
      var out = {
        fields: fields,
        useMemoryStore: false
      };
      dfd.resolve(out);  
    });
    return dfd.promise();
  };

  my.query = function(queryObj, dataset) {
    var wrapper = my.DataStore();
    var actualQuery = {
      resource_id: dataset.id,
      q: queryObj.q,
      limit: queryObj.size,
      offset: queryObj.from
    };
    var dfd = $.Deferred();
    var jqxhr = wrapper.search(actualQuery);
    jqxhr.done(function(results) {
      var out = {
        total: results.result.total,
        hits: results.result.records,
      };
      dfd.resolve(out);  
    });
    return dfd.promise();
  };

  // ### DataStore
  //
  // Simple wrapper around the CKAN DataStore API
  //
  // @param endpoint: CKAN api endpoint (e.g. http://datahub.io/api)
  my.DataStore = function(endpoint) { 
    var that = {
      endpoint: endpoint || my.API_ENDPOINT
    };
    that.search = function(data) {
      var searchUrl = that.endpoint + '/3/action/datastore_search';
      var jqxhr = $.ajax({
        url: searchUrl,
        data: data,
        dataType: 'json'
      });
      return jqxhr;
    }

    return that;
  }

  var CKAN_TYPES_MAP = {
    'int4': 'integer',
    'float8': 'float',
    'text': 'string'
  };

}(jQuery, this.recline.Backend.Ckan));
