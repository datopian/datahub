(function ($) {

module("View - Map");

var GeoJSONFixture = {
  getDataset: function() {
    var fields = [
        {id: 'id'},
        {id: 'x'},
        {id: 'y'},
        {id: 'z'},
        {id: 'geom'}
      ];
    var records = [
      {id: 0, x: 1, y: 2, z: 3, geom: '{"type":"Point","coordinates":[13.40,52.35]}'},
      {id: 1, x: 2, y: 4, z: 6, geom: {type:"Point",coordinates:[13.40,52.35]}},
      {id: 2, x: 3, y: 6, z: 9, geom: {type:"LineString",coordinates:[[100.0, 0.0],[101.0, 1.0]]}}
    ];
    var dataset = new recline.Model.Dataset({
      records: records,
      fields: fields
    });
    return dataset;
  }
};

test('basics', function () {
  var dataset = Fixture.getDataset();
  var view = new recline.View.Map({
    model: dataset
  });
  $('.fixtures').append(view.el);
  view.render();

  assertPresent('.editor-field-type', view.elSidebar);

  // Check that the Leaflet map was set up
  assertPresent('.leaflet-container',view.el);

  ok(view.map instanceof L.Map);
  ok(view.features instanceof L.GeoJSON);

  view.remove();
});

test('_setupGeometryField', function () {
  var dataset = Fixture.getDataset();
  var view = new recline.View.Map({
    model: dataset
  });
  view.render();
  var exp = {
    geomField: null,
    lonField: 'lon',
    latField: 'lat',
    autoZoom: true,
    cluster: false
  };
  deepEqual(view.state.toJSON(), exp);
  deepEqual(view.menu.state.toJSON(), exp);
});

test('Lat/Lon geom fields', function () {
  var dataset = Fixture.getDataset();
  var view = new recline.View.Map({
    model: dataset
  });
  $('.fixtures').append(view.el);
  view.render();

  // Not really needed but fire query to test that resetting works!
  dataset.query();

  // Check that all markers were created
  equal(_getFeaturesCount(view.features),6);

  // Delete a record
  view.model.records.remove(view.model.records.get('1'));
  equal(_getFeaturesCount(view.features),5);

  // Add a new one
  view.model.records.add({id: 7, x: 7, y: 14, z: 21, country: 'KX', label: 'seventh', lat:13.23, lon:23.56}),
  equal(_getFeaturesCount(view.features),6);

  view.remove();
});

test('GeoJSON geom field', function () {
  var dataset = GeoJSONFixture.getDataset();
  var view = new recline.View.Map({
    model: dataset
  });
  $('.fixtures').append(view.el);
  view.render();

  // Check that all features were created
  equal(_getFeaturesCount(view.features),3);

  // Delete a record
  view.model.records.remove(view.model.records.get('2'));
  equal(_getFeaturesCount(view.features),2);

  // Add it back
  view.model.records.add({id: 2, x: 3, y: 6, z: 9, geom: {type:"LineString",coordinates:[[100.0, 0.0],[101.0, 1.0]]}}),
  equal(_getFeaturesCount(view.features),3);

  view.remove();
});

test('_getGeometryFromRecord non-GeoJSON', function () {
  var test = [
    [{ lon: 47, lat: 53}, [47,53]],
    [{ lon: -47, lat: 53}, [-47,53]],
    ["53.3,47.32", [47.32, 53.3]],
    ["53.3,-47.32", [-47.32, 53.3]],
    ["53.3, 47.32", [47.32, 53.3]],
    ["-53.3, 47.32", [47.32, -53.3]],
    ["53.3, -47.32", [-47.32, 53.3]],
    ["(53.3,47.32)", [47.32, 53.3]],
    [[53.3,47.32], [53.3, 47.32]],
    ["53.3 N, 113.5 W", [-113.5, 53.3]],
    ["53° 18' N, 113° 30' W", [-113.5, 53.3 ]],
    ["22°45′90″S, 43°15′45″W", [-43.2625, -22.775]]
  ];
  var view = new recline.View.Map({
    model: new recline.Model.Dataset({
      records: [{a: 1}]
    }),
    state: {
      geomField: 'location'
    }
  });
  _.each(test, function(item) {
    var record = new recline.Model.Record({location: item[0]});
    var out = view._getGeometryFromRecord(record);
    deepEqual(out.coordinates, item[1]);
  });
});

test('many markers and clustering', function () {
  var data = [];
  for (var i = 0; i<1000; i++) {
    data.push({ id: i, lon: 13+3*i, lat: 52+i/10});
  }
  var fields = [
    {id: 'id'},
    {id: 'lat'},
    {id: 'lon'}
  ];

  var dataset = new recline.Model.Dataset({records: data, fields: fields});
  var view = new recline.View.Map({
    model: dataset
  });
  $('.fixtures').append(view.el);
  view.render();

  dataset.query();

  // this whole test looks a bit odd now
  // we used to turn on clustering automatically at a certain level but we do not any more
  equal(view.state.get('cluster'), false);

  view.state.set({cluster: true});
  equal(view.state.get('cluster'), true);

  view.remove();
});

test('Popup', function () {
  var dataset = GeoJSONFixture.getDataset();
  var view = new recline.View.Map({
    model: dataset
  });
  $('.fixtures').append(view.el);
  view.render();

  var marker = view.$el.find('.leaflet-marker-icon').first();

  assertPresent(marker);

  _.values(view.features._layers)[0].fire('click');

  var popup = view.$el.find('.leaflet-popup-content');

  assertPresent(popup);

  var text = popup.text();
  ok((text.indexOf('geom') === -1))
  _.each(view.model.fields.toJSON(),function(field){
    if (field.id != 'geom'){
      ok((text.indexOf(field.id) !== -1))
    }
  });

  view.remove();
});

test('Popup - Custom', function (assert) {
  var dataset = GeoJSONFixture.getDataset();
  var view = new recline.View.Map({
    model: dataset
  });
  $('.fixtures').append(view.el);
  view.infobox = function(record) {
    var html = Mustache.render('<h3>{{x}}</h3>y: {{y}}', record.toJSON());
    return html;
  };
  view.render();

  var marker = view.$el.find('.leaflet-marker-icon').first();
  _.values(view.features._layers)[0].fire('click');
  var popup = view.$el.find('.leaflet-popup-content');

  assertPresent(popup);

  var text = popup.html();
  assert.htmlEqual(text, '<h3>1</h3>y: 2');

  view.remove();
});

test('geoJsonLayerOptions', function () {
  var dataset = GeoJSONFixture.getDataset();
  var view = new recline.View.Map({
    model: dataset
  });
  $('.fixtures').append(view.el);
  view.geoJsonLayerOptions.point
  view.geoJsonLayerOptions.pointToLayer = function(feature, latlng) {
    var marker = new L.CircleMarker(latlng, { radius: 8 } );
    marker.bindPopup(feature.properties.popupContent);
    return marker;
  }
  view.render();

  // TODO: test it somehow?
  expect(0);

  view.remove();
});

test('MapMenu', function () {
  var dataset = Fixture.getDataset();
  var controls = new recline.View.MapMenu({
    model: dataset,
    state: {}
  });
  assertPresent('.editor-field-type', controls.el);
});

var _getFeaturesCount = function(features){
  var cnt = 0;
  _.each(features._layers, function(layer) {
    cnt++;
  });
  return cnt;
}

})(this.jQuery);
