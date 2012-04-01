// # Recline Backbone Models
this.recline = this.recline || {};
this.recline.Model = this.recline.Model || {};

(function($, my) {

// ## A Dataset model
//
// A model has the following (non-Backbone) attributes:
//
// * fields: (aka columns) is a FieldList listing all the fields on this
//   Dataset (this can be set explicitly, or, will be set by Dataset.fetch() or Dataset.query()
// * currentDocuments: a DocumentList containing the Documents we have
//   currently loaded for viewing (you update currentDocuments by calling query)
// * docCount: total number of documents in this dataset
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
    this.facets = new my.FacetList();
    this.docCount = null;
    this.queryState = new my.Query();
    this.queryState.bind('change', this.query);
    this.facets.bind('all', this.query);
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
    this.trigger('query:start');
    // HACK: query gets called on event changes and it appears that in those cases the type of event gets passed as first argument. The following handles those cases.
    if (typeof(queryObj) != 'object') {
      queryObj = null;
    }
    var actualQuery = self._prepareQuery(queryObj);
    var dfd = $.Deferred();
    this.backend.query(this, actualQuery).done(function(queryResult) {
      self.docCount = queryResult.total;
      var docs = _.map(queryResult.hits, function(hit) {
        var _doc = new my.Document(hit._source);
        _doc.backend = self.backend;
        _doc.dataset = self;
        return _doc;
      });
      self.currentDocuments.reset(docs);
      if (queryResult.facets) {
        _.each(queryResult.facets, function(facetResult, facetId) {
          self.facets.get(facetId).set({result: facetResult});
        });
      }
      self.trigger('query:done');
      dfd.resolve(self.currentDocuments);
    })
    .fail(function(arguments) {
      self.trigger('query:fail', arguments);
      dfd.reject(arguments);
    });
    return dfd.promise();
  },

  _prepareQuery: function(newQueryObj) {
    if (newQueryObj) {
      this.queryState.set(newQueryObj);
    }
    var out = this.queryState.toJSON();
    _.each(this.facets.toJSON(), function(facet) {
      out.facets[facet.id] = facet.query;
    });
    return out;
  },

  toTemplateJSON: function() {
    var data = this.toJSON();
    data.docCount = this.docCount;
    data.fields = this.fields.toJSON();
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
    // if a hash not passed in the first argument is set as value for key 0
    if ('0' in data) {
      throw new Error('Looks like you did not pass a proper hash with id to Field constructor');
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
    , from: 0
    , facets: {}
  },
  // Set (update or add) a terms filter
  // http://www.elasticsearch.org/guide/reference/query-dsl/terms-filter.html
  setFilter: function(fieldId, values) {
  }
});

my.Facet = Backbone.Model.extend({
  defaults: {
    query: null,
    result: null
  }
});

my.FacetList = Backbone.Collection.extend({
  model: my.Facet,
  addFacet: function(fieldId) {
    // Assume id and fieldId should be the same (TODO: this need not be true if we want to add two different type of facets on same field)
    if (this.include(fieldId)) {
      return;
    }
    // TODO: utilize field info to determine facet type ??
    var facet = new my.Facet({
      id: fieldId,
      query: {
        terms: {
          field: fieldId
        }
      }
    });
    this.add(facet);
  }
});

// ## Backend registry
//
// Backends will register themselves by id into this registry
my.backends = {};

}(jQuery, this.recline.Model));

