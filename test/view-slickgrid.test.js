(function ($) {

module("View - SlickGrid");

test('basic', function () {
  var dataset = Fixture.getDataset();
  var view = new recline.View.SlickGrid({
    model: dataset
  });
  $('.fixtures .test-datatable').append(view.el);
  view.render();

  // Render the grid manually
  view.grid.init();

  assertPresent('.slick-header-column[title="x"]');
  equal($('.slick-header-column').length,dataset.fields.length);

  equal(dataset.currentDocuments.length,view.grid.getDataLength());

  view.remove();
});


test('state', function () {
  var dataset = Fixture.getDataset();
  var view = new recline.View.SlickGrid({
    model: dataset,
    state: {
      hiddenColumns:['x','lat','label'],
      columnsOrder:['lon','id','z','date', 'y', 'country'],
      columnsSort:{column:'country',direction:'desc'},
      columnsWidth:[
        {column:'id',width: 250}
      ]
    }
  });
  $('.fixtures .test-datatable').append(view.el);
  view.render();
  view.grid.init();

  var visibleColumns = _.filter(_.pluck(dataset.fields.toArray(),'id'),function(f){
    return (_.indexOf(view.state.get('hiddenColumns'),f) == -1)
  });
  
  // Hidden columns
  assertPresent('.slick-header-column[title="y"]');
  assertNotPresent('.slick-header-column[title="x"]');
  var headers = $('.slick-header-column');
  equal(headers.length,visibleColumns.length);

  // Column order
  deepEqual(_.pluck(headers,'title'),view.state.get('columnsOrder'));

  // Column sorting
  equal($(view.grid.getCellNode(0,view.grid.getColumnIndex('country'))).text(),'US');

  // Column width
  equal($('.slick-header-column[title="id"]').width(),250);

  view.remove();
});

})(this.jQuery);
