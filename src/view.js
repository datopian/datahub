/*jshint multistr:true */

// # Recline Views
//
// Recline Views are instances of Backbone Views and they act as 'WUI' (web
// user interface) component displaying some model object in the DOM. Like all
// Backbone views they have a pointer to a model (or a collection) and have an
// associated DOM-style element (usually this element will be bound into the
// page at some point).
//
// Views provided by core Recline are crudely divided into two types:
//
// * Dataset Views: a View intended for displaying a recline.Model.Dataset
//   in some fashion. Examples are the Grid, Graph and Map views.
// * Widget Views: a widget used for displaying some specific (and
//   smaller) aspect of a dataset or the application. Examples are
//   QueryEditor and FilterEditor which both provide a way for editing (a
//   part of) a `recline.Model.Query` associated to a Dataset.
//
// ## Dataset View
//
// These views are just Backbone views with a few additional conventions:
//
// 1. The model passed to the View should always be a recline.Model.Dataset instance
// 2. Views should generate their own root element rather than having it passed
//    in.
// 3. Views should apply a css class named 'recline-{view-name-lower-cased} to
//    the root element (and for all CSS for this view to be qualified using this
//    CSS class)
// 4. Read-only mode: CSS for this view should respect/utilize
//    recline-read-only class to trigger read-only behaviour (this class will
//    usually be set on some parent element of the view's root element.
// 5. State: state (configuration) information for the view should be stored on
//    an attribute named state that is an instance of a Backbone Model (or, more
//    speficially, be an instance of `recline.Model.ObjectState`). In addition,
//    a state attribute may be specified in the Hash passed to a View on
//    iniitialization and this information should be used to set the initial
//    state of the view.
//
//    Example of state would be the set of fields being plotted in a graph
//    view.
//
//    More information about State can be found below.
//
// To summarize some of this, the initialize function for a Dataset View should
// look like:
//
// <pre>
//    initialize: {
//        model: {a recline.Model.Dataset instance}
//        // el: {do not specify - instead view should create}
//        state: {(optional) Object / Hash specifying initial state}
//        ...
//    }
// </pre>
//
// Note: Dataset Views in core Recline have a common layout on disk as
// follows, where ViewName is the named of View class:
//
// <pre>
// src/view-{lower-case-ViewName}.js
// css/{lower-case-ViewName}.css
// test/view-{lower-case-ViewName}.js
// </pre>
//
// ### State
//
// State information exists in order to support state serialization into the
// url or elsewhere and reloading of application from a stored state.
//
// State is available not only for individual views (as described above) but
// for the dataset (e.g. the current query). For an example of pulling together
// state from across multiple components see `recline.View.DataExplorer`.
// 
// ### Writing your own Views
//
// See the existing Views.
//
// ----

