// the file input
var $file = $('.my-file-input')[0];

// listen for the file to be submitted
$($file).change(function(e) {
  // create the dataset in the usual way but specifying file attribute
  var dataset = new recline.Model.Dataset({
    file: $file.files[0],
    backend: 'csv'
  });

  // now load - note that this is again async (HTML5 File API is async)
  // dataset.fetch().done(function() { console.log('here'); });
  dataset.fetch();

  // For demonstrations purposes display the data in a grid
  var grid = new recline.View.Grid({
    model: dataset
  });
  $('#my-csv-disk').append(grid.el);
});

