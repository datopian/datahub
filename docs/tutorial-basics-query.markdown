---
layout: container
title: Tutorial - Dataset Basics
recline-deps: true
root: ../
---

<div class="page-header">
  <h1>
    Dataset Basics - Querying
  </h1>
</div>

## Preparations

See <a href="{{page.root}}/docs/tutorial-basics.html">first Dataset basics tutorial</a> for getting setup and initializing a Dataset.

<script type="text/javascript">
{% include data.js %}
var dataset = new recline.Model.Dataset({
  records: data
});
</script>

## Querying

The basic thing we want to do with Datasets is query and filter them. This is
very easy to do:

{% highlight javascript %}
{% include tutorial-basics-ex-2.js %}
{% endhighlight %}

This results in the following. Note how recordCount is now 3 (the total number
of records matched by the query) but that records only contains 2 records as we
restricted number of returned records using the size attribute.

<div class="ex-2 well">&nbsp;</div>

<script type="text/javascript"> 
$('.ex-2').html('');
{% include tutorial-basics-ex-2.js %}
</script>

## Filtering

A simple unstructured query like the one provided above searches all fieldsfor the value provided.

Often you want to "filter" results more precisely, for example by specifying a specific value in a specific field. To do this we use "filters".

{% highlight javascript %}
var query = new recline.Model.Query();
query.addFilter({type: 'term', field: 2});
dataset.query(query);
{% endhighlight %}

## QueryState

The last run query is stored as a <a href="models.html#query">Query
instance</a> in the `queryState` attribute of the Dataset object. Modifying
`queryState` will also resulting in a query being run. This is useful when
building views that want to display or manage the query state (see, for
example, <a href="src/widget.queryeditor.html">Query Editor</a> or <a
href="src/widget.filtereditor.html">Filter Editor</a> widgets).

## Full Details of the Query Language

Full details of the <a href="models.html#query">query structure and its options
can be found in the reference documentation</a>.

