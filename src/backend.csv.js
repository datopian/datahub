this.recline = this.recline || {};
this.recline.Backend = this.recline.Backend || {};
this.recline.Backend.CSV = this.recline.Backend.CSV || {};

(function(my) {
  // ## fetch
  //
  // 3 options
  //
  // 1. CSV local fileobject -> HTML5 file object + CSV parser
  // 2. Already have CSV string (in data) attribute -> CSV parser
  // 2. online CSV file that is ajax-able -> ajax + csv parser
  //
  // All options generates similar data and give a memory store outcome
  my.fetch = function(dataset) {
    var dfd = $.Deferred();
    if (dataset.file) {
      var reader = new FileReader();
      var encoding = dataset.encoding || 'UTF-8';
      reader.onload = function(e) {
        var rows = my.parseCSV(e.target.result, dataset);
        dfd.resolve({
          records: rows,
          metadata: {
            filename: dataset.file.name
          },
          useMemoryStore: true
        });
      };
      reader.onerror = function (e) {
        alert('Failed to load file. Code: ' + e.target.error.code);
      };
      reader.readAsText(dataset.file, encoding);
    } else if (dataset.data) {
      var rows = my.parseCSV(dataset.data, dataset);
      dfd.resolve({
        records: rows,
        useMemoryStore: true
      });
    } else if (dataset.url) {
      $.get(dataset.url).done(function(data) {
        var rows = my.parseCSV(data, dataset);
        dfd.resolve({
          records: rows,
          useMemoryStore: true
        });
      });
    }
    return dfd.promise();
  };

  // Converts a Comma Separated Values string into an array of arrays.
  // Each line in the CSV becomes an array.
  //
  // Empty fields are converted to nulls and non-quoted numbers are converted to integers or floats.
  //
  // @return The CSV parsed as an array
  // @type Array
  // 
  // @param {String} s The string to convert
  // @param {Object} options Options for loading CSV including
  // 	  @param {Boolean} [trim=false] If set to True leading and trailing
  // 	    whitespace is stripped off of each non-quoted field as it is imported
  //	  @param {String} [delimiter=','] A one-character string used to separate
  //	    fields. It defaults to ','
  //    @param {String} [quotechar='"'] A one-character string used to quote
  //      fields containing special characters, such as the delimiter or
  //      quotechar, or which contain new-line characters. It defaults to '"'
  //
  // Heavily based on uselesscode's JS CSV parser (MIT Licensed):
  // http://www.uselesscode.org/javascript/csv/
  my.parseCSV= function(s, options) {
    // Get rid of any trailing \n
    s = chomp(s);

    var options = options || {};
    var trm = (options.trim === false) ? false : true;
    var delimiter = options.delimiter || ',';
    var quotechar = options.quotechar || '"';

    var cur = '', // The character we are currently processing.
      inQuote = false,
      fieldQuoted = false,
      field = '', // Buffer for building up the current field
      row = [],
      out = [],
      i,
      processField;

    processField = function (field) {
      if (fieldQuoted !== true) {
        // If field is empty set to null
        if (field === '') {
          field = null;
        // If the field was not quoted and we are trimming fields, trim it
        } else if (trm === true) {
          field = trim(field);
        }

        // Convert unquoted numbers to their appropriate types
        if (rxIsInt.test(field)) {
          field = parseInt(field, 10);
        } else if (rxIsFloat.test(field)) {
          field = parseFloat(field, 10);
        }
      }
      return field;
    };

    for (i = 0; i < s.length; i += 1) {
      cur = s.charAt(i);

      // If we are at a EOF or EOR
      if (inQuote === false && (cur === delimiter || cur === "\n")) {
	field = processField(field);
        // Add the current field to the current row
        row.push(field);
        // If this is EOR append row to output and flush row
        if (cur === "\n") {
          out.push(row);
          row = [];
        }
        // Flush the field buffer
        field = '';
        fieldQuoted = false;
      } else {
        // If it's not a quotechar, add it to the field buffer
        if (cur !== quotechar) {
          field += cur;
        } else {
          if (!inQuote) {
            // We are not in a quote, start a quote
            inQuote = true;
            fieldQuoted = true;
          } else {
            // Next char is quotechar, this is an escaped quotechar
            if (s.charAt(i + 1) === quotechar) {
              field += quotechar;
              // Skip the next char
              i += 1;
            } else {
              // It's not escaping, so end quote
              inQuote = false;
            }
          }
        }
      }
    }

    // Add the last field
    field = processField(field);
    row.push(field);
    out.push(row);

    return out;
  };

  // ### serializeCSV
  // 
  // Convert an Object or a simple array of arrays into a Comma
  // Separated Values string.
  //
  // Nulls are converted to empty fields and integers or floats are converted to non-quoted numbers.
  //
  // @return The array serialized as a CSV
  // @type String
  // 
  // @param {Object or Array} dataToSerialize The Object or array of arrays to convert. Object structure must be as follows:
  //
  //     {
  //       fields: [ {id: .., ...}, {id: ..., 
  //       records: [ { record }, { record }, ... ]
  //       ... // more attributes we do not care about
  //     }
  // 
  // @param {object} options Options for serializing the CSV file including
  //   delimiter and quotechar (see parseCSV options parameter above for
  //   details on these).
  //
  // Heavily based on uselesscode's JS CSV serializer (MIT Licensed):
  // http://www.uselesscode.org/javascript/csv/
  my.serializeCSV= function(dataToSerialize, options) {
    var a = null;
    if (dataToSerialize instanceof Array) {
      a = dataToSerialize;
    } else {
      a = [];
      var fieldNames = _.pluck(dataToSerialize.fields, 'id');
      a.push(fieldNames);
      _.each(dataToSerialize.records, function(record, index) {
        var tmp = _.map(fieldNames, function(fn) {
          return record[fn];
        });
        a.push(tmp);
      });
    }
    var options = options || {};
    var delimiter = options.delimiter || ',';
    var quotechar = options.quotechar || '"';

    var cur = '', // The character we are currently processing.
      field = '', // Buffer for building up the current field
      row = '',
      out = '',
      i,
      j,
      processField;

    processField = function (field) {
      if (field === null) {
        // If field is null set to empty string
        field = '';
      } else if (typeof field === "string" && rxNeedsQuoting.test(field)) {
        // Convert string to delimited string
        field = quotechar + field + quotechar;
      } else if (typeof field === "number") {
        // Convert number to string
        field = field.toString(10);
      }

      return field;
    };

    for (i = 0; i < a.length; i += 1) {
      cur = a[i];

      for (j = 0; j < cur.length; j += 1) {
        field = processField(cur[j]);
        // If this is EOR append row to output and flush row
        if (j === (cur.length - 1)) {
          row += field;
          out += row + "\n";
          row = '';
        } else {
          // Add the current field to the current row
          row += field + delimiter;
        }
        // Flush the field buffer
        field = '';
      }
    }

    return out;
  };

  var rxIsInt = /^\d+$/,
    rxIsFloat = /^\d*\.\d+$|^\d+\.\d*$/,
    // If a string has leading or trailing space,
    // contains a comma double quote or a newline
    // it needs to be quoted in CSV output
    rxNeedsQuoting = /^\s|\s$|,|"|\n/,
    trim = (function () {
      // Fx 3.1 has a native trim function, it's about 10x faster, use it if it exists
      if (String.prototype.trim) {
        return function (s) {
          return s.trim();
        };
      } else {
        return function (s) {
          return s.replace(/^\s*/, '').replace(/\s*$/, '');
        };
      }
    }());

  function chomp(s) {
    if (s.charAt(s.length - 1) !== "\n") {
      // Does not end with \n, just return string
      return s;
    } else {
      // Remove the \n
      return s.substring(0, s.length - 1);
    }
  }


}(this.recline.Backend.CSV));
