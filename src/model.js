this.recline = this.recline || {};

// A Dataset model.
recline.Dataset = Backbone.Model.extend({
  initialize: function(data, rawDocumentSet) {
    this.documentSet = new recline.DocumentSet(rawDocumentSet);
  }

});

recline.Document = Backbone.Model.extend({});

recline.DocumentList = Backbone.Collection.extend({
  // webStore: new WebStore(this.url),
  model: recline.Document
})

recline.DocumentSet = Backbone.Model.extend({
  fetch: function(options) {
    options.success(this);
  },
  getLength: function() { 
    return this.get('rows').length;
  },
  getRows: function(numRows, start) {
    if (start === undefined) {
      start = 0;
    }
    if (numRows === undefined) {
      numRows = 10;
    }
    var dfd = $.Deferred();
    var results = this.get('rows').slice(start, start+numRows);
    dfd.resolve(results);
    return dfd.promise();
  }
  
});