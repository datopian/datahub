var $el = $('#map-customize');
var view = new recline.View.Map({
  el: $el,
  model: dataset
});

view.geoJsonLayerOptions.pointToLayer = function(feature, latlng) {
  // Look up Record so we can use it to customize size of marker
  // note that 'this' is specially bound for us to parent view + that feature
  // stores record cid
  var record = this.model.records.getByCid(feature.properties.cid);
  var marker = new L.CircleMarker(latlng, { radius: record.get('x') * 3 });
  marker.bindPopup(feature.properties.popupContent);
  return marker;
}
view.render();

