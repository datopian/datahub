(function ($) {
module("Model");

test('Field: basics', function () {
  var field = new recline.Model.Field({
    id: 'x'
  });
  equal(field.attributes.label, 'x', 'Field label should be set from id');

  var field = new recline.Model.Field({
    id: 'x',
    label: 'My label'
  });
  equal(field.attributes.label, 'My label', 'Field label should be set from id but not if explicitly provided');

  var field = new recline.Model.Field('x');
  equal(field.id, 'x', 'Set of id from single argumentst to ctor');
  equal(field.attributes.id, 'x', 'Set of id from single argumentst to ctor');
  ok(!('0' in field.toJSON()), 'Should have removed artificially created 0 key in attributes');
});

})(this.jQuery);
