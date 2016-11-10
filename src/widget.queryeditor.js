/*jshint multistr:true */

this.recline = this.recline || {};
this.recline.View = this.recline.View || {};

(function($, my) {
  "use strict";

my.QueryEditor = Backbone.I18nView.extend({
  className: 'recline-query-editor', 
  template: ' \
    <form action="" method="GET" class="form-inline" role="form"> \
      <div class="form-group"> \
        <div class="input-group text-query"> \
          <div class="input-group-addon"> \
            <i class="glyphicon glyphicon-search"></i> \
          </div> \
          <label for="q">{{t.Search}}</label> \
          <input class="form-control search-query" type="text" id="q" name="q" value="{{q}}" placeholder="{{t.Search_data}} ..."> \
        </div> \
      </div> \
      <button type="submit" class="btn btn-default">{{t.Search}} &raquo;</button> \
    </form> \
  ',

  events: {
    'submit form': 'onFormSubmit'
  },

  initialize: function(options) {
    _.bindAll(this, 'render');
    this.listenTo(this.model, 'change', this.render);
    options = options || {};
    this.initializeI18n(options.locale);

    this.render();
  },
  onFormSubmit: function(e) {
    e.preventDefault();
    var query = this.$el.find('.search-query').val();
    this.model.set({q: query});
  },
  render: function() {
    var tmplData = this.model.toJSON();
    tmplData = _.extend(tmplData, this.MustacheFormatter());
    var templated = Mustache.render(this.template, tmplData);
    this.$el.html(templated);
  }
});

})(jQuery, recline.View);

