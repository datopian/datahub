// (for convenience) assume availability of jquery
// must have div with class="ex-1"
var $el = $('.ex-1');

// we will define this function display so we can reuse it below!
function display(dataset) {
  // total number of records resulting from latest query
  $el.append('Total found: ' + dataset.recordCount + '<br />');
  $el.append('Total returned: ' + dataset.currentRecords.length);

  $el.append('<hr />');

  // dataset.currentRecords is a Backbone Collection of Records that resulted from latest query (hence "current")
  // Get the first record in the list - it returns an instance of the Record object
  var record = dataset.currentRecords.at(0);

  // Use the summary helper method which produces proper html
  // You could also do record.toJSON() to get a hash of the record data
  $el.append(dataset.recordSummary(record));
}

// now display our existing dataset ...
display(dataset);

