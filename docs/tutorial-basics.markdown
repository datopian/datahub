---
layout: container
title: Tutorial - Dataset Basics
recline-deps: true
root: ../
---

<div class="page-header">
  <h1>
    Getting Started with Datasets
    <br />
    <small>This step-by-step tutorial will quickly get you started withthe central Recline object: a Dataset</small>
  </h1>
</div>

## Preparations

1. [Download ReclineJS]({{page.root}}download.html) and relevant dependencies.

2. Include the core dependencies for the Dataset model

    {% highlight html %}<!-- 3rd party dependencies -->
<script type="text/javascript" src="vendor/jquery/1.7.1/jquery.js"></script>
<script type="text/javascript" src="vendor/underscore/1.1.6/underscore.js"></script>
<script type="text/javascript" src="vendor/backbone/0.5.1/backbone.js"></script>
<!-- Recline -->
<script type="text/javascript" src="dist/recline.js"></script>{% endhighlight %}

## Creating a Dataset

Here's the example data We are going to work with:

{% highlight javascript %}
{% include data.js %}
{% endhighlight %}

In this data we have 6 records / rows. Each record is a javascript object
containing keys and values (values can be 'simple' e.g. a string or float or arrays or hashes - e.g. the geo value here).

<div class="alert alert-info">In this tutorial we are creating datasets with
"local" JS data. However, Recline has a variety of Backends that make it easy
to create Datasets from a variety of online sources and local sources including
Google Spreadsheets, CSV files, etc. See the <a
href="tutorial-backends.html">Backend tutorial</a> for more.</div>

We can now create a recline Dataset object from this raw data: 

{% highlight javascript %}
var dataset = new recline.Model.Dataset({
  records: data
});
{% endhighlight %}

<script type="text/javascript">
{% include data.js %}
var dataset = new recline.Model.Dataset({
  records: data
});
</script>

## Records, Fields and more

Now that we have created a Dataset, we can use it.

For example, let's display some information about the Dataset and its records: 

<div class="alert alert-info">You can find out more about Dataset and Records in the <a href="models.html">reference documentation</a></div>

{% highlight javascript %}
{% include tutorial-basics-ex-1.js %}
{% endhighlight %}

Here's the output:

<div class="ex-1 well">&nbsp;</div>

<script type="text/javascript"> 
$('.ex-1').html('');
{% include tutorial-basics-ex-1.js %}
</script>

Note how the last geo attribute just rendered as `[object Object]`. This is because the Dataset is treating that field value as a string. Let's now take a look at the Dataset fields in more detail.

### Fields

In addition to Records, a Dataset has <a href="models.html#field">Fields</a> stored in the `fields` attribute. Fields provide information about the fields/columns in the Dataset, for example their id (key name in record), label, type etc.

The Dataset's fields will be automatically computed from records or provided by the backend but they can also be explicitly provided and configured. Let's take a look at the fields on the dataset at present using the following code:

{% highlight javascript %}
{% include tutorial-basics-ex-fields.js %}
{% endhighlight %}

Running this results in the following:

<div class="ex-fields well">&nbsp;</div>

<script type="text/javascript"> 
$('.ex-fields').html('');
{% include tutorial-basics-ex-fields.js %}
</script>

As can be seen all fields have the default type of 'string'. Let's change the geo field to have type geo\_point and see what affect that has on displaying of the dataset (for good measure we'll also set the label):

{% highlight javascript %}
{% include tutorial-basics-ex-fields-2.js %}
{% endhighlight %}

<div class="ex-fields-2 well">&nbsp;</div>

<script type="text/javascript"> 
$('.ex-fields-2').html('');
{% include tutorial-basics-ex-fields-2.js %}
</script>

As can be seen the rendering of the field has changed. This is because the `recordSummary` method uses the Record.getFieldValue function which in turn renders a record field using the Field's renderer function. This function varies depending on the type and can also be customized (see the <a href="models.html#field">Field documentation</a>).


## Querying

The basic thing we want to do with Datasets is query and filter them. This is very easy to do:

{% highlight javascript %}
{% include tutorial-basics-ex-2.js %}
{% endhighlight %}

This results in the following. Note how recordCount is now 3 (the total number of records matched by the query) but that currentRecords only contains 2 records as we restricted number of returned records using the size attribute.

<div class="ex-2 well">&nbsp;</div>

<script type="text/javascript"> 
$('.ex-2').html('');
{% include tutorial-basics-ex-2.js %}
</script>

Full details of the <a href="models.html#query">query structure and its options can be found in the reference documentation</a>.

Also worth noting is that the last run query is stored as a <a href="models.html#query">Query instance</a> in the `queryState` attribute of the Dataset object. Modifying `queryState` will also resulting in a query being run. This is useful when building views that want to display or manage the query state (see, for example, <a href="src/widget.queryeditor.html">Query Editor</a> or <a href="src/widget.filtereditor.html">Filter Editor</a> widgets).


## Listening for Events

Often you'll want to listen to events on Datasets and its associated objects rather than have to explicitly notify. This is easy to do thanks to the use of Backbone model objects which have a [standard set of events](http://backbonejs.org/#FAQ-events).

Here's an example to illustrate:

{% highlight javascript %}
{% include tutorial-basics-ex-events.js %}
{% endhighlight %}

<div class="ex-events well">&nbsp;</div>

<script type="text/javascript">
$('.ex-events').html('');
{% include tutorial-basics-ex-events.js %}
</script>

Here's a summary of the main objects and their events:

* Dataset:

  * Standard Backbone events for changes to attributes (note that this will **not** include changes to records)
  * *query:start / query:end* called at start and completion of a query

* Dataset.currentRecords: Backbone.Collection of "current" records (i.e. those resulting from latest query) with standard Backbone set of events: *add, reset, remove* 

* Dataset.queryState: queryState is a Query object with standard Backbone Model set of events

* Dataset.fields: Backbone Collection of Fields.

