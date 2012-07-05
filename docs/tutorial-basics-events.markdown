---
layout: container
title: Tutorial - Dataset Basics - Events
recline-deps: true
root: ../
---

<div class="page-header">
  <h1>
    Dataset Basics - Events
  </h1>
</div>


## Preparations

See <a href="{{page.root}}/docs/tutorial-basics.html">first Dataset basics tutorial</a> for getting setup and initializing Dataset.

<script type="text/javascript">
{% include data.js %}
var dataset = new recline.Model.Dataset({
  records: data
});
</script>

## Listening for Events

Often you'll want to listen to events on a Dataset and its associated objects. This is easy to do thanks to the use of Backbone model objects which have a [standard set of events](http://backbonejs.org/#FAQ-events).

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

* Dataset.records: Backbone.Collection of "current" records (i.e. those resulting from latest query) with standard Backbone set of events: *add, reset, remove* 

* Dataset.queryState: queryState is a Query object with standard Backbone Model set of events

* Dataset.fields: Backbone Collection of Fields.

