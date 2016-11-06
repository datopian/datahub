(function ($) {

module("View - i18n support");

test('translate simple key custom locale', function () {
  var dataset = Fixture.getDataset();
  var view = new recline.View.MultiView({
    model: dataset,
    locale: 'pl' // todo or should it go in the state parameter?
  });

  equal(view.t('Grid'), 'Tabela');
});

test('translate simple key default locale', function () {
  var dataset = Fixture.getDataset();
  var view = new recline.View.MultiView({
    model: dataset
  });

  equal(view.t('Add_row'), 'Add row');
});

test('override custom locale', function () {
  var dataset = Fixture.getDataset();
  var view = new recline.View.MultiView({
    model: dataset,
    locale: 'pl'
  });
  var oldTranslation = recline.View.translations['pl']['Grid'];

  // set custom strings in external app after recline script
  recline.View.translations['pl']['Grid'] = 'Dane';

  equal(view.t('Grid'), 'Dane');
  recline.View.translations['pl']['Grid'] = oldTranslation;
});

test('override default locale', function () {
  var dataset = Fixture.getDataset();
  var view = new recline.View.MultiView({
    model: dataset
  });
  var oldTranslation = recline.View.translations['en']['Grid'];

  // set custom strings in external app after recline script
  recline.View.translations['en']['Grid'] = 'Data';

  equal(view.t('Grid'), 'Data');
  recline.View.translations['en']['Grid'] = oldTranslation;
});

test('fallback to key if translation not present', function () {
  var dataset = Fixture.getDataset();
  var view = new recline.View.MultiView({
    model: dataset
  });

  equal(view.t('thiskeydoesnotexist'), 'thiskeydoesnotexist');
});

test('fallback to default message', function () {
  var dataset = Fixture.getDataset();
  var view = new recline.View.MultiView({
    model: dataset
  });

  equal(view.t('thiskeydoesnotexist', {}, 'Fallback to default message'), 'Fallback to default message');
});

test('mustache formatter - simple key', function () {
  var dataset = Fixture.getDataset();
  var view = new recline.View.MultiView({
    model: dataset,
    locale: 'pl'
  });

  var template = '{{t.Grid}}';
  var tmplData = {};

  // adding i18n support [do it in view before passing data to render functions]
  tmplData = _.extend(tmplData, view.MustacheFormatter());

  var out = Mustache.render(template, tmplData);
  equal(out, 'Tabela');
});

test('mustache formatter - complex key', function () {
  var dataset = Fixture.getDataset();
  var view = new recline.View.MultiView({
    model: dataset,
  });

  var template = '{{#t.num_records}}{recordCount} records{{/t.num_records}}';
  var tmplData = {recordCount: 5};

  // adding i18n support [do it in view before passing data to render functions]
  tmplData = _.extend(tmplData, view.MustacheFormatter());

  var out = Mustache.render(template, tmplData);
  equal(out, '5 records');
});


test('translate complex key default locale', function () {
  var dataset = Fixture.getDataset();
  var view = new recline.View.MultiView({
    model: dataset
  });

  equal(view.t('codeforall', {records: 3}, '<span>{records} records</span>'), '<span>3 records</span>');
});

test('translate complex key custom locale', function () {
  var dataset = Fixture.getDataset();
  var view = new recline.View.MultiView({
    model: dataset,
    locale: 'pl'
  });

  recline.View.translations['pl']['codeforall'] = '<span>{records} rekordy</span>';
  equal(view.t('codeforall', {records: 3}, '<span>{records} records</span>'), '<span>3 rekordy</span>');
});

test('translate complex key custom locale custom count', function () {
  var dataset = Fixture.getDataset();
  var view = new recline.View.MultiView({
    model: dataset,
    locale: 'pl'
  });

  recline.View.translations['pl']['codeforall'] = '{records, plural, ' +
      '=0 {brak zdjęć}' +
      '=1 {{records} zdjęcie}' +
      'few {{records} zdjęcia}' +
      'other {{records} zdjęć}}';

  equal(view.t('codeforall', {records: 0}), 'brak zdjęć');
  equal(view.t('codeforall', {records: 1}), '1 zdjęcie');
  equal(view.t('codeforall', {records: 3}), '3 zdjęcia');
  equal(view.t('codeforall', {records: 5}), '5 zdjęć');
});


// todo test dynamic language changes

})(this.jQuery);

