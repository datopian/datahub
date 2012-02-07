// # Recline Backends
//
// Backends are connectors to backend data sources and stores
//
// Backends are implemented as Backbone models but this is just a
// convenience (they do not save or load themselves from any remote
// source)
this.recline = this.recline || {};
this.recline.Model = this.recline.Model || {};

(function($, my) {
  // ## Convenience function
  my.setBackend = function(backend) {
    Backbone.sync = backend.sync;
  };

  // ## BackendMemory - uses in-memory data
  my.BackendMemory = Backbone.Model.extend({
    // Initialize a Backend with a local in-memory dataset.
    // 
    // NB: We can handle one and only one dataset at a time.
    //
    // :param dataset: the data for a dataset on which operations will be
    // performed. Its form should be a hash with metadata and data
    // attributes.
    //
    // - metadata: hash of key/value attributes of any kind (but usually with title attribute)
    // - data: hash with 2 keys:
    //  - headers: list of header names/labels
    //  - rows: list of hashes, each hash being one row. A row *must* have an id attribute which is unique.
    //
    //  Example of data:
    // 
    //        {
    //            headers: ['x', 'y', 'z']
    //          , rows: [
    //              {id: 0, x: 1, y: 2, z: 3}
    //            , {id: 1, x: 2, y: 4, z: 6}
    //          ]
    //        };
    initialize: function(dataset) {
      // deep copy
      this._datasetAsData = $.extend(true, {}, dataset);
      _.bindAll(this, 'sync');
    }, 
      getDataset: function() {
        var dataset = new my.Dataset({
          id: this._datasetAsData.metadata.id
        });
        // this is a bit weird but problem is in sync this is set to parent model object so need to give dataset a reference to backend explicitly
        dataset.backend = this;
        return dataset;
      },
      sync: function(method, model, options) {
        var self = this;
        if (method === "read") {
          var dfd = $.Deferred();
          // this switching on object type is rather horrible
          // think may make more sense to do work in individual objects rather than in central Backbone.sync
          if (model.__type__ == 'Dataset') {
            var dataset = model;
            var rawDataset = this._datasetAsData;
            dataset.set(rawDataset.metadata);
            dataset.set({
              headers: rawDataset.data.headers
            });
            dataset.docCount = rawDataset.data.rows.length;
            dfd.resolve(dataset);
          }
          return dfd.promise();
        } else if (method === 'update') {
          var dfd = $.Deferred();
          if (model.__type__ == 'Document') {
            _.each(this._datasetAsData.data.rows, function(row, idx) {
              if(row.id === model.id) {
                self._datasetAsData.data.rows[idx] = model.toJSON();
              }
            });
            dfd.resolve(model);
          }
          return dfd.promise();
        } else if (method === 'delete') {
          var dfd = $.Deferred();
          if (model.__type__ == 'Document') {
            this._datasetAsData.data.rows = _.reject(this._datasetAsData.data.rows, function(row) {
              return (row.id === model.id);
            });
            dfd.resolve(model);
          }
          return dfd.promise();
        } else {
          alert('Not supported: sync on BackendMemory with method ' + method + ' and model ' + model);
        }
      },
      getDocuments: function(datasetId, numRows, start) {
        if (start === undefined) {
          start = 0;
        }
        if (numRows === undefined) {
          numRows = 10;
        }
        var dfd = $.Deferred();
        rows = this._datasetAsData.data.rows;
        var results = rows.slice(start, start+numRows);
        dfd.resolve(results);
        return dfd.promise();
      }
  });

  // ## Webstore Backend for connecting to the Webstore
  //
  // Initializing model argument must contain a url attribute pointing to
  // relevant Webstore table.
  //
  // Designed to only attach to one dataset and one dataset only ...
  // Could generalize to support attaching to different datasets
  my.BackendWebstore = Backbone.Model.extend({
    getDataset: function(id) {
      var dataset = new my.Dataset({
        id: id
      });
      dataset.backend = this;
      return dataset;
    },
    sync: function(method, model, options) {
      if (method === "read") {
        // this switching on object type is rather horrible
        // think may make more sense to do work in individual objects rather than in central Backbone.sync
        if (this.__type__ == 'Dataset') {
          var dataset = this;
          // get the schema and return
          var base = this.backend.get('url');
          var schemaUrl = base + '/schema.json';
          var jqxhr = $.ajax({
            url: schemaUrl,
              dataType: 'jsonp',
              jsonp: '_callback'
          });
          var dfd = $.Deferred();
          jqxhr.then(function(schema) {
            headers = _.map(schema.data, function(item) {
              return item.name;
            });
            dataset.set({
              headers: headers
            });
            dataset.docCount = schema.count;
            dfd.resolve(dataset, jqxhr);
          });
          return dfd.promise();
        }
      }
    },
    getDocuments: function(datasetId, numRows, start) {
      if (start === undefined) {
        start = 0;
      }
      if (numRows === undefined) {
        numRows = 10;
      }
      var base = this.get('url');
      var jqxhr = $.ajax({
        url: base + '.json?_limit=' + numRows,
          dataType: 'jsonp',
          jsonp: '_callback',
          cache: true
      });
      var dfd = $.Deferred();
      jqxhr.then(function(results) {
        dfd.resolve(results.data);
      });
      return dfd.promise();
    }
  });

  // ## DataProxy Backend for connecting to the DataProxy
  //
  // Example initialization:
  //
  //     BackendDataProxy({
  //       model: {
  //         url: {url-of-data-to-proxy},
  //         type: xls || csv,
  //         format: json || jsonp # return format (defaults to jsonp)
  //         dataproxy: {url-to-proxy} # defaults to http://jsonpdataproxy.appspot.com
  //       }
  //     })
  my.BackendDataProxy = Backbone.Model.extend({
    defaults: {
      dataproxy: 'http://jsonpdataproxy.appspot.com'
    , type: 'csv'
    , format: 'jsonp'
    },
    getDataset: function(id) {
      var dataset = new my.Dataset({
        id: id
      });
      dataset.backend = this;
      return dataset;
    },
    sync: function(method, model, options) {
      if (method === "read") {
        // this switching on object type is rather horrible
        // think may make more sense to do work in individual objects rather than in central Backbone.sync
        if (this.__type__ == 'Dataset') {
          var dataset = this;
          // get the schema and return
          var base = this.backend.get('dataproxy');
          var data = this.backend.toJSON();
          delete data['dataproxy'];
          // TODO: should we cache for extra efficiency
          data['max-results'] = 1;
          var jqxhr = $.ajax({
            url: base
            , data: data
            , dataType: 'jsonp'
          });
          var dfd = $.Deferred();
          jqxhr.then(function(results) {
            dataset.set({
              headers: results.fields
            });
            dfd.resolve(dataset, jqxhr);
          });
          return dfd.promise();
        }
      } else {
        alert('This backend only supports read operations');
      }
    },
    getDocuments: function(datasetId, numRows, start) {
      if (start === undefined) {
        start = 0;
      }
      if (numRows === undefined) {
        numRows = 10;
      }
      var base = this.get('dataproxy');
      var data = this.toJSON();
      delete data['dataproxy'];
      data['max-results'] = numRows;
      var jqxhr = $.ajax({
        url: base
        , data: data
        , dataType: 'jsonp'
      });
      var dfd = $.Deferred();
      jqxhr.then(function(results) {
        var _out = _.map(results.data, function(row) {
          var tmp = {};
          _.each(results.fields, function(key, idx) {
            tmp[key] = row[idx];
          });
          return tmp;
        });
        dfd.resolve(_out);
      });
      return dfd.promise();
    }
  });


  // ## Google spreadsheet backend
  // 
  //
  my.BackendGDoc = Backbone.Model.extend({
    getDataset: function(id) {
      var dataset = new my.Dataset({
        id: id
      });
      dataset.backend = this;
      return dataset;
    }, 
    sync: function(method, model, options) {
      if (method === "read") { 
        console.log('fetching data from url', model.backend.get('url')); 
        var dfd = $.Deferred(); 
        var dataset = this;

        $.getJSON(model.backend.get('url'), function(d) {
          result = model.backend.gdocsToJavascript(d);
          model.set({'headers': result.header});
          model.backend.set({'data': result.data, 'headers': result.header});
          dfd.resolve(model);
        })

        return dfd.promise(); }
    },

    getDocuments: function(datasetId, start, numRows) { 
      var dfd = $.Deferred();
      var fields = this.get('headers');

      // zip the field headers with the data rows to produce js objs
      // TODO: factor this out as a common method with other backends
      var objs = _.map(this.get('data'), function (d) { 
        var obj = {};
        _.each(_.zip(fields, d), function (x) { obj[x[0]] = x[1]; })
        return obj;
      });
      dfd.resolve(objs);
      return dfd;
    },
    gdocsToJavascript:  function(gdocsSpreadsheet) {
      /*
         :options: (optional) optional argument dictionary:
         columnsToUse: list of columns to use (specified by header names)
         colTypes: dictionary (with column names as keys) specifying types (e.g. range, percent for use in conversion).
         :return: tabular data object (hash with keys: header and data).

         Issues: seems google docs return columns in rows in random order and not even sure whether consistent across rows.
         */
      var options = {};
      if (arguments.length > 1) {
        options = arguments[1];
      }
      var results = {
        'header': [],
        'data': []
      };
      // default is no special info on type of columns
      var colTypes = {};
      if (options.colTypes) {
        colTypes = options.colTypes;
      }
      // either extract column headings from spreadsheet directly, or used supplied ones
      if (options.columnsToUse) {
        // columns set to subset supplied
        results.header = options.columnsToUse;
      } else {
        // set columns to use to be all available
        if (gdocsSpreadsheet.feed.entry.length > 0) {
          for (var k in gdocsSpreadsheet.feed.entry[0]) {
            if (k.substr(0, 3) == 'gsx') {
              var col = k.substr(4)
                results.header.push(col);
            }
          }
        }
      }

      // converts non numberical values that should be numerical (22.3%[string] -> 0.223[float])
      var rep = /^([\d\.\-]+)\%$/;
      $.each(gdocsSpreadsheet.feed.entry, function (i, entry) {
        var row = [];
        for (var k in results.header) {
          var col = results.header[k];
          var _keyname = 'gsx$' + col;
          var value = entry[_keyname]['$t'];
          // if labelled as % and value contains %, convert
          if (colTypes[col] == 'percent') {
            if (rep.test(value)) {
              var value2 = rep.exec(value);
              var value3 = parseFloat(value2);
              value = value3 / 100;
            }
          }
          row.push(value);
        }
        results.data.push(row);
      });
      return results;
    }

  });
}(jQuery, this.recline.Model));
