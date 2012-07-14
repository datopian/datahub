this.recline = this.recline || {};
this.recline.Backend = this.recline.Backend || {};
this.recline.Backend.Memory = this.recline.Backend.Memory || {};

(function($, my) {
  my.__type__ = 'memory';

  // ## Data Wrapper
  //
  // Turn a simple array of JS objects into a mini data-store with
  // functionality like querying, faceting, updating (by ID) and deleting (by
  // ID).
  //
  // @param data list of hashes for each record/row in the data ({key:
  // value, key: value})
  // @param fields (optional) list of field hashes (each hash defining a field
  // as per recline.Model.Field). If fields not specified they will be taken
  // from the data.
  my.Store = function(data, fields) {
    var self = this;
    this.data = data;
    if (fields) {
      this.fields = fields;
    } else {
      if (data) {
        this.fields = _.map(data[0], function(value, key) {
          return {id: key};
        });
      }
    }

    this.update = function(doc) {
      _.each(self.data, function(internalDoc, idx) {
        if(doc.id === internalDoc.id) {
          self.data[idx] = doc;
        }
      });
    };

    this.delete = function(doc) {
      var newdocs = _.reject(self.data, function(internalDoc) {
        return (doc.id === internalDoc.id);
      });
      this.data = newdocs;
    };

    this.save = function(changes, dataset) {
      var self = this;
      var dfd = $.Deferred();
      // TODO _.each(changes.creates) { ... }
      _.each(changes.updates, function(record) {
        self.update(record);
      });
      _.each(changes.deletes, function(record) {
        self.delete(record);
      });
      dfd.resolve();
      return dfd.promise();
    },

    this.query = function(queryObj) {
      var dfd = $.Deferred();
      var numRows = queryObj.size || this.data.length;
      var start = queryObj.from || 0;
      var results = this.data;
      results = this._applyFilters(results, queryObj);
      results = this._applyFreeTextQuery(results, queryObj);
      // not complete sorting!
      _.each(queryObj.sort, function(sortObj) {
        var fieldName = _.keys(sortObj)[0];
        results = _.sortBy(results, function(doc) {
          var _out = doc[fieldName];
          return _out;
        });
        if (sortObj[fieldName].order == 'desc') {
          results.reverse();
        }
      });
      var facets = this.computeFacets(results, queryObj);
      var out = {
        total: results.length,
        hits: results.slice(start, start+numRows),
        facets: facets
      };
      dfd.resolve(out);
      return dfd.promise();
    };

    // in place filtering
    this._applyFilters = function(results, queryObj) {
      _.each(queryObj.filters, function(filter) {
        // if a term filter ...
        if (filter.type === 'term') {
          results = _.filter(results, function(doc) {
            return (doc[filter.field] == filter.term);
          });
        }
      });
      return results;
    };

    // we OR across fields but AND across terms in query string
    this._applyFreeTextQuery = function(results, queryObj) {
      if (queryObj.q) {
        var terms = queryObj.q.split(' ');
        results = _.filter(results, function(rawdoc) {
          var matches = true;
          _.each(terms, function(term) {
            var foundmatch = false;
            _.each(self.fields, function(field) {
              var value = rawdoc[field.id];
              if (value !== null) { 
                value = value.toString();
              } else {
                // value can be null (apparently in some cases)
                value = '';
              }
              // TODO regexes?
              foundmatch = foundmatch || (value.toLowerCase() === term.toLowerCase());
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

    this.computeFacets = function(records, queryObj) {
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

    this.transform = function(editFunc) {
      var toUpdate = recline.Data.Transform.mapDocs(this.data, editFunc);
      // TODO: very inefficient -- could probably just walk the documents and updates in tandem and update
      _.each(toUpdate.updates, function(record, idx) {
        self.data[idx] = record;
      });
      return this.save(toUpdate);
    };
  };

}(jQuery, this.recline.Backend.Memory));
