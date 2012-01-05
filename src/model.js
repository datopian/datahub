this.recline = this.recline || {};

// Models module following classic module pattern
recline.Model = function($) {

var my = {};

// A Dataset model.
my.Dataset = Backbone.Model.extend({
  __type__: 'Dataset',
  initialize: function() {
    this.currentDocuments = new my.DocumentList();
  },

  getLength: function() { 
    return this.rowCount;
  },

  // Get rows (documents) from the backend returning a recline.DocumentList
  //
  // TODO: ? rename to getDocuments?
  //
  // this does not fit very well with Backbone setup. Backbone really expects you to know the ids of objects your are fetching (which you do in classic RESTful ajax-y world). But this paradigm does not fill well with data set up we have here.
  // This also illustrates the limitations of separating the Dataset and the Backend
  getRows: function(numRows, start) {
    var self = this;
    var dfd = $.Deferred();
    this.backend.getRows(this.id, numRows, start).then(function(rows) {
      var docs = _.map(rows, function(row) {
        return new my.Document(row);
      });
      self.currentDocuments.reset(docs);
      dfd.resolve(self.currentDocuments);
    });
    return dfd.promise();
  }
});

my.Document = Backbone.Model.extend({});

my.DocumentList = Backbone.Collection.extend({
  // webStore: new WebStore(this.url),
  model: my.Document
})

// Backends section
// ================

my.setBackend = function(backend) {
  Backbone.sync = backend.sync;
};

// Backend which just caches in memory
// 
// Does not need to be a backbone model but provides some conveience
my.BackendMemory = Backbone.Model.extend({
  // Initialize a Backend with a local in-memory dataset.
  // 
  // NB: We can handle one and only one dataset at a time.
  //
  // :param dataset: the data for a dataset on which operations will be
  // performed. In the form of a hash with metadata and data attributes.
  // - metadata: hash of key/value attributes of any kind (but usually with title attribute)
  // - data: hash with 2 keys:
  //  - headers: list of header names/labels
  //  - rows: list of hashes, each hash being one row. A row *must* have an id attribute which is unique.
  //
  //  Example of data:
  // 
  //    {
  //        headers: ['x', 'y', 'z']
  //      , rows: [
  //          {id: 0, x: 1, y: 2, z: 3}
  //        , {id: 1, x: 2, y: 4, z: 6}
  //      ]
  //    };
  initialize: function(dataset) {
    // deep copy
    this._datasetAsData = _.extend({}, dataset);
  }, 
  getDataset: function() {
    var dataset = new my.Dataset({
      id: this._datasetAsData.metadata.id
    });
    // this is a bit weird but problem is in sync this is set to parent model object so need to give dataset a reference to backend explicitly
    dataset.backend = this;
    return dataset;
  },
  sync: function(method, model, options) {
    if (method === "read") {
      var dfd = $.Deferred();
      // this switching on object type is rather horrible
      // think may make more sense to do work in individual objects rather than in central Backbone.sync
      if (this.__type__ == 'Dataset') {
        var dataset = this;
        var rawDataset = this.backend._datasetAsData;
        dataset.set(rawDataset.metadata);
        dataset.set({
          headers: rawDataset.data.headers
          });
        dataset.rowCount = rawDataset.data.rows.length;
        dfd.resolve(dataset);
      }
      return dfd.promise();
    }
  },
  getRows: function(datasetId, numRows, start) {
    if (start === undefined) {
      start = 0;
    }
    if (numRows === undefined) {
      numRows = 10;
    }
    var dfd = $.Deferred();
    rows = this._datasetAsData.data.rows;
    var results = rows.slice(start, start+numRows);
    dfd.resolve(results);
    return dfd.promise();
 }
});

// Webstore Backend for connecting to the Webstore
//
// Designed to only attach to one dataset and one dataset only ...
// Could generalize to support attaching to different datasets
my.BackendWebstore = Backbone.Model.extend({
  // require url attribute in initialization data
  initialize: function() {
    this.webstoreTableUrl = this.get('url');
  }, 
  getDataset: function(id) {
    var dataset = new my.Dataset({
      id: id
    });
    dataset.backend = this;
    return dataset;
  },
  sync: function(method, model, options) {
    if (method === "read") {
      // this switching on object type is rather horrible
      // think may make more sense to do work in individual objects rather than in central Backbone.sync
      if (this.__type__ == 'Dataset') {
        var dataset = this;
        // get the schema and return
        var base = this.backend.get('url');
        var schemaUrl = base + '/schema.json';
        var jqxhr = $.ajax({
          url: schemaUrl,
          dataType: 'jsonp',
          jsonp: '_callback'
          });
        var dfd = $.Deferred();
        jqxhr.then(function(schema) {
          headers = _.map(schema.data, function(item) {
            return item.name;
          });
          dataset.set({
            headers: headers
          });
          dataset.rowCount = schema.count;
          dfd.resolve(dataset, jqxhr);
        });
        return dfd.promise();
      }
    }
  },
  getRows: function(datasetId, numRows, start) {
    if (start === undefined) {
      start = 0;
    }
    if (numRows === undefined) {
      numRows = 10;
    }
    var base = this.get('url');
    var jqxhr = $.ajax({
      url: base + '.json',
      dataType: 'jsonp',
      jsonp: '_callback',
      cache: true
      });
    var dfd = $.Deferred();
    jqxhr.then(function(results) {
      dfd.resolve(results.data);
    });
    return dfd.promise();
 }
});

return my;

}(jQuery);

