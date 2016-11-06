/*jshint multistr:true */

// todo probably some kind of mixin would be better
//usage: (zamienic na extension)
// my.View - Backbone.View.extend({});
//_.extend(my.View, Backbone.I18nView);

Backbone.I18nView = Backbone.View.extend({
    locale: 'en',
    initializeI18n: function(locale) {
        this.locale = locale;
        // TODO implement cache
        //memoizeFormatConstructor(Intl.NumberFormat).getNumberFormat();
    },

    formatMessage(key, values) {
        this.cachedMsg.format(key, values);
    },

    // TODO how to use it from outside? an singleton instance of I18n? use case: pass translated strings into view initializer
    t: function(key, values = {}, defaultMessage = null) {
        // get the message from current locale
        var msg = recline.View.translations[this.locale][key];

        // fallback to key or default message if no translation is defined
        if (msg == null) {
            console.warn("Missing locale for " + this.locale + "." + key); // TODO when dfault set and it's default locale then be quiet
            msg = defaultMessage;
        }
        if (msg == null) { msg = key; }

        // TODO i18n documentation

        try {
            var mf = new IntlMessageFormat(msg, 'pl');
            var formatted = mf.format(values);

            return formatted;
        } catch (e) {
            console.error("Got error while formatting \"" + msg + "\": " + e.message);
            // todo {{ wywala Message format, trzeba by wyescapować i pwrzywrócic po podmianie
            return msg;
        }

        // TODO document below error (most probable variables ref hasn't ben changed in template)
        /* 19:10:40.954 SyntaxError: <template>:1
 >>    <div class="recline-data-explorer">     <div class="alert-messages"></div>         <div class="header clearfix">       <div class="navigation">         <div class="btn-group" data-toggle="buttons-radio">         {{#views}}         <button href="#{{id}}" data-view="{{id}}" class="btn btn-default">{{label}}</button>         {{/views}}         </div>       </div>       <div class="recline-results-info">         {{t.num_records}} -> t + getattr         {{#trans.num_records_defmsg}}<span class="doc-count">{{recordCount}}</span> records{{/trans.num_records_defmsg}} --         <span class="doc-count">{{recordCount}}</span> records      </div>       <div class="menu-right">         <div class="btn-group" data-toggle="buttons-checkbox">           {{#sidebarViews}}           <button href="#" data-action="{{id}}" class="btn btn-default">{{label}}</button>           {{/sidebarViews}}         </div>       </div>       <div class="query-editor-here" style="display:inline;"></div>     </div>     <div class="data-view-sidebar"></div>     <div class="data-view-container"></div>   </div>
Expected "0", [1-9] or [^ \t\n\r,.+={}#] but "{" found.1(unknown)
*/

    },

    MustacheFormatter: function() {
        var property_formatter = new Proxy(this, {
            get(view, name) {
                return view.t(name);
            },
            has(target, prop) {
                return true;
            }
        });

        var section_formatter = new Proxy(this, {
            get(view, name) {
                return function() {
                    return function (text, render) {
                        var trans = view.t(name, this, text);
                        return render(text);
                    }
                };
            },
            has(target, prop) {
                return true;
            }
        });

        return {
            't': property_formatter,
            'trans': section_formatter
        };
    },
});
