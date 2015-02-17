// Create the dataset in the usual way
// Note the additional options you can specify for parsing the CSV file
var dataset = new recline.Model.Dataset({
  url: '{{page.root}}demos/data/sample.csv',
  backend: 'csv',
  // delimiter: ',',
  // quotechar: '"',
  // encoding: 'utf8'
});

// remember this is async so if you want to do something you need to call it in done method e.g.
// dataset.fetch.done(function(dataset) { console.log(dataset.recordCount)});
dataset.fetch();

// show the data for illustrations sake
var grid = new recline.View.SlickGrid({
  model: dataset,
  el:  $('#my-online-csv')
});
grid.visible = true;

