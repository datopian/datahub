this.recline = this.recline || {};

// Views module following classic module pattern
recline.View = function($) {

var my = {};

// Parse a URL query string (?xyz=abc...) into a dictionary.
function parseQueryString(q) {
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

// The primary view for the entire application.
//
// It should be initialized with a recline.Model.Dataset object and an existing
// dom element to attach to (the existing DOM element is important for
// rendering of FlotGraph subview).
// 
// To pass in configuration options use the config key in initialization hash
// e.g.
//
//      var explorer = new DataExplorer({
//        config: {...}
//      })
//
// Config options:
//
// * displayCount: how many documents to display initially (default: 10)
// * readOnly: true/false (default: false) value indicating whether to
//   operate in read-only mode (hiding all editing options).
//
// All other views as contained in this one.
my.DataExplorer = Backbone.View.extend({
  template: ' \
  <div class="data-explorer"> \
    <div class="header"> \
      <ul class="navigation"> \
        <li class="active"><a href="#grid" class="btn">Grid</a> \
        <li><a href="#graph" class="btn">Graph</a></li> \
      </ul> \
      <div class="pagination"> \
        <form class="display-count"> \
          Showing 0 to <input name="displayCount" type="text" value="{{displayCount}}" /> of  <span class="doc-count">{{docCount}}</span> \
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
    <div class="notification-container"> \
      <div class="notification"> \
        <img src="images/small-spinner.gif" class="notification-loader"><span class="notification-message">Loading...</span> \
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
    this.config = options.config || {};
    _.extend(this.config, {
      displayCount: 10
      , readOnly: false
    });
    if (this.config.readOnly) {
      this.setReadOnly();
    }
    // Hash of 'page' views (i.e. those for whole page) keyed by page name
    this.pageViews = {
      grid: new my.DataTable({
          model: this.model
        })
      , graph: new my.FlotGraph({
          model: this.model
        })
    };
    // this must be called after pageViews are created
    this.render();

    this.router = new Backbone.Router();
    this.setupRouting();
    Backbone.history.start();

    // retrieve basic data like headers etc
    // note this.model and dataset returned are the same
    this.model.fetch().then(function(dataset) {
      self.el.find('.doc-count').text(self.model.docCount);
      // initialize of dataTable calls render
      self.model.getDocuments(self.config.displayCount);
    });
  },

  onDisplayCountUpdate: function(e) {
    e.preventDefault();
    this.config.displayCount = parseInt(this.el.find('input[name="displayCount"]').val());
    this.model.getDocuments(this.config.displayCount);
  },

  setReadOnly: function() {
    this.el.addClass('read-only');
  },

  render: function() {
    var tmplData = this.model.toTemplateJSON();
    tmplData.displayCount = this.config.displayCount;
    var template = $.mustache(this.template, tmplData);
    $(this.el).html(template);
    var $dataViewContainer = this.el.find('.data-view-container');
    _.each(this.pageViews, function(view, pageName) {
      $dataViewContainer.append(view.el)
    });
  },

  setupRouting: function() {
    var self = this;
    this.router.route('', 'grid', function() {
      self.updateNav('grid');
    });
    this.router.route(/grid(\?.*)?/, 'view', function(queryString) {
      self.updateNav('grid', queryString);
    });
    this.router.route(/graph(\?.*)?/, 'graph', function(queryString) {
      self.updateNav('graph', queryString);
      // we have to call here due to fact plot may not have been able to draw
      // if it was hidden until now - see comments in FlotGraph.redraw
      qsParsed = parseQueryString(queryString);
      if ('graph' in qsParsed) {
        var chartConfig = JSON.parse(qsParsed['graph']);
        _.extend(self.pageViews['graph'].chartConfig, chartConfig);
      }
      self.pageViews['graph'].redraw();
    });
  },

  updateNav: function(pageName, queryString) {
    this.el.find('.navigation li').removeClass('active');
    var $el = this.el.find('.navigation li a[href=#' + pageName + ']');
    $el.parent().addClass('active');
    // show the specific page
    _.each(this.pageViews, function(view, pageViewName) {
      if (pageViewName === pageName) {
        view.el.show();
      } else {
        view.el.hide();
      }
    });
  }
});

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
  },

  events: {
    'click .column-header-menu': 'onColumnHeaderClick'
    , 'click .row-header-menu': 'onRowHeaderClick'
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

  onMenuClick: function(e) {
    var self = this;
    e.preventDefault();
    var actions = {
      bulkEdit: function() { self.showTransformColumnDialog('bulkEdit', {name: self.state.currentColumn}) },
      transform: function() { self.showTransformDialog('transform') },
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
            util.notify("Row deleted successfully");
          })
          .fail(function(err) {
            util.notify("Errorz! " + err)
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
    var view = new my.DataTransform({
    });
    view.render();
    $el.empty();
    $el.append(view.el);
    util.observeExit($el, function() {
      util.hide('dialog');
    })
    $('.dialog').draggable({ handle: '.dialog-header', cursor: 'move' });
  },


  // ======================================================
  // Core Templating
  template: ' \
    <div class="data-table-menu-overlay" style="display: none; z-index: 101; ">&nbsp;</div> \
    <ul class="data-table-menu"></ul> \
    <table class="data-table" cellspacing="0"> \
      <thead> \
        <tr> \
          {{#notEmpty}}<th class="column-header"></th>{{/notEmpty}} \
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
    modelData.notEmpty = ( modelData.headers.length > 0 )
    return modelData;
  },
  render: function() {
    var self = this;
    var htmls = $.mustache(this.template, this.toTemplateJSON());
    this.el.html(htmls);
    this.model.currentDocuments.forEach(function(doc) {
      var tr = $('<tr />');
      self.el.find('tbody').append(tr);
      var newView = new my.DataTableRow({
          model: doc,
          el: tr,
          headers: self.model.get('headers')
        });
      newView.render();
    });
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
    util.notify("Updating row...", {persist: true, loader: true});
    this.model.save().then(function(response) {
        util.notify("Row updated successfully");
      })
      .fail(function() {
        alert('error saving');
      });
  },

  onEditorCancel: function(e) {
    var cell = $(e.target).parents('.data-table-cell-value');
    cell.html(cell.data('previousContents')).siblings('.data-table-cell-edit').removeClass("hidden");
  }
});


