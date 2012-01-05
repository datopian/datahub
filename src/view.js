this.recline = this.recline || {};

// Views module following classic module pattern
recline.View = function($) {

var my = {};

my.DataExplorer = Backbone.View.extend({
  tagName: 'div',
  className: 'data-explorer',
  template: ' \
    <div class="nav"> \
      <span class="nav-toggle"> \
        <input type="radio" id="datatable" name="nav-toggle" value="datatable" checked="checked" /> \
        <label for="nav-datatable">Data Table</label> \
        <input type="radio" id="nav-graph" name="nav-toggle" value="graph" /> \
        <label for="nav-graph">Graph</label> \
      </span> \
      <ul class="nav-pagination"> \
        <li><form class="display-count"><label for="per-page">Display count</label> <input name="displayCount" type="text" value="{{displayCount}}" /></form></li> \
      </ul> \
    </div> \
    <div class="data-view-container"></div> \
  ',

  events: {
    'change input[name="nav-toggle"]': 'navChange',
    'submit form.display-count': 'displayCountUpdate'
  },

  initialize: function(options) {
    this.el = $(this.el);
    this.config = options.config || {};
    _.extend(this.config, {
      displayCount: 10
    });
    this.draw();
  },

  displayCountUpdate: function(e) {
    e.preventDefault();
    this.config.displayCount = parseInt(this.el.find('input[name="displayCount"]').val());
    this.draw();
  },

  draw: function() {
    var self = this;
    this.el.empty();
    this.render();
    this.$dataViewContainer = this.el.find('.data-view-container');
    // retrieve basic data like headers etc
    // note this.model and dataset returned are the same
    this.model.fetch().then(function(dataset) {
      // initialize of dataTable calls render
      self.dataTable = new my.DataTable({
        model: dataset
      });
      self.flotGraph = new my.FlotGraph({
        model: dataset
      });
      self.flotGraph.el.hide();
      self.$dataViewContainer.append(self.dataTable.el)
      self.$dataViewContainer.append(self.flotGraph.el);
      self.model.getRows(self.config.displayCount);
    });
  },

  render: function() {
    var template = $.mustache(this.template, this.config);
    $(this.el).html(template);
  },

  navChange: function(e) {
    // TODO: really ugly and will not scale to more widgets ...
    var widgetToShow = $(e.target).val();
    if (widgetToShow == 'datatable') {
      this.flotGraph.el.hide();
      this.dataTable.el.show();
    } else if (widgetToShow == 'graph') {
      this.flotGraph.el.show();
      this.dataTable.el.hide();
      // Have to call this here
      // If you attempt to render with flot when graph is hidden / invisible flot will complain with 
      // Invalid dimensions for plot, width = 0, height = 0
      // (Could hack this by moving plot left -1000 or similar ...)
      this.flotGraph.createPlot();
    }
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
    // this is nasty. Due to fact that .menu element is not inside this view but is elsewhere in DOM
    $('.menu li a').live('click', function(e) {
      // self.onMenuClick(e).apply(self);
      self.onMenuClick(e);
    });
  },

  events: {
    // see initialize
    // 'click .menu li': 'onMenuClick',
    'click .column-header-menu': 'onColumnHeaderClick',
    'click .row-header-menu': 'onRowHeaderClick'
  },

  showDialog: function(template, data) {
    if (!data) data = {};
    util.show('dialog');
    util.render(template, 'dialog-content', data);
    util.observeExit($('.dialog-content'), function() {
      util.hide('dialog');
    })
    $('.dialog').draggable({ handle: '.dialog-header', cursor: 'move' });
  },


  // ======================================================
  // Column and row menus

  onColumnHeaderClick: function(e) {
    this.state.currentColumn = $(e.target).siblings().text();
    util.position('menu', e);
    util.render('columnActions', 'menu');
  },

  onRowHeaderClick: function(e) {
    this.state.currentRow = $(e.target).parents('tr:first').attr('data-id');
    util.position('menu', e);
    util.render('rowActions', 'menu');
  },

  onMenuClick: function(e) {
    var self = this;
    e.preventDefault();
    var actions = {
      bulkEdit: function() { self.showDialog('bulkEdit', {name: self.state.currentColumn}) },
      transform: function() { showDialog('transform') },
      csv: function() { window.location.href = app.csvUrl },
      json: function() { window.location.href = "_rewrite/api/json" },
      urlImport: function() { showDialog('urlImport') },
      pasteImport: function() { showDialog('pasteImport') },
      uploadImport: function() { showDialog('uploadImport') },
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
    util.hide('menu');
    actions[$(e.target).attr('data-action')]();
  },

  // ======================================================
  // Core Templating
  template: ' \
    <table class="data-table" cellspacing="0"> \
      <thead> \
        <tr> \
          {{#notEmpty}}<td class="column-header"></td>{{/notEmpty}} \
          {{#headers}} \
            <td class="column-header"> \
              <div class="column-header-title"> \
                <a class="column-header-menu"></a> \
                <span class="column-header-name">{{.}}</span> \
              </div> \
              </div> \
            </td> \
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
    var template = $( ".dataTableTemplate:first" ).html()
      , htmls = $.mustache(template, this.toTemplateJSON())
      ;
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

my.FlotGraph = Backbone.View.extend({

  tagName:  "div",
  className: "data-graph-container",

  // TODO: normalize css
  template: ' \
  <div class="panel graph"></div> \
  <div class="editor"> \
    <div class="editor-info editor-hide-info"> \
      <h1><span></span>Help</h1> \
      <p>To create a chart select a column (group) to use as the x-axis \
         then another column (Series A) to plot against it.</p> \
      <p>You can add add \
         additional series by clicking the "Add series" button</p> \
      <p>Please note you must be logged in to save charts.</p> \
    </div> \
    <form> \
      <ul> \
        <li class="editor-type"> \
          <label>Graph Type</label> \
          <select> \
          <option value="line">Line</option> \
          </select> \
        </li> \
        <li class="editor-group"> \
          <label>Group Column (x-axis)</label> \
          <select> \
          {{#headers}} \
          <option value="{{.}}">{{.}}</option> \
          {{/headers}} \
          </select> \
        </li> \
        <li class="editor-series"> \
          <label>Series <span>A (y-axis)</span></label> \
          <select> \
          {{#headers}} \
          <option value="{{.}}">{{.}}</option> \
          {{/headers}} \
          </select> \
        </li> \
      </ul> \
      <div class="editor-buttons"> \
        <button class="editor-add">Add Series</button> \
      </div> \
      <div class="editor-buttons editor-submit"> \
        <button class="editor-save">Save</button> \
        <input type="hidden" class="editor-id" value="chart-1" /> \
      </div> \
    </form> \
  </div> \
</div> \
',

  initialize: function(options, chart) {
    var self = this;
    this.el = $(this.el);
    _.bindAll(this, 'render');
    this.model.currentDocuments.bind('add', this.render);
    this.model.currentDocuments.bind('reset', this.render);
    this.chart = chart;
    this.chartConfig = {
      group: null,
      series: [],
      graphType: 'line'
    };
  },

  events: {
    // 'change select': 'onEditorSubmit'
  },

  onEditorSubmit: function(e) {
    var select = this.el.find('.editor-group select');
    this._getEditorData();
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

  toTemplateJSON: function() {
    return this.model.toJSON();
  },

  render: function() {
    htmls = $.mustache(this.template, this.toTemplateJSON());
    $(this.el).html(htmls);
    // now set a load of stuff up
    this.$graph = this.el.find('.panel.graph');
    // event approach did not seem to work
    this.$series  = this.el.find('.editor-series select');
    this.$seriesClone = this.$series.parent().clone();
    var self = this;
    this.el.find('form select').change(function() {
      self.onEditorSubmit.apply(self, arguments)
    });
    return this;
  },

  createPlot: function () {
    // only lines for the present
    options = {
      id: 'line',
      name: 'Line Chart'
    };
    this.plot = $.plot(this.$graph, this.createSeries(), options);
    return this;
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

  // TODO: finish porting this function
  addSeries: function () {
    var element = this.seriesClone.clone(),
        label   = element.find('label'),
        index   = this.series.length;

    this.el.$series.parent().find('ul').append(element);
    this.updateSeries();

    label.append('<a href="#remove">Remove</a>');
    label.find('span').text(String.fromCharCode(this.series.length + 64));

    return this;
  }
});

return my;

}(jQuery);

