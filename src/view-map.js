/*jshint multistr:true */

this.recline = this.recline || {};
this.recline.View = this.recline.View || {};

(function($, my) {

my.Map = Backbone.View.extend({

  tagName:  'div',
  className: 'data-map-container',

  latitudeFieldNames: ['lat','latitude'],
  longitudeFieldNames: ['lon','longitude'],
  geometryFieldNames: ['geom','the_geom','geometry','spatial','location'],

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
  <div class="editor"> \
    <form class="form-stacked"> \
      <div class="clearfix"> \
        <div class="editor-field-type"> \
            <label class="radio"> \
              <input type="radio" id="editor-field-type-latlon" name="editor-field-type" value="latlon" checked="checked"/> \
              Latitude / Longitude fields</label> \
            <label class="radio"> \
              <input type="radio" id="editor-field-type-geom" name="editor-field-type" value="geom" /> \
              GeoJSON field</label> \
        </div> \
        <div class="editor-field-type-latlon"> \
          <label>Latitude field</label> \
          <div class="input editor-lat-field"> \
            <select> \
            <option value=""></option> \
            {{#fields}} \
            <option value="{{id}}">{{label}}</option> \
            {{/fields}} \
            </select> \
          </div> \
          <label>Longitude field</label> \
          <div class="input editor-lon-field"> \
            <select> \
            <option value=""></option> \
            {{#fields}} \
            <option value="{{id}}">{{label}}</option> \
            {{/fields}} \
            </select> \
          </div> \
        </div> \
        <div class="editor-field-type-geom" style="display:none"> \
          <label>Geometry field (GeoJSON)</label> \
          <div class="input editor-geom-field"> \
            <select> \
            <option value=""></option> \
            {{#fields}} \
            <option value="{{id}}">{{label}}</option> \
            {{/fields}} \
            </select> \
          </div> \
        </div> \
      </div> \
      <div class="editor-buttons"> \
        <button class="btn editor-update-map">Update</button> \
      </div> \
      <input type="hidden" class="editor-id" value="map-1" /> \
      </div> \
    </form> \
  </div> \
<div class="panel map"> \
</div> \
',

  events: {
    'click .editor-update-map': 'onEditorSubmit',
    'change .editor-field-type': 'onFieldTypeChange'
  },


  initialize: function(options, config) {
    var self = this;

    this.el = $(this.el);
    this.model.bind('change', function() {
      self._setupGeometryField();
    });
    this.model.fields.bind('add', this.render);
    this.model.fields.bind('reset', function(){
      self._setupGeometryField()
      self.render()
    });
    this.model.currentDocuments.bind('add', function(doc){self.redraw('add',doc)});
    this.model.currentDocuments.bind('remove', function(doc){self.redraw('remove',doc)});
    this.model.currentDocuments.bind('reset', function(){self.redraw('reset')});

    // If the div is hidden, Leaflet needs to recalculate some sizes
    // to display properly
    this.bind('view:show',function(){
        self.map.invalidateSize();
    });

    this.mapReady = false;

    this.render();
  },

  render: function() {

    var self = this;

    htmls = $.mustache(this.template, this.model.toTemplateJSON());

    $(this.el).html(htmls);
    this.$map = this.el.find('.panel.map');

    // Setup editor fields
    if (this.geomReady && this.model.fields.length){
      if (this._geomFieldName){
        this._selectOption('editor-geom-field',this._geomFieldName);
        $('#editor-field-type-geom').attr('checked','checked').change();
      } else{
        this._selectOption('editor-lon-field',this._lonFieldName);
        this._selectOption('editor-lat-field',this._latFieldName);
        $('#editor-field-type-latlon').attr('checked','checked').change();
      }
    }

    this.model.bind('query:done', function() {
      if (!self.geomReady){
        self._setupGeometryField();
      }

      if (!self.mapReady){
        self._setupMap();
      }
      self.redraw();
    });

    return this;
  },

  redraw: function(action,doc){

    var self = this;

    action = action || 'refresh';

    if (this.geomReady && this.mapReady){
      if (action == 'reset'){
        // Clear all features
        this.features.clearLayers();
      } else if (action == 'add' && doc){
        // Add one or n features
        this._add(doc);
      } else if (action == 'remove' && doc){
        // Remove one or n features
        this._remove(doc);
      } else if (action == 'refresh'){
        // Clear and rebuild all features
        this.features.clearLayers();
        var bounds = new L.LatLngBounds();

        this.model.currentDocuments.forEach(function(doc){
          var feature = self._getGeometryFromDocument(doc);
          if (feature){
            // Build popup contents
            // TODO: mustache?
            var html = '';
            for (key in doc.attributes) {
              html += '<div><strong>' + key + '</strong>: '+ doc.attributes[key] + '</div>';
            }
            feature.properties = {popupContent: html};

            self.features.addGeoJSON(feature);

            // TODO: bounds and center map
          }
        });
      }
    }
  },

  /* UI Event handlers */

  onEditorSubmit: function(e){
    e.preventDefault();
    if ($('#editor-field-type-geom').attr('checked')){
        this._geomFieldName = $('.editor-geom-field > select > option:selected').val();
        this._latFieldName = this._lonFieldName = false;
    } else {
        this._geomFieldName = false;
        this._latFieldName = $('.editor-lat-field > select > option:selected').val();
        this._lonFieldName = $('.editor-lon-field > select > option:selected').val();
    }
    this.geomReady = (this._geomFieldName || (this._latFieldName && this._lonFieldName));
    this.redraw();

    return false;
  },

  onFieldTypeChange: function(e){
    if (e.target.value == 'geom'){
        $('.editor-field-type-geom').show();
        $('.editor-field-type-latlon').hide();
    } else {
        $('.editor-field-type-geom').hide();
        $('.editor-field-type-latlon').show();
    }
  },

  _add: function(doc){

    var self = this;

    if (!(doc instanceof Array)) doc = [doc];

    doc.forEach(function(doc){
      var feature = self._getGeometryFromDocument(doc);
      if (feature instanceof Object){
        // Build popup contents
        // TODO: mustache?
        html = ''
        for (key in doc.attributes){
          html += '<div><strong>' + key + '</strong>: '+ doc.attributes[key] + '</div>'
        }
        feature.properties = {popupContent: html};

        // Add a reference to the model id, which will allow us to
        // link this Leaflet layer to a Recline doc
        feature.properties.cid = doc.cid;

        try {
            self.features.addGeoJSON(feature);
        } catch (except) {
            var msg = 'Wrong geometry value';
            if (except.message) msg += ' (' + except.message + ')';
            my.notify(msg,{category:'error'});
            _.breakLoop();
        }
      } else {
        my.notify('Wrong geometry value',{category:'error'});
        _.breakLoop();
      }
    });
  },

  _remove: function(doc){

    var self = this;

    if (!(doc instanceof Array)) doc = [doc];

    doc.forEach(function(doc){
      for (key in self.features._layers){
        if (self.features._layers[key].cid == doc.cid){
          self.features.removeLayer(self.features._layers[key]);
        }
      }
    });

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
            doc.attributes[this._latFieldName]
            ]
        };
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

    this.geomReady = (this._geomFieldName || (this._latFieldName && this._lonFieldName));
  },

  _checkField: function(fieldNames){
    var field;
    var modelFieldNames = this.model.fields.pluck('id');
    for (var i = 0; i < fieldNames.length; i++){
      for (var j = 0; j < modelFieldNames.length; j++){
        if (modelFieldNames[j].toLowerCase() == fieldNames[i].toLowerCase())
          return modelFieldNames[j];
      }
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
      if (e.properties && e.properties.cid){
        e.layer.cid = e.properties.cid;
       }

    });
    this.map.addLayer(this.features);

    this.map.setView(new L.LatLng(0, 0), 2);

    this.mapReady = true;
  },

  _selectOption: function(id,value){
    var options = $('.' + id + ' > select > option');
    if (options){
      options.each(function(opt){
        if (this.value == value) {
          $(this).attr('selected','selected');
          return false;
        }
      });
    }
  }

 });

})(jQuery, recline.View);