// View (Dialog) for doing data transformations (on columns of data).
my.ColumnTransform = Backbone.View.extend({
  className: 'transform-column-view',
  template: ' \
    <div class="dialog-header"> \
      Functional transform on column {{name}} \
    </div> \
    <div class="dialog-body"> \
      <div class="grid-layout layout-tight layout-full"> \
        <table> \
        <tbody> \
        <tr> \
          <td colspan="4"> \
            <div class="grid-layout layout-tight layout-full"> \
              <table rows="4" cols="4"> \
              <tbody> \
              <tr style="vertical-align: bottom;"> \
                <td colspan="4"> \
                  Expression \
                </td> \
              </tr> \
              <tr> \
                <td colspan="3"> \
                  <div class="input-container"> \
                    <textarea class="expression-preview-code"></textarea> \
                  </div> \
                </td> \
                <td class="expression-preview-parsing-status" width="150" style="vertical-align: top;"> \
                  No syntax error. \
                </td> \
              </tr> \
              <tr> \
                <td colspan="4"> \
                  <div id="expression-preview-tabs" class="refine-tabs ui-tabs ui-widget ui-widget-content ui-corner-all"> \
                    <span>Preview</span> \
                    <div id="expression-preview-tabs-preview" class="ui-tabs-panel ui-widget-content ui-corner-bottom"> \
                      <div class="expression-preview-container" style="width: 652px; "> \
                      </div> \
                    </div> \
                  </div> \
                </td> \
              </tr> \
              </tbody> \
              </table> \
            </div> \
          </td> \
        </tr> \
        </tbody> \
        </table> \
      </div> \
    </div> \
    <div class="dialog-footer"> \
      <button class="okButton btn primary">&nbsp;&nbsp;Update All&nbsp;&nbsp;</button> \
      <button class="cancelButton btn danger">Cancel</button> \
    </div> \
  ',

  events: {
    'click .okButton': 'onSubmit'
    , 'keydown .expression-preview-code': 'onEditorKeydown'
  },

  initialize: function() {
    this.el = $(this.el);
  },

  render: function() {
    var htmls = $.mustache(this.template, 
      {name: this.state.currentColumn}
      )
    this.el.html(htmls);
    // Put in the basic (identity) transform script
    // TODO: put this into the template?
    var editor = this.el.find('.expression-preview-code');
    editor.val("function(doc) {\n  doc['"+ this.state.currentColumn+"'] = doc['"+ this.state.currentColumn+"'];\n  return doc;\n}");
    editor.focus().get(0).setSelectionRange(18, 18);
    editor.keydown();
  },

  onSubmit: function(e) {
    var self = this;
    var funcText = this.el.find('.expression-preview-code').val();
    var editFunc = costco.evalFunction(funcText);
    if (editFunc.errorMessage) {
      util.notify("Error with function! " + editFunc.errorMessage);
      return;
    }
    util.hide('dialog');
    util.notify("Updating all visible docs. This could take a while...", {persist: true, loader: true});
      var docs = self.model.currentDocuments.map(function(doc) {
       return doc.toJSON();
      });
    // TODO: notify about failed docs? 
    var toUpdate = costco.mapDocs(docs, editFunc).edited;
    var totalToUpdate = toUpdate.length;
    function onCompletedUpdate() {
      totalToUpdate += -1;
      if (totalToUpdate === 0) {
        util.notify(toUpdate.length + " documents updated successfully");
        alert('WARNING: We have only updated the docs in this view. (Updating of all docs not yet implemented!)');
        self.remove();
      }
    }
    // TODO: Very inefficient as we search through all docs every time!
    _.each(toUpdate, function(editedDoc) {
      var realDoc = self.model.currentDocuments.get(editedDoc.id);
      realDoc.set(editedDoc);
      realDoc.save().then(onCompletedUpdate).fail(onCompletedUpdate)
    });
  },

  onEditorKeydown: function(e) {
    var self = this;
    // if you don't setTimeout it won't grab the latest character if you call e.target.value
    window.setTimeout( function() {
      var errors = self.el.find('.expression-preview-parsing-status');
      var editFunc = costco.evalFunction(e.target.value);
      if (!editFunc.errorMessage) {
        errors.text('No syntax error.');
        var docs = self.model.currentDocuments.map(function(doc) {
          return doc.toJSON();
        });
        var previewData = costco.previewTransform(docs, editFunc, self.state.currentColumn);
        util.render('editPreview', 'expression-preview-container', {rows: previewData});
      } else {
        errors.text(editFunc.errorMessage);
      }
    }, 1, true);
  }
});

