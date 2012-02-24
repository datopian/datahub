// # Recline Backends
//
// Backends are connectors to backend data sources and stores
//
// Backends are implemented as Backbone models but this is just a
// convenience (they do not save or load themselves from any remote
// source)
this.recline = this.recline || {};
this.recline.Backend = this.recline.Backend || {};

(function($, my) {
  // ## BackendMemory - uses in-memory data
  //
  // This is very artificial and is really only designed for testing
  // purposes.
  //
  // To use it you should provide in your constructor data:
  // 
  //   * metadata (including fields array)
  //   * documents: list of hashes, each hash being one doc. A doc *must* have an id attribute which is unique.
  //
  //  Example:
  // 
  //  <pre>
  //  // Backend setup
  //  var backend = Backend();
  //  backend.addDataset({
  //    metadata: {
  //      id: 'my-id',
  //      title: 'My Title'
  //    },
  //    fields: [{id: 'x'}, {id: 'y'}, {id: 'z'}],
  //    documents: [
  //        {id: 0, x: 1, y: 2, z: 3},
  //        {id: 1, x: 2, y: 4, z: 6}
  //      ]
  //  });
  //  // later ...
  //  var dataset = Dataset({id: 'my-id'});
  //  dataset.fetch();
  //  etc ...
  //  </pre>
  my.BackendMemory = Backbone.Model.extend({
    initialize: function() {
      this.datasets = {};
    },
    addDataset: function(data) {
      this.datasets[data.metadata.id] = $.extend(true, {}, data);
    },
    sync: function(method, model, options) {
      var self = this;
      if (method === "read") {
        var dfd = $.Deferred();
        if (model.__type__ == 'Dataset') {
          var rawDataset = this.datasets[model.id];
          model.set(rawDataset.metadata);
          model.fields.reset(rawDataset.fields);
          model.docCount = rawDataset.documents.length;
          dfd.resolve(model);
        }
        return dfd.promise();
      } else if (method === 'update') {
        var dfd = $.Deferred();
        if (model.__type__ == 'Document') {
          _.each(self.datasets[model.dataset.id].documents, function(doc, idx) {
            if(doc.id === model.id) {
              self.datasets[model.dataset.id].documents[idx] = model.toJSON();
            }
          });
          dfd.resolve(model);
        }
        return dfd.promise();
      } else if (method === 'delete') {
        var dfd = $.Deferred();
        if (model.__type__ == 'Document') {
          var rawDataset = self.datasets[model.dataset.id];
          var newdocs = _.reject(rawDataset.documents, function(doc) {
            return (doc.id === model.id);
          });
          rawDataset.documents = newdocs;
          dfd.resolve(model);
        }
        return dfd.promise();
      } else {
        alert('Not supported: sync on BackendMemory with method ' + method + ' and model ' + model);
      }
    },
    query: function(model, queryObj) {
      var numRows = queryObj.size;
      var start = queryObj.offset;
      var dfd = $.Deferred();
      results = this.datasets[model.id].documents;
      // not complete sorting!
      _.each(queryObj.sort, function(item) {
        results = _.sortBy(results, function(doc) {
          var _out = doc[item[0]];
          return (item[1] == 'asc') ? _out : -1*_out;
        });
      });
      var results = results.slice(start, start+numRows);
      dfd.resolve(results);
      return dfd.promise();
    }
  });
  recline.Model.backends['memory'] = new my.BackendMemory();

}(jQuery, this.recline.Backend));
