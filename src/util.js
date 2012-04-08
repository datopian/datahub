/*jshint multistr:true */

var util = function() {
  var templates = {
    transformActions: '<li><a data-action="transform" class="menuAction" href="JavaScript:void(0);">Global transform...</a></li>'
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

  return {
    registerEmitter: registerEmitter,
    listenFor: listenFor,
    show: show,
    hide: hide,
    position: position,
    render: render,
    observeExit: observeExit
  };
}();
