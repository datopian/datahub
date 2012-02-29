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
  <div class="data-explorer"> \
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
        self.el.find('.doc-count').text(self.model.docCount || 'Unknown');
        self.model.query();
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
      $dataViewContainer.append(view.view.el)
    });
    var queryEditor = new my.QueryEditor({
      model: this.model.queryState
    });
    this.el.find('.header').append(queryEditor.el);
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
  }
});


my.QueryEditor = Backbone.View.extend({
  className: 'recline-query-editor', 
  template: ' \
    <form action="" method="GET" class="form-inline"> \
      <input type="text" name="q" value="{{q}}" class="text-query" /> \
      <div class="pagination"> \
        <ul> \
          <li class="prev action-pagination-update"><a>&laquo;</a></li> \
          <li class="active"><a><input name="from" type="text" value="{{from}}" /> &ndash; <input name="to" type="text" value="{{to}}" /> </a></li> \
          <li class="next action-pagination-update"><a>&raquo;</a></li> \
        </ul> \
      </div> \
      <button type="submit" class="btn" style="">Update &raquo;</button> \
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
    var newFrom = parseInt(this.el.find('input[name="from"]').val());
    var newSize = parseInt(this.el.find('input[name="to"]').val()) - newFrom;
    var query = this.el.find('.text-query').val();
    this.model.set({size: newSize, from: newFrom, q: query});
  },
  onPaginationUpdate: function(e) {
    e.preventDefault();
    var $el = $(e.target);
    if ($el.parent().hasClass('prev')) {
      var newFrom = this.model.get('from') - Math.max(0, this.model.get('size'));
    } else {
      var newFrom = this.model.get('from') + this.model.get('size');
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
// Create a notification (a div.alert in div.alert-messsages) using provide messages and options. Options are:
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
    <div class="alert alert-{{category}} fade in" data-alert="alert"><a class="close" data-dismiss="alert" href="#">×</a> \
      {{msg}} \
        {{#loader}} \
        <span class="notification-loader">&nbsp;</span> \
        {{/loader}} \
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
  var $notifications = $('.data-explorer .alert-messages .alert');
  $notifications.remove();
}

})(jQuery, recline.View);

