this.recline = this.recline || {};
this.recline.Backend = this.recline.Backend || {};
this.recline.Backend.GDocs = this.recline.Backend.GDocs || {};

(function($, my) {

  // ## Google spreadsheet backend
  // 
  // Connect to Google Docs spreadsheet.
  //
  // Dataset must have a url attribute pointing to the Gdocs
  // spreadsheet's JSON feed e.g.
  //
  // <pre>
  // var dataset = new recline.Model.Dataset({
  //     url: 'https://spreadsheets.google.com/feeds/list/0Aon3JiuouxLUdDQwZE1JdV94cUd6NWtuZ0IyWTBjLWc/od6/public/values?alt=json'
  //   },
  //   'gdocs'
  // );
  // </pre>
  my.Backbone = function() {
    this.__type__ = 'gdocs';
    this.readonly = true;

    this.sync = function(method, model, options) {
      var self = this;
      if (method === "read") { 
        var dfd = $.Deferred(); 
        loadData(model.get('url')).done(function(result) {
          model.fields.reset(result.fields);
          // cache data onto dataset (we have loaded whole gdoc it seems!)
          model._dataCache = result.data;
          dfd.resolve(model);
        });
        return dfd.promise();
      }
    };

    this.query = function(dataset, queryObj) { 
      var dfd = $.Deferred();
      var fields = _.pluck(dataset.fields.toJSON(), 'id');

      // zip the fields with the data rows to produce js objs
      // TODO: factor this out as a common method with other backends
      var objs = _.map(dataset._dataCache, function (d) { 
        var obj = {};
        _.each(_.zip(fields, d), function (x) {
          obj[x[0]] = x[1];
        });
        return obj;
      });
      var out = {
        total: objs.length,
        hits: _.map(objs, function(row) {
          return { _source: row }
        })
      }
      dfd.resolve(out);
      return dfd;
    };
  };

  // ## loadData
  //
  // loadData from a google docs URL
  //
  // @return object with two attributes
  //
  // * fields: array of objects
  // * data: array of arrays
  var loadData = function(url) {
    var dfd = $.Deferred(); 
    var url = my.getSpreadsheetAPIUrl(url);
    var out = {
      fields: [],
      data: []
    }
    $.getJSON(url, function(d) {
      result = my.parseData(d);
      result.fields = _.map(result.fields, function(fieldId) {
          return {id: fieldId};
      });
      dfd.resolve(result);
    });
    return dfd.promise();
  };

  // ## parseData
  //
  // Parse data from Google Docs API into a reasonable form
  //
  // :options: (optional) optional argument dictionary:
  // columnsToUse: list of columns to use (specified by field names)
  // colTypes: dictionary (with column names as keys) specifying types (e.g. range, percent for use in conversion).
  // :return: tabular data object (hash with keys: field and data).
  // 
  // Issues: seems google docs return columns in rows in random order and not even sure whether consistent across rows.
  my.parseData = function(gdocsSpreadsheet) {
    var options = {};
    if (arguments.length > 1) {
      options = arguments[1];
    }
    var results = {
      'fields': [],
      'data': []
    };
    // default is no special info on type of columns
    var colTypes = {};
    if (options.colTypes) {
      colTypes = options.colTypes;
    }
    if (gdocsSpreadsheet.feed.entry.length > 0) {
      for (var k in gdocsSpreadsheet.feed.entry[0]) {
        if (k.substr(0, 3) == 'gsx') {
          var col = k.substr(4);
          results.fields.push(col);
        }
      }
    }

    // converts non numberical values that should be numerical (22.3%[string] -> 0.223[float])
    var rep = /^([\d\.\-]+)\%$/;
    $.each(gdocsSpreadsheet.feed.entry, function (i, entry) {
      var row = [];
      for (var k in results.fields) {
        var col = results.fields[k];
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
  };

  // Convenience function to get GDocs JSON API Url from standard URL
  my.getSpreadsheetAPIUrl = function(url) {
    if (url.indexOf('feeds/list') != -1) {
      return url;
    } else {
      // https://docs.google.com/spreadsheet/ccc?key=XXXX#gid=0
      var regex = /.*spreadsheet\/ccc?.*key=([^#?&+]+).*/;
      var matches = url.match(regex);
      if (matches) {
        var key = matches[1];
        var worksheet = 1;
        var out = 'https://spreadsheets.google.com/feeds/list/' + key + '/' + worksheet + '/public/values?alt=json';
        return out;
      } else {
        alert('Failed to extract gdocs key from ' + url);
      }
    }
  };
}(jQuery, this.recline.Backend.GDocs));

