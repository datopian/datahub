/*jshint multistr:true */

this.recline = this.recline || {};
this.recline.View = this.recline.View || {};

(function($, my) {

my.FilterEditor = Backbone.View.extend({
  className: 'recline-filter-editor well', 
  template: ' \
    <div class="filters"> \
      <h3>Filters</h3> \
      <a href="#" class="js-add-filter">Add filter</a> \
      <form class="form-stacked js-add" style="display: none;"> \
        <fieldset> \
          <label>Filter type</label> \
          <select class="filterType"> \
            <option value="term">Term (text) filter</option> \
          </select> \
          <label>Field</label> \
          <select class="fields"> \
            {{#fields}} \
            <option value="{{id}}">{{label}}</option> \
            {{/fields}} \
          </select> \
          <button type="submit" class="btn">Add</button> \
        </fieldset> \
      </form> \
      <form class="form-stacked js-edit"> \
        {{#termFilters}} \
        <div class="control-group filter-term filter" data-filter-id={{id}}> \
          <label class="control-label" for="">{{label}}</label> \
          <div class="controls"> \
              <input type="text" value="{{value}}" name="{{fieldId}}" data-filter-field="{{fieldId}}" data-filter-id="{{id}}" data-filter-type="term" /> \
              <a class="js-remove-filter" href="#">&times;</a> \
          </div> \
        </div> \
        {{/termFilters}} \
        {{#termFilters.length}} \
        <button type="submit" class="btn">Update</button> \
        {{/termFilters.length}} \
      </form> \
    </div> \
  ',
  events: {
    'click .js-remove-filter': 'onRemoveFilter',
    'click .js-add-filter': 'onAddFilterShow',
    'submit form.js-edit': 'onTermFiltersUpdate',
    'submit form.js-add': 'onAddFilter'
  },
  initialize: function() {
    this.el = $(this.el);
    _.bindAll(this, 'render');
    this.model.queryState.bind('change', this.render);
    this.model.queryState.bind('change:filters:new-blank', this.render);
    this.render();
  },
  render: function() {
    var tmplData = $.extend(true, {}, this.model.queryState.toJSON());
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
    tmplData.fields = this.model.fields.toJSON();
    var out = Mustache.render(this.template, tmplData);
    this.el.html(out);
  },
  onAddFilterShow: function(e) {
    e.preventDefault();
    var $target = $(e.target);
    $target.hide();
    this.el.find('form.js-add').show();
  },
  onAddFilter: function(e) {
    e.preventDefault();
    var $target = $(e.target);
    $target.hide();
    var filterType = $target.find('select.filterType').val();
    var field = $target.find('select.fields').val();
    if (filterType === 'term') {
      this.model.queryState.addTermFilter(field);
    }
    // trigger render explicitly as queryState change will not be triggered (as blank value for filter)
    this.render();
  },
  onRemoveFilter: function(e) {
    e.preventDefault();
    var $target = $(e.target);
    var filterId = $target.closest('.filter').attr('data-filter-id');
    this.model.queryState.removeFilter(filterId);
  },
  onTermFiltersUpdate: function(e) {
   var self = this;
    e.preventDefault();
    var filters = self.model.queryState.get('filters');
    var $form = $(e.target);
    _.each($form.find('input'), function(input) {
      var $input = $(input);
      var filterIndex = parseInt($input.attr('data-filter-id'));
      var value = $input.val();
      var fieldId = $input.attr('data-filter-field');
      filters[filterIndex].term[fieldId] = value;
    });
    self.model.queryState.set({filters: filters});
    self.model.queryState.trigger('change');
  }
});


})(jQuery, recline.View);

