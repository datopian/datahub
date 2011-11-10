this.recline = this.recline || {};

recline.DataExplorer = Backbone.View.extend({
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
    </div> \
  ',

  events: {
    'change input[name="nav-toggle"]': 'navChange'
  },

  initialize: function() {
    this.el = $(this.el);
    this.render();
    var self = this;
    // retrieve basic data like headers etc
    // note this.model and dataset returned are the same
    this.model.fetch().then(function(dataset) {
      // initialize of dataTable calls render
      self.dataTable = new recline.DataTable({
        model: dataset
      });
      self.flotGraph = new recline.FlotGraph({
        model: dataset
      });
      self.flotGraph.el.hide();
      self.el.append(self.dataTable.el)
      self.el.append(self.flotGraph.el);
    });
  },

  render: function() {
    $(this.el).html($(this.template));
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

recline.DataTable = Backbone.View.extend({

  tagName:  "div",
  className: "data-table-container",

  // template: TODO ???

  events: {
  },

  initialize: function() {
    this.el = $(this.el);
    var that = this;
    this.model.getRows().then(function(rows) {
      that._currentRows = rows;
      that.render()
    });
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

recline.FlotGraph = Backbone.View.extend({

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
    this.el = $(this.el);
    this.chart = chart;
    this.chartConfig = {
      group: null,
      series: [],
      graphType: 'line'
    };
    var self = this;
    this.model.getRows().then(function(rows) {
      self._currentRows = rows;
      self.render()
    });
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
        $.each(self._currentRows, function (index) {
          var x = this[self.chartConfig.group], y = this[field];
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