// Standard JS module setup
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
//   views: {{dataset views}}
//   state: {{state configuration -- see below}}
// });
// </pre> 
//
// ### Parameters
// 
// **model**: (required) recline.model.Dataset instance.
//
// **el**: (required) DOM element to bind to. NB: the element already
// being in the DOM is important for rendering of some subviews (e.g.
// Graph).
//
// **views**: (optional) the dataset views (Grid, Graph etc) for
// DataExplorer to show. This is an array of view hashes. If not provided
// initialize with (recline.View.)Grid, Graph, and Map views (with obvious id
// and labels!).
//
// <pre>
// var views = [
//   {
//     id: 'grid', // used for routing
//     label: 'Grid', // used for view switcher
//     view: new recline.View.Grid({
//       model: dataset
//     })
//   },
//   {
//     id: 'graph',
//     label: 'Graph',
//     view: new recline.View.Graph({
//       model: dataset
//     })
//   }
// ];
// </pre>
//
// **state**: standard state config for this view. This state is slightly
//  special as it includes config of many of the subviews.
//
// <pre>
// state = {
//     query: {dataset query state - see dataset.queryState object}
//     view-{id1}: {view-state for this view}
//     view-{id2}: {view-state for }
//     ...
//     // Explorer
//     currentView: id of current view (defaults to first view if not specified)
//     readOnly: (default: false) run in read-only mode
// }
// </pre>
//
// Note that at present we do *not* serialize information about the actual set
// of views in use -- e.g. those specified by the views argument -- but instead 
// expect either that the default views are fine or that the client to have
// initialized the DataExplorer with the relevant views themselves.
my.DataExplorer = Backbone.View.extend({
  template: ' \
  <div class="recline-data-explorer"> \
    <div class="alert-messages"></div> \
    \
    <div class="header"> \
      <ul class="navigation"> \
        {{#views}} \
        <li><a href="#{{id}}" data-view="{{id}}" class="btn">{{label}}</a> \
        {{/views}} \
      </ul> \
      <div class="recline-results-info"> \
        Results found <span class="doc-count">{{docCount}}</span> \
      </div> \
      <div class="menu-right"> \
        <a href="#" class="btn" data-action="filters">Filters</a> \
        <a href="#" class="btn" data-action="facets">Facets</a> \
      </div> \
      <div class="query-editor-here" style="display:inline;"></div> \
      <div class="clearfix"></div> \
    </div> \
    <div class="data-view-container"></div> \
  </div> \
  ',
  events: {
    'click .menu-right a': '_onMenuClick',
    'click .navigation a': '_onSwitchView'
  },

  initialize: function(options) {
    var self = this;
    this.el = $(this.el);
    this._setupState(options.state);
    // Hash of 'page' views (i.e. those for whole page) keyed by page name
    if (options.views) {
      this.pageViews = options.views;
    } else {
      this.pageViews = [{
        id: 'grid',
        label: 'Grid',
        view: new my.Grid({
          model: this.model,
          state: this.state.get('view-grid')
        }),
      }, {
        id: 'graph',
        label: 'Graph',
        view: new my.Graph({
          model: this.model,
          state: this.state.get('view-graph')
        }),
      }, {
        id: 'map',
        label: 'Map',
        view: new my.Map({
          model: this.model,
          state: this.state.get('view-map')
        }),
      }, {
        id: 'timeline',
        label: 'Timeline',
        view: new my.Timeline({
          model: this.model,
          state: this.state.get('view-timeline')
        }),
      }];
    }
    // these must be called after pageViews are created
    this.render();
    this._bindStateChanges();
    this._bindFlashNotifications();
    // now do updates based on state (need to come after render)
    if (this.state.get('readOnly')) {
      this.setReadOnly();
    }
    if (this.state.get('currentView')) {
      this.updateNav(this.state.get('currentView'));
    } else {
      this.updateNav(this.pageViews[0].id);
    }

    this.model.bind('query:start', function() {
        self.notify({loader: true, persist: true});
      });
    this.model.bind('query:done', function() {
        self.clearNotifications();
        self.el.find('.doc-count').text(self.model.docCount || 'Unknown');
      });
    this.model.bind('query:fail', function(error) {
        self.clearNotifications();
        var msg = '';
        if (typeof(error) == 'string') {
          msg = error;
        } else if (typeof(error) == 'object') {
          if (error.title) {
            msg = error.title + ': ';
          }
          if (error.message) {
            msg += error.message;
          }
        } else {
          msg = 'There was an error querying the backend';
        }
        self.notify({message: msg, category: 'error', persist: true});
      });

    // retrieve basic data like fields etc
    // note this.model and dataset returned are the same
    this.model.fetch()
      .done(function(dataset) {
        self.model.query(self.state.get('query'));
      })
      .fail(function(error) {
        self.notify({message: error.message, category: 'error', persist: true});
      });
  },

  setReadOnly: function() {
    this.el.addClass('recline-read-only');
  },

  render: function() {
    var tmplData = this.model.toTemplateJSON();
    tmplData.views = this.pageViews;
    var template = $.mustache(this.template, tmplData);
    $(this.el).html(template);
    var $dataViewContainer = this.el.find('.data-view-container');
    _.each(this.pageViews, function(view, pageName) {
      $dataViewContainer.append(view.view.el);
    });
    var queryEditor = new my.QueryEditor({
      model: this.model.queryState
    });
    this.el.find('.query-editor-here').append(queryEditor.el);
    var filterEditor = new my.FilterEditor({
      model: this.model.queryState
    });
    this.$filterEditor = filterEditor.el;
    this.el.find('.header').append(filterEditor.el);
    var facetViewer = new my.FacetViewer({
      model: this.model
    });
    this.$facetViewer = facetViewer.el;
    this.el.find('.header').append(facetViewer.el);
  },

  updateNav: function(pageName) {
    this.el.find('.navigation li').removeClass('active');
    this.el.find('.navigation li a').removeClass('disabled');
    var $el = this.el.find('.navigation li a[data-view="' + pageName + '"]');
    $el.parent().addClass('active');
    $el.addClass('disabled');
    // show the specific page
    _.each(this.pageViews, function(view, idx) {
      if (view.id === pageName) {
        view.view.el.show();
        view.view.trigger('view:show');
      } else {
        view.view.el.hide();
        view.view.trigger('view:hide');
      }
    });
  },

  _onMenuClick: function(e) {
    e.preventDefault();
    var action = $(e.target).attr('data-action');
    if (action === 'filters') {
      this.$filterEditor.show();
    } else if (action === 'facets') {
      this.$facetViewer.show();
    }
  },

  _onSwitchView: function(e) {
    e.preventDefault();
    var viewName = $(e.target).attr('data-view');
    this.updateNav(viewName);
    this.state.set({currentView: viewName});
  },

  // create a state object for this view and do the job of
  // 
  // a) initializing it from both data passed in and other sources (e.g. hash url)
  //
  // b) ensure the state object is updated in responese to changes in subviews, query etc.
  _setupState: function(initialState) {
    var self = this;
    // get data from the query string / hash url plus some defaults
    var qs = recline.Util.parseHashQueryString();
    var query = qs.reclineQuery;
    query = query ? JSON.parse(query) : self.model.queryState.toJSON();
    // backwards compatability (now named view-graph but was named graph)
    var graphState = qs['view-graph'] || qs.graph;
    graphState = graphState ? JSON.parse(graphState) : {};

    // now get default data + hash url plus initial state and initial our state object with it
    var stateData = _.extend({
        query: query,
        'view-graph': graphState,
        backend: this.model.backend.__type__,
        dataset: this.model.toJSON(),
        currentView: null,
        readOnly: false
      },
      initialState);
    this.state = new recline.Model.ObjectState(stateData);
  },

  _bindStateChanges: function() {
    var self = this;
    // finally ensure we update our state object when state of sub-object changes so that state is always up to date
    this.model.queryState.bind('change', function() {
      self.state.set({query: self.model.queryState.toJSON()});
    });
    _.each(this.pageViews, function(pageView) {
      if (pageView.view.state && pageView.view.state.bind) {
        var update = {};
        update['view-' + pageView.id] = pageView.view.state.toJSON();
        self.state.set(update);
        pageView.view.state.bind('change', function() {
          var update = {};
          update['view-' + pageView.id] = pageView.view.state.toJSON();
          // had problems where change not being triggered for e.g. grid view so let's do it explicitly
          self.state.set(update, {silent: true});
          self.state.trigger('change');
        });
      }
    });
  },

  _bindFlashNotifications: function() {
    var self = this;
    _.each(this.pageViews, function(pageView) {
      pageView.view.bind('recline:flash', function(flash) {
        self.notify(flash); 
      });
    });
  },

  // ### notify
  //
  // Create a notification (a div.alert in div.alert-messsages) using provided
  // flash object. Flash attributes (all are optional):
  //
  // * message: message to show.
  // * category: warning (default), success, error
  // * persist: if true alert is persistent, o/w hidden after 3s (default = false)
  // * loader: if true show loading spinner
  notify: function(flash) {
    var tmplData = _.extend({
      message: 'Loading',
      category: 'warning',
      loader: false
      },
      flash
    );
    if (tmplData.loader) {
      var _template = ' \
        <div class="alert alert-info alert-loader"> \
          {{message}} \
          <span class="notification-loader">&nbsp;</span> \
        </div>';
    } else {
      var _template = ' \
        <div class="alert alert-{{category}} fade in" data-alert="alert"><a class="close" data-dismiss="alert" href="#">×</a> \
          {{message}} \
        </div>';
    }
    var _templated = $($.mustache(_template, tmplData));
    _templated = $(_templated).appendTo($('.recline-data-explorer .alert-messages'));
    if (!flash.persist) {
      setTimeout(function() {
        $(_templated).fadeOut(1000, function() {
          $(this).remove();
        });
      }, 1000);
    }
  },

  // ### clearNotifications
  //
  // Clear all existing notifications
  clearNotifications: function() {
    var $notifications = $('.recline-data-explorer .alert-messages .alert');
    $notifications.fadeOut(1500, function() {
      $(this).remove();
    });
  }
});

