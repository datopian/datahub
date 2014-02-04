this.recline = this.recline || {};
this.recline.Backend = this.recline.Backend || {};
this.recline.Backend.Memory = this.recline.Backend.Memory || {};

(function(my) {
  "use strict";
  my.__type__ = 'memory';

  // private data - use either jQuery or Underscore Deferred depending on what is available
  var Deferred = (typeof jQuery !== "undefined" && jQuery.Deferred) || _.Deferred;

  // ## Data Wrapper
  //
  // Turn a simple array of JS objects into a mini data-store with
  // functionality like querying, faceting, updating (by ID) and deleting (by
  // ID).
  //
  // @param records list of hashes for each record/row in the data ({key:
  // value, key: value})
  // @param fields (optional) list of field hashes (each hash defining a field
  // as per recline.Model.Field). If fields not specified they will be taken
  // from the data.
  my.Store = function(records, fields) {
    var self = this;
    this.records = records;
    // backwards compatability (in v0.5 records was named data)
    this.data = this.records;
    if (fields) {
      this.fields = fields;
    } else {
      if (records) {
        this.fields = _.map(records[0], function(value, key) {
          return {id: key, type: 'string'};
        });
      }
    }

    this.update = function(doc) {
      _.each(self.records, function(internalDoc, idx) {
        if(doc.id === internalDoc.id) {
          self.records[idx] = doc;
        }
      });
    };

    this.remove = function(doc) {
      var newdocs = _.reject(self.records, function(internalDoc) {
        return (doc.id === internalDoc.id);
      });
      this.records = newdocs;
    };

    this.save = function(changes, dataset) {
      var self = this;
      var dfd = new Deferred();
      // TODO _.each(changes.creates) { ... }
      _.each(changes.updates, function(record) {
        self.update(record);
      });
      _.each(changes.deletes, function(record) {
        self.remove(record);
      });
      dfd.resolve();
      return dfd.promise();
    },

    this.query = function(queryObj) {
      var dfd = new Deferred();
      var numRows = queryObj.size || this.records.length;
      var start = queryObj.from || 0;
      var results = this.records;
      
      results = this._applyFilters(results, queryObj);
      results = this._applyFreeTextQuery(results, queryObj);

      // TODO: this is not complete sorting!
      // What's wrong is we sort on the *last* entry in the sort list if there are multiple sort criteria
      _.each(queryObj.sort, function(sortObj) {
        var fieldName = sortObj.field;
        results = _.sortBy(results, function(doc) {
          var _out = doc[fieldName];
          return _out;
        });
        if (sortObj.order == 'desc') {
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
      var filters = queryObj.filters;
      // register filters
      var filterFunctions = {
        term         : term,
        terms        : terms,
        range        : range,
        geo_distance : geo_distance
      };
      var dataParsers = {
        integer: function (e) { return parseFloat(e, 10); },
        'float': function (e) { return parseFloat(e, 10); },
        number: function (e) { return parseFloat(e, 10); },
        string : function (e) { return e.toString(); },
        date   : function (e) { return moment(e).valueOf(); },
        datetime   : function (e) { return new Date(e).valueOf(); }
      };
      var keyedFields = {};
      _.each(self.fields, function(field) {
        keyedFields[field.id] = field;
      });
      function getDataParser(filter) {
        var fieldType = keyedFields[filter.field].type || 'string';
        return dataParsers[fieldType];
      }

      // filter records
      return _.filter(results, function (record) {
        var passes = _.map(filters, function (filter) {
          return filterFunctions[filter.type](record, filter);
        });

        // return only these records that pass all filters
        return _.all(passes, _.identity);
      });

      // filters definitions
      function term(record, filter) {
        var parse = getDataParser(filter);
        var value = parse(record[filter.field]);
        var term  = parse(filter.term);

        return (value === term);
      }

      function terms(record, filter) {
        var parse = getDataParser(filter);
        var value = parse(record[filter.field]);
        var terms  = parse(filter.terms).split(",");

        return (_.indexOf(terms, value) >= 0);
      }

      function range(record, filter) {
        var fromnull = (_.isUndefined(filter.from) || filter.from === null || filter.from === '');
        var tonull = (_.isUndefined(filter.to) || filter.to === null || filter.to === '');
        var parse = getDataParser(filter);
        var value = parse(record[filter.field]);
        var from = parse(fromnull ? '' : filter.from);
        var to  = parse(tonull ? '' : filter.to);

        // if at least one end of range is set do not allow '' to get through
        // note that for strings '' <= {any-character} e.g. '' <= 'a'
        if ((!fromnull || !tonull) && value === '') {
          return false;
        }
        return ((fromnull || value >= from) && (tonull || value <= to));
      }

      function geo_distance() {
        // TODO code here
      }
    };

    // we OR across fields but AND across terms in query string
    this._applyFreeTextQuery = function(results, queryObj) {
      if (queryObj.q) {
        var terms = queryObj.q.split(' ');
        var patterns=_.map(terms, function(term) {
          return new RegExp(term.toLowerCase());
        });
        results = _.filter(results, function(rawdoc) {
          var matches = true;
          _.each(patterns, function(pattern) {
            var foundmatch = false;
            _.each(self.fields, function(field) {
              var value = rawdoc[field.id];
              if ((value !== null) && (value !== undefined)) { 
                value = value.toString();
              } else {
                // value can be null (apparently in some cases)
                value = '';
              }
              // TODO regexes?
              foundmatch = foundmatch || (pattern.test(value.toLowerCase()));
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
  };

}(this.recline.Backend.Memory));
