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

## A Dataset and its Records

Now that we have created a Dataset, we can use it.

For example, let's display some information about the Dataset and its records using some of the key Dataset attributes: `recordCount` and `records`.

{% highlight javascript %}
{% include tutorial-basics-ex-1.js %}
{% endhighlight %}

Here's the output:

<div class="ex-1 well">&nbsp;</div>

<script type="text/javascript"> 
$('.ex-1').html('');
{% include tutorial-basics-ex-1.js %}
</script>

### Records

`Dataset.records` is a Backbone Collection of `Record`s resutling from latest query. This need not (and usually isn't) **all** the records in this Dataset since the latest query need not have matched all records.

<div class="alert alert-info">
Note that on initialization, a Dataset automatically queries for the first 100 records so this is what will usually be available in th <code>records</code> attribute. If you did want all records loaded into <code>records</code> at the start just requery after fetch has completed:

{% highlight javascript %}
// for the async case need to put inside of done
dataset.fetch().done(function() {
  dataset.query({size: dataset.recordCount});
});
{% endhighlight %}
</div>

As a Backbone Collection it supports all the standard Backbone collection functionality including methods like `each` and `filter`:

{% highlight javascript %}
dataset.records.each(function(record) {
  console.log(record.get('x') * 2);
});

var filtered = dataset.records.filter(function(record) {
  return (record.get('z') > 4 && record.get('z') < 18);
});

// get all the values for a given attribute/field/column
var xvalues = dataset.records.pluck('x');

// calls toJSON on all records at once
dataset.records.toJSON();
{% endhighlight %}

<div class="alert alert-info">Want to know more about Dataset and Records? Check out the <a href="models.html">reference documentation</a></div>

## Fields

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

As can be seen all fields have the default type of 'string'.

As you may have noticed above the last geo attribute of the dataset just rendered as `[object Object]`. This is because the Dataset is treating that field value as a string. Let's now take a look at the Dataset fields in more detail.

Let's change the geo field to have type geo\_point and see what affect that has on displaying of the dataset (for good measure we'll also set the label):

{% highlight javascript %}
{% include tutorial-basics-ex-fields-2.js %}
{% endhighlight %}

<div class="ex-fields-2 well">&nbsp;</div>

<script type="text/javascript"> 
$('.ex-fields-2').html('');
{% include tutorial-basics-ex-fields-2.js %}
</script>

As can be seen the rendering of the field has changed. This is because the `summary` method uses the Record.getFieldValue function which in turn renders a record field using the Field's renderer function. This function varies depending on the type and can also be customized (see the <a href="models.html#field">Field documentation</a>).

