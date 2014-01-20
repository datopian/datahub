/*jshint multistr:true */

this.recline = this.recline || {};
this.recline.View = this.recline.View || {};

(function($, my) {
  "use strict";

my.Pager = Backbone.View.extend({
  className: 'recline-pager', 
  template: ' \
    <div class="pagination"> \
      <ul> \
        <li class="prev action-pagination-update"><a href="">&laquo;</a></li> \
        <li class="active"><a><input name="from" type="text" value="{{from}}" /> &ndash; <input name="to" type="text" value="{{to}}" /> </a></li> \
        <li class="next action-pagination-update"><a href="">&raquo;</a></li> \
      </ul> \
    </div> \
  ',

  events: {
    'click .action-pagination-update': 'onPaginationUpdate',
    'change input': 'onFormSubmit'
  },

  initialize: function() {
    _.bindAll(this, 'render');
    this.listenTo(this.model.queryState, 'change', this.render);
    this.render();
  },
  onFormSubmit: function(e) {
    e.preventDefault();
    var newFrom = parseInt(this.$el.find('input[name="from"]').val());
    newFrom = Math.min(this.model.recordCount, Math.max(newFrom, 1))-1;
    var newSize = parseInt(this.$el.find('input[name="to"]').val()) - newFrom;
    newSize = Math.min(Math.max(newSize, 1), this.model.recordCount);
    this.model.queryState.set({size: newSize, from: newFrom});
  },
  onPaginationUpdate: function(e) {
    e.preventDefault();
    var $el = $(e.target);
    var newFrom = 0;
    var currFrom = this.model.queryState.get('from');
    var size = this.model.queryState.get('size');
    var updateQuery = false;
    if ($el.parent().hasClass('prev')) {
      newFrom = Math.max(currFrom - Math.max(0, size), 1)-1;
      updateQuery = newFrom != currFrom;
    } else {
      newFrom = Math.max(currFrom + size, 1);
      updateQuery = (newFrom < this.model.recordCount);
    }
    if (updateQuery) {
      this.model.queryState.set({from: newFrom});
    }
  },
  render: function() {
    var tmplData = this.model.toJSON();
    var from = parseInt(this.model.queryState.get('from'));
    tmplData.from = from+1;
    tmplData.to = Math.min(from+this.model.queryState.get('size'), this.model.recordCount);
    var templated = Mustache.render(this.template, tmplData);
    this.$el.html(templated);
    return this;
  }
});

})(jQuery, recline.View);

