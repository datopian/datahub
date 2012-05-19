// Create a dataset with a Google Docs backend and a url to the Google Doc
var dataset = new recline.Model.Dataset({
    url: 'https://docs.google.com/spreadsheet/ccc?key=0Aon3JiuouxLUdGZPaUZsMjBxeGhfOWRlWm85MmV0UUE#gid=0'
  },
  backend='gdoc'
);

// Optional - display the results in a grid
// Note how we can set this up before any data has arrived
// Views will listen for query completion and update themselves automatically
var grid = new recline.View.Grid({
  model: dataset
});
$('#my-gdocs').append(grid.el);

// Now do the query to the backend to load data
dataset.fetch().done(function() {
  dataset.query().done(function(data) {
    // The grid will update automatically
    // Log some data as an example
    if (console) {
      console.log(data);
      console.log(dataset.currentDocuments);
    }
  });
});

