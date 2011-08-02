importScripts('lib/underscore.js'); 

onmessage = function(message) {
  var rows = message.data.data.split('\n');
  var docs = [];
  _.each(rows, function(row) {
    if (row.length == 0) return;
    var doc = {};
    _.each(row.split(','), function(field, index) { doc['field' + index] = field });
    docs.push(doc);
  })
  var req = new XMLHttpRequest();
  req.onreadystatechange = function() { 
    if (req.readyState == 4) postMessage(JSON.stringify({done: true}))
  };
  req.onprogress = function(e) {
    if (e.lengthComputable) {
      var percentComplete = (e.loaded / e.total) * 100;
      postMessage(JSON.stringify({percent: percentComplete}));
    }
  }
  req.open('POST', message.data.url);
  req.setRequestHeader('Content-Type', 'application/json');
  req.send(JSON.stringify({docs: docs}));
};
