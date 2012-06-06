/*jshint multistr:true */

this.recline = this.recline || {};
this.recline.View = this.recline.View || {};

(function($, my) {

my.FilterEditor = Backbone.View.extend({
  className: 'recline-filter-editor well', 
  template: ' \
    <div class="row filters"> \
      <div class="span1"> \
        <h3>Filters</h3> \
      </div> \
      <div class="span11"> \
        <form class="form-horizontal"> \
          <div class="row"> \
            <div class="span6"> \
              {{#termFilters}} \
              <div class="control-group filter-term filter" data-filter-id={{id}}> \
                <label class="control-label" for="">{{label}}</label> \
                <div class="controls"> \
                  <div class="input-append"> \
                    <input type="text" value="{{value}}" name="{{fieldId}}" class="span4" data-filter-field="{{fieldId}}" data-filter-id="{{id}}" data-filter-type="term" /> \
                    <a class="btn js-remove-filter"><i class="icon-remove"></i></a> \
                  </div> \
                </div> \
              </div> \
              {{/termFilters}} \
            </div> \
          <div class="span4"> \
            <p>To add a filter use the column menu in the grid view.</p> \
            <button type="submit" class="btn">Update</button> \
          </div> \
        </form> \
      </div> \
    </div> \
  ',
  events: {
    'click .js-remove-filter': 'onRemoveFilter',
    'submit form': 'onTermFiltersUpdate'
  },
  initialize: function() {
    this.el = $(this.el);
    _.bindAll(this, 'render');
    this.model.bind('change', this.render);
    this.model.bind('change:filters:new-blank', this.render);
    this.render();
  },
  render: function() {
    var tmplData = $.extend(true, {}, this.model.toJSON());
    // we will use idx in list as there id ...
    tmplData.filters = _.map(tmplData.filters, function(filter, idx) {
      filter.id = idx;
      return filter;
    });
    tmplData.termFilters = _.filter(tmplData.filters, function(filter) {
      return filter.term !== undefined;
    });
    tmplData.termFilters = _.map(tmplData.termFilters, function(filter) {
      var fieldId = _.keys(filter.term)[0];
      return {
        id: filter.id,
        fieldId: fieldId,
        label: fieldId,
        value: filter.term[fieldId]
      };
    });
    var out = Mustache.render(this.template, tmplData);
    this.el.html(out);
    // are there actually any facets to show?
    if (this.model.get('filters').length > 0) {
      this.el.show();
    } else {
      this.el.hide();
    }
  },
  onRemoveFilter: function(e) {
    e.preventDefault();
    var $target = $(e.target);
    var filterId = $target.closest('.filter').attr('data-filter-id');
    this.model.removeFilter(filterId);
  },
  onTermFiltersUpdate: function(e) {
   var self = this;
    e.preventDefault();
    var filters = self.model.get('filters');
    var $form = $(e.target);
    _.each($form.find('input'), function(input) {
      var $input = $(input);
      var filterIndex = parseInt($input.attr('data-filter-id'));
      var value = $input.val();
      var fieldId = $input.attr('data-filter-field');
      filters[filterIndex].term[fieldId] = value;
    });
    self.model.set({filters: filters});
    self.model.trigger('change');
  }
});


})(jQuery, recline.View);

