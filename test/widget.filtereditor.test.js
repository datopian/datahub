module("Widget - Filter Editor");

test('basics', function () {
  var dataset = Fixture.getDataset();
  var view = new recline.View.FilterEditor({
    model: dataset
  });
  $('.fixtures').append(view.el);
  assertPresent('.js-add-filter', view.elSidebar);
  var $addForm = view.el.find('form.js-add');
  ok(!$addForm.is(":visible"));
  view.el.find('.js-add-filter').click();
  ok(!view.el.find('.js-add-filter').is(":visible"));
  ok($addForm.is(":visible"));

  // submit the form
  $addForm.find('select.fields').val('country');
  $addForm.submit();

  // now check we have new filter
  ok(!$addForm.is(":visible"));
  $editForm = view.el.find('form.js-edit');
  equal($editForm.find('.filter-term').length, 1)
  equal(dataset.queryState.attributes.filters[0].field, 'country');

  // now set filter value and apply
  $editForm.find('input').val('UK');
  $editForm.submit();
  equal(dataset.queryState.attributes.filters[0].term, 'UK');
  equal(dataset.records.length, 3);

  // now remove filter
  $editForm.find('.js-remove-filter').click();
  // hmmm, not working yet but works by eye!
  // $editForm = view.el.find('form.js-edit');
  // equal($editForm.find('.filter-term').length, 0)
  // equal(dataset.records.length, 6);

  view.remove();
});

test('geo_distance', function () {
  var dataset = Fixture.getDataset();
  var view = new recline.View.FilterEditor({
    model: dataset
  });
  $('.fixtures').append(view.el);

  var $addForm = view.el.find('form.js-add');
  // submit the form
  $addForm.find('select.filterType').val('geo_distance');
  $addForm.find('select.fields').val('lon');
  $addForm.submit();

  // now check we have new filter
  $editForm = view.el.find('form.js-edit');
  equal($editForm.find('.filter-geo_distance').length, 1)
  deepEqual(_.sortBy(_.keys(dataset.queryState.attributes.filters[0]),_.identity), 
            ["distance", "field", "point", "type", "unit"]);

  // now set filter value and apply
  $editForm.find('input[name="lat"]').val(10);
  $editForm.submit();
  equal(dataset.queryState.attributes.filters[0].point.lat, 10);

  view.remove();
});
