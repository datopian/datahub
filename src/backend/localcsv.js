this.recline = this.recline || {};
this.recline.Backend = this.recline.Backend || {};

(function($, my) {
  my.loadFromCSVFile = function(file) {
    var metadata = {
      id: file.name,
      file: file
    };
    var reader = new FileReader();
    // TODO
    reader.onload = function(e) {
      // console.log(e.target.result);
    };
    reader.onerror = function (e) {
      alert('Failed to load file. Code: ' + e.target.error.code);
    }
    reader.readAsText(file);
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
	// @param {Boolean} [trm=false] If set to True leading and trailing whitespace is stripped off of each non-quoted field as it is imported
  //
  // Heavily based on uselesscode's JS CSV parser (MIT Licensed):
  // thttp://www.uselesscode.org/javascript/csv/
	my.parseCSV= function(s, trm) {
		// Get rid of any trailing \n
		s = chomp(s);

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
			if (inQuote === false && (cur === ',' || cur === "\n")) {
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
				// If it's not a ", add it to the field buffer
				if (cur !== '"') {
					field += cur;
				} else {
					if (!inQuote) {
						// We are not in a quote, start a quote
						inQuote = true;
						fieldQuoted = true;
					} else {
						// Next char is ", this is an escaped "
						if (s.charAt(i + 1) === '"') {
							field += '"';
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


}(jQuery, this.recline.Backend));
