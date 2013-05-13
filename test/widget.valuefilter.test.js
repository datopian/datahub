module("Widget - Value Filter");

test('basics', function () {
  var dataset = Fixture.getDataset();
  var view = new recline.View.FilterEditor({
    model: dataset
  });
  $('.fixtures').append(view.el);
  assertPresent('.js-add-filter', view.elSidebar);
  var $addForm = view.$el.find('form.js-add');
  ok(!$addForm.is(":visible"));
  view.$el.find('.js-add-filter').click();
  ok(!view.$el.find('.js-add-filter').is(":visible"));
  ok($addForm.is(":visible"));

  // submit the form
  $addForm.find('select.fields').val('country');
  $addForm.submit();

  // now check we have new filter
  ok(!$addForm.is(":visible"));
  $editForm = view.$el.find('form.js-edit');
  equal($editForm.find('.filter-term').length, 1);
  equal(dataset.queryState.attributes.filters[0].field, 'country');

  // now set filter value and apply
  $editForm.find('input').val('UK');
  $editForm.submit();
  equal(dataset.queryState.attributes.filters[0].term, 'UK');
  equal(dataset.records.length, 3);

  // now remove filter
  $editForm = view.$el.find('form.js-edit');
  $editForm.find('.js-remove-filter').last().click();
  $editForm = view.$el.find('form.js-edit');
  equal($editForm.find('.filter').length, 0);
  equal(dataset.records.length, 6);

  view.remove();
});

test('add 2 filters', function () {
  var dataset = Fixture.getDataset();
  var view = new recline.View.FilterEditor({
    model: dataset
  });
  $('.fixtures').append(view.el);

  // add 2 term filters
  var $addForm = view.$el.find('form.js-add');
  view.$el.find('.js-add-filter').click();

  $addForm.find('select.fields').val('country');
  $addForm.submit();

  $addForm = view.$el.find('form.js-add');
  view.$el.find('.js-add-filter').click();
  $addForm.find('select.fields').val('id');
  $addForm.submit();

  var fields = [];
  view.$el.find('form.js-edit .filter-term input').each(function(idx, item) {
    fields.push($(item).attr('data-filter-field'));
  });
  deepEqual(fields, ['country', 'id']);

  view.remove();
});
