// must have a div with class="ex-1"
var $el = $('.ex-2');

// query with text 'UK' - this will attempt to match any field for UK
// Also limit the query to return a maximum of 2 results using the size attribute 

// query function has asynchronous behaviour and returns a promise object
// (even for the case of in memory data where querying in fact happens synchronously)
// On completion the display function will be called
dataset.query({q: 'UK', size: 2}).done(function() {
  $('.ex-2').append('Total found: ' + dataset.recordCount);
  $('.ex-2').append(' Total returned: ' + dataset.records.length);
  $('.ex-2').append(
    $('<pre />').html(
      JSON.stringify(dataset.records.toJSON(), null, 2)
    )
  );
});

