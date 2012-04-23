this.recline = this.recline || {};
this.recline.Backend = this.recline.Backend || {};

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
  my.GDoc = my.Base.extend({
    __type__: 'gdoc',
    readonly: true,
    getUrl: function(dataset) {
      var url = dataset.get('url');
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
    },
    sync: function(method, model, options) {
      var self = this;
      if (method === "read") { 
        var dfd = $.Deferred(); 
        var dataset = model;

        var url = this.getUrl(model);

        $.getJSON(url, function(d) {
          result = self.gdocsToJavascript(d);
          model.fields.reset(_.map(result.field, function(fieldId) {
              return {id: fieldId};
            })
          );
          // cache data onto dataset (we have loaded whole gdoc it seems!)
          model._dataCache = result.data;
          dfd.resolve(model);
        });
        return dfd.promise();
      }
    },

    query: function(dataset, queryObj) { 
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
      dfd.resolve(this._docsToQueryResult(objs));
      return dfd;
    },
    gdocsToJavascript:  function(gdocsSpreadsheet) {
      /*
         :options: (optional) optional argument dictionary:
         columnsToUse: list of columns to use (specified by field names)
         colTypes: dictionary (with column names as keys) specifying types (e.g. range, percent for use in conversion).
         :return: tabular data object (hash with keys: field and data).

         Issues: seems google docs return columns in rows in random order and not even sure whether consistent across rows.
         */
      var options = {};
      if (arguments.length > 1) {
        options = arguments[1];
      }
      var results = {
        'field': [],
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
        results.field = options.columnsToUse;
      } else {
        // set columns to use to be all available
        if (gdocsSpreadsheet.feed.entry.length > 0) {
          for (var k in gdocsSpreadsheet.feed.entry[0]) {
            if (k.substr(0, 3) == 'gsx') {
              var col = k.substr(4);
              results.field.push(col);
            }
          }
        }
      }

      // converts non numberical values that should be numerical (22.3%[string] -> 0.223[float])
      var rep = /^([\d\.\-]+)\%$/;
      $.each(gdocsSpreadsheet.feed.entry, function (i, entry) {
        var row = [];
        for (var k in results.field) {
          var col = results.field[k];
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

}(jQuery, this.recline.Backend));

