/*jshint multistr:true */

this.recline = this.recline || {};
this.recline.View = this.recline.View || {};

(function($, my) {
  "use strict";

my.QueryEditor = Backbone.View.extend({
  className: 'recline-query-editor', 
  template: ' \
    <form action="" method="GET" class="form-inline" role="form"> \
      <div class="form-group"> \
        <div class="input-group text-query"> \
          <div class="input-group-addon"> \
            <i class="glyphicon glyphicon-search"></i> \
          </div> \
          <label for="q">Search</label> \
          <input class="form-control search-query" type="text" id="q" name="q" value="{{q}}" placeholder="Search data ..."> \
        </div> \
      </div> \
      <button type="submit" class="btn btn-default">Go &raquo;</button> \
    </form> \
  ',

  events: {
    'submit form': 'onFormSubmit'
  },

  initialize: function() {
    _.bindAll(this, 'render');
    this.listenTo(this.model, 'change', this.render);
    this.render();
  },
  onFormSubmit: function(e) {
    e.preventDefault();
    var query = this.$el.find('.search-query').val();
    this.model.set({q: query});
  },
  render: function() {
    var tmplData = this.model.toJSON();
    var templated = Mustache.render(this.template, tmplData);
    this.$el.html(templated);
  }
});

})(jQuery, recline.View);

