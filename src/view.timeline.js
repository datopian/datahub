/*jshint multistr:true */

this.recline = this.recline || {};
this.recline.View = this.recline.View || {};

(function($, my) {
  "use strict";
// turn off unnecessary logging from VMM Timeline
if (typeof VMM !== 'undefined') {
  VMM.debug = false;
}

// ## Timeline
//
// Timeline view using http://timeline.verite.co/
my.Timeline = Backbone.View.extend({
  template: ' \
    <div class="recline-timeline"> \
      <div id="vmm-timeline-id"></div> \
    </div> \
  ',

  // These are the default (case-insensitive) names of field that are used if found.
  // If not found, the user will need to define these fields on initialization
  startFieldNames: ['date','startdate', 'start', 'start-date'],
  endFieldNames: ['end','endDate'],
  elementId: '#vmm-timeline-id',

  initialize: function(options) {
    var self = this;
    this.timeline = new VMM.Timeline(this.elementId);
    this._timelineIsInitialized = false;
    this.listenTo(this.model.fields, 'reset', function() {
      self._setupTemporalField();
    });
    this.listenTo(this.model.records, 'all', function() {
      self.reloadData();
    });
    var stateData = _.extend({
        startField: null,
        endField: null,
        // by default timelinejs (and browsers) will parse ambiguous dates in US format (mm/dd/yyyy)
        // set to true to interpret dd/dd/dddd as dd/mm/yyyy
        nonUSDates: false,
        timelineJSOptions: {}
      },
      options.state
    );
    this.state = new recline.Model.ObjectState(stateData);
    this._setupTemporalField();
  },

  render: function() {
    var tmplData = {};
    var htmls = Mustache.render(this.template, tmplData);
    this.$el.html(htmls);
    // can only call _initTimeline once view in DOM as Timeline uses $
    // internally to look up element
    if ($(this.elementId).length > 0) {
      this._initTimeline();
    }
  },

  show: function() {
    // only call _initTimeline once view in DOM as Timeline uses $ internally to look up element
    if (this._timelineIsInitialized === false) {
      this._initTimeline();
    }
  },

  _initTimeline: function() {
    var data = this._timelineJSON();
    var config = this.state.get("timelineJSOptions");
    config.id = this.elementId;
    this.timeline.init(config, data);
    this._timelineIsInitialized = true
  },

  reloadData: function() {
    if (this._timelineIsInitialized) {
      var data = this._timelineJSON();
      this.timeline.reload(data);
    }
  },

  // Convert record to JSON for timeline
  //
  // Designed to be overridden in client apps
  convertRecord: function(record, fields) {
    return this._convertRecord(record, fields);
  },

  // Internal method to generate a Timeline formatted entry
  _convertRecord: function(record, fields) {
    var start = this._parseDate(record.get(this.state.get('startField')));
    var end = this._parseDate(record.get(this.state.get('endField')));
    if (start) {
      var tlEntry = {
        "startDate": start,
        "endDate": end,
        "headline": String(record.get('title') || ''),
        "text": record.get('description') || record.summary(),
        "tag": record.get('tags')
      };
      return tlEntry;
    } else {
      return null;
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
    this.model.records.each(function(record) {
      var newEntry = self.convertRecord(record, self.fields);
      if (newEntry) {
        out.timeline.date.push(newEntry); 
      }
    });
    // if no entries create a placeholder entry to prevent Timeline crashing with error
    if (out.timeline.date.length === 0) {
      var tlEntry = {
        "startDate": '2000,1,1',
        "headline": 'No data to show!'
      };
      out.timeline.date.push(tlEntry);
    }
    return out;
  },

  // convert dates into a format TimelineJS will handle
  // TimelineJS does not document this at all so combo of read the code +
  // trial and error
  // Summary (AFAICt):
  // Preferred: [-]yyyy[,mm,dd,hh,mm,ss]
  // Supported: mm/dd/yyyy
  _parseDate: function(date) {
    if (!date) {
      return null;
    }
    var out = $.trim(date);
    out = out.replace(/(\d)th/g, '$1');
    out = out.replace(/(\d)st/g, '$1');
    out = $.trim(out);
    if (out.match(/\d\d\d\d-\d\d-\d\d(T.*)?/)) {
      out = out.replace(/-/g, ',').replace('T', ',').replace(':',',');
    }
    if (out.match(/\d\d-\d\d-\d\d.*/)) {
      out = out.replace(/-/g, '/');
    }
    if (this.state.get('nonUSDates')) {
      var parts = out.match(/(\d\d)\/(\d\d)\/(\d\d.*)/);
      if (parts) {
        out = [parts[2], parts[1], parts[3]].join('/');
      }
    }
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
