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
  className: 'recline-fields-view well', 
  template: ' \
    <div class="accordion fields-list"> \
    {{#fields}} \
      <div class="accordion-group"> \
        <div class="accordion-heading"> \
          <h3> \
            {{label}} ({{id}}) \
            <small> \
              <i class="icon-file" title="Field type"></i> {{type}} \
              <a class="accordion-toggle" data-toggle="collapse" href="#collapse{{id}}"> More information &raquo; \
              </a> \
            </small> \
          </h3> \
        </div> \
        <div id="collapse{{id}}" class="accordion-body collapse in"> \
          <div class="accordion-inner"> \
            <i class="icon-file"></i> {{type}} \
          </div> \
        </div> \
      </div> \
    {{/fields}} \
    </div> \
  ',

  events: {
  },
  initialize: function(model) {
    _.bindAll(this, 'render');
    this.el = $(this.el);
    this.model.fields.bind('all', this.render);
    this.render();
  },
  render: function() {
    var tmplData = {
      fields: this.model.fields.toJSON()
    };
    var templated = Mustache.render(this.template, tmplData);
    this.el.html(templated);
    // this.el.hide();
    this.el.find('.collapse').collapse()
  }
});

})(jQuery, recline.View);

