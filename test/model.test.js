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

  var fieldId = 'abc';
  dataset.facets.addFacet(fieldId);

  var out = dataset._prepareQuery();
  var exp = new recline.Model.Query().toJSON();
  exp.facets = {};
  exp.facets[fieldId] = { terms: {field: fieldId} };
  deepEqual(out, exp);
});


// =================================
// Facet

test('Facet', function () {
  var facets = new recline.Model.FacetList();
  facets.addFacet('xyz');
  equal(1, facets.length);
  deepEqual({terms: {field: 'xyz'}}, facets.get('xyz').get('query'));
});

})(this.jQuery);
