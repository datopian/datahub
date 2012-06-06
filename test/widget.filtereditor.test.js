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

  $addForm.find('select.fields').val('country');
  $addForm.submit();
  ok(!$addForm.is(":visible"));
  $editForm = view.el.find('form.js-edit');
  equal($editForm.find('.filter-term').length, 1)

  equal(_.keys(dataset.queryState.attributes.filters[0].term)[0], 'country');

  view.remove();
});

