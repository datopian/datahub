// replaces `Backbone.sync` with a OKFN webstore based tabular data source

var WebStore = function(url) {
  this.url = url;
  this.headers = [];
  this.totalRows = 0;
  this.getTabularData = function() {
    var dfd = $.Deferred();
    var tabularData = {
        headers: ['x', 'y', 'z']
      , rows: [
          {x: 1, y: 2, z: 3}
        , {x: 2, y: 4, z: 6}
        , {x: 3, y: 6, z: 9}
        , {x: 4, y: 8, z: 12}
        , {x: 5, y: 10, z: 15}
        , {x: 6, y: 12, z: 18}
      ]
      , getLength: function() { return this.rows.length; }
      , getRows: function(numRows, start) {
        if (start === undefined) {
          start = 0;
        }
        var dfd = $.Deferred();
        var results = this.rows.slice(start, start + numRows);
        dfd.resolve(results);
        return dfd.promise();
      }
    }
    dfd.resolve(tabularData);
    return dfd.promise();
  }
};


// Override `Backbone.sync` to delegate to the model or collection's
// webStore property, which should be an instance of `WebStore`.
Backbone.sync = function(method, model, options) {
  var resp;
  var store = model.webStore || model.collection.webStore;

  if (method === "read") {
    store.getTabularData().then(function(tabularData) {
      tabularData.getRows(10).then(options.success, options.error)
    }) 
  }

};