// View (Dialog) for doing data transformations on whole dataset.
my.DataTransform = Backbone.View.extend({
  className: 'transform-view',
  template: ' \
    <div class="dialog-header"> \
      Recursive transform on all rows \
    </div> \
    <div class="dialog-body"> \
      <div class="grid-layout layout-full"> \
        <p class="info">Traverse and transform objects by visiting every node on a recursive walk using <a href="https://github.com/substack/js-traverse">js-traverse</a>.</p> \
        <table> \
        <tbody> \
        <tr> \
          <td colspan="4"> \
            <div class="grid-layout layout-tight layout-full"> \
              <table rows="4" cols="4"> \
              <tbody> \
              <tr style="vertical-align: bottom;"> \
                <td colspan="4"> \
                  Expression \
                </td> \
              </tr> \
              <tr> \
                <td colspan="3"> \
                  <div class="input-container"> \
                    <textarea class="expression-preview-code"></textarea> \
                  </div> \
                </td> \
                <td class="expression-preview-parsing-status" width="150" style="vertical-align: top;"> \
                  No syntax error. \
                </td> \
              </tr> \
              <tr> \
                <td colspan="4"> \
                  <div id="expression-preview-tabs" class="refine-tabs ui-tabs ui-widget ui-widget-content ui-corner-all"> \
                    <span>Preview</span> \
                    <div id="expression-preview-tabs-preview" class="ui-tabs-panel ui-widget-content ui-corner-bottom"> \
                      <div class="expression-preview-container" style="width: 652px; "> \
                      </div> \
                    </div> \
                  </div> \
                </td> \
              </tr> \
              </tbody> \
              </table> \
            </div> \
          </td> \
        </tr> \
        </tbody> \
        </table> \
      </div> \
    </div> \
    <div class="dialog-footer"> \
      <button class="okButton button">&nbsp;&nbsp;Update All&nbsp;&nbsp;</button> \
      <button class="cancelButton button">Cancel</button> \
    </div> \
  ',

  initialize: function() {
    this.el = $(this.el);
  },

  render: function() {
    this.el.html(this.template);
  }
});


