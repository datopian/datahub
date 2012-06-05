/*jshint multistr:true */

// Field Info
//
// For each field
//
// Id / Label / type / format

// Editor -- to change type (and possibly format)
// Editor for show/hide ...

// Summaries of fields
//
// Top values / number empty
// If number: max, min average ...

// Box to boot transform editor ...

this.recline = this.recline || {};
this.recline.View = this.recline.View || {};

(function($, my) {

my.Fields = Backbone.View.extend({
  className: 'recline-fields-view', 
  template: ' \
    <div class="accordion fields-list well"> \
    {{#fields}} \
      <div class="accordion-group field"> \
        <div class="accordion-heading"> \
          <h4> \
            {{label}} \
            <small> \
              <i class="icon-file" title="Field type"></i> {{type}} \
              <a class="accordion-toggle" data-toggle="collapse" href="#collapse{{id}}"> &raquo; \
              </a> \
            </small> \
          </h4> \
        </div> \
        <div id="collapse{{id}}" class="accordion-body collapse in"> \
          <div class="accordion-inner"> \
            {{#facets}} \
            <div class="facet-summary" data-facet="{{id}}"> \
              <ul class="facet-items"> \
              {{#terms}} \
                <li class="facet-item"><span class="term">{{term}}</span> <span class="count">[{{count}}]</span></li> \
              {{/terms}} \
              </ul> \
            </div> \
            {{/facets}} \
            <div class="clear"></div> \
          </div> \
        </div> \
      </div> \
    {{/fields}} \
    </div> \
  ',

  events: {
  },
  initialize: function(model) {
    var self = this;
    this.el = $(this.el);
    _.bindAll(this, 'render');

    this.model.fields.bind('all', function() {
      self.model.fields.each(function(field) {
        field.facets.bind('all', self.render);
      });
      // fields can get reset or changed in which case we need to recalculate
      self.model.getFieldsSummary();
      self.render();
    });
    this.render();
  },
  render: function() {
    var self = this;
    var tmplData = {
      fields: []
    };
    this.model.fields.each(function(field) {
      var out = field.toJSON();
      out.facets = field.facets.toJSON();
      tmplData.fields.push(out);
    });
    var templated = Mustache.render(this.template, tmplData);
    this.el.html(templated);
    this.el.find('.collapse').collapse('hide');
  }
});

})(jQuery, recline.View);

