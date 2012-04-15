(function ($) {

module("View - DataGrid");

test('menu - hideColumn', function () {
  var dataset = Fixture.getDataset();
  var view = new recline.View.DataGrid({
    model: dataset
  });
  $('.fixtures .test-datatable').append(view.el);
  view.render();

  assertPresent('.column-header[data-field="x"]');
  var hideColumn = view.el.find('.column-header[data-field="x"] a[data-action="hideColumn"]');
  hideColumn.trigger('click');
  assertNotPresent('.column-header[data-field="x"]');

  // also test a bit of state
  deepEqual(view.state.toJSON(), {hiddenFields: ['x']});
  view.remove();
});

test('state', function () {
  var dataset = Fixture.getDataset();
  var view = new recline.View.DataGrid({
    model: dataset,
    state: {
      hiddenFields: ['z']
    }
  });
  $('.fixtures .test-datatable').append(view.el);
  view.render();
  assertPresent('.column-header[data-field="x"]');
  assertNotPresent('.column-header[data-field="z"]');
  view.remove();
});

test('new DataGridRow View', function () {
  var $el = $('<tr />');
  $('.fixtures .test-datatable').append($el);
  var doc = new recline.Model.Document({
    'id': 1,
    'b': '2',
    'a': '1'
    });
  var view = new recline.View.DataGridRow({
    model: doc
    , el: $el
    , fields: new recline.Model.FieldList([{id: 'a'}, {id: 'b'}])
  });
  view.render();
  ok($el.attr('data-id'), '1');
  var tds = $el.find('td');
  equal(tds.length, 3);
  equal($(tds[1]).attr('data-field'), 'a');
});

})(this.jQuery);
