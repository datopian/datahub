// # Recline Backbone Models
this.recline = this.recline || {};
this.recline.Model = this.recline.Model || {};

(function($, my) {

// ## A Dataset model
//
// A model must have the following (Backbone) attributes:
//
// * fields: (aka columns) is the array of fields (column) to display. Each
// entry in fields is a hash having at a minimum:
//  * id: a unique identifer for this field- usually this should match the key in the documents hash
//  * label: the visible label used for this field
//  * type: the type of the data
//  * data_key: the key used in the documents (usually this will be the same as
//  id but having this allows us to set more than one column reading the same
//  field. 
//
// Other than standard list of Backbone methods it has two important attributes:
//
// * currentDocuments: a DocumentList containing the Documents we have currently loaded for viewing (you update currentDocuments by calling getRows)
// * docCount: total number of documents in this dataset (obtained on a fetch for this Dataset)
my.Dataset = Backbone.Model.extend({
  __type__: 'Dataset',
  initialize: function(model, backend) {
    _.bindAll(this, 'query');
    this.backend = backend;
    if (backend && backend.constructor == String) {
      this.backend = my.backends[backend];
    }
    this.currentDocuments = new my.DocumentList();
    this.docCount = null;
    this.queryState = new my.Query();
    this.queryState.bind('change', this.query);
  },

  // ### query
  //
  // AJAX method with promise API to get documents from the backend.
  //
  // It will query based on current query state (given by this.queryState)
  // updated by queryObj (if provided).
  //
  // Resulting DocumentList are used to reset this.currentDocuments and are
  // also returned.
  query: function(queryObj) {
    var self = this;
    this.queryState.set(queryObj, {silent: true});
    var dfd = $.Deferred();
    this.backend.query(this, this.queryState.toJSON()).done(function(rows) {
      var docs = _.map(rows, function(row) {
        var _doc = new my.Document(row);
        _doc.backend = self.backend;
        _doc.dataset = self;
        return _doc;
      });
      self.currentDocuments.reset(docs);
      dfd.resolve(self.currentDocuments);
    })
    .fail(function(arguments) {
      dfd.reject(arguments);
    });
    return dfd.promise();
  },

  toTemplateJSON: function() {
    var data = this.toJSON();
    data.docCount = this.docCount;
    return data;
  }
});

// ## A Document (aka Row)
// 
// A single entry or row in the dataset
my.Document = Backbone.Model.extend({
  __type__: 'Document'
});

// ## A Backbone collection of Documents
my.DocumentList = Backbone.Collection.extend({
  __type__: 'DocumentList',
  model: my.Document
});

my.Query = Backbone.Model.extend({
  defaults: {
    size: 100
    , offset: 0
  }
});

// ## Backend registry
//
// Backends will register themselves by id into this registry
my.backends = {};

}(jQuery, this.recline.Model));

