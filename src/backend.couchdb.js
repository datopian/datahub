this.recline = this.recline || {};
this.recline.Backend = this.recline.Backend || {};
this.recline.Backend.CouchDB = this.recline.Backend.CouchDB || {};

(function($, my) {
  my.__type__ = 'couchdb';

  // ## CouchDB Wrapper
  //
  // Connecting to [CouchDB] (http://www.couchdb.apache.org/) endpoints.
  // @param {String} endpoint: url for CouchDB database, e.g. for Couchdb running
  // on localhost:5984 with database // ckan-std it would be:
  // 
  // <pre>http://localhost:5984/ckan-std</pre>
  //
  // TODO Add user/password arguments for couchdb authentication support.
  my.CouchDBWrapper = function(db_url, view_url, options) { 
    var self = this;
    self.endpoint = db_url;
    self.view_url = (view_url) ? view_url : db_url+'/'+'_all_docs';
    self.options = _.extend({
        dataType: 'json'
      },
      options);

    this._makeRequest = function(data, headers) {
      var extras = {};
      if (headers) {
        extras = {
          beforeSend: function(req) {
            _.each(headers, function(value, key) {
              req.setRequestHeader(key, value);
            });
          }
        };
      }
      data = _.extend(extras, data);
      return $.ajax(data);
    };

    // ### mapping
    //
    // Get mapping for this database.
    // Assume all docs in the view have the same schema so
    // limit query to single result.
    //
    // @return promise compatible deferred object.
    this.mapping = function() {
      var schemaUrl = self.view_url + '?limit=1&include_docs=true';
      var jqxhr = self._makeRequest({
        url: schemaUrl,
        dataType: self.options.dataType
      });
      return jqxhr;
    };

    // ### get
    //
    // Get record corresponding to specified id
    //
    // @return promise compatible deferred object.
    this.get = function(_id) {
      var base = self.endpoint + '/' + _id;
      return self._makeRequest({
        url: base,
        dataType: 'json'
      });
    };

    // ### upsert
    //
    // create / update a record to CouchDB backend
    //
    // @param {Object} doc an object to insert to the index.
    // @return deferred supporting promise API
    this.upsert = function(doc) {
      var data = JSON.stringify(doc);
      url = self.endpoint;
      if (doc._id) {
        url += '/' + doc._id;
      }
      // use a PUT, not a POST to update the document:
      // http://wiki.apache.org/couchdb/HTTP_Document_API#POST
      return self._makeRequest({
        url: url,
        type: 'PUT',
        data: data,
        dataType: 'json',
        contentType: 'application/json'
      });
    };

    // ### delete
    //
    // Delete a record from the CouchDB backend.
    //
    // @param {Object} id id of object to delete
    // @return deferred supporting promise API
    this.delete = function(_id) {
      url = self.endpoint;
      url += '/' + _id;
      return self._makeRequest({
        url: url,
        type: 'DELETE',
        dataType: 'json'
      });
    };

    // ### _normalizeQuery
    //
    // Convert the query object from Elastic Search format to a
    // Couchdb View API compatible format.
    // See: http://wiki.apache.org/couchdb/HTTP_view_API
    //
    this._normalizeQuery = function(queryObj) {
      var out = queryObj && queryObj.toJSON ? queryObj.toJSON() : _.extend({}, queryObj);
      delete out.sort;
      delete out.query;
      delete out.filters;
      delete out.fields;
      delete out.facets;
      out['skip'] = out.from || 0;
      out['limit'] = out.size || 100;
      delete out.from;
      delete out.size;
      out['include_docs'] = true;      
      return out;
    };

    // ### query
    //
    // @param {Object} recline.Query instance.
    // @param {Object} additional couchdb view query options.
    // @return deferred supporting promise API
    this.query = function(query_object, query_options) {
      var norm_q = self._normalizeQuery(query_object);
      var url = self.view_url;
      var q = _.extend(query_options, norm_q);

      var jqxhr = self._makeRequest({
        url: url,
        data: JSON.stringify(q),
        dataType: self.options.dataType,
      });
      return jqxhr;
    }
  };

  // ## CouchDB Backend
  //
  // Backbone connector for a CouchDB backend.
  //
  // Usage:
  //
  // var backend = new recline.Backend.CouchDB();
  // var dataset = new recline.Model.Dataset({
  //     db_url: '/couchdb/mydb',
  //     view_url: '/couchdb/mydb/_design/design1/_views/view1',
  //     query_options: {
  //          'key': 'some_document_key'
  //     }
  // });
  // backend.fetch(dataset.toJSON());
  // backend.query(query, dataset.toJSON()).done(function () { ... });
  //
  // Alternatively:
  // var dataset = new recline.Model.Dataset({ ... }, 'couchdb');
  // dataset.fetch();
  // var results = dataset.query(query_obj);
  // 
  // Additionally, the Dataset instance may define three methods:
  //    function record_update (record, document) { ... }
  //    function record_delete (record, document) { ... }
  //    function record_create (record, document) { ... }
  // Where `record` is the JSON representation of the Record/Document instance
  // and `document` is the JSON document stored in couchdb.
  // When _all_docs view is used (default), a record is the same as a document
  // so these methods need not be defined.
  // They are most useful when using a custom view that performs a map-reduce
  // operation on each document to yield a record. Hence, when the record is 
  // created, updated or deleted, an inverse operation must be performed on the original
  // document.
  //
  // @param {string} url of couchdb database.
  // @param {string} (optional) url of couchdb view. default:`db_url`/_all_docs
  // @param {Object} (optional) query options accepted by couchdb views.
  //

  my.couchOptions = {};

  // ### fetch
  // @param {object} dataset json object with the db_url, view_url, and query_options args.
  // @return promise object that resolves to the document mapping.
  my.fetch = function (dataset) {
    var db_url    = dataset.db_url;
    var view_url  = dataset.view_url;
    var cdb       = new my.CouchDBWrapper(db_url, view_url);
    var dfd       = $.Deferred();

    // if 'doc' attribute is present, return schema of that
    // else return schema of 'value' attribute which contains
    // the map-reduced document.
    cdb.mapping().done(function(result) {
      var row = result.rows[0];
      var keys = [];
      if (view_url.search("_all_docs") !== -1) {
        keys = _.keys(row['doc']);
        keys = _.filter(keys, function (k) { return k.charAt(0) !== '_' });
      }
      else {
        keys = _.keys(row['value']);
      }

      var fieldData = _.map(keys, function(k) {
        return { 'id' : k };
      });     
      dfd.resolve({
        fields: fieldData
      });
    })
    .fail(function(arguments) {
      dfd.reject(arguments);
    });
    return dfd.promise();
  };

// ### save
// 
// Iterate through all the changes and save them to the server.
// N.B. This method is asynchronous and attempts to do multiple
// operation concurrently. This can be problematic when more than
// one operation is requested on the same document (as in the case
// of bulk column transforms).
//
// @param {object} lists of create, update, delete.
// @param {object} dataset json object.
//
//
my.save = function (changes, dataset) {
  var dfd       = $.Deferred();
  var total     = changes.creates.length + changes.updates.length + changes.deletes.length;  
  var results   = {'done': [], 'fail': [] };

  var decr_cb = function () { total -= 1; }
  var resolve_cb = function () { if (total == 0) dfd.resolve(results); }

  for (var i in changes.creates) {
    var new_doc = changes.creates[i];
    var succ_cb = function (msg) {results.done.push({'op': 'create', 'record': new_doc, 'reason': ''}); }
    var fail_cb = function (msg) {results.fail.push({'op': 'create', 'record': new_doc, 'reason': msg}); }

    _createDocument(new_doc, dataset).then([decr_cb, succ_cb, resolve_cb], [decr_cb, fail_cb, resolve_cb]);
  }

  for (var i in changes.updates) {
    var new_doc = changes.updates[i];
    var succ_cb = function (msg) {results.done.push({'op': 'update', 'record': new_doc, 'reason': ''}); }
    var fail_cb = function (msg) {results.fail.push({'op': 'update', 'record': new_doc, 'reason': msg}); }

    _updateDocument(new_doc, dataset).then([decr_cb, succ_cb, resolve_cb], [decr_cb, fail_cb, resolve_cb]);
  }

  for (var i in changes.deletes) {
    var old_doc = changes.deletes[i];
    var succ_cb = function (msg) {results.done.push({'op': 'delete', 'record': old_doc, 'reason': ''}); }
    var fail_cb = function (msg) {results.fail.push({'op': 'delete', 'record': old_doc, 'reason': msg}); }

    _deleteDocument(new_doc, dataset).then([decr_cb, succ_cb, resolve_cb], [decr_cb, fail_cb, resolve_cb]);
  }

  return dfd.promise();
};


// ### query
//
// fetch the data from the couchdb view and filter it.
// @param {Object} recline.Dataset instance
// @param {Object} recline.Query instance.
my.query = function(queryObj, dataset) {
  var dfd           = $.Deferred();
  var db_url        = dataset.db_url;
  var view_url      = dataset.view_url;
  var query_options = dataset.query_options;

  var cdb = new my.CouchDBWrapper(db_url, view_url); 
  var cdb_q = cdb._normalizeQuery(queryObj, query_options);

  cdb.query(queryObj, query_options).done(function(records){

    var query_result = { hits: [], total: 0 };
    _.each(records.rows, function(record) {
      var doc = {};
      if (record.hasOwnProperty('doc')) {
        doc = record['doc'];
        // couchdb uses _id to identify documents, Backbone models use id.
        // we add this fix so backbone.Model works correctly.
        doc['id'] = doc['_id'];
      }
      else {
        doc = record['value'];
        // using dunder to create compound id. need something more robust.
        // couchdb uses _id to identify documents, Backbone models use id.
        // we add this fix so backbone.Model works correctly.
        doc['_id'] = doc['id'] = record['id'] + '__' + record['key']; 
      }
      query_result.total += 1;
      query_result.hits.push(doc);
    });

    // the following block is borrowed verbatim from recline.backend.Memory
    // search (with filtering, faceting, and sorting) should be factored
    // out into a separate library.
    query_result.hits = _applyFilters(query_result.hits, queryObj);
    query_result.hits = _applyFreeTextQuery(query_result.hits, queryObj);
    // not complete sorting!
    _.each(queryObj.sort, function(sortObj) {
      var fieldName = _.keys(sortObj)[0];
      query_result.hits = _.sortBy(query_result.hits, function(doc) {
        var _out = doc[fieldName];
        return (sortObj[fieldName].order == 'asc') ? _out : -1*_out;
      });
    });
    query_result.total  = query_result.hits.length;
    query_result.facets = _computeFacets(query_result.hits, queryObj);
    query_result.hits = query_result.hits.slice(cdb_q.skip, cdb_q.skip + cdb_q.limit+1);
    dfd.resolve(query_result);

  });
  
  return dfd.promise();
};

// in place filtering
_applyFilters = function(results, queryObj) {
  _.each(queryObj.filters, function(filter) {
    results = _.filter(results, function(doc) {
      var fieldId = _.keys(filter.term)[0];
      return (doc[fieldId] == filter.term[fieldId]);
    });
  });
  return results;
};

// we OR across fields but AND across terms in query string
_applyFreeTextQuery = function(results, queryObj) {
  if (queryObj.q) {
    var terms = queryObj.q.split(' ');
    results = _.filter(results, function(rawdoc) {
      var matches = true;
      _.each(terms, function(term) {
        var foundmatch = false;      
        _.each(_.keys(rawdoc), function(field) {
          var value = rawdoc[field];
          if (value !== null) { value = value.toString(); }
          // TODO regexes?
          foundmatch = foundmatch || (value === term);
          // TODO: early out (once we are true should break to spare unnecessary testing)
          // if (foundmatch) return true;
        });
        matches = matches && foundmatch;
        // TODO: early out (once false should break to spare unnecessary testing)
        // if (!matches) return false;
      });
      return matches;
    });
  }
  return results;
};

_computeFacets = function(records, queryObj) {
  var facetResults = {};
  if (!queryObj.facets) {
    return facetResults;
  }
  _.each(queryObj.facets, function(query, facetId) {
    // TODO: remove dependency on recline.Model
    facetResults[facetId] = new recline.Model.Facet({id: facetId}).toJSON();
    facetResults[facetId].termsall = {};
  });
  // faceting
  _.each(records, function(doc) {
    _.each(queryObj.facets, function(query, facetId) {
      var fieldId = query.terms.field;
      var val = doc[fieldId];
      var tmp = facetResults[facetId];
      if (val) {
        tmp.termsall[val] = tmp.termsall[val] ? tmp.termsall[val] + 1 : 1;
      } else {
        tmp.missing = tmp.missing + 1;
      }
    });
  });
  _.each(queryObj.facets, function(query, facetId) {
    var tmp = facetResults[facetId];
    var terms = _.map(tmp.termsall, function(count, term) {
      return { term: term, count: count };
    });
    tmp.terms = _.sortBy(terms, function(item) {
      // want descending order
      return -item.count;
    });
    tmp.terms = tmp.terms.slice(0, 10);
  });
  return facetResults;
};
     
_createDocument  = function (new_doc, dataset) {
  var dfd      = $.Deferred();
  var db_url   = dataset.db_url;
  var view_url = dataset.view_url;
  var _id      = new_doc['id'];
  var cdb      = new my.CouchDBWrapper(db_url, view_url);

  delete new_doc['id']; 

  if (view_url.search('_all_docs') !== -1) {
    jqxhr = cdb.get(_id);
  }
  else {
    _id = new_doc['_id'].split('__')[0];
    jqxhr = cdb.get(_id);
  }

  jqxhr.done(function(old_doc){
    if (dataset.record_create)
      new_doc = dataset.record_create(new_doc, old_doc);
    new_doc = _.extend(old_doc, new_doc);
    new_doc['_id'] = _id;
    dfd.resolve(cdb.upsert(new_doc));            
  }).fail(function(args){
    dfd.reject(args);
  });

  return dfd.promise();
};

_updateDocument = function (new_doc, dataset) {
  var dfd      = $.Deferred();
  var db_url   = dataset.db_url;
  var view_url = dataset.view_url;
  var _id      = new_doc['id'];
  var cdb      = new my.CouchDBWrapper(db_url, view_url);

  delete new_doc['id']; 

  if (view_url.search('_all_docs') !== -1) {
    jqxhr = cdb.get(_id);
  }
  else {
    _id = new_doc['_id'].split('__')[0];
    jqxhr = cdb.get(_id);
  }

  jqxhr.done(function(old_doc){
    if (dataset.record_update)
      new_doc = dataset.record_update(new_doc, old_doc);
    new_doc = _.extend(old_doc, new_doc);
    new_doc['_id'] = _id;
    dfd.resolve(cdb.upsert(new_doc));            
  }).fail(function(args){
    dfd.reject(args);
  });

  return dfd.promise();
};

_deleteDocument = function (del_doc, dataset) {
  var dfd      = $.Deferred();
  var db_url   = dataset.db_url;
  var view_url = dataset.view_url;
  var _id      = del_doc['id'];
  var cdb      = new my.CouchDBWrapper(db_url, view_url);

  if (view_url.search('_all_docs') !== -1) 
    return cdb.delete(_id);
  else {
    _id = model.get('_id').split('__')[0];
    var jqxhr = cdb.get(_id);

    jqxhr.done(function(old_doc){
      if (dataset.record_delete)
        old_doc = dataset.record_delete(del_doc, old_doc);
      if (_.isNull(del_doc))
        dfd.resolve(cdb.delete(_id)); // XXX is this the right thing to do?
      else {
        // couchdb uses _id to identify documents, Backbone models use id.
        // we should remove it before sending it to the server.
        old_doc['_id'] = _id;
        delete old_doc['id'];
        dfd.resolve(cdb.upsert(old_doc)); 
      }
    }).fail(function(args){
      dfd.reject(args);
    });
    return dfd.promise();
};

}(jQuery, this.recline.Backend.CouchDB));
