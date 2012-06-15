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
            <option value="term">Term (text)</option> \
            <option value="geo_distance">Geo distance</option> \
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
        {{#filters}} \
          {{{filterRender}}} \
        {{/filters}} \
        {{#filters.length}} \
        <button type="submit" class="btn">Update</button> \
        {{/filters.length}} \
      </form> \
    </div> \
  ',
  filterTemplates: {
    term: ' \
      <div class="control-group filter-{{_type}} filter"> \
        <label class="control-label" for="">{{_field}}</label> \
        <div class="controls"> \
            <input type="text" value="{{_value}}" name="term" data-filter-field="{{_field}}" data-filter-id="{{id}}" data-filter-type="{{_type}}" /> \
            <a class="js-remove-filter" href="#">&times;</a> \
        </div> \
      </div> \
    ',
    geo_distance: ' \
      <div class="control-group filter-{{_type}} filter"> \
        <label class="control-label" for="">{{_field}}</label> \
        <a class="js-remove-filter" href="#">&times;</a> \
        <div class="controls"> \
            <input type="text" value="{{_value.lon}}" name="lon" data-filter-field="{{_field}}" data-filter-id="{{id}}" data-filter-type="{{_type}}" /> \
            <input type="text" value="{{_value.lat}}" name="lat" data-filter-field="{{_field}}" data-filter-id="{{id}}" data-filter-type="{{_type}}" /> \
            <input type="text" value="{{distance}}" name="distance" data-filter-field="{{_field}}" data-filter-id="{{id}}" data-filter-type="{{_type}}" /> \
        </div> \
      </div> \
    '
  },
  events: {
    'click .js-remove-filter': 'onRemoveFilter',
    'click .js-add-filter': 'onAddFilterShow',
    'submit form.js-edit': 'onTermFiltersUpdate',
    'submit form.js-add': 'onAddFilter'
  },
  initialize: function() {
    this.el = $(this.el);
    _.bindAll(this, 'render');
    this.model.fields.bind('all', this.render);
    this.model.queryState.bind('change', this.render);
    this.model.queryState.bind('change:filters:new-blank', this.render);
    this.render();
  },
  render: function() {
    var self = this;
    var tmplData = $.extend(true, {}, this.model.queryState.toJSON());
    // we will use idx in list as there id ...
    tmplData.filters = _.map(tmplData.filters, function(filter, idx) {
      filter.id = idx;
      return filter;
    });
    tmplData.fields = this.model.fields.toJSON();
    tmplData.filterRender = function() {
      var filterType = _.keys(this)[0];
      var _data = this[filterType];
      _data.id = this.id;
      _data._type = filterType;
      _data._value = _data[_data._field];
      return Mustache.render(self.filterTemplates[filterType], _data);
    };
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
    this.model.queryState.addFilter(filterType, field);
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
      var filterType = $input.attr('data-filter-type');
      var fieldId = $input.attr('data-filter-field');
      var filterIndex = parseInt($input.attr('data-filter-id'));
      var name = $input.attr('name');
      var value = $input.val();
      if (filterType === 'term') {
        filters[filterIndex].term[fieldId] = value;
      } else if (filterType === 'geo_distance') {
        if (name === 'distance') {
          filters[filterIndex].geo_distance.distance = parseInt(value);
        } else {
          filters[filterIndex].geo_distance[fieldId][name] = parseFloat(value);
        }
      }
    });
    self.model.queryState.set({filters: filters});
    self.model.queryState.trigger('change');
  }
});


})(jQuery, recline.View);

