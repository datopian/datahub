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

  equal(dataset.records.length,view.grid.getDataLength());

  view.remove();
});


test('state', function () {
  var dataset = Fixture.getDataset();
  var view = new recline.View.SlickGrid({
    model: dataset,
    state: {
      hiddenColumns:['x','lat','title'],
      columnsOrder:['lon','id','z','date', 'y', 'country'],
      columnsWidth:[
        {column:'id',width: 250}
      ],
      gridOptions: {editable: true},
      columnsEditor: [{column: 'country', editor: Slick.Editors.Text}]
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

  // Column width
  equal($('.slick-header-column[title="id"]').width(),250);

  // Editable grid
  equal(true, view.grid.getOptions().editable);

  // Editor on 'country' column
  var countryColumn = _.find(view.grid.getColumns(), function (c) { return c.field == 'country'; });
  equal(Slick.Editors.Text, countryColumn.editor);

  view.remove();
});

test('editable', function () {
  var dataset = Fixture.getDataset();
  var view = new recline.View.SlickGrid({
    model: dataset,
    state: {
      hiddenColumns:['x','lat','title'],
      columnsOrder:['lon','id','z','date', 'y', 'country'],
      columnsWidth:[
        {column:'id',width: 250}
      ],
      gridOptions: {editable: true},
      columnsEditor: [{column: 'country', editor: Slick.Editors.Text}]
    }
  });

  $('.fixtures .test-datatable').append(view.el);
  view.render();
  view.show();

  var new_item = {lon: "foo", id: 1, z: 23, date: "12", y: 3, country: 'FR'};

  dataset.records.on('change', function(record){
    equal(new_item['lon'], record.get('lon'));
  });

  // Be sure a cell change triggers a change of the model
  e = new Slick.EventData();
  view.grid.onCellChange.notify({
    row: 1,
    cell: 0,
    item: new_item,
    grid: view.grid
  }, e, view.grid);

  view.remove();
});

test('delete-row' , function(){
  var dataset = Fixture.getDataset();
  var view = new recline.View.SlickGrid({
    model: dataset,
    state: {
      hiddenColumns:['x','lat','title'],
      columnsOrder:['lon','id','z','date', 'y', 'country'],
      columnsWidth:[
        {column:'id',width: 250}
      ],
      gridOptions: {editable: true , "enabledDelRow":true},
      columnsEditor: [{column: 'country', editor: Slick.Editors.Text}]
    }
  });

  $('.fixtures .test-datatable').append(view.el);
  view.render();
  view.show();
  old_length = dataset.records.length
  dataset.records.on('remove', function(record){
    equal(dataset.records.length, old_length  -1 );
  });

  // Be sure a cell change triggers a change of the model
  e = new Slick.EventData();
  view.grid.onClick.notify({
    row: 1,
    cell: 0,
    grid: view.grid
  }, e, view.grid);

  view.remove();


});

test('add-row' , function(){
//To test adding row on slickgrid , we add some menu GridControl
//I am based on the FlotControl in flot wiewer , to add a similary
//to the sclickgrid , The GridControl add a bouton menu 
//one the .side-bar place , which will allow to add a row to 
//the grid on-click

var dataset = Fixture.getDataset();
  var view = new recline.View.SlickGrid({
    model: dataset,
    state: {
      hiddenColumns:['x','lat','title'],
      columnsOrder:['lon','id','z','date', 'y', 'country'],
      columnsWidth:[
        {column:'id',width: 250}
      ],
      gridOptions: {editable: true , "enabledAddRow":true},
      columnsEditor: [{column: 'country', editor: Slick.Editors.Text}]
    }
  });

// view will auto render ...
assertPresent('.recline-row-add', view.elSidebar);
// see recline.SlickGrid.GridControl widget
//view.render()
old_length = dataset.records.length
dataset.records.on('add',function(record){
  equal(dataset.records.length ,old_length + 1 ) 
});

view.elSidebar.find('.recline-row-add').click();

});


test('update', function() {
  var dataset = Fixture.getDataset();
  var view = new recline.View.SlickGrid({
    model: dataset,
    state: {
      hiddenColumns:['x','lat','title'],
      columnsOrder:['lon','id','z','date', 'y', 'country'],
      columnsWidth:[
        {column:'id',width: 250}
      ],
      gridOptions: {editable: true},
      columnsEditor: [{column: 'country', editor: Slick.Editors.Text}]
    }
  });

  $('.fixtures .test-datatable').append(view.el);
  view.render();
  view.grid.init();

  var zbefore = view.grid.getData().getItem(1)['z'];
  // Change the model at row 1
  dataset.records.at(1).set('z', zbefore + 1);
  equal( zbefore + 1, view.grid.getData().getItem(1)['z']);

  view.remove();
});

test('renderers', function (assert) {
  var dataset = Fixture.getDataset();

  dataset.fields.get('country').renderer = function(val, field, doc){
    return '<a href="abc">Country: ' + val + '</a>';
  };

  var deriver = function(val, field, doc){
    return doc.get('x') * 10;
  }
  dataset.fields.add(new recline.Model.Field({id:'computed'},{deriver:deriver}));

  var view = new recline.View.SlickGrid({
    model: dataset
  });
  $('.fixtures .test-datatable').append(view.el);
  view.render();

  // Render the grid manually
  view.grid.init();

  equal($(view.grid.getCellNode(0,view.grid.getColumnIndex('country'))).text(),'Country: DE');
  assert.htmlEqual($(view.grid.getCellNode(0,view.grid.getColumnIndex('country'))).html(),'<a href="abc">Country: DE</a>');
  equal($(view.grid.getCellNode(0,view.grid.getColumnIndex('computed'))).text(),'10');
  view.remove();
});

})(this.jQuery);
