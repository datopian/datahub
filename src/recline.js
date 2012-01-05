window.recline = {};

recline.Document = Backbone.Model.extend({});

recline.DocumentList = Backbone.Collection.extend({
  webStore: new WebStore(this.url),
  model: recline.Document
});

recline.DataTable = Backbone.View.extend({

  el:  ".data-table-container",
  
  documents: new recline.DocumentList(this.url),
  
  // template: TODO ???

  events: {

  },

  initialize: function() {
    var that = this;
    this.documents.fetch({
      success: function(collection, resp) {
        that.render()
      }
    })
  },

  render: function() {
    var template = $( ".dataTableTemplate:first" ).html()
      , htmls = $.mustache(template, {rows: this.documents.toJSON()} )
      ;
    $(this.el).html(htmls);
    return this;
  }
});
