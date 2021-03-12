---
layout: container
title: Library - Views
root: ../
---

<div class="page-header">
  <h1>
    Recline Views
  </h1>
</div>

Recline Views are instances of Backbone Views and they act as 'WUI' (web user
interface) component displaying some model object in the DOM. Like all Backbone
views they have a pointer to a model (or a collection) and have an associated
DOM-style element (usually this element will be bound into the page at some
point).

<div class="alert alert-info">Looking for quickstart tutorial rather than reference documentation? See the <a href="tutorial-views.html">Views Tutorial</a>.</div>


Views provided by core Recline are crudely divided into two types:

* Dataset Views: a View intended for displaying a recline.Model.Dataset in some
  fashion. Examples are the Grid, Graph and Map views.
* Widget Views: a widget used for displaying some specific (and smaller) aspect
  of a dataset or the application. Examples are QueryEditor and FilterEditor
  which both provide a way for editing (a part of) a `recline.Model.Query`
  associated to a Dataset.

## Dataset Views currently available
{% include views-list.html %}

## Dataset View

These views are just Backbone views with a few additional conventions:

1. The model passed to the View should always be a recline.Model.Dataset
   instance
2. Views should generate their own root element rather than having it passed
   in.
3. Views should apply a css class named 'recline-{view-name-lower-cased} to the
   root element (and for all CSS for this view to be qualified using this CSS
   class)
4. Read-only mode: CSS for this view should respect/utilize a parent
   recline-read-only class in order to trigger read-only behaviour (this class
   will usually be set on some parent element of the view's root element).
5. State: state (configuration) information for the view should be stored on an
   attribute named state that is an instance of a Backbone Model (or, more
   speficially, be an instance of `recline.Model.ObjectState`). In addition, a
   state attribute may be specified in the Hash passed to a View on
   iniitialization and this information should be used to set the initial state
   of the view.

   Example of state would be the set of fields being plotted in a graph view.

   More information about State can be found below.

To summarize some of this, the initialize function for a Dataset View should
look like:

<pre>
   initialize: {
       model: {a recline.Model.Dataset instance}
       // el: {do not specify - instead view should create}
       state: {(optional) Object / Hash specifying initial state}
       ...
   }
</pre>

Note: Dataset Views in core Recline have a common layout on disk as follows,
where ViewName is the named of View class:

<pre>
src/view-{lower-case-ViewName}.js
css/{lower-case-ViewName}.css
test/view-{lower-case-ViewName}.js
</pre>

### State

State information exists in order to support state serialization into the url
or elsewhere and reloading of application from a stored state.

State is available not only for individual views (as described above) but for
the dataset (e.g. the current query). For an example of pulling together state
from across multiple components see `recline.View.DataExplorer`.

### Flash Messages / Notifications

To send 'flash messages' or notifications the convention is that views should
fire an event named `recline:flash` with a payload that is a flash object with
the following attributes (all optional):

* message: message to show.
* category: warning (default), success, error
* persist: if true alert is persistent, o/w hidden after 3s (default=false)
* loader: if true show a loading message

Objects or views wishing to bind to flash messages may then subscribe to these
events and take some action such as displaying them to the user. For an example
of such behaviour see the DataExplorer view.

### Writing your own Views

See the existing Views.

## Internationalization

### Adding translations to templates

Internationalization is implemented with help of [intl-messageformat](https://www.npmjs.com/package/intl-messageformat) library and supports [ICU Message syntax](http://userguide.icu-project.org/formatparse/messages).
 
Translation keys are using Mustache tags prefixed by `t.`. You can specify translated strings in two ways:

1. Simple text with no variables is rendered using Mustache variable-tag
```javascript
$template = '{{ "{{t.Add_row"}}}}'; // will show "Add row" in defaultLocale (English) 
```

2. Text with variables or special characters is rendered using Mustache section-tag

```javascript
$template = '{{ "{{#t.desc"}}}}Add first_row field{{ "{{/t.desc"}}}}'; 
// using special chars; will show "Add first_row field" in defaultLocale
 
$template = '{{ "{{#t.num_records"}}}}{recordCount, plural, =0 {no records} =1{# record} other {# records}}{{ "{{/t.num_records"}}}}'; 
// will show "no records", "1 record" or "x records" in defaultLocale (English) 
```

When using section-tags in existing templates be sure to remove a bracket from variables inside sections:
```javascript
#template___notranslation = '{{ "{{recordCount"}}}} records';
#template_withtranslation = '{{ "{{#t.num_records"}}}} {recordCount} records {{ "{{/t.num_records"}}}}';
```


Then setup Mustache to use translation by injecting tranlation tags in `render` function:

```javascript
// ============== BEFORE ===================

my.MultiView = Backbone.View.extend({
  render: function() {
    var tmplData = this.model.toTemplateJSON();
    var output = Mustache.render(this.template, tmplData);
    ...
  }    
});

// ============== AFTER ==================== 

my.MultiView = Backbone.View.extend({
  render: function() {
    var tmplData = this.model.toTemplateJSON();
    tmplData = I18nMessages('recline', recline.View.translations).injectMustache(tmplData);  // inject Moustache formatter
    var output = Mustache.render(this.template, tmplData);
    ...
  }    
});
```

### Language resolution

By default the language is detected from the root `lang` attributes - <html lang="xx">` and `<html xml:lang="xx">`. 

If you want to override this functionality then override `I18nMessages.languageResolver` with your implementation.

```html
<script type="text/javascript" src="common-intl-wmustache.js"></script>
<script type="text/javascript">
  I18nMessages.languageResolver = function() {
    // implement here your language resolution 
    return 'fr';
  };
</script>
```

Libraries can also ask for specific language: `I18nMessages('recline', recline.View.translations, 'pl')`. Language resolver is not used in that case.

If you're creating templates using default language other than English (why?) set appropriately appHardcodedLocale: `I18nMessages('recline', recline.View.translations, undefined, 'pl')`. Then missing strings won't be reported in console and underscores in simple translations will be converted to spaces.

### Adding new language

Create a copy of `src/i18n/pl.js` and translate all the keys. Long English messages can be found in `en.js`.

### Overriding defined messages

If you want to override translations from provided locale do it in a script tag after including recline:

```html
<script type="text/javascript" src="recline.js"></script>
<script type="text/javascript">
  this.recline.View.translations['en'] = {
    Add_row: 'Add new row'
  } 
</script>
```