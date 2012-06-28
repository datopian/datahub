/*jshint multistr:true */

this.recline = this.recline || {};
this.recline.View = this.recline.View || {};

// Views module following classic module pattern
(function($, my) {

// ## ColumnTransform
//
// View (Dialog) for doing data transformations
my.Transform = Backbone.View.extend({
  className: 'recline-transform',
  template: ' \
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
    editor.focus().get(0).setSelectionRange(18, 18);
    editor.keydown();
  },

  onSubmit: function(e) {
    var self = this;
    var funcText = this.el.find('.expression-preview-code').val();
    var editFunc = costco.evalFunction(funcText);
    if (editFunc.errorMessage) {
      this.trigger('recline:flash', {message: "Error with function! " + editFunc.errorMessage});
      return;
    }
    this.model.transform(editFunc);
  },

  editPreviewTemplate: ' \
      <table class="table table-condensed table-bordered"> \
      <thead> \
      <tr> \
        <th></th> \
        {{#fields}} \
          <th>{{id}}</th> \
        {{/fields}} \
      </tr> \
      </thead> \
      <tbody> \
      <tr> \
        <th>Before</th> \
        {{#row.before}} \
        <td class="expression-preview-value"> \
            {{.}} \
        </td> \
        {{/row.before}} \
      </tr> \
      <tr> \
        <th>After</th> \
        {{#row.after}} \
        <td class="expression-preview-value"> \
            {{.}} \
        </td> \
        {{/row.after}} \
      </tr> \
      </tbody> \
      </table> \
  ',

  onEditorKeydown: function(e) {
    var self = this;
    // if you don't setTimeout it won't grab the latest character if you call e.target.value
    window.setTimeout( function() {
      var errors = self.el.find('.expression-preview-parsing-status');
      var editFunc = costco.evalFunction(e.target.value);
      if (!editFunc.errorMessage) {
        errors.text('No syntax error.');
        var docs = self.model.currentRecords.map(function(doc) {
          return doc.toJSON();
        });
        var previewData = costco.previewTransform(docs, editFunc);
        var $el = self.el.find('.expression-preview-container');
        var fields = self.model.fields.toJSON();
        var rows = _.map(previewData.slice(0,4), function(row) {
          return {
            before: _.map(fields, function(field) {
              return row.before[field.id];
            }),
            after: _.map(fields, function(field) {
              return row.after[field.id];
            })
          };
        });
        $el.html('');
        _.each(rows, function(row) {
          var templated = Mustache.render(self.editPreviewTemplate, {
            fields: fields,
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
