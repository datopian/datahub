this.recline = this.recline || {};
this.recline.View = this.recline.View || {};

(function($, my) {
// ## DataExplorer
//
// The primary view for the entire application. Usage:
// 
// <pre>
// var myExplorer = new model.recline.DataExplorer({
//   model: {{recline.Model.Dataset instance}}
//   el: {{an existing dom element}}
//   views: {{page views}}
//   config: {{config options -- see below}}
// });
// </pre> 
//
// ### Parameters
// 
// **model**: (required) Dataset instance.
//
// **el**: (required) DOM element.
//
// **views**: (optional) the views (Grid, Graph etc) for DataExplorer to
// show. This is an array of view hashes. If not provided
// just initialize a DataTable with id 'grid'. Example:
//
// <pre>
// var views = [
//   {
//     id: 'grid', // used for routing
//     label: 'Grid', // used for view switcher
//     view: new recline.View.DataTable({
//       model: dataset
//     })
//   },
//   {
//     id: 'graph',
//     label: 'Graph',
//     view: new recline.View.FlotGraph({
//       model: dataset
//     })
//   }
// ];
// </pre>
//
// **config**: Config options like:
//
//   * displayCount: how many documents to display initially (default: 10)
//   * readOnly: true/false (default: false) value indicating whether to
//     operate in read-only mode (hiding all editing options).
//
// NB: the element already being in the DOM is important for rendering of
// FlotGraph subview.
my.DataExplorer = Backbone.View.extend({
  template: ' \
  <div class="data-explorer"> \
    <div class="alert-messages"></div> \
    \
    <div class="header"> \
      <ul class="navigation"> \
        {{#views}} \
        <li><a href="#{{id}}" class="btn">{{label}}</a> \
        {{/views}} \
      </ul> \
      <div class="pagination"> \
        <form class="display-count"> \
          Showing 0 to <input name="displayCount" type="text" value="{{displayCount}}" title="Edit and hit enter to change the number of rows displayed" /> of  <span class="doc-count">{{docCount}}</span> \
        </form> \
      </div> \
    </div> \
    <div class="data-view-container"></div> \
    <div class="dialog-overlay" style="display: none; z-index: 101; ">&nbsp;</div> \
    <div class="dialog ui-draggable" style="display: none; z-index: 102; top: 101px; "> \
      <div class="dialog-frame" style="width: 700px; visibility: visible; "> \
        <div class="dialog-content dialog-border"></div> \
      </div> \
    </div> \
  </div> \
  ',

  events: {
    'submit form.display-count': 'onDisplayCountUpdate'
  },

  initialize: function(options) {
    var self = this;
    this.el = $(this.el);
    this.config = _.extend({
        displayCount: 50
        , readOnly: false
      },
      options.config);
    if (this.config.readOnly) {
      this.setReadOnly();
    }
    // Hash of 'page' views (i.e. those for whole page) keyed by page name
    if (options.views) {
      this.pageViews = options.views;
    } else {
      this.pageViews = [{
        id: 'grid',
        label: 'Grid',
        view: new my.DataTable({
            model: this.model
          })
      }];
    }
    // this must be called after pageViews are created
    this.render();

    this.router = new Backbone.Router();
    this.setupRouting();

    // retrieve basic data like fields etc
    // note this.model and dataset returned are the same
    this.model.fetch()
      .done(function(dataset) {
        self.el.find('.doc-count').text(self.model.docCount || 'Unknown');
        self.query();
      })
      .fail(function(error) {
        my.notify(error.message, {category: 'error', persist: true});
      });
  },

  query: function() {
    this.config.displayCount = parseInt(this.el.find('input[name="displayCount"]').val());
    var queryObj = {
      size: this.config.displayCount
    };
    my.notify('Loading data', {loader: true});
    this.model.query(queryObj)
      .done(function() {
        my.clearNotifications();
        my.notify('Data loaded', {category: 'success'});
      })
      .fail(function(error) {
        my.clearNotifications();
        my.notify(error.message, {category: 'error', persist: true});
      });
  },

  onDisplayCountUpdate: function(e) {
    e.preventDefault();
    this.query();
  },

  setReadOnly: function() {
    this.el.addClass('read-only');
  },

  render: function() {
    var tmplData = this.model.toTemplateJSON();
    tmplData.displayCount = this.config.displayCount;
    tmplData.views = this.pageViews;
    var template = $.mustache(this.template, tmplData);
    $(this.el).html(template);
    var $dataViewContainer = this.el.find('.data-view-container');
    _.each(this.pageViews, function(view, pageName) {
      $dataViewContainer.append(view.view.el)
    });
  },

  setupRouting: function() {
    var self = this;
    // Default route
    this.router.route('', this.pageViews[0].id, function() {
      self.updateNav(self.pageViews[0].id);
    });
    $.each(this.pageViews, function(idx, view) {
      self.router.route(/^([^?]+)(\?.*)?/, 'view', function(viewId, queryString) {
        self.updateNav(viewId, queryString);
      });
    });
  },

  updateNav: function(pageName, queryString) {
    this.el.find('.navigation li').removeClass('active');
    var $el = this.el.find('.navigation li a[href=#' + pageName + ']');
    $el.parent().addClass('active');
    // show the specific page
    _.each(this.pageViews, function(view, idx) {
      if (view.id === pageName) {
        view.view.el.show();
      } else {
        view.view.el.hide();
      }
    });
  }
});

// ## DataTable
//
// Provides a tabular view on a Dataset.
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
    this.hiddenFields = [];
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
    this.state.currentColumn = $(e.target).closest('.column-header').attr('data-field');
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
    util.render('rootActions', 'data-table-menu', {'columns': this.hiddenFields});
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
    this.model.query({
      sort: [
        [this.state.currentColumn, order]
      ]
    });
  },
  
  hideColumn: function() {
    this.hiddenFields.push(this.state.currentColumn);
    this.render();
  },
  
  showColumn: function(e) {
    this.hiddenFields = _.without(this.hiddenFields, $(e.target).data('column'));
    this.render();
  },

  // ======================================================
  // #### Templating
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
          {{#fields}} \
            <th class="column-header {{#hidden}}hidden{{/hidden}}" data-field="{{id}}"> \
              <div class="column-header-title"> \
                <a class="column-header-menu"></a> \
                <span class="column-header-name">{{label}}</span> \
              </div> \
              </div> \
            </th> \
          {{/fields}} \
        </tr> \
      </thead> \
      <tbody></tbody> \
    </table> \
  ',

  toTemplateJSON: function() {
    var modelData = this.model.toJSON()
    modelData.notEmpty = ( this.fields.length > 0 )
    // TODO: move this sort of thing into a toTemplateJSON method on Dataset?
    modelData.fields = _.map(this.fields, function(field) { return field.toJSON() });
    return modelData;
  },
  render: function() {
    var self = this;
    this.fields = this.model.fields.filter(function(field) {
      return _.indexOf(self.hiddenFields, field.id) == -1;
    });
    var htmls = $.mustache(this.template, this.toTemplateJSON());
    this.el.html(htmls);
    this.model.currentDocuments.forEach(function(doc) {
      var tr = $('<tr />');
      self.el.find('tbody').append(tr);
      var newView = new my.DataTableRow({
          model: doc,
          el: tr,
          fields: self.fields,
        });
      newView.render();
    });
    this.el.toggleClass('no-hidden', (self.hiddenFields.length == 0));
    return this;
  }
});

// ## DataTableRow View for rendering an individual document.
//
// Since we want this to update in place it is up to creator to provider the element to attach to.
// In addition you must pass in a fields in the constructor options. This should be list of fields for the DataTable.
my.DataTableRow = Backbone.View.extend({
  initialize: function(options) {
    _.bindAll(this, 'render');
    this._fields = options.fields;
    this.el = $(this.el);
    this.model.bind('change', this.render);
  },

  template: ' \
      <td><a class="row-header-menu"></a></td> \
      {{#cells}} \
      <td data-field="{{field}}"> \
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
    var cellData = this._fields.map(function(field) {
      return {field: field.id, value: doc.get(field.id)}
    })
    return { id: this.id, cells: cellData }
  },

  render: function() {
    this.el.attr('data-id', this.model.id);
    var html = $.mustache(this.template, this.toTemplateJSON());
    $(this.el).html(html);
    return this;
  },

  // Cell Editor
  // ===========

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
    var field = cell.parents('td').attr('data-field');
    var newValue = cell.parents('.data-table-cell-editor').find('.data-table-cell-editor-editor').val();
    var newData = {};
    newData[field] = newValue;
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


/* ========================================================== */
// ## Miscellaneous Utilities

var urlPathRegex = /^([^?]+)(\?.*)?/;

// Parse the Hash section of a URL into path and query string
my.parseHashUrl = function(hashUrl) {
  var parsed = urlPathRegex.exec(hashUrl);
  if (parsed == null) {
    return {};
  } else {
    return {
      path: parsed[1],
      query: parsed[2] || ''
    }
  }
}

// Parse a URL query string (?xyz=abc...) into a dictionary.
my.parseQueryString = function(q) {
  var urlParams = {},
    e, d = function (s) {
      return unescape(s.replace(/\+/g, " "));
    },
    r = /([^&=]+)=?([^&]*)/g;

  if (q && q.length && q[0] === '?') {
    q = q.slice(1);
  }
  while (e = r.exec(q)) {
    // TODO: have values be array as query string allow repetition of keys
    urlParams[d(e[1])] = d(e[2]);
  }
  return urlParams;
}

// Parse the query string out of the URL hash
my.parseHashQueryString = function() {
  q = my.parseHashUrl(window.location.hash).query;
  return my.parseQueryString(q);
}

// Compse a Query String
my.composeQueryString = function(queryParams) {
  var queryString = '?';
  var items = [];
  $.each(queryParams, function(key, value) {
    items.push(key + '=' + JSON.stringify(value));
  });
  queryString += items.join('&');
  return queryString;
}

my.setHashQueryString = function(queryParams) {
  window.location.hash = window.location.hash.split('?')[0] + my.composeQueryString(queryParams);
}

// ## notify
//
// Create a notification (a div.alert-message in div.alert-messsages) using provide messages and options. Options are:
//
// * category: warning (default), success, error
// * persist: if true alert is persistent, o/w hidden after 3s (default = false)
// * loader: if true show loading spinner
my.notify = function(message, options) {
  if (!options) var options = {};
  var tmplData = _.extend({
    msg: message,
    category: 'warning'
    },
    options);
  var _template = ' \
    <div class="alert-message {{category}} fade in" data-alert="alert"><a class="close" href="#">×</a> \
      <p>{{msg}} \
        {{#loader}} \
        <img src="images/small-spinner.gif" class="notification-loader"> \
        {{/loader}} \
      </p> \
    </div>';
  var _templated = $.mustache(_template, tmplData); 
  _templated = $(_templated).appendTo($('.data-explorer .alert-messages'));
  if (!options.persist) {
    setTimeout(function() {
      $(_templated).fadeOut(1000, function() {
        $(this).remove();
      });
    }, 1000);
  }
}

// ## clearNotifications
//
// Clear all existing notifications
my.clearNotifications = function() {
  var $notifications = $('.data-explorer .alert-message');
  $notifications.remove();
}

})(jQuery, recline.View);

