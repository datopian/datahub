this.recline = this.recline || {};

// Models module following classic module pattern
recline.Model = function($) {

var my = {};

// A Dataset model.
//
// Other than standard list of Backbone attributes it has two important attributes:
//
// * currentDocuments: a DocumentList containing the Documents we have currently loaded for viewing (you update currentDocuments by calling getRows)
// * docCount: total number of documents in this dataset (obtained on a fetch for this Dataset)
my.Dataset = Backbone.Model.extend({
  __type__: 'Dataset',
  initialize: function() {
    this.currentDocuments = new my.DocumentList();
    this.docCount = null;
  },

  // AJAX method with promise API to get rows (documents) from the backend.
  //
  // Resulting DocumentList are used to reset this.currentDocuments and are
  // also returned.
  //
  // :param numRows: passed onto backend getDocuments.
  // :param start: passed onto backend getDocuments.
  //
  // this does not fit very well with Backbone setup. Backbone really expects you to know the ids of objects your are fetching (which you do in classic RESTful ajax-y world). But this paradigm does not fill well with data set up we have here.
  // This also illustrates the limitations of separating the Dataset and the Backend
  getDocuments: function(numRows, start) {
    var self = this;
    var dfd = $.Deferred();
    this.backend.getDocuments(this.id, numRows, start).then(function(rows) {
      var docs = _.map(rows, function(row) {
        return new my.Document(row);
      });
      self.currentDocuments.reset(docs);
      dfd.resolve(self.currentDocuments);
    });
    return dfd.promise();
  },

  toTemplateJSON: function() {
    var data = this.toJSON();
    data.docCount = this.docCount;
    return data;
  }
});

my.Document = Backbone.Model.extend({
  __type__: 'Document'
});

my.DocumentList = Backbone.Collection.extend({
  __type__: 'DocumentList',
  // webStore: new WebStore(this.url),
  model: my.Document
});

// Backends section
// ================

my.setBackend = function(backend) {
  Backbone.sync = backend.sync;
};

// Backend which just caches in memory
// 
// Does not need to be a backbone model but provides some conveniences
my.BackendMemory = Backbone.Model.extend({
  // Initialize a Backend with a local in-memory dataset.
  // 
  // NB: We can handle one and only one dataset at a time.
  //
  // :param dataset: the data for a dataset on which operations will be
  // performed. Its form should be a hash with metadata and data
  // attributes.
  //
  // - metadata: hash of key/value attributes of any kind (but usually with title attribute)
  // - data: hash with 2 keys:
  //  - headers: list of header names/labels
  //  - rows: list of hashes, each hash being one row. A row *must* have an id attribute which is unique.
  //
  //  Example of data:
  // 
  //        {
  //            headers: ['x', 'y', 'z']
  //          , rows: [
  //              {id: 0, x: 1, y: 2, z: 3}
  //            , {id: 1, x: 2, y: 4, z: 6}
  //          ]
  //        };
  initialize: function(dataset) {
    // deep copy
    this._datasetAsData = $.extend(true, {}, dataset);
    _.bindAll(this, 'sync');
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
    var self = this;
    if (method === "read") {
      var dfd = $.Deferred();
      // this switching on object type is rather horrible
      // think may make more sense to do work in individual objects rather than in central Backbone.sync
      if (model.__type__ == 'Dataset') {
        var dataset = model;
        var rawDataset = this._datasetAsData;
        dataset.set(rawDataset.metadata);
        dataset.set({
          headers: rawDataset.data.headers
          });
        dataset.docCount = rawDataset.data.rows.length;
        dfd.resolve(dataset);
      }
      return dfd.promise();
    } else if (method === 'update') {
      var dfd = $.Deferred();
      if (model.__type__ == 'Document') {
        _.each(this._datasetAsData.data.rows, function(row, idx) {
          if(row.id === model.id) {
            self._datasetAsData.data.rows[idx] = model.toJSON();
          }
        });
        dfd.resolve(model);
      }
      return dfd.promise();
    } else if (method === 'delete') {
      var dfd = $.Deferred();
      if (model.__type__ == 'Document') {
        this._datasetAsData.data.rows = _.reject(this._datasetAsData.data.rows, function(row) {
          return (row.id === model.id);
        });
        dfd.resolve(model);
      }
      return dfd.promise();
    } else {
      alert('Not supported: sync on BackendMemory with method ' + method + ' and model ' + model);
    }
  },
  getDocuments: function(datasetId, numRows, start) {
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
// Initializing model argument must contain a url attribute pointing to
// relevant Webstore table.
//
// Designed to only attach to one dataset and one dataset only ...
// Could generalize to support attaching to different datasets
my.BackendWebstore = Backbone.Model.extend({
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
          dataset.docCount = schema.count;
          dfd.resolve(dataset, jqxhr);
        });
        return dfd.promise();
      }
    }
  },
  getDocuments: function(datasetId, numRows, start) {
    if (start === undefined) {
      start = 0;
    }
    if (numRows === undefined) {
      numRows = 10;
    }
    var base = this.get('url');
    var jqxhr = $.ajax({
      url: base + '.json?_limit=' + numRows,
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

// DataProxy Backend for connecting to the DataProxy
//
// Example initialization:
//
//     BackendDataProxy({
//       model: {
//         url: {url-of-data-to-proxy},
//         type: xls || csv,
//         format: json || jsonp # return format (defaults to jsonp)
//         dataproxy: {url-to-proxy} # defaults to http://jsonpdataproxy.appspot.com
//       }
//     })
my.BackendDataProxy = Backbone.Model.extend({
  defaults: {
    dataproxy: 'http://jsonpdataproxy.appspot.com'
    , type: 'csv'
    , format: 'jsonp'
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
        var base = this.backend.get('dataproxy');
        var data = this.backend.toJSON();
        delete data['dataproxy'];
        // TODO: should we cache for extra efficiency
        data['max-results'] = 1;
        var jqxhr = $.ajax({
          url: base
          , data: data
          , dataType: 'jsonp'
        });
        var dfd = $.Deferred();
        jqxhr.then(function(results) {
          dataset.set({
            headers: results.fields
          });
          dfd.resolve(dataset, jqxhr);
        });
        return dfd.promise();
      }
    } else {
      alert('This backend only supports read operations');
    }
  },
  getDocuments: function(datasetId, numRows, start) {
    if (start === undefined) {
      start = 0;
    }
    if (numRows === undefined) {
      numRows = 10;
    }
    var base = this.get('dataproxy');
    var data = this.toJSON();
    delete data['dataproxy'];
    data['max-results'] = numRows;
    var jqxhr = $.ajax({
      url: base
      , data: data
      , dataType: 'jsonp'
      // , cache: true
      });
    var dfd = $.Deferred();
    jqxhr.then(function(results) {
      var _out = _.map(results.data, function(row) {
        var tmp = {};
        _.each(results.fields, function(key, idx) {
          tmp[key] = row[idx];
        });
        return tmp;
      });
      dfd.resolve(_out);
    });
    return dfd.promise();
 }
});

return my;

}(jQuery);

