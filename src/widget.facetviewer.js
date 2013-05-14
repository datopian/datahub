/*jshint multistr:true */

this.recline = this.recline || {};
this.recline.View = this.recline.View || {};

(function($, my) {
  "use strict";

// ## FacetViewer
//
// Widget for displaying facets 
//
// Usage:
//
//      var viewer = new FacetViewer({
//        model: dataset
//      });
my.FacetViewer = Backbone.View.extend({
  className: 'recline-facet-viewer', 
  template: ' \
    <div class="facets"> \
      {{#facets}} \
      <div class="facet-summary" data-facet="{{id}}"> \
        <h3> \
          {{id}} \
        </h3> \
        <ul class="facet-items"> \
        {{#terms}} \
          <li><a class="facet-choice js-facet-filter" data-value="{{term}}" href="#{{term}}">{{term}} ({{count}})</a></li> \
        {{/terms}} \
        {{#entries}} \
          <li><a class="facet-choice js-facet-filter" data-value="{{time}}">{{term}} ({{count}})</a></li> \
        {{/entries}} \
        </ul> \
      </div> \
      {{/facets}} \
    </div> \
  ',

  events: {
    'click .js-facet-filter': 'onFacetFilter'
  },
  initialize: function(model) {
    _.bindAll(this, 'render');
    this.listenTo(this.model.facets, 'all', this.render);
    this.listenTo(this.model.fields, 'all', this.render);
    this.render();
  },
  render: function() {
    var tmplData = {
      fields: this.model.fields.toJSON()
    };
    tmplData.facets = _.map(this.model.facets.toJSON(), function(facet) {
      if (facet._type === 'date_histogram') {
        facet.entries = _.map(facet.entries, function(entry) {
          entry.term = new Date(entry.time).toDateString();
          return entry;
        });
      }
      return facet;
    });
    var templated = Mustache.render(this.template, tmplData);
    this.$el.html(templated);
    // are there actually any facets to show?
    if (this.model.facets.length > 0) {
      this.$el.show();
    } else {
      this.$el.hide();
    }
  },
  onHide: function(e) {
    e.preventDefault();
    this.$el.hide();
  },
  onFacetFilter: function(e) {
    e.preventDefault();
    var $target= $(e.target);
    var fieldId = $target.closest('.facet-summary').attr('data-facet');
    var value = $target.attr('data-value');
    this.model.queryState.addFilter({type: 'term', field: fieldId, term: value});
    // have to trigger explicitly for some reason
    this.model.query();
  }
});


})(jQuery, recline.View);

