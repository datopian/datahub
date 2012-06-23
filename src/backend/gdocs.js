this.recline = this.recline || {};
this.recline.Backend = this.recline.Backend || {};
this.recline.Backend.GDocs = this.recline.Backend.GDocs || {};

(function($, my) {
  my.__type__ = 'gdocs';

  // ## Google spreadsheet backend
  // 
  // Fetch data from a Google Docs spreadsheet.
  //
  // Dataset must have a url attribute pointing to the Gdocs or its JSON feed e.g.
  // <pre>
  // var dataset = new recline.Model.Dataset({
  //     url: 'https://docs.google.com/spreadsheet/ccc?key=0Aon3JiuouxLUdGlQVDJnbjZRSU1tUUJWOUZXRG53VkE#gid=0'
  //   },
  //   'gdocs'
  // );
  //
  // var dataset = new recline.Model.Dataset({
  //     url: 'https://spreadsheets.google.com/feeds/list/0Aon3JiuouxLUdDQwZE1JdV94cUd6NWtuZ0IyWTBjLWc/od6/public/values?alt=json'
  //   },
  //   'gdocs'
  // );
  // </pre>
  //
  // @return object with two attributes
  //
  // * fields: array of Field objects
  // * records: array of objects for each row
  my.fetch = function(dataset) {
    var dfd = $.Deferred(); 
    var url = my.getSpreadsheetAPIUrl(dataset.url);
    $.getJSON(url, function(d) {
      result = my.parseData(d);
      var fields = _.map(result.fields, function(fieldId) {
        return {id: fieldId};
      });
      dfd.resolve({
        records: result.records,
        fields: fields,
        useMemoryStore: true
      });
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
      fields: [],
      records: []
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
    results.records = _.map(gdocsSpreadsheet.feed.entry, function(entry) {
      var row = {};
      _.each(results.fields, function(col) {
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
        row[col] = value;
      });
      return row;
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

