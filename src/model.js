// # Recline Backbone Models
this.recline = this.recline || {};
this.recline.Model = this.recline.Model || {};

(function($, my) {

// ## A Dataset model
//
// A model must have the following (Backbone) attributes:
//
// * fields: (aka columns) is a FieldList listing all the fields on this
//   Dataset (this can be set explicitly, or, on fetch() of Dataset
//   information from the backend, or as is perhaps most common on the first
//   query)
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
    this.fields = new my.FieldList();
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

// ## A Field (aka Column) on a Dataset
// 
// Following attributes as standard:
//
//  * id: a unique identifer for this field- usually this should match the key in the documents hash
//  * label: the visible label used for this field
//  * type: the type of the data
my.Field = Backbone.Model.extend({
  defaults: {
    id: null,
    label: null,
    type: 'String'
  },
  // In addition to normal backbone initialization via a Hash you can also
  // just pass a single argument representing id to the ctor
  initialize: function(data) {
    console.log(data);
    // if a hash not passed in the first argument is set as value for key 0
    if ('0' in data) {
      this.set({id: data['0']});
    }
    if (this.attributes.label == null) {
      this.set({label: this.id});
    }
  }
});

my.FieldList = Backbone.Collection.extend({
  model: my.Field
});

// ## A Query object storing Dataset Query state
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

