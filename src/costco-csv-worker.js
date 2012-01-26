// importScripts('lib/underscore.js'); 

onmessage = function(message) {
  
  function parseCSV(rawCSV) {
    var patterns = new RegExp((
      // Delimiters.
      "(\\,|\\r?\\n|\\r|^)" +
      // Quoted fields.
      "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
      // Standard fields.
      "([^\"\\,\\r\\n]*))"
    ), "gi");

    var rows = [[]], matches = null;

    while (matches = patterns.exec(rawCSV)) {
      var delimiter = matches[1];

      if (delimiter.length && (delimiter !== ",")) rows.push([]);

      if (matches[2]) {
        var value = matches[2].replace(new RegExp("\"\"", "g"), "\"");
      } else {
        var value = matches[3];
      }
      rows[rows.length - 1].push(value);
    }

    if(_.isEqual(rows[rows.length -1], [""])) rows.pop();

    var docs = [];
    var headers = _.first(rows);
    _.each(_.rest(rows), function(row, rowIDX) {
      var doc = {};
      _.each(row, function(cell, idx) {      
        doc[headers[idx]] = cell;
      })
      docs.push(doc);
    })

    return docs;
  }
  
  var docs = parseCSV(message.data.data);
  
  var req = new XMLHttpRequest();

  req.onprogress = req.upload.onprogress = function(e) {
    if(e.lengthComputable) postMessage({ percent: (e.loaded / e.total) * 100 });
  };
  
  req.onreadystatechange = function() { if (req.readyState == 4) postMessage({done: true, response: req.responseText}) };
  req.open('POST', message.data.url);
  req.setRequestHeader('Content-Type', 'application/json');
  req.send(JSON.stringify({docs: docs}));
};
