(function ($) {

module("I18nMessages");

test('translate simple key custom locale', function () {
  var fmt = I18nMessages('somelib', Fixture.getTranslations(), 'pl');

  equal(fmt.t('Grid'), 'Tabela');
});

test('translate simple key default locale', function () {
  var fmt = I18nMessages('somelib', Fixture.getTranslations());

  equal(fmt.t('Add_row'), 'Add row');
});

test('fallback to key if translation not present', function () {
  var fmt = I18nMessages('somelib', Fixture.getTranslations());

  equal(fmt.t('thiskeydoesnotexist'), 'thiskeydoesnotexist');
});

test('fallback to default message', function () {
  var fmt = I18nMessages('somelib', Fixture.getTranslations());

  equal(fmt.t('thiskeydoesnotexist', {}, 'Fallback to default message'), 'Fallback to default message');
});

test('mustache formatter - simple key', function () {
  var fmt = I18nMessages('somelib', Fixture.getTranslations(), 'pl');

  var template = '{{t.Grid}}';
  var tmplData = {};

  tmplData = fmt.injectMustache(tmplData);

  var out = Mustache.render(template, tmplData);
  equal(out, 'Tabela');
});

test('mustache formatter - complex key', function () {
  var fmt = I18nMessages('somelib', Fixture.getTranslations(), 'pl');

  var template = '{{#t.num_records}}{recordCount} records{{/t.num_records}}';
  var tmplData = {recordCount: 5};

  // injecting i18n support [do it in view before passing data to render functions]
  tmplData = fmt.injectMustache(tmplData);

  var out = Mustache.render(template, tmplData);
  equal(out, '5 records');
});


test('translate complex key default locale', function () {
  var fmt = I18nMessages('somelib', Fixture.getTranslations(), 'pl');

  equal(fmt.t('codeforall', {records: 3}, '<span>{records} records</span>'), '<span>3 records</span>');
});

test('mustache formatter - translate complex key custom locale', function () {
  var translations = {
    pl: {
      codeforall: '<span>{records} rekordy</span>'
    }
  };
  var fmt = I18nMessages('somelib2', translations, 'pl');

  equal(fmt.t('codeforall', {records: 3}, '<span>{records} records</span>'), '<span>3 rekordy</span>');
});

test('mustache formatter - translate complex key custom locale custom count', function () {
  var translations = {
    pl: {
      codeforall: '{records, plural, ' +
      '=0 {brak zdjęć}' +
      '=1 {{records} zdjęcie}' +
      'few {{records} zdjęcia}' +
      'other {{records} zdjęć}}'
    }
  };
  var fmt = I18nMessages('somelib3', translations, 'pl');

  equal(fmt.t('codeforall', {records: 0}), 'brak zdjęć');
  equal(fmt.t('codeforall', {records: 1}), '1 zdjęcie');
  equal(fmt.t('codeforall', {records: 3}), '3 zdjęcia');
  equal(fmt.t('codeforall', {records: 5}), '5 zdjęć');
});

test('I18nMessages specified locale', function () {
  var fmt = I18nMessages('somelib', {}, 'pl');

  equal(fmt.getLocale(), 'pl');
});

test('I18nMessages default locale', function () {
  var fmt = I18nMessages('somelib', {});

  // no language set in HTML tag
  equal($('html').attr('lang'), undefined);

  equal(fmt.getLocale(), 'en');
});

test('I18nMessages custom language resolver', function () {
  var localeResolver = function() { return 'fr'; };
  var fmt = I18nMessages('somelib', {}, localeResolver);

  equal(fmt.getLocale(), 'fr');
});

test('I18nMessages override language resolver', function () {
  var oldResolver = I18nMessages.languageResolver;
  I18nMessages.languageResolver = function() {
    return 'fr';
  };
  var fmt = I18nMessages('somelib', {});

  equal(fmt.getLocale(), 'fr');
  I18nMessages.languageResolver = oldResolver;
});

test('I18nMessages singletons', function () {
  var lib1_pl = I18nMessages('lib1', {}, 'pl');
  var lib2_pl = I18nMessages('lib2', {}, 'pl');
  var lib1_en = I18nMessages('lib1', {}, 'en');

  strictEqual(I18nMessages('lib1', {}, 'pl'), lib1_pl);
  notStrictEqual(lib1_pl, lib1_en);
  notStrictEqual(lib1_pl, lib2_pl);
});

})(this.jQuery);

