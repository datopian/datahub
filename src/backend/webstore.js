this.recline = this.recline || {};
this.recline.Backend = this.recline.Backend || {};

(function($, my) {
  // ## BackendWebstore
  //
  // Connecting to [Webstores](http://github.com/okfn/webstore)
  //
  // To use this backend ensure your Dataset has a webstore_url in its attributes.
  my.BackendWebstore = Backbone.Model.extend({
    sync: function(method, model, options) {
      if (method === "read") {
        if (model.__type__ == 'Dataset') {
          var base = model.get('webstore_url');
          var schemaUrl = base + '/schema.json';
          var jqxhr = $.ajax({
            url: schemaUrl,
              dataType: 'jsonp',
              jsonp: '_callback'
          });
          var dfd = $.Deferred();
          my.wrapInTimeout(jqxhr).done(function(schema) {
            var fieldData = _.map(schema.data, function(item) {
              item.id = item.name;
              delete item.name;
              return item;
            });
            model.fields.reset(fieldData);
            model.docCount = schema.count;
            dfd.resolve(model, jqxhr);
          })
          .fail(function(arguments) {
            dfd.reject(arguments);
          });
          return dfd.promise();
        }
      }
    },
    query: function(model, queryObj) {
      var base = model.get('webstore_url');
      var data = {
        _limit:  queryObj.size
        , _offset: queryObj.offset
      };
      var jqxhr = $.ajax({
        url: base + '.json',
        data: data,
        dataType: 'jsonp',
        jsonp: '_callback',
        cache: true
      });
      var dfd = $.Deferred();
      jqxhr.done(function(results) {
        dfd.resolve(results.data);
      });
      return dfd.promise();
    }
  });
  recline.Model.backends['webstore'] = new my.BackendWebstore();

}(jQuery, this.recline.Backend));
