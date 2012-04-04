this.recline = this.recline || {};
this.recline.View = this.recline.View || {};

(function($, my) {

my.Map = Backbone.View.extend({

  tagName:  'div',
  className: 'data-map-container',

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
    this.el = $(this.el);
    this.render();

  },

  render: function() {

    var self = this;

    htmls = $.mustache(this.template, this.model.toTemplateJSON());
    $(this.el).html(htmls);
    // now set a load of stuff up
    this.$map = this.el.find('.panel.map');


    this.model.bind('query:done', function() {
      if (!self.mapReady){
        self._setupMap();
      }
      self.redraw()
    });

    return this;
  },

  redraw: function(){

    //TODO: check fields or geom:
    // why this doesn't work?
    // var fields = this.model.fields.all();

    if (this.model.fields.get('lon') && this.model.fields.get('lat')){
        if (this.model.currentDocuments.length > 0){
          this.features.clearLayers();
          var attrs, latLon, marker;

          var bounds = new L.LatLngBounds();
          for (var i = 0; i < this.model.currentDocuments.length; i++){
            attrs = this.model.currentDocuments.models[i].attributes;
            latLon = new L.LatLng(attrs['lat'], attrs['lon']);
            marker = new L.Marker(latLon);
            
            // Build popup contents
            // TODO: mustache?
            html = ''
            for (key in attrs){
              html += '<div><strong>' + key + '</strong>: '+ attrs[key] + '</div>'
            }       
            
            marker.bindPopup(html);

            this.features.addLayer(marker);

            // Looks like Leaflet does not provide a LayerGroup.getBounds method
            // so we need to build the bounds ourselves
            bounds.extend(latLon);
          }

          // TODO: This does not work if the map div is not visible!
          //this.map.fitBounds(bounds);
        }
    }
  },

  _setupMap: function(){

    this.map = new L.Map(this.$map.get(0));

    // MapQuest OpenStreetMap base map
    var mapUrl = "http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png";
    var osmAttribution = 'Map data &copy; 2011 OpenStreetMap contributors, Tiles Courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">';
    var bg = new L.TileLayer(mapUrl, {maxZoom: 18, attribution: osmAttribution ,subdomains: '1234'});
    this.map.addLayer(bg);

    // Layer to hold the features
    this.features = new L.LayerGroup([]);
    this.map.addLayer(this.features);

    this.map.setView(new L.LatLng(0, 0), 2);

    this.mapReady = true;
  }

 });

})(jQuery, recline.View);

