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
        <li class="active"><label for="from">From</label><a><input name="from" type="text" value="{{from}}" /> &ndash; <label for="to">To</label><input name="to" type="text" value="{{to}}" /> </a></li> \
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
    // filter is 0-based; form is 1-based
    var formFrom = parseInt(this.$el.find('input[name="from"]').val())-1; 
    var formTo = parseInt(this.$el.find('input[name="to"]').val())-1; 
    var maxRecord = this.model.recordCount-1;
    if (this.model.queryState.get('from') != formFrom) { // changed from; update from
      this.model.queryState.set({from: Math.min(maxRecord, Math.max(formFrom, 0))});
    } else if (this.model.queryState.get('to') != formTo) { // change to; update size
      var to = Math.min(maxRecord, Math.max(formTo, 0));
      this.model.queryState.set({size: Math.min(maxRecord+1, Math.max(to-formFrom+1, 1))});
    }
  },
  onPaginationUpdate: function(e) {
    e.preventDefault();
    var $el = $(e.target);
    var newFrom = 0;
    var currFrom = this.model.queryState.get('from');
    var size = this.model.queryState.get('size');
    var updateQuery = false;
    if ($el.parent().hasClass('prev')) {
      newFrom = Math.max(currFrom - Math.max(0, size), 0);
      updateQuery = newFrom != currFrom;
    } else {
      newFrom = Math.max(currFrom + size, 0);
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

