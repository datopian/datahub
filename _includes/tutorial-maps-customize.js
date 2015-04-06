var $el = $('#map-customize');
var view = new recline.View.Map({
  el: $el,
  model: dataset
});

view.geoJsonLayerOptions.pointToLayer = function(feature, latlng) {
  // Look up Record so we can use it to customize size of marker
  // note that 'this' is specially bound for us to parent view + that feature
  // stores record cid
  
  var marker = new L.CircleMarker(latlng, { 
  	radius: 10,
    fillColor: "#333",
    color: "#000",
    weight: 0.5,
    opacity: 0.5,
    fillOpacity: 0.5
  });
  marker.bindPopup(feature.properties.popupContent);
  this.markers.addLayer(marker);
  return marker;
}
view.render();

