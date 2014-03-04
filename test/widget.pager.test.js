module("Widget - Pager");

test('basics', function () {
  var dataset = Fixture.getDataset();
  var size = dataset.recordCount/2 + 1;
  dataset.queryState.set({ size : size }, { silent : true });
  var view = new recline.View.Pager({
    model: dataset
  });
  $('.fixtures').append(view.el);
  var fromSelector = 'input[name=from]';
  var toSelector = 'input[name=to]';

  assertPresent('.pagination', view.elSidebar);
  // next and prev present
  assertPresent('.prev', view.elSidebar);
  assertPresent('.next', view.elSidebar);

  // from and to inputs present
  assertPresent(fromSelector, view.elSidebar);
  assertPresent(toSelector, view.elSidebar);

  // click next: -> reload from+size - recordCount
  var prevFromVal = parseInt($(fromSelector).val());
  var prevToVal = parseInt($(toSelector).val());
  view.$el.find('.next a').click();
  equal($(fromSelector).val(), prevFromVal+size);
  // to = recordCount since size is more than half of record count
  equal($(toSelector).val(), dataset.recordCount);
  // UI is 1-based but model is zero-based
  equal(dataset.queryState.get('from'), prevFromVal+size-1);

  // click prev -> 1-4, model from=0
  prevFromVal = parseInt($(fromSelector).val());
  prevToVal = parseInt($(toSelector).val());
  view.$el.find('.prev a').click();
  equal($(fromSelector).val(), prevFromVal-size);
  equal($(toSelector).val(), prevFromVal-1);
  // UI is 1-based but model is zero-based
  equal(dataset.queryState.get('from'), prevFromVal-size-1);

  view.remove();
});

test('change inputs', function () {
  var dataset = Fixture.getDataset();
  var size = parseInt(dataset.recordCount/3);
  dataset.queryState.set({ size : size }, { silent : true });
  var view = new recline.View.Pager({
    model: dataset
  });
  $('.fixtures').append(view.el);
  var toSelector = 'input[name=to]';
  var fromSelector = 'input[name=from]';

  // change from: update to, keep size
  var fromVal = size;
  $(fromSelector).val(fromVal).change();
  equal($(fromSelector).val(), fromVal);
  // UI is 1-based but model is zero-based
  equal(dataset.queryState.get('from'), fromVal-1);
  equal($(toSelector).val(), fromVal+(size-1));
  
  // change to: update from, change size
  var toVal = dataset.recordCount; 
  $(toSelector).val(toVal).change();
  equal($(toSelector).val(), toVal);
  equal($(fromSelector).val(), fromVal);
  // UI is 1-based but model is zero-based
  equal(dataset.queryState.get('from'), fromVal-1);
  notEqual(dataset.queryState.get('size'), size);

  view.remove();
});

test('bounds checking', function () {
  var dataset = Fixture.getDataset();
  var size = dataset.recordCount/2 + 1;
  dataset.queryState.set({ size : size }, { silent : true });
  var view = new recline.View.Pager({
    model: dataset
  });
  $('.fixtures').append(view.el);
  var querySpy = sinon.spy(dataset, 'query');
  var fromSelector = 'input[name=from]';
  var toSelector = 'input[name=to]';

  // click prev on beginning: nothing happens
  view.$el.find('.prev a').click();
  equal($(fromSelector).val(), 1);
  equal($(toSelector).val(), size);
  ok(!dataset.query.called);

  // enter size-1 in from: reloads size-1 - size
  var fromVal = size-1;
  $(fromSelector).val(fromVal).change();
  equal($(fromSelector).val(), fromVal);
  equal($(toSelector).val(), fromVal+(size-1));
  // UI is 1-based but model is zero-based
  equal(dataset.queryState.get('from'), fromVal-1);

  // enter value past the end in from: reloads recordCount - recordCount
  fromVal = dataset.recordCount + 10;
  $(fromSelector).val(fromVal).change();
  equal($(fromSelector).val(), dataset.recordCount);
  equal($(toSelector).val(), dataset.recordCount);
  // UI is 1-based but model is zero-based
  equal(dataset.queryState.get('from'), dataset.recordCount-1);

  // click next on end -> nothing happens
  var queryCalls = querySpy.callCount;
  fromVal = parseInt($(fromSelector).val());
  var toVal = parseInt($(toSelector).val());
  view.$el.find('.next a').click();
  equal(querySpy.callCount, queryCalls);
  equal($(fromSelector).val(), fromVal);
  equal($(toSelector).val(), toVal);

  // reset from=1
  fromVal = 1;
  $(fromSelector).val(fromVal).change();
  // type value past the end in to: 1-recordCount
  toVal = dataset.recordCount + 10;
  $(toSelector).val(toVal).change();
  equal($(fromSelector).val(), 1);
  equal($(toSelector).val(), dataset.recordCount);

  view.remove();
});
