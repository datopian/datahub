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

  raises(function() {
      var field = new recline.Model.Field('xxx');
    },
    'should throw an error if not passed in a hash with id'
  );
  
  // toJSON
  var field = new recline.Model.Field({
    id: 'x',
    label: 'My label'
  });
  var out = field.toJSON();
  equal('My label', out.label);

  var fieldList = new recline.Model.FieldList([
      {id: 'xx', label: 'XX'},
      {id: 'yy', label: 'YY'}
  ]);
  var out = fieldList.toJSON();
  equal('XX', out[0].label);
});

test('Dataset', function () {
  var meta = {id: 'test', title: 'xyz'};
  var dataset = new recline.Model.Dataset(meta);
  dataset.fields = new recline.Model.FieldList([{id: 'xx'}, {id: 'yy'}]);
  var out = dataset.toTemplateJSON();
  equal(out.fields.length, 2);
});

})(this.jQuery);
