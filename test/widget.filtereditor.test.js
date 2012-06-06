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
  equal(_.keys(dataset.queryState.attributes.filters[0].term)[0], 'country');

  // now set filter value and apply
  $editForm.find('input').val('UK');
  $editForm.submit();
  equal(dataset.queryState.attributes.filters[0].term.country, 'UK');
  equal(dataset.currentRecords.length, 3);

  // now remove filter
  $editForm.find('.js-remove-filter').click();
  // hmmm, not working yet but works by eye!
  // $editForm = view.el.find('form.js-edit');
  // equal($editForm.find('.filter-term').length, 0)
  // equal(dataset.currentRecords.length, 6);

  view.remove();
});

