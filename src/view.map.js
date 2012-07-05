/*jshint multistr:true */

this.recline = this.recline || {};
this.recline.View = this.recline.View || {};

(function($, my) {

// ## Map view for a Dataset using Leaflet mapping library.
//
// This view allows to plot gereferenced records on a map. The location
// information can be provided either via a field with
// [GeoJSON](http://geojson.org) objects or two fields with latitude and
// longitude coordinates.
//
// Initialization arguments are as standard for Dataset Views. State object may
// have the following (optional) configuration options:
//
// <pre>
//   {
//     // geomField if specified will be used in preference to lat/lon
//     geomField: {id of field containing geometry in the dataset}
//     lonField: {id of field containing longitude in the dataset}
//     latField: {id of field containing latitude in the dataset}
//   }
// </pre>
my.Map = Backbone.View.extend({
  tagName:  'div',
  className: 'recline-map',

  template: ' \
    <div class="panel map"></div> \
',

  // These are the default (case-insensitive) names of field that are used if found.
  // If not found, the user will need to define the fields via the editor.
  latitudeFieldNames: ['lat','latitude'],
  longitudeFieldNames: ['lon','longitude'],
  geometryFieldNames: ['geojson', 'geom','the_geom','geometry','spatial','location', 'geo', 'lonlat'],

  initialize: function(options) {
    var self = this;
    this.el = $(this.el);

    // Listen to changes in the fields
    this.model.fields.bind('change', function() {
      self._setupGeometryField()
      self.render()
    });

    // Listen to changes in the records
    this.model.records.bind('add', function(doc){self.redraw('add',doc)});
    this.model.records.bind('change', function(doc){
        self.redraw('remove',doc);
        self.redraw('add',doc);
    });
    this.model.records.bind('remove', function(doc){self.redraw('remove',doc)});
    this.model.records.bind('reset', function(){self.redraw('reset')});

    this.bind('view:show',function(){
      // If the div was hidden, Leaflet needs to recalculate some sizes
      // to display properly
      if (self.map){
        self.map.invalidateSize();
        if (self._zoomPending && self.state.get('autoZoom')) {
          self._zoomToFeatures();
          self._zoomPending = false;
        }
      }
      self.visible = true;
    });
    this.bind('view:hide',function(){
      self.visible = false;
    });

    var stateData = _.extend({
        geomField: null,
        lonField: null,
        latField: null,
        autoZoom: true
      },
      options.state
    );
    this.state = new recline.Model.ObjectState(stateData);
    this.menu = new my.MapMenu({
      model: this.model,
      state: this.state.toJSON()
    });
    this.menu.state.bind('change', function() {
      self.state.set(self.menu.state.toJSON());
      self.redraw();
    });
    this.elSidebar = this.menu.el;

    this.mapReady = false;
    this.render();
    this.redraw();
  },

  // ### Public: Adds the necessary elements to the page.
  //
  // Also sets up the editor fields and the map if necessary.
  render: function() {
    var self = this;

    htmls = Mustache.render(this.template, this.model.toTemplateJSON());
    $(this.el).html(htmls);
    this.$map = this.el.find('.panel.map');
    return this;
  },

  // ### Public: Redraws the features on the map according to the action provided
  //
  // Actions can be:
  //
  // * reset: Clear all features
  // * add: Add one or n features (records)
  // * remove: Remove one or n features (records)
  // * refresh: Clear existing features and add all current records
  redraw: function(action, doc){
    var self = this;
    action = action || 'refresh';
    // try to set things up if not already
    if (!self._geomReady()){
      self._setupGeometryField();
    }
    if (!self.mapReady){
      self._setupMap();
    }

    if (this._geomReady() && this.mapReady){
      if (action == 'reset' || action == 'refresh'){
        this.features.clearLayers();
        this._add(this.model.records.models);
      } else if (action == 'add' && doc){
        this._add(doc);
      } else if (action == 'remove' && doc){
        this._remove(doc);
      }
      if (this.state.get('autoZoom')){
        if (this.visible){
          this._zoomToFeatures();
        } else {
          this._zoomPending = true;
        }
      }
    }
  },

  _geomReady: function() {
    return Boolean(this.state.get('geomField') || (this.state.get('latField') && this.state.get('lonField')));
  },

  // Private: Add one or n features to the map
  //
  // For each record passed, a GeoJSON geometry will be extracted and added
  // to the features layer. If an exception is thrown, the process will be
  // stopped and an error notification shown.
  //
  // Each feature will have a popup associated with all the record fields.
  //
  _add: function(docs){
    var self = this;

    if (!(docs instanceof Array)) docs = [docs];

    var count = 0;
    var wrongSoFar = 0;
    _.every(docs,function(doc){
      count += 1;
      var feature = self._getGeometryFromRecord(doc);
      if (typeof feature === 'undefined' || feature === null){
        // Empty field
        return true;
      } else if (feature instanceof Object){
        // Build popup contents
        // TODO: mustache?
        html = ''
        for (key in doc.attributes){
          if (!(self.state.get('geomField') && key == self.state.get('geomField'))){
            html += '<div><strong>' + key + '</strong>: '+ doc.attributes[key] + '</div>';
          }
        }
        feature.properties = {popupContent: html};

        // Add a reference to the model id, which will allow us to
        // link this Leaflet layer to a Recline doc
        feature.properties.cid = doc.cid;

        try {
          self.features.addGeoJSON(feature);
        } catch (except) {
          wrongSoFar += 1;
          var msg = 'Wrong geometry value';
          if (except.message) msg += ' (' + except.message + ')';
          if (wrongSoFar <= 10) {
            self.trigger('recline:flash', {message: msg, category:'error'});
          }
        }
      } else {
        wrongSoFar += 1
        if (wrongSoFar <= 10) {
          self.trigger('recline:flash', {message: 'Wrong geometry value', category:'error'});
        }
      }
      return true;
    });
  },

  // Private: Remove one or n features to the map
  //
  _remove: function(docs){

    var self = this;

    if (!(docs instanceof Array)) docs = [docs];

    _.each(docs,function(doc){
      for (key in self.features._layers){
        if (self.features._layers[key].cid == doc.cid){
          self.features.removeLayer(self.features._layers[key]);
        }
      }
    });

  },

  // Private: Return a GeoJSON geomtry extracted from the record fields
  //
  _getGeometryFromRecord: function(doc){
    if (this.state.get('geomField')){
      var value = doc.get(this.state.get('geomField'));
      if (typeof(value) === 'string'){
        // We *may* have a GeoJSON string representation
        try {
          value = $.parseJSON(value);
        } catch(e) {}
      }

      if (typeof(value) === 'string') {
        value = value.replace('(', '').replace(')', '');
        var parts = value.split(',');
        var lat = parseFloat(parts[0]);
        var lon = parseFloat(parts[1]);
        if (!isNaN(lon) && !isNaN(parseFloat(lat))) {
          return {
            "type": "Point",
            "coordinates": [lon, lat]
          };
        } else {
          return null;
        }
      } else if (value && value.slice) {
        // [ lon, lat ]
        return {
          "type": "Point",
          "coordinates": [value[0], value[1]]
        };
      } else if (value && value.lat) {
        // of form { lat: ..., lon: ...}
        return {
          "type": "Point",
          "coordinates": [value.lon || value.lng, value.lat]
        };
      }
      // We o/w assume that contents of the field are a valid GeoJSON object
      return value;
    } else if (this.state.get('lonField') && this.state.get('latField')){
      // We'll create a GeoJSON like point object from the two lat/lon fields
      var lon = doc.get(this.state.get('lonField'));
      var lat = doc.get(this.state.get('latField'));
      if (!isNaN(parseFloat(lon)) && !isNaN(parseFloat(lat))) {
        return {
          type: 'Point',
          coordinates: [lon,lat]
        };
      }
    }
    return null;
  },

  // Private: Check if there is a field with GeoJSON geometries or alternatively,
  // two fields with lat/lon values.
  //
  // If not found, the user can define them via the UI form.
  _setupGeometryField: function(){
    // should not overwrite if we have already set this (e.g. explicitly via state)
    if (!this._geomReady()) {
      this.state.set({
        geomField: this._checkField(this.geometryFieldNames),
        latField: this._checkField(this.latitudeFieldNames),
        lonField: this._checkField(this.longitudeFieldNames)
      });
      this.menu.state.set(this.state.toJSON());
    }
  },

  // Private: Check if a field in the current model exists in the provided
  // list of names.
  //
  //
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

  // Private: Zoom to map to current features extent if any, or to the full
  // extent if none.
  //
  _zoomToFeatures: function(){
    var bounds = this.features.getBounds();
    if (bounds){
      this.map.fitBounds(bounds);
    } else {
      this.map.setView(new L.LatLng(0, 0), 2);
    }
  },

  // Private: Sets up the Leaflet map control and the features layer.
  //
  // The map uses a base layer from [MapQuest](http://www.mapquest.com) based
  // on [OpenStreetMap](http://openstreetmap.org).
  //
  _setupMap: function(){
    this.map = new L.Map(this.$map.get(0));

    var mapUrl = "http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png";
    var osmAttribution = 'Map data &copy; 2011 OpenStreetMap contributors, Tiles Courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">';
    var bg = new L.TileLayer(mapUrl, {maxZoom: 18, attribution: osmAttribution ,subdomains: '1234'});
    this.map.addLayer(bg);

    this.features = new L.GeoJSON();
    this.features.on('featureparse', function (e) {
      if (e.properties && e.properties.popupContent){
        e.layer.bindPopup(e.properties.popupContent);
       }
      if (e.properties && e.properties.cid){
        e.layer.cid = e.properties.cid;
       }

    });

    // This will be available in the next Leaflet stable release.
    // In the meantime we add it manually to our layer.
    this.features.getBounds = function(){
      var bounds = new L.LatLngBounds();
      this._iterateLayers(function (layer) {
        if (layer instanceof L.Marker){
          bounds.extend(layer.getLatLng());
        } else {
          if (layer.getBounds){
            bounds.extend(layer.getBounds().getNorthEast());
            bounds.extend(layer.getBounds().getSouthWest());
          }
        }
      }, this);
      return (typeof bounds.getNorthEast() !== 'undefined') ? bounds : null;
    }

    this.map.addLayer(this.features);

    this.map.setView(new L.LatLng(0, 0), 2);

    this.mapReady = true;
  },

  // Private: Helper function to select an option from a select list
  //
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

my.MapMenu = Backbone.View.extend({
  className: 'editor',

  template: ' \
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
      <div class="editor-options" > \
        <label class="checkbox"> \
          <input type="checkbox" id="editor-auto-zoom" checked="checked" /> \
          Auto zoom to features</label> \
      </div> \
      <input type="hidden" class="editor-id" value="map-1" /> \
      </div> \
    </form> \
',

  // Define here events for UI elements
  events: {
    'click .editor-update-map': 'onEditorSubmit',
    'change .editor-field-type': 'onFieldTypeChange',
    'click #editor-auto-zoom': 'onAutoZoomChange'
  },

  initialize: function(options) {
    var self = this;
    this.el = $(this.el);
    _.bindAll(this, 'render');
    this.model.fields.bind('change', this.render);
    this.state = new recline.Model.ObjectState(options.state);
    this.state.bind('change', this.render);
    this.render();
  },

  // ### Public: Adds the necessary elements to the page.
  //
  // Also sets up the editor fields and the map if necessary.
  render: function() {
    var self = this;
    htmls = Mustache.render(this.template, this.model.toTemplateJSON());
    $(this.el).html(htmls);

    if (this._geomReady() && this.model.fields.length){
      if (this.state.get('geomField')){
        this._selectOption('editor-geom-field',this.state.get('geomField'));
        this.el.find('#editor-field-type-geom').attr('checked','checked').change();
      } else{
        this._selectOption('editor-lon-field',this.state.get('lonField'));
        this._selectOption('editor-lat-field',this.state.get('latField'));
        this.el.find('#editor-field-type-latlon').attr('checked','checked').change();
      }
    }
    if (this.state.get('autoZoom')) {
      this.el.find('#editor-auto-zoom').attr('checked', 'checked');
    }
    else {
      this.el.find('#editor-auto-zoom').removeAttr('checked');
    }
    return this;
  },

  _geomReady: function() {
    return Boolean(this.state.get('geomField') || (this.state.get('latField') && this.state.get('lonField')));
  },

  // ## UI Event handlers
  //

  // Public: Update map with user options
  //
  // Right now the only configurable option is what field(s) contains the
  // location information.
  //
  onEditorSubmit: function(e){
    e.preventDefault();
    if (this.el.find('#editor-field-type-geom').attr('checked')){
      this.state.set({
        geomField: this.el.find('.editor-geom-field > select > option:selected').val(),
        lonField: null,
        latField: null
      });
    } else {
      this.state.set({
        geomField: null,
        lonField: this.el.find('.editor-lon-field > select > option:selected').val(),
        latField: this.el.find('.editor-lat-field > select > option:selected').val()
      });
    }
    return false;
  },

  // Public: Shows the relevant select lists depending on the location field
  // type selected.
  //
  onFieldTypeChange: function(e){
    if (e.target.value == 'geom'){
        this.el.find('.editor-field-type-geom').show();
        this.el.find('.editor-field-type-latlon').hide();
    } else {
        this.el.find('.editor-field-type-geom').hide();
        this.el.find('.editor-field-type-latlon').show();
    }
  },

  onAutoZoomChange: function(e){
    this.state.set({autoZoom: !this.state.get('autoZoom')});
  },

  // Private: Helper function to select an option from a select list
  //
  _selectOption: function(id,value){
    var options = this.el.find('.' + id + ' > select > option');
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

