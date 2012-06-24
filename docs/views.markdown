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

Views provided by core Recline are crudely divided into two types:

* Dataset Views: a View intended for displaying a recline.Model.Dataset in some
  fashion. Examples are the Grid, Graph and Map views.
* Widget Views: a widget used for displaying some specific (and smaller) aspect
  of a dataset or the application. Examples are QueryEditor and FilterEditor
  which both provide a way for editing (a part of) a `recline.Model.Query`
  associated to a Dataset.

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

