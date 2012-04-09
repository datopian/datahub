// # Recline Backbone Models
this.recline = this.recline || {};
this.recline.Model = this.recline.Model || {};

(function($, my) {

// ## <a id="dataset">A Dataset model</a>
//
// A model has the following (non-Backbone) attributes:
//
// @property {FieldList} fields: (aka columns) is a `FieldList` listing all the
// fields on this Dataset (this can be set explicitly, or, will be set by
// Dataset.fetch() or Dataset.query()
//
// @property {DocumentList} currentDocuments: a `DocumentList` containing the
// Documents we have currently loaded for viewing (updated by calling query
// method)
//
// @property {number} docCount: total number of documents in this dataset
//
// @property {Backend} backend: the Backend (instance) for this Dataset
//
// @property {Query} queryState: `Query` object which stores current
// queryState. queryState may be edited by other components (e.g. a query
// editor view) changes will trigger a Dataset query.
//
// @property {FacetList} facets: FacetList object containing all current
// Facets.
my.Dataset = Backbone.Model.extend({
  __type__: 'Dataset',
  // ### initialize
  // 
  // Sets up instance properties (see above)
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
    this.queryState.bind('facet:add', this.query);
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
        var facets = _.map(queryResult.facets, function(facetResult, facetId) {
          facetResult.id = facetId;
          return new my.Facet(facetResult);
        });
        self.facets.reset(facets);
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
    return out;
  },

  toTemplateJSON: function() {
    var data = this.toJSON();
    data.docCount = this.docCount;
    data.fields = this.fields.toJSON();
    return data;
  }
});

// ## <a id="document">A Document (aka Row)</a>
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

// ## <a id="field">A Field (aka Column) on a Dataset</a>
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
  initialize: function(data) {
    // if a hash not passed in the first argument throw error
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

// ## <a id="query">Query</a>
//
// Query instances encapsulate a query to the backend (see <a
// href="backend/base.html">query method on backend</a>). Useful both
// for creating queries and for storing and manipulating query state -
// e.g. from a query editor).
//
// **Query Structure and format**
//
// Query structure should follow that of [ElasticSearch query
// language](http://www.elasticsearch.org/guide/reference/api/search/).
//
// **NB: It is up to specific backends how to implement and support this query
// structure. Different backends might choose to implement things differently
// or not support certain features. Please check your backend for details.**
//
// Query object has the following key attributes:
// 
//  * size (=limit): number of results to return
//  * from (=offset): offset into result set - http://www.elasticsearch.org/guide/reference/api/search/from-size.html
//  * sort: sort order - <http://www.elasticsearch.org/guide/reference/api/search/sort.html>
//  * query: Query in ES Query DSL <http://www.elasticsearch.org/guide/reference/api/search/query.html>
//  * filter: See filters and <a href="http://www.elasticsearch.org/guide/reference/query-dsl/filtered-query.html">Filtered Query</a>
//  * fields: set of fields to return - http://www.elasticsearch.org/guide/reference/api/search/fields.html
//  * facets: TODO - see http://www.elasticsearch.org/guide/reference/api/search/facets/
// 
// Additions:
// 
//  * q: either straight text or a hash will map directly onto a [query_string
//  query](http://www.elasticsearch.org/guide/reference/query-dsl/query-string-query.html)
//  in backend
//
//   * Of course this can be re-interpreted by different backends. E.g. some
//   may just pass this straight through e.g. for an SQL backend this could be
//   the full SQL query
//
//  * filters: dict of ElasticSearch filters. These will be and-ed together for
//  execution.
// 
// **Examples**
// 
// <pre>
// {
//    q: 'quick brown fox',
//    filters: [
//      { term: { 'owner': 'jones' } }
//    ]
// }
// </pre>
my.Query = Backbone.Model.extend({
  defaults: function() {
    return {
      size: 100
      , from: 0
      , facets: {}
      // <http://www.elasticsearch.org/guide/reference/query-dsl/and-filter.html>
      // , filter: {}
      , filters: []
    }
  },
  // #### addTermFilter
  // 
  // Set (update or add) a terms filter to filters
  //
  // See <http://www.elasticsearch.org/guide/reference/query-dsl/terms-filter.html>
  addTermFilter: function(fieldId, value) {
    var filters = this.get('filters');
    var filter = { term: {} };
    filter.term[fieldId] = value;
    filters.push(filter);
    this.set({filters: filters});
    // change does not seem to be triggered automatically
    if (value) {
      this.trigger('change');
    } else {
      // adding a new blank filter and do not want to trigger a new query
      this.trigger('change:filters:new-blank');
    }
  },
  // ### removeFilter
  //
  // Remove a filter from filters at index filterIndex
  removeFilter: function(filterIndex) {
    var filters = this.get('filters');
    filters.splice(filterIndex, 1);
    this.set({filters: filters});
    this.trigger('change');
  },
  // ### addFacet
  //
  // Add a Facet to this query
  //
  // See <http://www.elasticsearch.org/guide/reference/api/search/facets/>
  addFacet: function(fieldId) {
    var facets = this.get('facets');
    // Assume id and fieldId should be the same (TODO: this need not be true if we want to add two different type of facets on same field)
    if (_.contains(_.keys(facets), fieldId)) {
      return;
    }
    facets[fieldId] = {
      terms: { field: fieldId }
    };
    this.set({facets: facets}, {silent: true});
    this.trigger('facet:add', this);
  }
});


// ## <a id="facet">A Facet (Result)</a>
//
// Object to store Facet information, that is summary information (e.g. values
// and counts) about a field obtained by some faceting method on the
// backend.
//
// Structure of a facet follows that of Facet results in ElasticSearch, see:
// <http://www.elasticsearch.org/guide/reference/api/search/facets/>
//
// Specifically the object structure of a facet looks like (there is one
// addition compared to ElasticSearch: the "id" field which corresponds to the
// key used to specify this facet in the facet query):
//
// <pre>
// {
//   "id": "id-of-facet",
//   // type of this facet (terms, range, histogram etc)
//   "_type" : "terms",
//   // total number of tokens in the facet
//   "total": 5,
//   // @property {number} number of documents which have no value for the field
//   "missing" : 0,
//   // number of facet values not included in the returned facets
//   "other": 0,
//   // term object ({term: , count: ...})
//   "terms" : [ {
//       "term" : "foo",
//       "count" : 2
//     }, {
//       "term" : "bar",
//       "count" : 2
//     }, {
//       "term" : "baz",
//       "count" : 1
//     }
//   ]
// }
// </pre>
my.Facet = Backbone.Model.extend({
  defaults: function() {
    return {
      _type: 'terms',
      total: 0,
      other: 0,
      missing: 0,
      terms: []
    }
  }
});

// ## A Collection/List of Facets
my.FacetList = Backbone.Collection.extend({
  model: my.Facet
});

// ## Backend registry
//
// Backends will register themselves by id into this registry
my.backends = {};

}(jQuery, this.recline.Model));

