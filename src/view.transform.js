/*jshint multistr:true */

this.recline = this.recline || {};
this.recline.View = this.recline.View || {};

// Views module following classic module pattern
(function($, my) {

// ## ColumnTransform
//
// View (Dialog) for doing data transformations
my.Transform = Backbone.View.extend({
  template: ' \
    <div class="recline-transform"> \
      <div class="script"> \
        <h2> \
          Transform Script \
          <button class="okButton btn btn-primary">Run on all records</button> \
        </h2> \
        <textarea class="expression-preview-code"></textarea> \
      </div> \
      <div class="expression-preview-parsing-status"> \
        No syntax error. \
      </div> \
      <div class="preview"> \
        <h3>Preview</h3> \
        <div class="expression-preview-container"></div> \
      </div> \
    </div> \
  ',

  events: {
    'click .okButton': 'onSubmit',
    'keydown .expression-preview-code': 'onEditorKeydown'
  },

  initialize: function(options) {
    this.el = $(this.el);
    this.render();
  },

  render: function() {
    var htmls = Mustache.render(this.template);
    this.el.html(htmls);
    // Put in the basic (identity) transform script
    // TODO: put this into the template?
    var editor = this.el.find('.expression-preview-code');
    if (this.model.fields.length > 0) {
      var col = this.model.fields.models[0].id;
    } else {
      var col = 'unknown';
    }
    editor.val("function(doc) {\n  doc['"+ col +"'] = doc['"+ col +"'];\n  return doc;\n}");
    editor.keydown();
  },

  onSubmit: function(e) {
    var self = this;
    var funcText = this.el.find('.expression-preview-code').val();
    var editFunc = recline.Data.Transform.evalFunction(funcText);
    if (editFunc.errorMessage) {
      this.trigger('recline:flash', {message: "Error with function! " + editFunc.errorMessage});
      return;
    }
    this.model.transform(editFunc);
  },

  editPreviewTemplate: ' \
      <table class="table table-condensed table-bordered before-after"> \
      <thead> \
      <tr> \
        <th>Field</th> \
        <th>Before</th> \
        <th>After</th> \
      </tr> \
      </thead> \
      <tbody> \
      {{#row}} \
      <tr> \
        <td> \
          {{field}} \
        </td> \
        <td class="before {{#different}}different{{/different}}"> \
          {{before}} \
        </td> \
        <td class="after {{#different}}different{{/different}}"> \
          {{after}} \
        </td> \
      </tr> \
      {{/row}} \
      </tbody> \
      </table> \
  ',

  onEditorKeydown: function(e) {
    var self = this;
    // if you don't setTimeout it won't grab the latest character if you call e.target.value
    window.setTimeout( function() {
      var errors = self.el.find('.expression-preview-parsing-status');
      var editFunc = recline.Data.Transform.evalFunction(e.target.value);
      if (!editFunc.errorMessage) {
        errors.text('No syntax error.');
        var docs = self.model.records.map(function(doc) {
          return doc.toJSON();
        });
        var previewData = recline.Data.Transform.previewTransform(docs, editFunc);
        var $el = self.el.find('.expression-preview-container');
        var fields = self.model.fields.toJSON();
        var rows = _.map(previewData.slice(0,4), function(row) {
          return _.map(fields, function(field) {
            return {
              field: field.id,
              before: row.before[field.id],
              after: row.after[field.id],
              different: !_.isEqual(row.before[field.id], row.after[field.id])
            }
          });
        });
        $el.html('');
        _.each(rows, function(row) {
          var templated = Mustache.render(self.editPreviewTemplate, {
            row: row
          });
          $el.append(templated);
        });
      } else {
        errors.text(editFunc.errorMessage);
      }
    }, 1, true);
  }
});

})(jQuery, recline.View);
