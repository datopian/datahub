this.recline = this.recline || {};
this.recline.Backend = this.recline.Backend || {};
this.recline.Backend.CouchDB = this.recline.Backend.CouchDB || {};

(function($, my) {
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
      var data = _.extend(extras, data);
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
  // var backend = new recline.Backend.CouchDB({
  //     db_url: '/couchdb/mydb',
  //     view_url: '/couchdb/mydb/_design/design1/_views/view1',
  //     query_options: {
  //          'key': 'some_document_key'
  //     }
  // });
  //
  // If these options are not passed to the constructor, the model
  // object is checked for the presence of these arguments.
  //
  // Additionally, the Dataset instance may define two methods:
  //    function record_update (record, document) { ... }
  //    function record_delete (record, document) { ... }
  // Where `record` is the JSON representation of the Record/Document instance
  // and `document` is the JSON document stored in couchdb.
  // When _all_docs view is used (default), a record is the same as a document
  // so these methods need not be defined.
  // They are most useful when using a custom view that performs a map-reduce
  // operation on each document to yield a record. Hence, when the record is 
  // updated or deleted, an inverse operation must be performed on the original
  // document.
  //
  // @param {string} url of couchdb database.
  // @param {string} (optional) url of couchdb view. default:`db_url`/_all_docs
  // @param {Object} (optional) query options accepted by couchdb views.
  // @param {string} (optional) url of Elastic Search engine.
  //
  my.Backbone = function(options) {
    var self           = this;
    this.__type__      ='couchdb';
    this.db_url        = options['db_url'] || '';
    this.view_url      = options['view_url'] || this.db_url + '/_all_docs';
    this.query_options = options['query_options'] || {};

    // ### sync
    //
    // Backbone sync implementation for this backend.
    //
    this.sync = function (method, model, options) {
      var dataset = null
      if (model.__type__ == 'Dataset')
        dataset = model;
      else 
        dataset = model.dataset;

      var db_url        = dataset.get('db_url') || self.db_url;
      var view_url      = dataset.get('view_url') || self.view_url;
      var query_options = dataset.get('query_options') || self.query_options;

      var cdb = new my.CouchDBWrapper(db_url, view_url);

      if (method === "read") {
        if (model.__type__ == 'Dataset') {
          var dfd = $.Deferred();

          // if 'doc' attribute is present, return schema of that
          // else return schema of 'value' attribute which contains
          // the map-reduce document.
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
            model.fields.reset(fieldData);
            
            dfd.resolve(model);
          })
          .fail(function(arguments) {
            dfd.reject(arguments);
          });
          return dfd.promise();
        } else if (model.__type__ == 'Record' || model.__type__ == 'Document') {
          if (view_url.search("_all_docs") !== -1) {
            return cdb.get(model.get('_id'));
          }
          else {
            var dfd = $.Deferred();
            // decompose _id
            var id  = model.get('_id').split('__')[0];
            var key = model.get('_id').split('__')[1];
            var jqxhr = cdb.query(model.dataset.get('query_options'));

            jqxhr.done(function(records) {
              var doc = {};
              var rec = _.filter(records, function (record) {
                record['id'] == id && record['key'] == key;
              });
              doc = rec[0]; // XXX check len first
              doc['id'] = doc['_id'] = model.get('_id');
              dfd.resolve(doc);
            }).fail(function(args) {
              dfd.reject(args);
            });
            return dfd.promise();
          }
        }       
      } else if (method === 'update') {
        if (model.__type__ == 'Record' || model.__type__ == 'Document') {
          var dfd = $.Deferred();
          var _id = null;
          var jqxhr;
          var new_doc = model.toJSON();
          // couchdb uses _id to identify documents, Backbone models use id.
          // we should remove it before sending it to the server.
          delete new_doc['id']; 
          if (view_url.search('_all_docs') !== -1) {
            _id = model.get('_id');
            jqxhr = cdb.get(_id);
          }
          else {
            _id = model.get('_id').split('__')[0];
            jqxhr = cdb.get(_id);
          }

          jqxhr.done(function(old_doc){
            if (model.dataset.record_update)
              new_doc = model.dataset.record_update(new_doc, old_doc);
            new_doc = _.extend(old_doc, new_doc);
            new_doc['_id'] = _id;
            // XXX upsert can fail during a bulk column transform due to revision conflict.
            // the correct way to handle bulk column transforms is to use
            // a queue which is processed by a web worker.
            dfd.resolve(cdb.upsert(new_doc));            
          }).fail(function(args){
            dfd.reject(args);
          });

          return dfd.promise();
        }
      } else if (method === 'delete') {
        if (model.__type__ == 'Record' || model.__type__ == 'Document') {
          if (view_url.search('_all_docs') !== -1) 
            return cdb.delete(model.get('_id'));
          else {
            var dfd = $.Deferred();
            var _id = model.get('_id').split('__')[0];
            var new_doc = null;
            var jqxhr = cdb.get(_id);

            jqxhr.done(function(old_doc){
              if (model.dataset.record_delete)
                new_doc = model.dataset.record_delete(model.toJSON(), old_doc);
              if (_.isNull(new_doc))
                dfd.resolve(cdb.delete(_id)); // XXX is this the right thing to do?
              else {
                // couchdb uses _id to identify documents, Backbone models use id.
                // we should remove it before sending it to the server.
                new_doc['_id'] = _id;
                delete new_doc['id'];
                dfd.resolve(cdb.upsert(new_doc)); 
              }
            }).fail(function(args){
              dfd.reject(args);
            });
            return dfd.promise();
          }
        }
      }
    
  },

    // ### query
    //
    // fetch the data from the couchdb view and filter it.
    // @param {Object} recline.Dataset instance
    // @param {Object} recline.Query instance.
    this.query = function(model, queryObj) {
      var dfd           = $.Deferred();
      var db_url        = model.get('db_url') || self.db_url;
      var view_url      = model.get('view_url') || self.view_url;
      var query_options = model.get('query_options') || self.query_options;

      var cdb = new my.CouchDBWrapper(db_url, view_url); 
      var cdb_q = cdb._normalizeQuery(queryObj, query_options);

      cdb.query(queryObj, query_options).done(function(records){

        var query_result = { hits: [], total: 0 };
        _.each(records.rows, function(record) {
          var doc = {};
          if (record.hasOwnProperty('doc')) {
            doc['_source'] = record['doc'];
            // couchdb uses _id to identify documents, Backbone models use id.
            // we add this fix so backbone.Model works correctly.
            doc['_source']['id'] = doc['_source']['_id'];
          }
          else {
            doc['_source'] = record['value'];
            // using dunder to create compound id. need something more robust.
            doc['_source']['_id'] = record['id'] + '__' + record['key']; 
            // couchdb uses _id to identify documents, Backbone models use id.
            // we add this fix so backbone.Model works correctly.
            doc['_source']['id'] = doc['_source']['_id'];
          }
          query_result.total += 1;
          query_result.hits.push(doc);
        });

        // the following block is borrowed verbatim from recline.backend.Memory
        // search (with filtering, faceting, and sorting) should be factored
        // out into a separate library.
        query_result.hits = self._applyFilters(query_result.hits, queryObj);
        query_result.hits = self._applyFreeTextQuery(query_result.hits, queryObj);
        // not complete sorting!
        _.each(queryObj.sort, function(sortObj) {
          var fieldName = _.keys(sortObj)[0];
          query_result.hits = _.sortBy(query_result.hits, function(doc) {
            var _out = doc[fieldName];
            return (sortObj[fieldName].order == 'asc') ? _out : -1*_out;
          });
        });
        query_result.total  = query_result.hits.length;
        query_result.facets = self.computeFacets(query_result.hits, queryObj);
        query_result.hits = query_result.hits.slice(cdb_q.skip, cdb_q.skip + cdb_q.limit+1);
        dfd.resolve(query_result);

      });
      
      return dfd.promise();
    },

    // in place filtering
    _applyFilters: function(results, queryObj) {
      _.each(queryObj.filters, function(filter) {
        results = _.filter(results, function(doc) {
          var fieldId = _.keys(filter.term)[0];
          return (doc['_source'][fieldId] == filter.term[fieldId]);
        });
      });
      return results;
    },

    // we OR across fields but AND across terms in query string
    _applyFreeTextQuery: function(results, queryObj) {
      if (queryObj.q) {
        var terms = queryObj.q.split(' ');
        results = _.filter(results, function(rawdoc) {
          rawdoc = rawdoc['_source'];
          var matches = true;
          _.each(terms, function(term) {
            var foundmatch = false;
            //_.each(self.fields, function(field) {
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
    },

    computeFacets: function(records, queryObj) {
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
          var val = doc['_source'][fieldId];
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
    },
     

  });

}(jQuery, this.recline.Backend.CouchDB));
