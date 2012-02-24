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

    this.model.bind('query:start', function(eventName) {
        my.notify('Loading data', {loader: true});
      });
    this.model.bind('query:done', function(eventName) {
        my.clearNotifications();
        my.notify('Data loaded', {category: 'success'});
      });
    this.model.bind('query:fail', function(eventName, error) {
        my.clearNotifications();
        my.notify(error.message, {category: 'error', persist: true});
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


my.QueryEditor = Backbone.View.extend({
  className: 'recline-query-editor', 
  template: ' \
    <form action="" method="GET"> \
      Showing <input name="size" type="text" value="{{size}}" title="Edit and hit enter to change the number of rows displayed" /> starting at <input name="offset" type="text" value="{{offset}}" /> of <span class="doc-count">{{docCount}}</span> \
      <button type="submit" class="btn">Update &raquo;</button> \
    </form> \
  ',

  events: {
    'submit form': 'onFormSubmit'
  },

  initialize: function() {
    this.el = $(this.el);
    this.render();
  },
  onFormSubmit: function(e) {
    e.preventDefault();
    var newSize = parseInt(this.el.find('input[name="size"]').val());
    var newOffset = parseInt(this.el.find('input[name="offset"]').val());
    this.model.set({size: newSize, offset: newOffset});
  },
  render: function() {
    var tmplData = this.model.toJSON();
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

