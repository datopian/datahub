/*jshint multistr:true */

this.recline = this.recline || {};
this.recline.View = this.recline.View || {};

(function($, my) {
my.Timeline = Backbone.View.extend({
  tagName:  'div',
  className: 'recline-timeline',

  template: ' \
    <div id="vmm-timeline-id"></div> \
  ',

  // These are the default (case-insensitive) names of field that are used if found.
  // If not found, the user will need to define these fields on initialization
  startFieldNames: ['date','startdate', 'start', 'start-date'],
  endFieldNames: ['end','endDate'],
  elementId: '#vmm-timeline-id',

  initialize: function(options) {
    var self = this;
    this.el = $(this.el);
    this.timeline = new VMM.Timeline();
    this._timelineIsInitialized = false;
    this.bind('view:show', function() {
      if (self._timelineIsInitialized === false) {
        self._initTimeline();
      }
    });
    this.model.fields.bind('change', function() {
      self._setupTemporalField();
    });
    this.model.currentDocuments.bind('all', function() {
      self.reloadData();
    });
    var stateData = _.extend({
        startField: null,
        endField: null
      },
      options.state
    );
    this.state = new recline.Model.ObjectState(stateData);
    this._setupTemporalField();
    this.render();
  },

  render: function() {
    var tmplData = {};
    var htmls = $.mustache(this.template, tmplData);
    this.el.html(htmls);
  },

  _initTimeline: function() {
    // set width explicitly o/w timeline goes wider that screen for some reason
    this.el.find(this.elementId).width(this.el.parent().width());
    // only call _initTimeline once view in DOM as Timeline uses $ internally to look up element
    var config = {};
    var data = this._timelineJSON();
    this.timeline.init(data, this.elementId, config);
    this._timelineIsInitialized = true
  },

  reloadData: function() {
    if (this._timelineIsInitialized) {
      var data = this._timelineJSON();
      this.timeline.reload(data);
    }
  },

  _timelineJSON: function() {
    var self = this;
    var out = {
      'timeline': {
        'type': 'default',
        'headline': '',
        'date': [
        ]
      }
    };
    this.model.currentDocuments.each(function(doc) {
      var tlEntry = {
        "startDate": doc.get(self.state.get('startField')),
        "endDate": doc.get(self.state.get('endField')) || null,
        "headline": String(doc.get(self.model.fields.models[0].id)),
        "text": ''
      };
      if (tlEntry.startDate) {
        out.timeline.date.push(tlEntry);
      }
    });
    return out;
  },

  _setupTemporalField: function() {
    this.state.set({
      startField: this._checkField(this.startFieldNames),
      endField: this._checkField(this.endFieldNames)
    });
  },

  _checkField: function(possibleFieldNames) {
    var modelFieldNames = this.model.fields.pluck('id');
    for (var i = 0; i < possibleFieldNames.length; i++){
      for (var j = 0; j < modelFieldNames.length; j++){
        if (modelFieldNames[j].toLowerCase() == possibleFieldNames[i].toLowerCase())
          return modelFieldNames[j];
      }
    }
    return null;
  }
});

})(jQuery, recline.View);