// ### DataExplorer.restore
//
// Restore a DataExplorer instance from a serialized state including the associated dataset
my.DataExplorer.restore = function(state) {
  var dataset = recline.Model.Dataset.restore(state);
  var explorer = new my.DataExplorer({
    model: dataset,
    state: state
  });
  return explorer;
}

my.QueryEditor = Backbone.View.extend({
  className: 'recline-query-editor', 
  template: ' \
    <form action="" method="GET" class="form-inline"> \
      <div class="input-prepend text-query"> \
        <span class="add-on"><i class="icon-search"></i></span> \
        <input type="text" name="q" value="{{q}}" class="span2" placeholder="Search data ..." class="search-query" /> \
      </div> \
      <div class="pagination"> \
        <ul> \
          <li class="prev action-pagination-update"><a href="">&laquo;</a></li> \
          <li class="active"><a><input name="from" type="text" value="{{from}}" /> &ndash; <input name="to" type="text" value="{{to}}" /> </a></li> \
          <li class="next action-pagination-update"><a href="">&raquo;</a></li> \
        </ul> \
      </div> \
      <button type="submit" class="btn">Go &raquo;</button> \
    </form> \
  ',

  events: {
    'submit form': 'onFormSubmit',
    'click .action-pagination-update': 'onPaginationUpdate'
  },

  initialize: function() {
    _.bindAll(this, 'render');
    this.el = $(this.el);
    this.model.bind('change', this.render);
    this.render();
  },
  onFormSubmit: function(e) {
    e.preventDefault();
    var query = this.el.find('.text-query input').val();
    var newFrom = parseInt(this.el.find('input[name="from"]').val());
    var newSize = parseInt(this.el.find('input[name="to"]').val()) - newFrom;
    this.model.set({size: newSize, from: newFrom, q: query});
  },
  onPaginationUpdate: function(e) {
    e.preventDefault();
    var $el = $(e.target);
    var newFrom = 0;
    if ($el.parent().hasClass('prev')) {
      newFrom = this.model.get('from') - Math.max(0, this.model.get('size'));
    } else {
      newFrom = this.model.get('from') + this.model.get('size');
    }
    this.model.set({from: newFrom});
  },
  render: function() {
    var tmplData = this.model.toJSON();
    tmplData.to = this.model.get('from') + this.model.get('size');
    var templated = $.mustache(this.template, tmplData);
    this.el.html(templated);
  }
});

