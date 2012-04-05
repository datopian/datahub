this.recline = this.recline || {};
this.recline.View = this.recline.View || {};

(function($, my) {

my.Map = Backbone.View.extend({

  tagName:  'div',
  className: 'data-map-container',

  latitudeFieldNames: ['lat','latitude'],
  longitudeFieldNames: ['lon','longitude'],
  geometryFieldNames: ['geom','the_geom','geometry','spatial'],

  //TODO: In case we want to change the default markers
  /*
  markerOptions: {
    radius: 5,
    color: 'grey',
    fillColor: 'orange',
    weight: 2,
    opacity: 1,
    fillOpacity: 1
  },
  */

  template: ' \
<div class="panel map"> \
</div> \
',

  initialize: function(options, config) {
    var self = this;

    this.el = $(this.el);
    this.render();
    this.model.bind('change', function() {
      self._setupGeometryField();
    });

    this.mapReady = false;
  },

  render: function() {

    var self = this;

    htmls = $.mustache(this.template, this.model.toTemplateJSON());
    $(this.el).html(htmls);
    this.$map = this.el.find('.panel.map');

    this.model.bind('query:done', function() {
      if (!self.geomReady){
        self._setupGeometryField();
      }

      if (!self.mapReady){
        self._setupMap();
      }
      self.redraw()
    });

    return this;
  },

  redraw: function(){

    var self = this;

    if (this.geomReady){
      if (this.model.currentDocuments.length > 0){
        this.features.clearLayers();
        var bounds = new L.LatLngBounds();

        this.model.currentDocuments.forEach(function(doc){
          var feature = self._getGeometryFromDocument(doc);
          if (feature){
            // Build popup contents
            // TODO: mustache?
            html = ''
            for (key in doc.attributes){
              html += '<div><strong>' + key + '</strong>: '+ doc.attributes[key] + '</div>'
            }
            feature.properties = {popupContent: html};

            self.features.addGeoJSON(feature);

            // TODO: bounds and center map
          }
        });
      }
    }
  },

  _getGeometryFromDocument: function(doc){
    if (this.geomReady){
      if (this._geomFieldName){
        // We assume that the contents of the field are a valid GeoJSON object
        return doc.attributes[this._geomFieldName];
      } else if (this._lonFieldName && this._latFieldName){
        // We'll create a GeoJSON like point object from the two lat/lon fields
        return {
          type: 'Point',
          coordinates: [
            doc.attributes[this._lonFieldName],
            doc.attributes[this._latFieldName],
            ]
        }
      }
      return null;
    }
  },

  _setupGeometryField: function(){
    var geomField, latField, lonField;

    // Check if there is a field with GeoJSON geometries or alternatively,
    // two fields with lat/lon values
    this._geomFieldName = this._checkField(this.geometryFieldNames);
    this._latFieldName = this._checkField(this.latitudeFieldNames);
    this._lonFieldName = this._checkField(this.longitudeFieldNames);

    // TODO: Allow users to choose the fields

    this.geomReady = (this._geomFieldName || (this._latFieldName && this._lonFieldName));
  },

  _checkField: function(fieldNames){
    var field;
    for (var i = 0; i < fieldNames.length; i++){
      field = this.model.fields.get(fieldNames[i]);
      if (field) return field.id;
    }
    return null;
  },

  _setupMap: function(){

    this.map = new L.Map(this.$map.get(0));

    // MapQuest OpenStreetMap base map
    var mapUrl = "http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png";
    var osmAttribution = 'Map data &copy; 2011 OpenStreetMap contributors, Tiles Courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">';
    var bg = new L.TileLayer(mapUrl, {maxZoom: 18, attribution: osmAttribution ,subdomains: '1234'});
    this.map.addLayer(bg);

    // Layer to hold the features
    this.features = new L.GeoJSON();
    this.features.on('featureparse', function (e) {
      if (e.properties && e.properties.popupContent){
        e.layer.bindPopup(e.properties.popupContent);
       }
    });
    this.map.addLayer(this.features);

    this.map.setView(new L.LatLng(0, 0), 2);

    this.mapReady = true;
  }

 });

})(jQuery, recline.View);

