// # Recline Backbone Models
this.recline = this.recline || {};
this.recline.Model = this.recline.Model || {};

(function($, my) {
  // ## A Dataset model
  //
  // Other than standard list of Backbone methods it has two important attributes:
  //
  // * currentDocuments: a DocumentList containing the Documents we have currently loaded for viewing (you update currentDocuments by calling getRows)
  // * docCount: total number of documents in this dataset (obtained on a fetch for this Dataset)
  my.Dataset = Backbone.Model.extend({
    __type__: 'Dataset',
    initialize: function() {
      this.currentDocuments = new my.DocumentList();
      this.docCount = null;
    },

    // ### getDocuments
    //
    // AJAX method with promise API to get rows (documents) from the backend.
    //
    // Resulting DocumentList are used to reset this.currentDocuments and are
    // also returned.
    //
    // :param numRows: passed onto backend getDocuments.
    // :param start: passed onto backend getDocuments.
    //
    // this does not fit very well with Backbone setup. Backbone really expects you to know the ids of objects your are fetching (which you do in classic RESTful ajax-y world). But this paradigm does not fill well with data set up we have here.
    // This also illustrates the limitations of separating the Dataset and the Backend
    getDocuments: function(numRows, start) {
      var self = this;
      var dfd = $.Deferred();
      this.backend.getDocuments(this.id, numRows, start).then(function(rows) {
        var docs = _.map(rows, function(row) {
          return new my.Document(row);
        });
        self.currentDocuments.reset(docs);
        dfd.resolve(self.currentDocuments);
      });
      return dfd.promise();
    },

    toTemplateJSON: function() {
      var data = this.toJSON();
      data.docCount = this.docCount;
      return data;
    }
  });

  // ## A Document (aka Row)
  // 
  // A single entry or row in the dataset
  my.Document = Backbone.Model.extend({
    __type__: 'Document'
  });

  // ## A Backbone collection of Documents
  my.DocumentList = Backbone.Collection.extend({
    __type__: 'DocumentList',
    model: my.Document
  });
}(jQuery, this.recline.Model));

