/**
 * Generates a CSV from all the rows in the view.
 *
 * Takes in a url encoded array of headers as an argument. You can
 * generate this by querying /_list/urlencode/headers. Pass it in
 * as the headers get parameter, e.g.: ?headers=%5B%22_id%22%2C%22_rev%5D
 *
 * @author Max Ogden
 */
function(head, req) {  
  if ('headers' in req.query) {
    var headers = eval(unescape(req.query.headers.split(',')));
    var row, sep = '\n', headerSent = false, startedOutput = false;
    
    start({"headers":{"Content-Type" : "text/x-csv"}});
    send(headers.join(',') + "\n");
    while (row = getRow()) {
      for (var header in headers) {
        if (row.value[headers[header]]) {
          if (startedOutput) send(",");
          send("\"" + row.value[headers[header]] + "\"");
        } else {
          if (startedOutput) send(",");
        } 
        startedOutput = true;
      }
      startedOutput = false;
      send('\n');
    }
  } else {
    send("You must pass in the urlencoded headers you wish to build the CSV from. Query /_list/urlencode/headers");
  }
};
