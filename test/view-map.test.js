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
    var documents = [
      {id: 0, x: 1, y: 2, z: 3, geom: '{"type":"Point","coordinates":[13.40,52.35]}'},
      {id: 1, x: 2, y: 4, z: 6, geom: {type:"Point",coordinates:[13.40,52.35]}},
      {id: 2, x: 3, y: 6, z: 9, geom: {type:"LineString",coordinates:[[100.0, 0.0],[101.0, 1.0]]}}
    ];
    var dataset = recline.Backend.createDataset(documents, fields);
    return dataset;
  }
};

test('basics', function () {
  var dataset = Fixture.getDataset();
  var view = new recline.View.Map({
    model: dataset
  });
  $('.fixtures').append(view.el);

  //Fire query, otherwise the map won't be initialized
  dataset.query();

  assertPresent('.editor',view.el);

  // Check that the Leaflet map was set up
  assertPresent('.leaflet-container',view.el);

  ok(view.map instanceof L.Map);
  ok(view.features instanceof L.GeoJSON);

  view.remove();
});

test('Lat/Lon geom fields', function () {
  var dataset = Fixture.getDataset();
  var view = new recline.View.Map({
    model: dataset
  });
  $('.fixtures').append(view.el);

  // Not really needed but fire query to test that resetting works!
  dataset.query();

  // Check that all markers were created
  equal(_getFeaturesCount(view.features),6);

  // Delete a document
  view.model.currentDocuments.remove(view.model.currentDocuments.get('1'));
  equal(_getFeaturesCount(view.features),5);

  // Add a new one
  view.model.currentDocuments.add({id: 7, x: 7, y: 14, z: 21, country: 'KX', label: 'seventh', lat:13.23, lon:23.56}),
  equal(_getFeaturesCount(view.features),6);

  view.remove();
});

test('GeoJSON geom field', function () {
  var dataset = GeoJSONFixture.getDataset();
  var view = new recline.View.Map({
    model: dataset
  });
  $('.fixtures').append(view.el);

  //Fire query, otherwise the map won't be initialized
  dataset.query();

  // Check that all features were created
  equal(_getFeaturesCount(view.features),3);

  // Delete a document
  view.model.currentDocuments.remove(view.model.currentDocuments.get('2'));
  equal(_getFeaturesCount(view.features),2);

  // Add it back
  view.model.currentDocuments.add({id: 2, x: 3, y: 6, z: 9, geom: {type:"LineString",coordinates:[[100.0, 0.0],[101.0, 1.0]]}}),
  equal(_getFeaturesCount(view.features),3);

  view.remove();
});

test('Popup', function () {
  var dataset = GeoJSONFixture.getDataset();
  var view = new recline.View.Map({
    model: dataset
  });
  $('.fixtures').append(view.el);

  //Fire query, otherwise the map won't be initialized
  dataset.query();

  var marker = view.el.find('.leaflet-marker-icon').first();

  assertPresent(marker);

  _.values(view.features._layers)[0].fire('click');

  var popup = view.el.find('.leaflet-popup-content');

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

var _getFeaturesCount = function(features){
  var cnt = 0;
  features._iterateLayers(function(layer){
    cnt++;
  });
  return cnt;
}

})(this.jQuery);