my.FilterEditor = Backbone.View.extend({
  className: 'recline-filter-editor well', 
  template: ' \
    <a class="close js-hide" href="#">&times;</a> \
    <div class="row filters"> \
      <div class="span1"> \
        <h3>Filters</h3> \
      </div> \
      <div class="span11"> \
        <form class="form-horizontal"> \
          <div class="row"> \
            <div class="span6"> \
              {{#termFilters}} \
              <div class="control-group filter-term filter" data-filter-id={{id}}> \
                <label class="control-label" for="">{{label}}</label> \
                <div class="controls"> \
                  <div class="input-append"> \
                    <input type="text" value="{{value}}" name="{{fieldId}}" class="span4" data-filter-field="{{fieldId}}" data-filter-id="{{id}}" data-filter-type="term" /> \
                    <a class="btn js-remove-filter"><i class="icon-remove"></i></a> \
                  </div> \
                </div> \
              </div> \
              {{/termFilters}} \
            </div> \
          <div class="span4"> \
            <p>To add a filter use the column menu in the grid view.</p> \
            <button type="submit" class="btn">Update</button> \
          </div> \
        </form> \
      </div> \
    </div> \
  ',
  events: {
    'click .js-hide': 'onHide',
    'click .js-remove-filter': 'onRemoveFilter',
    'submit form': 'onTermFiltersUpdate'
  },
  initialize: function() {
    this.el = $(this.el);
    _.bindAll(this, 'render');
    this.model.bind('change', this.render);
    this.model.bind('change:filters:new-blank', this.render);
    this.render();
  },
  render: function() {
    var tmplData = $.extend(true, {}, this.model.toJSON());
    // we will use idx in list as there id ...
    tmplData.filters = _.map(tmplData.filters, function(filter, idx) {
      filter.id = idx;
      return filter;
    });
    tmplData.termFilters = _.filter(tmplData.filters, function(filter) {
      return filter.term !== undefined;
    });
    tmplData.termFilters = _.map(tmplData.termFilters, function(filter) {
      var fieldId = _.keys(filter.term)[0];
      return {
        id: filter.id,
        fieldId: fieldId,
        label: fieldId,
        value: filter.term[fieldId]
      };
    });
    var out = $.mustache(this.template, tmplData);
    this.el.html(out);
    // are there actually any facets to show?
    if (this.model.get('filters').length > 0) {
      this.el.show();
    } else {
      this.el.hide();
    }
  },
  onHide: function(e) {
    e.preventDefault();
    this.el.hide();
  },
  onRemoveFilter: function(e) {
    e.preventDefault();
    var $target = $(e.target);
    var filterId = $target.closest('.filter').attr('data-filter-id');
    this.model.removeFilter(filterId);
  },
  onTermFiltersUpdate: function(e) {
   var self = this;
    e.preventDefault();
    var filters = self.model.get('filters');
    var $form = $(e.target);
    _.each($form.find('input'), function(input) {
      var $input = $(input);
      var filterIndex = parseInt($input.attr('data-filter-id'));
      var value = $input.val();
      var fieldId = $input.attr('data-filter-field');
      filters[filterIndex].term[fieldId] = value;
    });
    self.model.set({filters: filters});
    self.model.trigger('change');
  }
});

