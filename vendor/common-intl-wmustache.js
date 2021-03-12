/**
 *  Copyright (c) 2016 Krzysztof Madejski
 *
 * This code is licensed under GPL v3 http://choosealicense.com/licenses/gpl-3.0/
 */
 (function (global) {
"use strict";
var I18nMessages = function(libraryID, translations, languageResolverOrLocale, appHardcodedLocale) {
    if (typeof this === 'undefined') {
        return new I18nMessages(libraryID, translations, languageResolverOrLocale, appHardcodedLocale);
    }

    // which locale should we use?
    languageResolverOrLocale = (typeof languageResolverOrLocale !== 'undefined') ?  languageResolverOrLocale : I18nMessages.languageResolver;
    appHardcodedLocale = appHardcodedLocale || 'en';

    if (typeof(languageResolverOrLocale) === 'function') {
        languageResolverOrLocale = languageResolverOrLocale();
    }
    if (languageResolverOrLocale == undefined) {
        languageResolverOrLocale = appHardcodedLocale;
    }

    if (((I18nMessages.prototype._formatters || {})[libraryID] || {})[languageResolverOrLocale]) {
        return I18nMessages.prototype._formatters[libraryID][languageResolverOrLocale];
    }
    I18nMessages.prototype._formatters = I18nMessages.prototype._formatters || {};
    I18nMessages.prototype._formatters[libraryID] = I18nMessages.prototype._formatters[libraryID] || {};
    I18nMessages.prototype._formatters[libraryID][languageResolverOrLocale] = this;

    // ========== VARIABLES & FUNCTIONS ==========
    var self = this;

    this.uniqueID = this.uniqueID;
    this.locale = languageResolverOrLocale;
    this.translations = translations;
    this.appHardcodedLocale = appHardcodedLocale;
    this.cache= {};

    this.getLocale = function() {
        return this.locale;
    };

    // ============= FormatJS.io backend =========

    this.t = function(key, values, defaultMessage) {
        values = (typeof values !== 'undefined') ?  values : {};

        // get the message from current locale
        var msg = (this.translations[this.locale] || {})[key];

        // fallback to key or default message if no translation is defined
        if (msg == null) {
            if (this.locale != this.appHardcodedLocale) {
                console.warn("Missing locale for " + this.locale + "." + key);
            }
            msg = defaultMessage;
        }
        if (msg == null) {
            msg = key;
            if (this.locale === this.appHardcodedLocale) {
                // no need to define lang entry for short sentences, just use underscores as spaces
                msg = msg.replace(/_/g, ' ');
            }

        }

        try {
            var formatter = this.cache[msg];
            if (formatter === undefined) {
                this.cache[msg] = formatter = new IntlMessageFormat(msg, this.locale);
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

    // ============ Mustache integration ========

    this.mustacheI18Tags = function() {
        var tagsProxy = new Proxy(this, {
            get: function(messages, name) {
                return function() {
                    var f = function (text, render) {
                        var trans = messages.t(name, this, text);
                        return render(trans);
                    }
                    f.toString = function() {
                        return messages.t(name);
                    }
                    return f;
                };
            },
            has: function(target, prop) {
                return true;
            }
        });

        return {
            't': tagsProxy,
        };
    },

    this.injectMustache = function(tmplData) {
        return _.extend(tmplData, self.mustacheI18Tags());
    }
};

I18nMessages.languageResolver = function() {
    var h = $('html');
    return h.attr('lang') || h.attr('xml:lang');
};


global.I18nMessages = I18nMessages;

}(window));