var util = function() {
  var templates = {
    transformActions: '<li><a data-action="transform" class="menuAction" href="JavaScript:void(0);">Global transform...</a></li>'
    , columnActions: ' \
      <li class="write-op"><a data-action="bulkEdit" class="menuAction" href="JavaScript:void(0);">Transform...</a></li> \
      <li class="write-op"><a data-action="deleteColumn" class="menuAction" href="JavaScript:void(0);">Delete this column</a></li> \
      <li><a data-action="sortAsc" class="menuAction" href="JavaScript:void(0);">Sort ascending</a></li> \
      <li><a data-action="sortDesc" class="menuAction" href="JavaScript:void(0);">Sort descending</a></li> \
    '
    , rowActions: '<li><a data-action="deleteRow" class="menuAction write-op" href="JavaScript:void(0);">Delete this row</a></li>'
    , cellEditor: ' \
      <div class="menu-container data-table-cell-editor"> \
        <textarea class="data-table-cell-editor-editor" bind="textarea">{{value}}</textarea> \
        <div id="data-table-cell-editor-actions"> \
          <div class="data-table-cell-editor-action"> \
            <button class="okButton btn primary">Update</button> \
            <button class="cancelButton btn danger">Cancel</button> \
          </div> \
        </div> \
      </div> \
    '
    , editPreview: ' \
      <div class="expression-preview-table-wrapper"> \
        <table> \
        <thead> \
        <tr> \
          <th class="expression-preview-heading"> \
            before \
          </th> \
          <th class="expression-preview-heading"> \
            after \
          </th> \
        </tr> \
        </thead> \
        <tbody> \
        {{#rows}} \
        <tr> \
          <td class="expression-preview-value"> \
            {{before}} \
          </td> \
          <td class="expression-preview-value"> \
            {{after}} \
          </td> \
        </tr> \
        {{/rows}} \
        </tbody> \
        </table> \
      </div> \
    '
  };

  $.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
      if (o[this.name]) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]];
        }
        o[this.name].push(this.value || '');
      } else {
        o[this.name] = this.value || '';
      }
    });
    return o;
  };

  function inURL(url, str) {
    var exists = false;
    if ( url.indexOf( str ) > -1 ) {
      exists = true;
    }
    return exists;
  }
  
  function registerEmitter() {
    var Emitter = function(obj) {
      this.emit = function(obj, channel) { 
        if (!channel) var channel = 'data';
        this.trigger(channel, obj); 
      };
    };
    MicroEvent.mixin(Emitter);
    return new Emitter();
  }
  
  function listenFor(keys) {
    var shortcuts = { // from jquery.hotkeys.js
			8: "backspace", 9: "tab", 13: "return", 16: "shift", 17: "ctrl", 18: "alt", 19: "pause",
			20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home",
			37: "left", 38: "up", 39: "right", 40: "down", 45: "insert", 46: "del", 
			96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7",
			104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111 : "/", 
			112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8", 
			120: "f9", 121: "f10", 122: "f11", 123: "f12", 144: "numlock", 145: "scroll", 191: "/", 224: "meta"
		}
    window.addEventListener("keyup", function(e) { 
      var pressed = shortcuts[e.keyCode];
      if(_.include(keys, pressed)) app.emitter.emit("keyup", pressed); 
    }, false);
  }
  
  function observeExit(elem, callback) {
    var cancelButton = elem.find('.cancelButton');
    // TODO: remove (commented out as part of Backbon-i-fication
    // app.emitter.on('esc', function() { 
    //  cancelButton.click();
    //  app.emitter.clear('esc');
    // });
    cancelButton.click(callback);
  }
  
  function show( thing ) {
    $('.' + thing ).show();
    $('.' + thing + '-overlay').show();
  }

  function hide( thing ) {
    $('.' + thing ).hide();
    $('.' + thing + '-overlay').hide();
    // TODO: remove or replace (commented out as part of Backbon-i-fication
    // if (thing === "dialog") app.emitter.clear('esc'); // todo more elegant solution
  }
  
  function position( thing, elem, offset ) {
    var position = $(elem.target).position();
    if (offset) {
      if (offset.top) position.top += offset.top;
      if (offset.left) position.left += offset.left;
    }
    $('.' + thing + '-overlay').show().click(function(e) {
      $(e.target).hide();
      $('.' + thing).hide();
    });
    $('.' + thing).show().css({top: position.top + $(elem.target).height(), left: position.left});
  }

  function render( template, target, options ) {
    if ( !options ) options = {data: {}};
    if ( !options.data ) options = {data: options};
    var html = $.mustache( templates[template], options.data );
    if (target instanceof jQuery) {
      var targetDom = target;
    } else {
      var targetDom = $( "." + target + ":first" );      
    }
    if( options.append ) {
      targetDom.append( html );
    } else {
      targetDom.html( html );
    }
    // TODO: remove (commented out as part of Backbon-i-fication
    // if (template in app.after) app.after[template]();
  }

  function notify(message, options) {
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
        $(_templated).remove();
      }, 3000);
    }
  }
  
  function formatMetadata(data) {
    out = '<dl>';
    $.each(data, function(key, val) {
      if (typeof(val) == 'string' && key[0] != '_') {
        out = out + '<dt>' + key + '<dd>' + val;
      } else if (typeof(val) == 'object' && key != "geometry" && val != null) {
        if (key == 'properties') {
          $.each(val, function(attr, value){
            out = out + '<dt>' + attr + '<dd>' + value;
          })
        } else {
          out = out + '<dt>' + key + '<dd>' + val.join(', ');
        }
      }
    });
    out = out + '</dl>';
    return out;
  }

  function getBaseURL(url) {
    var baseURL = "";
    if ( inURL(url, '_design') ) {
      if (inURL(url, '_rewrite')) {
        var path = url.split("#")[0];
        if (path[path.length - 1] === "/") {
          baseURL = "";
        } else {
          baseURL = '_rewrite/';
        }
      } else {
        baseURL = '_rewrite/';
      }
    }
    return baseURL;
  }
  
  var persist = {
    restore: function() {
      $('.persist').each(function(i, el) {
        var inputId = $(el).attr('id');
        if(localStorage.getItem(inputId)) $('#' + inputId).val(localStorage.getItem(inputId));
      })
    },
    save: function(id) {
      localStorage.setItem(id, $('#' + id).val());
    },
    clear: function() {
      $('.persist').each(function(i, el) {
        localStorage.removeItem($(el).attr('id'));
      })
    }
  }
  
  // simple debounce adapted from underscore.js
  function delay(func, wait) {
    return function() {
      var context = this, args = arguments;
      var throttler = function() {
        delete app.timeout;
        func.apply(context, args);
      };
      if (!app.timeout) app.timeout = setTimeout(throttler, wait);      
    };
  };
  
  function resetForm(form) {
    $(':input', form)
     .not(':button, :submit, :reset, :hidden')
     .val('')
     .removeAttr('checked')
     .removeAttr('selected');
  }
  
  function largestWidth(selector, min) {
    var min_width = min || 0;
    $(selector).each(function(i, n){
        var this_width = $(n).width();
        if (this_width > min_width) {
            min_width = this_width;
        }
    });
    return min_width;
  }
  
  function getType(obj) {
    if (obj === null) {
      return 'null';
    }
    if (typeof obj === 'object') {
      if (obj.constructor.toString().indexOf("Array") !== -1) {
        return 'array';
      } else {
        return 'object';
      }
    } else {
      return typeof obj;
    }
  }
  
  function lookupPath(path) {
    var docs = app.apiDocs;
    try {
      _.each(path, function(node) {
        docs = docs[node];
      })
    } catch(e) {
      util.notify("Error selecting documents" + e);
      docs = [];
    }
    return docs;
  }
  
  function nodePath(docField) {
    if (docField.children('.object-key').length > 0) return docField.children('.object-key').text();
    if (docField.children('.array-key').length > 0) return docField.children('.array-key').text();
    if (docField.children('.doc-key').length > 0) return docField.children('.doc-key').text();
    return "";
  }
  
  function selectedTreePath() {
    var nodes = []
      , parent = $('.chosen');
    while (parent.length > 0) {
      nodes.push(nodePath(parent));
      parent = parent.parents('.doc-field:first');
    }
    return _.compact(nodes).reverse();
  }
  
  // TODO refactor handlers so that they dont stack up as the tree gets bigger
  function handleTreeClick(e) {
    var clicked = $(e.target);
    if(clicked.hasClass('expand')) return;
    if (clicked.children('.array').length > 0) {
      var field = clicked;
    } else if (clicked.siblings('.array').length > 0) {
      var field = clicked.parents('.doc-field:first');
    } else {
      var field = clicked.parents('.array').parents('.doc-field:first');
    }
    $('.chosen').removeClass('chosen');
    field.addClass('chosen');
    return false;
  }
  
  var createTreeNode = {
    "string": function (obj, key) {
      var val = $('<div class="doc-value string-type"></div>');
      if (obj[key].length > 45) {
        val.append($('<span class="string-type"></span>')
        .text(obj[key].slice(0, 45)))
        .append(
          $('<span class="expand">...</span>')
          .click(function () {
            val.html('')
            .append($('<span class="string-type"></span>')
              .text(obj[key].length ? obj[key] : "   ")
            )
          })
        )
      }
      else {
        var val = $('<div class="doc-value string-type"></div>');
        val.append(
          $('<span class="string-type"></span>')
          .text(obj[key].length ? obj[key] : "   ")
        )
      }
      return val;
    }
    , "number": function (obj, key) {
      var val = $('<div class="doc-value number"></div>')
      val.append($('<span class="number-type">' + obj[key] + '</span>'))
      return val;
    }
    , "null": function (obj, key) {
      var val = $('<div class="doc-value null"></div>')
      val.append($('<span class="null-type">' + obj[key] + '</span>'))
      return val;
    }
    , "boolean": function (obj, key) {
      var val = $('<div class="fue null"></div>')
      val.append($('<span class="null-type">' + obj[key] + '</span>'))
      return val;
    }
    , "array": function (obj, key, indent) {
       if (!indent) indent = 1;
        var val = $('<div class="doc-value array"></div>')
        $('<span class="array-type">[</span><span class="expand" style="float:left">...</span><span class="array-type">]</span>')
          .click(function (e) {
            var n = $(this).parent();
            var cls = 'sub-'+key+'-'+indent
            n.html('')
            n.append('<span style="padding-left:'+((indent - 1) * 10)+'px" class="array-type">[</span>')
            for (i in obj[key]) {
              var field = $('<div class="doc-field"></div>').click(handleTreeClick);
              n.append(
                field
                  .append('<div class="array-key '+cls+'" >'+i+'</div>')
                  .append(createTreeNode[getType(obj[key][i])](obj[key], i, indent + 1))
                )
            }
            n.append('<span style="padding-left:'+((indent - 1) * 10)+'px" class="array-type">]</span>')
            $('div.'+cls).width(largestWidth('div.'+cls))
          })
          .appendTo($('<div class="array-type"></div>').appendTo(val))
        return val;
    }
    , "object": function (obj, key, indent) {
      if (!indent) indent = 1;
      var val = $('<div class="doc-value object"></div>')
      $('<span class="object-type">{</span><span class="expand" style="float:left">...</span><span class="object-type">}</span>')
        .click(function (e) {
          var n = $(this).parent();
          n.html('')
          n.append('<span style="padding-left:'+((indent - 1) * 10)+'px" class="object-type">{</span>')
          for (i in obj[key]) {
            var field = $('<div class="doc-field"></div>').click(handleTreeClick);
            var p = $('<div class="id-space" style="margin-left:'+(indent * 10)+'px"/>');
            var di = $('<div class="object-key">'+i+'</div>')
            field.append(p)
              .append(di)
              .append(createTreeNode[getType(obj[key][i])](obj[key], i, indent + 1))
            n.append(field)
          }

          n.append('<span style="padding-left:'+((indent - 1) * 10)+'px" class="object-type">}</span>')
          di.width(largestWidth('div.object-key'))
        })
        .appendTo($('<div class="object-type"></div>').appendTo(val))
      return val;
    }
  }

  function renderTree(doc) {
    var d = $('div#document-editor');
    for (i in doc) {
      var field = $('<div class="doc-field"></div>').click(handleTreeClick);
      $('<div class="id-space" />').appendTo(field);    
      field.append('<div class="doc-key doc-key-base">'+i+'</div>')
      field.append(createTreeNode[getType(doc[i])](doc, i));
      d.append(field);
    }

    $('div.doc-key-base').width(largestWidth('div.doc-key-base'))
  }
  
  
  return {
    inURL: inURL,
    registerEmitter: registerEmitter,
    listenFor: listenFor,
    show: show,
    hide: hide,
    position: position,
    render: render,
    notify: notify,
    observeExit: observeExit,
    formatMetadata:formatMetadata,
    getBaseURL:getBaseURL,
    resetForm: resetForm,
    delay: delay,
    persist: persist,
    lookupPath: lookupPath,
    selectedTreePath: selectedTreePath,
    renderTree: renderTree
  };
}();
