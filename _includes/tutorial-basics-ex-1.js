// (for convenience) assume availability of jquery
// must have div with class="ex-1"
var $el = $('.ex-1');

// total number of records resulting from latest query
$el.append('Total found: ' + dataset.recordCount + '<br />');
$el.append('Total returned: ' + dataset.records.length);

$el.append('<hr />');

// get 2nd record in list (note collection indexes off 0!)
// this is an instance of a Record object
var record = dataset.records.at(1);

// if records have an id you can get by id too ...
// var record = dataset.records.get(record-id);

// To get record attribute we use 'get'
var recdate = record.get('date');

$el.append('Date is: ' + recdate);
$el.append('<hr />');

// We can also convert the Record back to simple JS object
var simple = record.toJSON();

$el.append('<h4>Record as simple object</h4>');
$el.append('<pre>' + JSON.stringify(simple, null, 2) + '</pre>');

