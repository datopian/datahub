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

  initialize: function() {
    var self = this;
    this.el = $(this.el);
    this.render();
    this.bind('view:show', function() {
      // set width explicitly o/w timeline goes wider that screen for some reason
      self.el.find('#vmm-timeline-id').width(self.el.parent().width());
      // only call initTimeline once in DOM as Timeline uses $ internally to look up element
      self.initTimeline();
    });
  },

  render: function() {
    var tmplData = {};
    var htmls = $.mustache(this.template, tmplData);
    this.el.html(htmls);
  },

  initTimeline: function() {
    var config = {
      width:  "300px",
      height: "50%"
    };
    var data = this._timelineJSON();
    var elementId = '#vmm-timeline-id';
    this.timeline = new VMM.Timeline();
    this.timeline.init(data, elementId, config);
  },

  _timelineJSON: function() {
    var self = this;
    var out = {
      'timeline': {
        'type': 'default',
        'headline': ' ',
        'date': [
        ]
      }
    };
    this.model.currentDocuments.each(function(doc) {
      var tlEntry = {
        "startDate": doc.get('date'),
        "headline": String(doc.get(self.model.fields.models[0].id)),
        "text": ''
      };
      if (tlEntry.startDate) {
        out.timeline.date.push(tlEntry);
      }
    });
    return out;
  }
});

})(jQuery, recline.View);
