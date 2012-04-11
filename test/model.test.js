(function ($) {
module("Model");

// =================================
// Field

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

test('Field: default renderers', function () {
  var doc = new recline.Model.Document({x: 12.3, myobject: {a: 1, b: 2}});
  var field = new recline.Model.Field({id: 'myobject', type: 'object'});
  var out = doc.getFieldValue(field);
  var exp = '{"a":1,"b":2}';
  equal(out, exp);

  var field = new recline.Model.Field({id: 'x', type: 'float', format: 'percentage'});
  var out = doc.getFieldValue(field);
  var exp = '12.3%';
  equal(out, exp);
});

test('Field: custom deriver and renderer', function () {
  var doc = new recline.Model.Document({x: 123});
  var cellRenderer = function(value, field) {
    return '<span class="field-' + field.id + '">' + value + '</span>';
  }
  var deriver = function(val, field, doc) {
    return doc.get('x') * 2
  }

  var field = new recline.Model.Field({id: 'computed', is_derived: true}, {
    deriver: deriver
  });
  var out = doc.getFieldValue(field);
  var exp = 246;
  equal(out, exp);

  var field = new recline.Model.Field({id: 'x'}, {
    renderer: cellRenderer
  });
  var out = doc.getFieldValue(field);
  var exp = '<span class="field-x">123</span>'
  equal(out, exp);

  var field = new recline.Model.Field({id: 'computed'}, {
    renderer: cellRenderer,
    deriver: deriver
  });
  var out = doc.getFieldValue(field);
  var exp = '<span class="field-computed">246</span>'
  equal(out, exp);
});

// =================================
// Dataset

test('Dataset', function () {
  var meta = {id: 'test', title: 'xyz'};
  var dataset = new recline.Model.Dataset(meta);
  dataset.fields = new recline.Model.FieldList([{id: 'xx'}, {id: 'yy'}]);
  var out = dataset.toTemplateJSON();
  equal(out.fields.length, 2);
});

test('Dataset _prepareQuery', function () {
  var meta = {id: 'test', title: 'xyz'};
  var dataset = new recline.Model.Dataset(meta);

  var out = dataset._prepareQuery();
  var exp = new recline.Model.Query().toJSON();
  deepEqual(out, exp);
});


// =================================
// Query

test('Query', function () {
  var query = new recline.Model.Query();
  query.addFacet('xyz');
  deepEqual({terms: {field: 'xyz'}}, query.get('facets')['xyz']);
});

test('Query.addFilter', function () {
  var query = new recline.Model.Query();
  query.addTermFilter('xyz', 'this-value');
  deepEqual({term: {xyz: 'this-value'}}, query.get('filters')[0]);
});

})(this.jQuery);
