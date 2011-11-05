this.recline = this.recline || {};

recline.DataTable = Backbone.View.extend({

  tagName:  "div",
  className: "data-table-container",

  // template: TODO ???

  events: {

  },

  initialize: function() {
    var that = this;
    this.model.fetch().then(function() {
      that.model.getRows().then(function(rows) {
        that._currentRows = rows;
        that.render()
      });
    })
  },
  toTemplateJSON: function() {
    var modelData = this.model.toJSON()
    modelData.rows = _.map(this._currentRows, function(row) {
      var cellData = _.map(modelData.headers, function(header) {
        return {header: header, value: row[header]}
      })
      return { id: 'xxx', cells: cellData }
    })
    modelData.notEmpty = ( modelData.headers.length > 0 )
    return modelData;
  },
  render: function() {
    var template = $( ".dataTableTemplate:first" ).html()
      , htmls = $.mustache(template, this.toTemplateJSON())
      ;
    $(this.el).html(htmls);
    return this;
  }
});
