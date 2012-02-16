this.recline = this.recline || {};
this.recline.View = this.recline.View || {};

// Views module following classic module pattern
(function($, my) {

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