// Graph view for a Dataset using Flot graphing library.
//
// Initialization arguments:
//
// * model: recline.Model.Dataset
// * config: (optional) graph configuration hash of form:
//
//        { 
//          group: {column name for x-axis},
//          series: [{column name for series A}, {column name series B}, ... ],
//          graphType: 'line'
//        }
//
// NB: should *not* provide an el argument to the view but must let the view
// generate the element itself (you can then append view.el to the DOM.
my.FlotGraph = Backbone.View.extend({

  tagName:  "div",
  className: "data-graph-container",

  template: ' \
  <div class="editor"> \
    <div class="editor-info editor-hide-info"> \
      <h3 class="action-toggle-help">Help &raquo;</h3> \
      <p>To create a chart select a column (group) to use as the x-axis \
         then another column (Series A) to plot against it.</p> \
      <p>You can add add \
         additional series by clicking the "Add series" button</p> \
    </div> \
    <form class="form-stacked"> \
      <div class="clearfix"> \
        <label>Graph Type</label> \
        <div class="input editor-type"> \
          <select> \
          <option value="line">Line</option> \
          </select> \
        </div> \
        <label>Group Column (x-axis)</label> \
        <div class="input editor-group"> \
          <select> \
          {{#headers}} \
          <option value="{{.}}">{{.}}</option> \
          {{/headers}} \
          </select> \
        </div> \
        <div class="editor-series-group"> \
          <div class="editor-series"> \
            <label>Series <span>A (y-axis)</span></label> \
            <div class="input"> \
              <select> \
              {{#headers}} \
              <option value="{{.}}">{{.}}</option> \
              {{/headers}} \
              </select> \
            </div> \
          </div> \
        </div> \
      </div> \
      <div class="editor-buttons"> \
        <button class="btn editor-add">Add Series</button> \
      </div> \
      <div class="editor-buttons editor-submit" comment="hidden temporarily" style="display: none;"> \
        <button class="editor-save">Save</button> \
        <input type="hidden" class="editor-id" value="chart-1" /> \
      </div> \
    </form> \
  </div> \
  <div class="panel graph"></div> \
</div> \
',

  events: {
    'change form select': 'onEditorSubmit'
    , 'click .editor-add': 'addSeries'
    , 'click .action-remove-series': 'removeSeries'
    , 'click .action-toggle-help': 'toggleHelp'
  },

  initialize: function(options, config) {
    var self = this;
    this.el = $(this.el);
    _.bindAll(this, 'render', 'redraw');
    // we need the model.headers to render properly
    this.model.bind('change', this.render);
    this.model.currentDocuments.bind('add', this.redraw);
    this.model.currentDocuments.bind('reset', this.redraw);
    this.chartConfig = _.extend({
        group: null,
        series: [],
        graphType: 'line'
      },
      config)
    this.render();
  },

  toTemplateJSON: function() {
    return this.model.toJSON();
  },

  render: function() {
    htmls = $.mustache(this.template, this.toTemplateJSON());
    $(this.el).html(htmls);
    // now set a load of stuff up
    this.$graph = this.el.find('.panel.graph');
    // for use later when adding additional series
    // could be simpler just to have a common template!
    this.$seriesClone = this.el.find('.editor-series').clone();
    this._updateSeries();
    return this;
  },

  onEditorSubmit: function(e) {
    var select = this.el.find('.editor-group select');
    this._getEditorData();
    // update navigation
    // TODO: make this less invasive (e.g. preserve other keys in query string)
    window.location.hash = window.location.hash.split('?')[0] +
        '?graph=' + JSON.stringify(this.chartConfig);
    this.redraw();
  },

  redraw: function() {
    // There appear to be issues generating a Flot graph if either:

    // * The relevant div that graph attaches to his hidden at the moment of creating the plot -- Flot will complain with
    //
    //   Uncaught Invalid dimensions for plot, width = 0, height = 0
    // * There is no data for the plot -- either same error or may have issues later with errors like 'non-existent node-value' 
    var areWeVisible = !jQuery.expr.filters.hidden(this.el[0]);
    if (!this.plot && (!areWeVisible || this.model.currentDocuments.length == 0)) {
      return
    }
    // create this.plot and cache it
    if (!this.plot) {
      // only lines for the present
      options = {
        id: 'line',
        name: 'Line Chart'
      };
      this.plot = $.plot(this.$graph, this.createSeries(), options);
    } 
    this.plot.setData(this.createSeries());
    this.plot.resize();
    this.plot.setupGrid();
    this.plot.draw();
  },

  _getEditorData: function() {
    $editor = this
    var series = this.$series.map(function () {
      return $(this).val();
    });
    this.chartConfig.series = $.makeArray(series)
    this.chartConfig.group = this.el.find('.editor-group select').val();
  },

  createSeries: function () {
    var self = this;
    var series = [];
    if (this.chartConfig) {
      $.each(this.chartConfig.series, function (seriesIndex, field) {
        var points = [];
        $.each(self.model.currentDocuments.models, function (index, doc) {
          var x = doc.get(self.chartConfig.group);
          var y = doc.get(field);
          if (typeof x === 'string') {
            x = index;
          }
          points.push([x, y]);
        });
        series.push({data: points, label: field});
      });
    }
    return series;
  },

  // Public: Adds a new empty series select box to the editor.
  //
  // All but the first select box will have a remove button that allows them
  // to be removed.
  //
  // Returns itself.
  addSeries: function (e) {
    e.preventDefault();
    var element = this.$seriesClone.clone(),
        label   = element.find('label'),
        index   = this.$series.length;

    this.el.find('.editor-series-group').append(element);
    this._updateSeries();
    label.append(' [<a href="#remove" class="action-remove-series">Remove</a>]');
    label.find('span').text(String.fromCharCode(this.$series.length + 64));
    return this;
  },

  // Public: Removes a series list item from the editor.
  //
  // Also updates the labels of the remaining series elements.
  removeSeries: function (e) {
    e.preventDefault();
    var $el = $(e.target);
    $el.parent().parent().remove();
    this._updateSeries();
    this.$series.each(function (index) {
      if (index > 0) {
        var labelSpan = $(this).prev().find('span');
        labelSpan.text(String.fromCharCode(index + 65));
      }
    });
    this.onEditorSubmit();
  },

  toggleHelp: function() {
    this.el.find('.editor-info').toggleClass('editor-hide-info');
  },

  // Private: Resets the series property to reference the select elements.
  //
  // Returns itself.
  _updateSeries: function () {
    this.$series  = this.el.find('.editor-series select');
  }
});

return my;

}(jQuery);

