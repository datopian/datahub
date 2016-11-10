/*jshint multistr:true */

// TODO probably some kind of mixin would be better, like: my.View - Backbone.View.extend({}); _.extend(my.View, Backbone.I18nView);

Backbone.I18nView = Backbone.View.extend({
    defaultLocale: 'en',
    locale: 'en',
    cache: {},
    initializeI18n: function(locale, appHardcodedLocale) {
        this.defaultLocale = appHardcodedLocale || 'en';
        this.locale = locale || this.defaultLocale;

        this.cache[this.locale] = {};
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
            if (this.locale != this.defaultLocale) {
                console.warn("Missing locale for " + this.locale + "." + key);
            }
            msg = defaultMessage;
        }
        if (msg == null) {
            msg = key;
            if (this.locale === this.defaultLocale) {
                // no need to define lang entry for short sentences, just use underscores as spaces
                msg = msg.replace(/_/g, ' ');
            }

        }

        // TODO i18n documentation

        try {
            var formatter = this.cache[this.locale][msg];
            if (formatter === undefined) {
                this.cache[this.locale][msg] = formatter = new IntlMessageFormat(msg, this.locale);
            }
            var formatted = formatter.format(values);

            return formatted;
        } catch (e) {
            var err = "Got error while formatting \"" + msg + "\": " + e.message;
            if (e.name == 'SyntaxError' && e.found == '{') {
                err += '. Probably you should change double brackets around variables (Mustache style) to single brackets (Intl style).';
            }
            console.error(err);

            return msg;
        }
    },

    MustacheFormatter: function() {
        var formatter = new Proxy(this, {
            get(view, name) {
                return function() {
                    var f = function (text, render) {
                        var trans = view.t(name, this, text);
                        return render(trans);
                    }
                    f.toString = function() {
                        return view.t(name);
                    }
                    return f;
                };
            },
            has(target, prop) {
                return true;
            }
        });

        return {
            't': formatter,
        };
    },
});