my.FacetViewer = Backbone.View.extend({
  className: 'recline-facet-viewer well', 
  template: ' \
    <a class="close js-hide" href="#">&times;</a> \
    <div class="facets row"> \
      <div class="span1"> \
        <h3>Facets</h3> \
      </div> \
      {{#facets}} \
      <div class="facet-summary span2 dropdown" data-facet="{{id}}"> \
        <a class="btn dropdown-toggle" data-toggle="dropdown" href="#"><i class="icon-chevron-down"></i> {{id}} {{label}}</a> \
        <ul class="facet-items dropdown-menu"> \
        {{#terms}} \
          <li><a class="facet-choice js-facet-filter" data-value="{{term}}">{{term}} ({{count}})</a></li> \
        {{/terms}} \
        {{#entries}} \
          <li><a class="facet-choice js-facet-filter" data-value="{{time}}">{{term}} ({{count}})</a></li> \
        {{/entries}} \
        </ul> \
      </div> \
      {{/facets}} \
    </div> \
  ',

  events: {
    'click .js-hide': 'onHide',
    'click .js-facet-filter': 'onFacetFilter'
  },
  initialize: function(model) {
    _.bindAll(this, 'render');
    this.el = $(this.el);
    this.model.facets.bind('all', this.render);
    this.model.fields.bind('all', this.render);
    this.render();
  },
  render: function() {
    var tmplData = {
      facets: this.model.facets.toJSON(),
      fields: this.model.fields.toJSON()
    };
    tmplData.facets = _.map(tmplData.facets, function(facet) {
      if (facet._type === 'date_histogram') {
        facet.entries = _.map(facet.entries, function(entry) {
          entry.term = new Date(entry.time).toDateString();
          return entry;
        });
      }
      return facet;
    });
    var templated = $.mustache(this.template, tmplData);
    this.el.html(templated);
    // are there actually any facets to show?
    if (this.model.facets.length > 0) {
      this.el.show();
    } else {
      this.el.hide();
    }
  },
  onHide: function(e) {
    e.preventDefault();
    this.el.hide();
  },
  onFacetFilter: function(e) {
    var $target= $(e.target);
    var fieldId = $target.closest('.facet-summary').attr('data-facet');
    var value = $target.attr('data-value');
    this.model.queryState.addTermFilter(fieldId, value);
  }
});


})(jQuery, recline.View);

