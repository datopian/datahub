/*jshint multistr:true */

Backbone.I18nView = Backbone.View.extend({
    locale: 'en',
    initialize: function() {
        console.log("Call on me");
        // TODO implement cache
        //memoizeFormatConstructor(Intl.NumberFormat).getNumberFormat();
    },
    t: function(key, values = {}, defaultMessage = null) {
        // get the message from current locale
        var msg = recline.View.translations['pl'][key];

        // fallback to key or default message if no translation is defined
        if (msg == null) {
            console.warn("Missing locale for " + "pl" + "." + key); // TODO when dfault set and it's default locale then be quiet
            msg = defaultMessage;
        }
        if (msg == null) { msg = key; }

        // TODO test fallback to key
        // TODO test fallback to default message
        // TODO test overriding messages in external apps
        // TODO i18n documentation

        var mf = new IntlMessageFormat(msg, 'pl');
        return mf.format(values);
    },
    MustacheFormatter: function() {
        var property_formatter = new Proxy({}, {
            get(target, name) {
                // todo implement formatting
                return "key: " + name;
            },
            has(target, prop) {
                return true;
            }
        });

        var section_formatter = function() {
            return function (text, render) {
                // todo implement formatting
                return "<b>" + render(text) + "</b>";
            }
        };

        return {
            't': property_formatter,
            'trans': section_formatter
        };
    },
});
