/*jshint multistr:true */

this.recline = this.recline || {};
this.recline.View = this.recline.View || {};

(function($, my) {

// ## Graph view for a Dataset using Flot graphing library.
//
// Initialization arguments (in a hash in first parameter):
//
// * model: recline.Model.Dataset
// * state: (optional) configuration hash of form:
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
          <option value="lines-and-points">Lines and Points</option> \
          <option value="lines">Lines</option> \
          <option value="points">Points</option> \
          <option value="bars">Bars</option> \
          </select> \
        </div> \
        <label>Group Column (x-axis)</label> \
        <div class="input editor-group"> \
          <select> \
          {{#fields}} \
          <option value="{{id}}">{{label}}</option> \
          {{/fields}} \
          </select> \
        </div> \
        <div class="editor-series-group"> \
          <div class="editor-series"> \
            <label>Series <span>A (y-axis)</span></label> \
            <div class="input"> \
              <select> \
              {{#fields}} \
              <option value="{{id}}">{{label}}</option> \
              {{/fields}} \
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
    'change form select': 'onEditorSubmit',
    'click .editor-add': 'addSeries',
    'click .action-remove-series': 'removeSeries',
    'click .action-toggle-help': 'toggleHelp'
  },

  initialize: function(options) {
    var self = this;
    this.el = $(this.el);
    _.bindAll(this, 'render', 'redraw');
    // we need the model.fields to render properly
    this.model.bind('change', this.render);
    this.model.fields.bind('reset', this.render);
    this.model.fields.bind('add', this.render);
    this.model.currentDocuments.bind('add', this.redraw);
    this.model.currentDocuments.bind('reset', this.redraw);
    var stateData = _.extend({
        group: null,
        series: [],
        graphType: 'lines-and-points'
      },
      options.state
    );
    this.state = new recline.Model.ObjectState(stateData);
    this.render();
  },

  render: function() {
    htmls = $.mustache(this.template, this.model.toTemplateJSON());
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
    $editor = this;
    var series = this.$series.map(function () {
      return $(this).val();
    });
    var updatedState = {
      series: $.makeArray(series),
      group: this.el.find('.editor-group select').val(),
      graphType: this.el.find('.editor-type select').val()
    };
    this.state.set(updatedState);
    this.redraw();
  },

  redraw: function() {
    // There appear to be issues generating a Flot graph if either:

    // * The relevant div that graph attaches to his hidden at the moment of creating the plot -- Flot will complain with
    //
    //   Uncaught Invalid dimensions for plot, width = 0, height = 0
    // * There is no data for the plot -- either same error or may have issues later with errors like 'non-existent node-value' 
    var areWeVisible = !jQuery.expr.filters.hidden(this.el[0]);
    if ((!areWeVisible || this.model.currentDocuments.length === 0)) {
      return;
    }
    var series = this.createSeries();
    var options = this.getGraphOptions(this.state.attributes.graphType);
    this.plot = $.plot(this.$graph, series, options);
    this.setupTooltips();
    // create this.plot and cache it
//    if (!this.plot) {
//      this.plot = $.plot(this.$graph, series, options);
//    } else {
//      this.plot.parseOptions(options);
//      this.plot.setData(this.createSeries());
//      this.plot.resize();
//      this.plot.setupGrid();
//      this.plot.draw();
//    }
  },

  // needs to be function as can depend on state
  getGraphOptions: function(typeId) { 
    var self = this;
    // special tickformatter to show labels rather than numbers
    var tickFormatter = function (val) {
      if (self.model.currentDocuments.models[val]) {
        var out = self.model.currentDocuments.models[val].get(self.state.attributes.group);
        // if the value was in fact a number we want that not the 
        if (typeof(out) == 'number') {
          return val;
        } else {
          return out;
        }
      }
      return val;
    };
    // TODO: we should really use tickFormatter and 1 interval ticks if (and
    // only if) x-axis values are non-numeric
    // However, that is non-trivial to work out from a dataset (datasets may
    // have no field type info). Thus at present we only do this for bars.
    var options = { 
      lines: {
         series: { 
           lines: { show: true }
         }
      },
      points: {
        series: {
          points: { show: true }
        },
        grid: { hoverable: true, clickable: true }
      },
      'lines-and-points': {
        series: {
          points: { show: true },
          lines: { show: true }
        },
        grid: { hoverable: true, clickable: true }
      },
      bars: {
        series: {
          lines: {show: false},
          bars: {
            show: true,
            barWidth: 1,
            align: "center",
            fill: true,
            horizontal: true
          }
        },
        grid: { hoverable: true, clickable: true },
        yaxis: {
          tickSize: 1,
          tickLength: 1,
          tickFormatter: tickFormatter,
          min: -0.5,
          max: self.model.currentDocuments.length - 0.5
        }
      }
    };
    return options[typeId];
  },

  setupTooltips: function() {
    var self = this;
    function showTooltip(x, y, contents) {
      $('<div id="flot-tooltip">' + contents + '</div>').css( {
        position: 'absolute',
        display: 'none',
        top: y + 5,
        left: x + 5,
        border: '1px solid #fdd',
        padding: '2px',
        'background-color': '#fee',
        opacity: 0.80
      }).appendTo("body").fadeIn(200);
    }

    var previousPoint = null;
    this.$graph.bind("plothover", function (event, pos, item) {
      if (item) {
        if (previousPoint != item.datapoint) {
          previousPoint = item.datapoint;
          
          $("#flot-tooltip").remove();
          var x = item.datapoint[0];
          var y = item.datapoint[1];
          // convert back from 'index' value on x-axis (e.g. in cases where non-number values)
          if (self.model.currentDocuments.models[x]) {
            x = self.model.currentDocuments.models[x].get(self.state.attributes.group);
          } else {
            x = x.toFixed(2);
          }
          y = y.toFixed(2);
          
          var content = _.template('<%= group %> = <%= x %>, <%= series %> = <%= y %>', {
            group: self.state.attributes.group,
            x: x,
            series: item.series.label,
            y: y
          });
          showTooltip(item.pageX, item.pageY, content);
        }
      }
      else {
        $("#flot-tooltip").remove();
        previousPoint = null;            
      }
    });
  },

  createSeries: function () {
    var self = this;
    var series = [];
    $.each(this.state.attributes.series, function (seriesIndex, field) {
      var points = [];
      $.each(self.model.currentDocuments.models, function (index, doc) {
        var x = doc.get(self.state.attributes.group);
        var y = doc.get(field);
        if (typeof x === 'string') {
          x = index;
        }
        // horizontal bar chart
        if (self.state.attributes.graphType == 'bars') {
          points.push([y, x]);
        } else {
          points.push([x, y]);
        }
      });
      series.push({data: points, label: field});
    });
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

})(jQuery, recline.View);

