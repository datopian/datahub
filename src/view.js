/*jshint multistr:true */
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
// just initialize a DataGrid with id 'grid'. Example:
//
// <pre>
// var views = [
//   {
//     id: 'grid', // used for routing
//     label: 'Grid', // used for view switcher
//     view: new recline.View.DataGrid({
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
//   * readOnly: true/false (default: false) value indicating whether to
//     operate in read-only mode (hiding all editing options).
//
// NB: the element already being in the DOM is important for rendering of
// FlotGraph subview.
my.DataExplorer = Backbone.View.extend({
  template: ' \
  <div class="recline-data-explorer"> \
    <div class="alert-messages"></div> \
    \
    <div class="header"> \
      <ul class="navigation"> \
        {{#views}} \
        <li><a href="#{{id}}" class="btn">{{label}}</a> \
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
    <div class="dialog-overlay" style="display: none; z-index: 101; ">&nbsp;</div> \
    <div class="dialog ui-draggable" style="display: none; z-index: 102; top: 101px; "> \
      <div class="dialog-frame" style="width: 700px; visibility: visible; "> \
        <div class="dialog-content dialog-border"></div> \
      </div> \
    </div> \
  </div> \
  ',
  events: {
    'click .menu-right a': 'onMenuClick'
  },

  initialize: function(options) {
    var self = this;
    this.el = $(this.el);
    this.config = _.extend({
        readOnly: false
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
        view: new my.DataGrid({
            model: this.model
          })
      }];
    }
    // this must be called after pageViews are created
    this.render();

    this.router = new Backbone.Router();
    this.setupRouting();

    this.model.bind('query:start', function() {
        my.notify('Loading data', {loader: true});
      });
    this.model.bind('query:done', function() {
        my.clearNotifications();
        self.el.find('.doc-count').text(self.model.docCount || 'Unknown');
        my.notify('Data loaded', {category: 'success'});
        // update navigation
        var qs = my.parseHashQueryString();
        qs.reclineQuery = JSON.stringify(self.model.queryState.toJSON());
        var out = my.getNewHashForQueryString(qs);
        self.router.navigate(out);
      });
    this.model.bind('query:fail', function(error) {
        my.clearNotifications();
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
        my.notify(msg, {category: 'error', persist: true});
      });

    // retrieve basic data like fields etc
    // note this.model and dataset returned are the same
    this.model.fetch()
      .done(function(dataset) {
        var queryState = my.parseHashQueryString().reclineQuery;
        if (queryState) {
          queryState = JSON.parse(queryState);
        }
        self.model.query(queryState);
      })
      .fail(function(error) {
        my.notify(error.message, {category: 'error', persist: true});
      });
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

  setupRouting: function() {
    var self = this;
    // Default route
    this.router.route(/^(\?.*)?$/, this.pageViews[0].id, function(queryString) {
      self.updateNav(self.pageViews[0].id, queryString);
    });
    $.each(this.pageViews, function(idx, view) {
      self.router.route(/^([^?]+)(\?.*)?/, 'view', function(viewId, queryString) {
        self.updateNav(viewId, queryString);
      });
    });
  },

  updateNav: function(pageName, queryString) {
    this.el.find('.navigation li').removeClass('active');
    this.el.find('.navigation li a').removeClass('disabled');
    var $el = this.el.find('.navigation li a[href=#' + pageName + ']');
    $el.parent().addClass('active');
    $el.addClass('disabled');
    // show the specific page
    _.each(this.pageViews, function(view, idx) {
      if (view.id === pageName) {
        view.view.el.show();
      } else {
        view.view.el.hide();
      }
    });
  },

  onMenuClick: function(e) {
    e.preventDefault();
    var action = $(e.target).attr('data-action');
    if (action === 'filters') {
      this.$filterEditor.show();
    } else if (action === 'facets') {
      this.$facetViewer.show();
    }
  }
});

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

/* ========================================================== */
// ## Miscellaneous Utilities

var urlPathRegex = /^([^?]+)(\?.*)?/;

// Parse the Hash section of a URL into path and query string
my.parseHashUrl = function(hashUrl) {
  var parsed = urlPathRegex.exec(hashUrl);
  if (parsed === null) {
    return {};
  } else {
    return {
      path: parsed[1],
      query: parsed[2] || ''
    };
  }
};

// Parse a URL query string (?xyz=abc...) into a dictionary.
my.parseQueryString = function(q) {
  if (!q) {
    return {};
  }
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
};

// Parse the query string out of the URL hash
my.parseHashQueryString = function() {
  q = my.parseHashUrl(window.location.hash).query;
  return my.parseQueryString(q);
};

// Compse a Query String
my.composeQueryString = function(queryParams) {
  var queryString = '?';
  var items = [];
  $.each(queryParams, function(key, value) {
    items.push(key + '=' + value);
  });
  queryString += items.join('&');
  return queryString;
};

my.getNewHashForQueryString = function(queryParams) {
  var queryPart = my.composeQueryString(queryParams);
  if (window.location.hash) {
    // slice(1) to remove # at start
    return window.location.hash.split('?')[0].slice(1) + queryPart;
  } else {
    return queryPart;
  }
};

my.setHashQueryString = function(queryParams) {
  window.location.hash = my.getNewHashForQueryString(queryParams);
};

// ## notify
//
// Create a notification (a div.alert in div.alert-messsages) using provide messages and options. Options are:
//
// * category: warning (default), success, error
// * persist: if true alert is persistent, o/w hidden after 3s (default = false)
// * loader: if true show loading spinner
my.notify = function(message, options) {
  if (!options) options = {};
  var tmplData = _.extend({
    msg: message,
    category: 'warning'
    },
    options);
  var _template = ' \
    <div class="alert alert-{{category}} fade in" data-alert="alert"><a class="close" data-dismiss="alert" href="#">×</a> \
      {{msg}} \
        {{#loader}} \
        <span class="notification-loader">&nbsp;</span> \
        {{/loader}} \
    </div>';
  var _templated = $.mustache(_template, tmplData); 
  _templated = $(_templated).appendTo($('.recline-data-explorer .alert-messages'));
  if (!options.persist) {
    setTimeout(function() {
      $(_templated).fadeOut(1000, function() {
        $(this).remove();
      });
    }, 1000);
  }
};

// ## clearNotifications
//
// Clear all existing notifications
my.clearNotifications = function() {
  var $notifications = $('.recline-data-explorer .alert-messages .alert');
  $notifications.remove();
};

})(jQuery, recline.View);

