this.recline = this.recline || {};
this.recline.View = this.recline.View || {};

// Views module following classic module pattern
(function($, my) {

// DataTable provides a tabular view on a Dataset.
//
// Initialize it with a recline.Dataset object.
my.DataTable = Backbone.View.extend({
  tagName:  "div",
  className: "data-table-container",

  initialize: function() {
    var self = this;
    this.el = $(this.el);
    _.bindAll(this, 'render');
    this.model.currentDocuments.bind('add', this.render);
    this.model.currentDocuments.bind('reset', this.render);
    this.model.currentDocuments.bind('remove', this.render);
    this.state = {};
    this.hiddenHeaders = [];
  },

  events: {
    'click .column-header-menu': 'onColumnHeaderClick'
    , 'click .row-header-menu': 'onRowHeaderClick'
    , 'click .root-header-menu': 'onRootHeaderClick'
    , 'click .data-table-menu li a': 'onMenuClick'
  },

  // TODO: delete or re-enable (currently this code is not used from anywhere except deprecated or disabled methods (see above)).
  // showDialog: function(template, data) {
  //   if (!data) data = {};
  //   util.show('dialog');
  //   util.render(template, 'dialog-content', data);
  //   util.observeExit($('.dialog-content'), function() {
  //     util.hide('dialog');
  //   })
  //   $('.dialog').draggable({ handle: '.dialog-header', cursor: 'move' });
  // },


  // ======================================================
  // Column and row menus

  onColumnHeaderClick: function(e) {
    this.state.currentColumn = $(e.target).siblings().text();
    util.position('data-table-menu', e);
    util.render('columnActions', 'data-table-menu');
  },

  onRowHeaderClick: function(e) {
    this.state.currentRow = $(e.target).parents('tr:first').attr('data-id');
    util.position('data-table-menu', e);
    util.render('rowActions', 'data-table-menu');
  },
  
  onRootHeaderClick: function(e) {
    util.position('data-table-menu', e);
    util.render('rootActions', 'data-table-menu', {'columns': this.hiddenHeaders});
  },

  onMenuClick: function(e) {
    var self = this;
    e.preventDefault();
    var actions = {
      bulkEdit: function() { self.showTransformColumnDialog('bulkEdit', {name: self.state.currentColumn}) },
      transform: function() { self.showTransformDialog('transform') },
      sortAsc: function() { self.setColumnSort('asc') },
      sortDesc: function() { self.setColumnSort('desc') },
      hideColumn: function() { self.hideColumn() },
      showColumn: function() { self.showColumn(e) },
      // TODO: Delete or re-implement ...
      csv: function() { window.location.href = app.csvUrl },
      json: function() { window.location.href = "_rewrite/api/json" },
      urlImport: function() { showDialog('urlImport') },
      pasteImport: function() { showDialog('pasteImport') },
      uploadImport: function() { showDialog('uploadImport') },
      // END TODO
      deleteColumn: function() {
        var msg = "Are you sure? This will delete '" + self.state.currentColumn + "' from all documents.";
        // TODO:
        alert('This function needs to be re-implemented');
        return;
        if (confirm(msg)) costco.deleteColumn(self.state.currentColumn);
      },
      deleteRow: function() {
        var doc = _.find(self.model.currentDocuments.models, function(doc) {
          // important this is == as the currentRow will be string (as comes
          // from DOM) while id may be int
          return doc.id == self.state.currentRow
        });
        doc.destroy().then(function() { 
            self.model.currentDocuments.remove(doc);
            my.notify("Row deleted successfully");
          })
          .fail(function(err) {
            my.notify("Errorz! " + err)
          })
      }
    }
    util.hide('data-table-menu');
    actions[$(e.target).attr('data-action')]();
  },

  showTransformColumnDialog: function() {
    var $el = $('.dialog-content');
    util.show('dialog');
    var view = new my.ColumnTransform({
      model: this.model
    });
    view.state = this.state;
    view.render();
    $el.empty();
    $el.append(view.el);
    util.observeExit($el, function() {
      util.hide('dialog');
    })
    $('.dialog').draggable({ handle: '.dialog-header', cursor: 'move' });
  },

  showTransformDialog: function() {
    var $el = $('.dialog-content');
    util.show('dialog');
    var view = new recline.View.DataTransform({
    });
    view.render();
    $el.empty();
    $el.append(view.el);
    util.observeExit($el, function() {
      util.hide('dialog');
    })
    $('.dialog').draggable({ handle: '.dialog-header', cursor: 'move' });
  },

  setColumnSort: function(order) {
    var query = _.extend(this.model.queryState, {sort: [[this.state.currentColumn, order]]});
    this.model.query(query);
  },
  
  hideColumn: function() {
    this.hiddenHeaders.push(this.state.currentColumn);
    this.render();
  },
  
  showColumn: function(e) {
    this.hiddenHeaders = _.without(this.hiddenHeaders, $(e.target).data('column'));
    this.render();
  },

  // ======================================================
  // Core Templating
  template: ' \
    <div class="data-table-menu-overlay" style="display: none; z-index: 101; ">&nbsp;</div> \
    <ul class="data-table-menu"></ul> \
    <table class="data-table" cellspacing="0"> \
      <thead> \
        <tr> \
          {{#notEmpty}} \
            <th class="column-header"> \
              <div class="column-header-title"> \
                <a class="root-header-menu"></a> \
                <span class="column-header-name"></span> \
              </div> \
            </th> \
          {{/notEmpty}} \
          {{#headers}} \
            <th class="column-header"> \
              <div class="column-header-title"> \
                <a class="column-header-menu"></a> \
                <span class="column-header-name">{{.}}</span> \
              </div> \
              </div> \
            </th> \
          {{/headers}} \
        </tr> \
      </thead> \
      <tbody></tbody> \
    </table> \
  ',

  toTemplateJSON: function() {
    var modelData = this.model.toJSON()
    modelData.notEmpty = ( this.headers.length > 0 )
    modelData.headers = this.headers;
    return modelData;
  },
  render: function() {
    var self = this;
    this.headers = _.filter(this.model.get('headers'), function(header) {
      return _.indexOf(self.hiddenHeaders, header) == -1;
    });
    var htmls = $.mustache(this.template, this.toTemplateJSON());
    this.el.html(htmls);
    this.model.currentDocuments.forEach(function(doc) {
      var tr = $('<tr />');
      self.el.find('tbody').append(tr);
      var newView = new my.DataTableRow({
          model: doc,
          el: tr,
          headers: self.headers,
        });
      newView.render();
    });
    this.el.toggleClass('no-hidden', (self.hiddenHeaders.length == 0));
    return this;
  }
});

// DataTableRow View for rendering an individual document.
//
// Since we want this to update in place it is up to creator to provider the element to attach to.
// In addition you must pass in a headers in the constructor options. This should be list of headers for the DataTable.
my.DataTableRow = Backbone.View.extend({
  initialize: function(options) {
    _.bindAll(this, 'render');
    this._headers = options.headers;
    this.el = $(this.el);
    this.model.bind('change', this.render);
  },

  template: ' \
      <td><a class="row-header-menu"></a></td> \
      {{#cells}} \
      <td data-header="{{header}}"> \
        <div class="data-table-cell-content"> \
          <a href="javascript:{}" class="data-table-cell-edit" title="Edit this cell">&nbsp;</a> \
          <div class="data-table-cell-value">{{value}}</div> \
        </div> \
      </td> \
      {{/cells}} \
    ',
  events: {
    'click .data-table-cell-edit': 'onEditClick',
    // cell editor
    'click .data-table-cell-editor .okButton': 'onEditorOK',
    'click .data-table-cell-editor .cancelButton': 'onEditorCancel'
  },
  
  toTemplateJSON: function() {
    var doc = this.model;
    var cellData = _.map(this._headers, function(header) {
      return {header: header, value: doc.get(header)}
    })
    return { id: this.id, cells: cellData }
  },

  render: function() {
    this.el.attr('data-id', this.model.id);
    var html = $.mustache(this.template, this.toTemplateJSON());
    $(this.el).html(html);
    return this;
  },

  // ======================================================
  // Cell Editor

  onEditClick: function(e) {
    var editing = this.el.find('.data-table-cell-editor-editor');
    if (editing.length > 0) {
      editing.parents('.data-table-cell-value').html(editing.text()).siblings('.data-table-cell-edit').removeClass("hidden");
    }
    $(e.target).addClass("hidden");
    var cell = $(e.target).siblings('.data-table-cell-value');
    cell.data("previousContents", cell.text());
    util.render('cellEditor', cell, {value: cell.text()});
  },

  onEditorOK: function(e) {
    var cell = $(e.target);
    var rowId = cell.parents('tr').attr('data-id');
    var header = cell.parents('td').attr('data-header');
    var newValue = cell.parents('.data-table-cell-editor').find('.data-table-cell-editor-editor').val();
    var newData = {};
    newData[header] = newValue;
    this.model.set(newData);
    my.notify("Updating row...", {loader: true});
    this.model.save().then(function(response) {
        my.notify("Row updated successfully", {category: 'success'});
      })
      .fail(function() {
        my.notify('Error saving row', {
          category: 'error',
          persist: true
        });
      });
  },

  onEditorCancel: function(e) {
    var cell = $(e.target).parents('.data-table-cell-value');
    cell.html(cell.data('previousContents')).siblings('.data-table-cell-edit').removeClass("hidden");
  }
});

})(jQuery, recline.View);


