/**
 * Generates a simple array of json objects representing each doc in the db
 * @author Max Ogden
 */
 function(head, req) {
     var row, out, sep = '\n';

     start({"headers":{"Content-Type" : "application/json"}});

     if ('callback' in req.query) send(req.query['callback'] + "(");

     send('{');
     while ((row = getRow())) {
       for (var header in row.value) {
         if (row.value[header]) {
           var value = row.value[header];
           if (typeof(value) == "object") {
             row.value[header] = "\"" + JSON.stringify(value) + "\"";
           }
         }
       }
       send(sep + '"":' + JSON.stringify(row.value));
       sep = ',\n';
     }
     send("]");
     if ('callback' in req.query) send(")");

 };