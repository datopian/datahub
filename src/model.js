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
// @property {RecordList} currentRecords: a `RecordList` containing the
// Records we have currently loaded for viewing (updated by calling query
// method)
//
// @property {number} docCount: total number of records in this dataset
//
// @property {Backend} backend: the Backend (instance) for this Dataset.
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
  //
  // @param {Object} model: standard set of model attributes passed to Backbone models
  //
  // @param {Object or String} backend: Backend instance (see
  // `recline.Backend.Base`) or a string specifying that instance. The
  // string specifying may be a full class path e.g.
  // 'recline.Backend.ElasticSearch' or a simple name e.g.
  // 'elasticsearch' or 'ElasticSearch' (in this case must be a Backend in
  // recline.Backend module)
  initialize: function(model, backend) {
    _.bindAll(this, 'query');
    this.backend = backend;
    if (typeof(backend) === 'string') {
      this.backend = this._backendFromString(backend);
    }
    this.fields = new my.FieldList();
    this.currentRecords = new my.RecordList();
    this.facets = new my.FacetList();
    this.docCount = null;
    this.queryState = new my.Query();
    this.queryState.bind('change', this.query);
    this.queryState.bind('facet:add', this.query);
  },

  // ### query
  //
  // AJAX method with promise API to get records from the backend.
  //
  // It will query based on current query state (given by this.queryState)
  // updated by queryObj (if provided).
  //
  // Resulting RecordList are used to reset this.currentRecords and are
  // also returned.
  query: function(queryObj) {
    var self = this;
    this.trigger('query:start');
    var actualQuery = self._prepareQuery(queryObj);
    var dfd = $.Deferred();
    this.backend.query(this, actualQuery).done(function(queryResult) {
      self.docCount = queryResult.total;
      var docs = _.map(queryResult.hits, function(hit) {
        var _doc = new my.Record(hit._source);
        _doc.backend = self.backend;
        _doc.dataset = self;
        return _doc;
      });
      self.currentRecords.reset(docs);
      if (queryResult.facets) {
        var facets = _.map(queryResult.facets, function(facetResult, facetId) {
          facetResult.id = facetId;
          return new my.Facet(facetResult);
        });
        self.facets.reset(facets);
      }
      self.trigger('query:done');
      dfd.resolve(self.currentRecords);
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
  },

  // Get a summary for each field in the form of a `Facet`.
  // 
  // @return null as this is async function. Provides deferred/promise interface.
  getFieldsSummary: function() {
    var self = this;
    var query = new my.Query();
    query.set({size: 0});
    this.fields.each(function(field) {
      query.addFacet(field.id);
    });
    var dfd = $.Deferred();
    this.backend.query(this, query.toJSON()).done(function(queryResult) {
      if (queryResult.facets) {
        _.each(queryResult.facets, function(facetResult, facetId) {
          facetResult.id = facetId;
          var facet = new my.Facet(facetResult);
          // TODO: probably want replace rather than reset (i.e. just replace the facet with this id)
          self.fields.get(facetId).facets.reset(facet);
        });
      }
      dfd.resolve(queryResult);
    });
    return dfd.promise();
  },

  // ### _backendFromString(backendString)
  //
  // See backend argument to initialize for details
  _backendFromString: function(backendString) {
    var parts = backendString.split('.');
    // walk through the specified path xxx.yyy.zzz to get the final object which should be backend class
    var current = window;
    for(ii=0;ii<parts.length;ii++) {
      if (!current) {
        break;
      }
      current = current[parts[ii]];
    }
    if (current) {
      return new current();
    }

    // alternatively we just had a simple string
    var backend = null;
    if (recline && recline.Backend) {
      _.each(_.keys(recline.Backend), function(name) {
        if (name.toLowerCase() === backendString.toLowerCase()) {
          backend = new recline.Backend[name].Backbone();
        }
      });
    }
    return backend;
  }
});


// ### Dataset.restore
//
// Restore a Dataset instance from a serialized state. Serialized state for a
// Dataset is an Object like:
// 
// <pre>
// {
//   backend: {backend type - i.e. value of dataset.backend.__type__}
//   dataset: {dataset info needed for loading -- result of dataset.toJSON() would be sufficient but can be simpler }
//   // convenience - if url provided and dataste not this be used as dataset url
//   url: {dataset url}
//   ...
// }
my.Dataset.restore = function(state) {
  var dataset = null;
  // hack-y - restoring a memory dataset does not mean much ...
  if (state.backend === 'memory') {
    dataset = recline.Backend.Memory.createDataset(
      [{stub: 'this is a stub dataset because we do not restore memory datasets'}],
      [],
      state.dataset // metadata
    );
  } else {
    var datasetInfo = {
      url: state.url
    };
    dataset = new recline.Model.Dataset(
      datasetInfo,
      state.backend
    );
  }
  return dataset;
};

