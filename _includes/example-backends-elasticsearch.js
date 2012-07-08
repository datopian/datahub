var dataset = new recline.Model.Dataset({
  url: 'http://datahub.io/dataset/rendition-on-record/ac5a28ea-eb52-4b0a-a399-5dcc1becf9d9/api',
  backend: 'elasticsearch'
});

dataset.fetch();

// For demonstrations purposes display the data in a grid
var grid = new recline.View.SlickGrid({
  model: dataset
});
$('#my-elasticsearch').append(grid.el);

