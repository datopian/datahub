this.recline = this.recline || {};

// A Dataset model.
recline.Dataset = Backbone.Model.extend({
  __type__: 'Dataset',
  getLength: function() { 
    return this.rowCount;
  },
  // this does not fit very well with Backbone setup. Backbone really expects you to know the ids of objects your are fetching (which you do in classic RESTful ajax-y world). But this paradigm does not fill well with data set up we have here.
  // This also illustrates the limitations of separating the Dataset and the Backend
  getRows: function(numRows, start) {
    return this.backend.getRows(this.id, numRows, start);
  }
});

recline.Document = Backbone.Model.extend({});

recline.DocumentList = Backbone.Collection.extend({
  // webStore: new WebStore(this.url),
  model: recline.Document
})

// Backend which just caches in memory
// 
// Does not need to be a backbone model but provides some conveience
recline.BackendMemory = Backbone.Model.extend({
  initialize: function() {
    this._datasetCache = {}
  }, 
  // dataset is object with metadata and data attributes
  addDataset: function(dataset) {
    this._datasetCache[dataset.metadata.id] = dataset;
  },
  getDataset: function(id) {
    var dataset = new recline.Dataset({
      id: id
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
        var rawDataset = this.backend._datasetCache[model.id];
        dataset.set(rawDataset.metadata);
        // here we munge it all onto Dataset
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
    rows = this._datasetCache[datasetId].data.rows;
    var results = rows.slice(start, start+numRows);
    dfd.resolve(results);
    return dfd.promise();
 }
});

recline.setBackend = function(backend) {
  Backbone.sync = backend.sync;
};

