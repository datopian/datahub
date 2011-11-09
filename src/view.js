this.recline = this.recline || {};

recline.DataExplorer = Backbone.View.extend({
  tagName: 'div',
  className: 'data-explorer',
  template: ' \
    <div class="dataexplorer-tableview-nav"> \
      <span class="dataexplorer-tableview-nav-toggle"> \
        <input type="radio" id="dataexplorer-tableview-nav-grid" name="dataexplorer-tableview-nav-toggle" value="grid" checked="checked" /> \
        <label for="dataexplorer-tableview-nav-grid">Grid</label> \
        <input type="radio" id="dataexplorer-tableview-nav-graph" name="dataexplorer-tableview-nav-toggle" value="chart" /> \
        <label for="dataexplorer-tableview-nav-graph">Graph</label> \
      </span> \
    </div> \
  ',

  events: {
  },

  initialize: function() {
    this.el = $(this.el);
    this.render();
    // initialize of dataTable calls render
    this.dataTable = new recline.DataTable({
      model: this.model
    });
    this.el.append(this.dataTable.el)
  },

  render: function() {
    $(this.el).html($(this.template));
  }
});

recline.DataTable = Backbone.View.extend({

  tagName:  "div",
  className: "data-table-container",

  // template: TODO ???

  events: {
  },

  initialize: function() {
    var that = this;
    this.model.fetch().then(function() {
      that.model.getRows().then(function(rows) {
        that._currentRows = rows;
        that.render()
      });
    })
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
  <div class="dataexplorer-tableview-panel dataexplorer-tableview-graph"></div> \
  <div class="dataexplorer-tableview-editor"> \
    <div class="dataexplorer-tableview-editor-info dataexplorer-tableview-editor-hide-info"> \
      <h1><span></span>Help</h1> \
      <p>To create a chart select a column (group) to use as the x-axis \
         then another column (Series A) to plot against it.</p> \
      <p>You can add add \
         additional series by clicking the "Add series" button</p> \
      <p>Please note you must be logged in to save charts.</p> \
    </div> \
    <form> \
      <ul> \
        <li class="dataexplorer-tableview-editor-type"> \
          <label>Graph Type</label> \
          <select></select> \
        </li> \
        <li class="dataexplorer-tableview-editor-group"> \
          <label>Group Column (x-axis)</label> \
          <select></select> \
        </li> \
        <li class="dataexplorer-tableview-editor-series"> \
          <label>Series <span>A (y-axis)</span></label> \
          <select></select> \
        </li> \
      </ul> \
      <div class="dataexplorer-tableview-editor-buttons"> \
        <button class="dataexplorer-tableview-editor-add">Add Series</button> \
      </div> \
      <div class="dataexplorer-tableview-editor-buttons dataexplorer-tableview-editor-submit"> \
        <button class="dataexplorer-tableview-editor-save">Save</button> \
        <input type="hidden" class="dataexplorer-tableview-editor-id" value="chart-1" /> \
      </div> \
    </form> \
  </div> \
</div> \
',

  events: {
  },

  initialize: function() {
  },
  toTemplateJSON: function() {
    return {};
  },
  render: function() {
    htmls = $.mustache(this.template, this.toTemplateJSON());
    $(this.el).html(htmls);
    return this;
  }
});