// ## <a id="record">A Record (aka Row)</a>
// 
// A single entry or row in the dataset
my.Record = Backbone.Model.extend({
  __type__: 'Record',
  initialize: function() {
    _.bindAll(this, 'getFieldValue');
  },

  // ### getFieldValue
  //
  // For the provided Field get the corresponding rendered computed data value
  // for this record.
  getFieldValue: function(field) {
    val = this.getFieldValueUnrendered(field);
    if (field.renderer) {
      val = field.renderer(val, field, this.toJSON());
    }
    return val;
  },

  // ### getFieldValueUnrendered
  //
  // For the provided Field get the corresponding computed data value
  // for this record.
  getFieldValueUnrendered: function(field) {
    var val = this.get(field.id);
    if (field.deriver) {
      val = field.deriver(val, field, this);
    }
    return val;
  },

  summary: function(fields) {
    var html = '';
    for (key in this.attributes) {
      if (key != 'id') {
        html += '<div><strong>' + key + '</strong>: '+ this.attributes[key] + '</div>';
      }
    }
    return html;
  }
});

// ## A Backbone collection of Records
my.RecordList = Backbone.Collection.extend({
  __type__: 'RecordList',
  model: my.Record
});

// ## <a id="field">A Field (aka Column) on a Dataset</a>
// 
// Following (Backbone) attributes as standard:
//
// * id: a unique identifer for this field- usually this should match the key in the records hash
// * label: (optional: defaults to id) the visible label used for this field
// * type: (optional: defaults to string) the type of the data in this field. Should be a string as per type names defined by ElasticSearch - see Types list on <http://www.elasticsearch.org/guide/reference/mapping/>
// * format: (optional) used to indicate how the data should be formatted. For example:
//   * type=date, format=yyyy-mm-dd
//   * type=float, format=percentage
//   * type=string, format=markdown (render as markdown if Showdown available)
// * is_derived: (default: false) attribute indicating this field has no backend data but is just derived from other fields (see below).
// 
// Following additional instance properties:
// 
// @property {Function} renderer: a function to render the data for this field.
// Signature: function(value, field, record) where value is the value of this
// cell, field is corresponding field object and record is the record
// object (as simple JS object). Note that implementing functions can ignore arguments (e.g.
// function(value) would be a valid formatter function).
// 
// @property {Function} deriver: a function to derive/compute the value of data
// in this field as a function of this field's value (if any) and the current
// record, its signature and behaviour is the same as for renderer.  Use of
// this function allows you to define an entirely new value for data in this
// field. This provides support for a) 'derived/computed' fields: i.e. fields
// whose data are functions of the data in other fields b) transforming the
// value of this field prior to rendering.
//
// #### Default renderers
//
// * string
//   * no format provided: pass through but convert http:// to hyperlinks 
//   * format = plain: do no processing on the source text
//   * format = markdown: process as markdown (if Showdown library available)
// * float
//   * format = percentage: format as a percentage
my.Field = Backbone.Model.extend({
  // ### defaults - define default values
  defaults: {
    label: null,
    type: 'string',
    format: null,
    is_derived: false
  },
  // ### initialize
  //
  // @param {Object} data: standard Backbone model attributes
  //
  // @param {Object} options: renderer and/or deriver functions.
  initialize: function(data, options) {
    // if a hash not passed in the first argument throw error
    if ('0' in data) {
      throw new Error('Looks like you did not pass a proper hash with id to Field constructor');
    }
    if (this.attributes.label === null) {
      this.set({label: this.id});
    }
    if (options) {
      this.renderer = options.renderer;
      this.deriver = options.deriver;
    }
    if (!this.renderer) {
      this.renderer = this.defaultRenderers[this.get('type')];
    }
    this.facets = new my.FacetList();
  },
  defaultRenderers: {
    object: function(val, field, doc) {
      return JSON.stringify(val);
    },
    'float': function(val, field, doc) {
      var format = field.get('format'); 
      if (format === 'percentage') {
        return val + '%';
      }
      return val;
    },
    'string': function(val, field, doc) {
      var format = field.get('format');
      if (format === 'markdown') {
        if (typeof Showdown !== 'undefined') {
          var showdown = new Showdown.converter();
          out = showdown.makeHtml(val);
          return out;
        } else {
          return val;
        }
      } else if (format == 'plain') {
        return val;
      } else {
        // as this is the default and default type is string may get things
        // here that are not actually strings
        if (val && typeof val === 'string') {
          val = val.replace(/(https?:\/\/[^ ]+)/g, '<a href="$1">$1</a>');
        }
        return val
      }
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
//  * facets: specification of facets - see http://www.elasticsearch.org/guide/reference/api/search/facets/
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
      size: 100,
      from: 0,
      facets: {},
      // <http://www.elasticsearch.org/guide/reference/query-dsl/and-filter.html>
      // , filter: {}
      filters: []
    };
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
  },
  addHistogramFacet: function(fieldId) {
    var facets = this.get('facets');
    facets[fieldId] = {
      date_histogram: {
        field: fieldId,
        interval: 'day'
      }
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
//   // @property {number} number of records which have no value for the field
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
    };
  }
});

// ## A Collection/List of Facets
my.FacetList = Backbone.Collection.extend({
  model: my.Facet
});

// ## Object State
//
// Convenience Backbone model for storing (configuration) state of objects like Views.
my.ObjectState = Backbone.Model.extend({
});


// ## Backbone.sync
//
// Override Backbone.sync to hand off to sync function in relevant backend
Backbone.sync = function(method, model, options) {
  return model.backend.sync(method, model, options);
};

}(jQuery, this.recline.Model));

