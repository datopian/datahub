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

test('Field: type mapping', function () {
  var tests = [
    { input: 'text', exp: 'string'},
    { input: 'int', exp: 'integer'},
    { input: 'float', exp: 'number'},
    { input: 'double', exp: 'number'},
    { input: 'datetime', exp: 'date-time'},
    { input: 'dateTime', exp: 'date-time'},
    { input: 'bool', exp: 'boolean'},
    { input: 'timestamp', exp: 'date-time'},
    { input: 'json', exp: 'object'}
  ];
  
  _.each(tests, function(data) {
    var field = new recline.Model.Field({
      id: 'x',
      type: data.input
    });
    equal(field.get('type'), data.exp);
  });
});

test('Field: default renderers', function () {
  var doc = new recline.Model.Record({
    x: 12.3,
    myobject: {a: 1, b: 2},
    link: 'http://abc.com/',
    link2: 'Some text then https://abc.com/',
    markdown: '### ABC',
    geopoint: [18.7, -122]
  });
  var field = new recline.Model.Field({id: 'myobject', type: 'object'});
  var out = doc.getFieldValue(field);
  var exp = '{"a":1,"b":2}';
  equal(out, exp);

  var field = new recline.Model.Field({id: 'geopoint', type: 'geo_point'});
  var out = doc.getFieldValue(field);
  var exp = '[18.7,-122]';
  equal(out, exp);

  var field = new recline.Model.Field({id: 'x', type: 'float', format: 'percentage'});
  var out = doc.getFieldValue(field);
  var exp = '12.3%';
  equal(out, exp);

  var field = new recline.Model.Field({id: 'link'});
  var out = doc.getFieldValue(field);
  var exp = '<a href="http://abc.com/">http://abc.com/</a>';
  equal(out, exp);

  var field = new recline.Model.Field({id: 'link2'});
  var out = doc.getFieldValue(field);
  var exp = 'Some text then <a href="https://abc.com/">https://abc.com/</a>';
  equal(out, exp);

  var field = new recline.Model.Field({id: 'markdown', type: 'string', format: 'markdown'});
  var out = doc.getFieldValue(field);
  // Showdown is not installed so nothing should happen
  var exp = doc.get('markdown');
  equal(out, exp);
});

test('Field: custom deriver and renderer', function () {
  var doc = new recline.Model.Record({x: 123});
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

module("Model Dataset");

test('Dataset', function () {
  var meta = {id: 'test', title: 'xyz'};
  var dataset = new recline.Model.Dataset(meta);
  dataset.fields = new recline.Model.FieldList([{id: 'xx'}, {id: 'yy'}]);
  var out = dataset.toTemplateJSON();
  equal(out.fields.length, 2);
});

test('Dataset getFieldsSummary', function () {
  var dataset = Fixture.getDataset();
  dataset.getFieldsSummary().done(function() {
    var countryField = dataset.fields.get('country');
    var facet = countryField.facets.models[0];
    equal(facet.get('terms').length, 3);
    var exp = [
      { count: 3, term: 'UK' },
      { count: 2, term: 'DE' },
      { count: 1, term: 'US' }
    ];
    deepEqual(facet.get('terms'), exp);
  });
});

test('_normalizeRecordsAndFields', function () {
  var data = [
    // fields but no records
    {
      in_: {
        fields: [ '', 'abc', 'abc', 'xyz', '' ],
        records: null
      },
      exp: {
        fields: [
          {id: '_noname_'},
          {id: 'abc'},
          {id: 'abc1'},
          {id: 'xyz'},
          {id: '_noname_1'}
        ],
        records: null
      },
    },
    // records array but no fields
    {
      in_: {
        fields: undefined,
        records: [
          ['col1', 'col2'],
          [1,2],
          [3,4]
        ]
      },
      exp: {
        fields: [
          {id: 'col1'},
          {id: 'col2'}
        ],
        records: [
          {col1: 1, col2: 2},
          {col1: 3, col2: 4}
        ]
      }
    },
    // records objects but no fields
    {
      in_: {
        fields: undefined,
        records: [
          {col1: 1, col2: 2},
          {col1: 3, col2: 4}
        ]
      },
      exp: {
        fields: [
          {id: 'col1'},
          {id: 'col2'}
        ],
        records: [
          {col1: 1, col2: 2},
          {col1: 3, col2: 4}
        ]
      }
    },
    // fields and records array
    {
      in_: {
        fields: [{id: 'col1'}, {id: 'col2'}],
        records: [
          [1,2],
          [3,4]
        ]
      },
      exp: {
        fields: [
          {id: 'col1'},
          {id: 'col2'}
        ],
        records: [
          {col1: 1, col2: 2},
          {col1: 3, col2: 4}
        ]
      }
    },
    // everything already correct
    {
      in_: {
        fields: [{id: 'col1'}, {id: 'col2'}],
        records: [
          {col1: 1, col2: 2},
          {col1: 3, col2: 4},
        ]
      },
      exp: {
        fields: [
          {id: 'col1'},
          {id: 'col2'}
        ],
        records: [
          {col1: 1, col2: 2},
          {col1: 3, col2: 4}
        ]
      }
    }
  ];
  var dataset = new recline.Model.Dataset();
  _.each(data, function(item) {
    out = dataset._normalizeRecordsAndFields(item.in_.records, item.in_.fields);
    deepEqual(out, item.exp);
  });
});


// =================================
// Record

module("Model Record");

test('summary', function () {
  var dataset = new recline.Model.Dataset({
    records: [ {a: 1, b: 2} ]
  });
  var record = dataset.records.at(0);
  var out = record.summary();
  var exp = '<div class="recline-record-summary"><div class="a"><strong>a</strong>: 1</div><div class="b"><strong>b</strong>: 2</div></div>'
  equal(out, exp);
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
  query.addFilter({type: 'term', field: 'xyz'});
  var exp = {
    field: 'xyz',
    type: 'term',
    term: ''
  };
  deepEqual(query.get('filters')[0], exp);

  query.addFilter({type: 'geo_distance', field: 'xyz'});
  var exp = {
    distance: 10,
    unit: 'km',
    point: {
      lon: 0,
      lat: 0
    },
    field: 'xyz',
    type: 'geo_distance'
  };
  deepEqual(exp, query.get('filters')[1]);
});

})(this.jQuery);
