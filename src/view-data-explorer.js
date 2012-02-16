this.recline = this.recline || {};
this.recline.View = this.recline.View || {};

// Views module following classic module pattern
(function($, my) {

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
    <div class="alert-messages"></div> \
    \
    <div class="header"> \
      <ul class="navigation"> \
        <li class="active"><a href="#grid" class="btn">Grid</a> \
        <li><a href="#graph" class="btn">Graph</a></li> \
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
    this.pageViews = {
      grid: new my.DataTable({
          model: this.model,
          config: this.config
        })
      , graph: new my.FlotGraph({
          model: this.model
        })
    };
    // this must be called after pageViews are created
    this.render();

    this.router = new Backbone.Router();
    this.setupRouting();

    // retrieve basic data like headers etc
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

})(jQuery, recline.View);


