---
layout: container
title: Library - Example - Quickstart
recline-deps: true
---

<div class="page-header">
  <h1>
    Recline Quickstart Guide
    <br />
    <small>This step-by-step guide will quickly get you started with Recline basics, including creating a dataset from local data and setting up a grid, graph and map to display it.</small>
  </h1>
</div>

### Preparing your page

Before writing any code with Recline, you need to do the following preparation steps on your page:

1. [Download ReclineJS](download.html) and relevant dependencies.
2. Include the relevant CSS in the head section of your document:
    {% highlight html %}
<!-- you do not have to use bootstrap but we use it by default -->
<link rel="stylesheet" href="vendor/bootstrap/2.0.2/css/bootstrap.css" />
<!-- CSS for relevant view components - here we just have grid -->
<link rel="stylesheet" href="css/grid.css" />{% endhighlight %}

3. Include the relevant Javascript files somewhere on the page (preferably before body close tag):
    {% highlight html %}<!-- 3rd party dependencies -->
<script type="text/javascript" src="vendor/jquery/1.7.1/jquery.js"></script>
<script type="text/javascript" src="vendor/underscore/1.1.6/underscore.js"></script>
<script type="text/javascript" src="vendor/backbone/0.5.1/backbone.js"></script>
<script type="text/javascript" src="vendor/jquery.mustache.js"></script>
<script type="text/javascript" src="vendor/bootstrap/2.0.2/bootstrap.js"></script>
<!-- note that we could include individual components rather than whole of recline e.g.
<script type="text/javascript" src="src/model.js"></script>
<script type="text/javascript" src="src/backend/base.js"></script>
<script type="text/javascript" src="src/backend/memory.js"></script>
<script type="text/javascript" src="src/view-grid.js"></script>
-->
<script type="text/javascript" src="dist/recline.js"></script>{% endhighlight %}

4. Create a div to hold the Recline view(s):
    {% highlight html %}
    <div id="mygrid"></div>{% endhighlight %}

You're now ready to start working with Recline.

### Creating a Dataset

Here's some example data We are going to work with:

{% highlight javascript %}
{% include data.js %}
{% endhighlight %}

In this data we have 6 documents / rows. Each document is a javascript object
containing keys and values (note that all values here are 'simple' but there is
no reason you cannot have objects as values allowing you to nest data.

We can now create a recline Dataset object (and memory backend) from this raw data: 

{% highlight javascript %}
var dataset = recline.Backend.Memory.createDataset(data);
{% endhighlight %}

Note that behind the scenes Recline will create a Memory backend for this dataset as in Recline every dataset object must have a backend from which it can push and pull data. In the case of in-memory data this is a little artificial since all the data is available locally but this makes more sense for situations where one is connecting to a remote data source (and one which may contain a lot of data).


### Setting up the Grid

Let's create a data grid view to display the dataset we have just created, binding the view to the `<div id="mygrid"></div>` we created earlier:

{% highlight javascript %}
var $el = $('#mygrid');
var grid = new recline.View.Grid({
  model: dataset
});
$el.append(grid.el);
grid.render();
{% endhighlight %}

And hey presto:

<div id="mygrid" class="recline-read-only" style="margin-bottom: 30px; margin-top: -20px;">&nbsp;</div>

<script type="text/javascript">
{% include data.js %}
var dataset = recline.Backend.Memory.createDataset(data);
var $el = $('#mygrid');
var grid = new recline.View.Grid({
  model: dataset,
});
$el.append(grid.el);
grid.render();
</script>

### Creating a Graph

Let's create a graph view to display a line graph for this dataset.

First, add the additional dependencies for this view. These are the Flot
library and the Recline Graph view:

{% highlight html %}
<link rel="stylesheet" href="css/graph.css">

<!-- javascript -->
<script type="text/javascript" src="vendor/jquery.flot/0.7/jquery.flot.js"></script>
<script type="text/javascript" src="src/view-graph.js"></script>
{% endhighlight %}

Next, create a new div for the graph:

{% highlight html %}
<div id="mygraph"></div>
{% endhighlight %}

Now let's create the graph, we will use the same dataset we had earlier:

{% highlight javascript %}
var $el = $('#mygraph');
var graph = new recline.View.Graph({
  model: dataset
});
$el.append(grid.el);
graph.render();
{% endhighlight %}

And ... we have a graph view -- with instructions on how to use the controls to
create a graph -- but no graph. Go ahead and play around with the controls to
create a graph of your choosing:

<div id="mygraph" style="margin-bottom: 30px;">&nbsp;</div>

<script type="text/javascript">
var $el = $('#mygraph');
var graph = new recline.View.Graph({
  model: dataset
});
$el.append(graph.el);
graph.render();
</script>

But suppose you wanted to create a graph not a graph editor. This is
straightforward to do -- all we need to do is set the 'state' of the graph
view:

{% highlight javascript %}
var $el = $('#mygraph');
var graph = new recline.View.Graph({
  model: dataset,
  state: {
    group: "date",
    series: ["x", "z"]
  }
});
$el.append(graph.el);
graph.redraw();
{% endhighlight %}

We would get this rendered graph:

<div id="mygraph2" style="margin-bottom: 30px;">&nbsp;</div>

<script type="text/javascript">
var $el = $('#mygraph2');
var graph = new recline.View.Graph({
  model: dataset,
  state: {
    graphType: "lines-and-points",
    group: "x",
    series: ["y", "z"]
  }
});
$el.append(graph.el);
graph.redraw();
</script>

<div class="alert alert-info">
<strong>State</strong>: The concept of a state is a common feature of Recline views being an object
which stores information about the state and configuration of a given view. You
can read more about it in the general <a href="../docs/view.html">Views
documentation</a> as well as the documentation of individual views such as the
<a href="../docs/view-graph.html">Graph View</a>.
</div>

### Creating a Map

Now, let's create a map of this dataset using the lon/lat information which is
present on these data points.

First, add the additional dependencies for the map view. These are the Leaflet
library and the Recline Map view:

{% highlight html %}
<!-- css -->
<link rel="stylesheet" href="vendor/leaflet/0.3.1/leaflet.css">
<!--[if lte IE 8]>
<link rel="stylesheet" href="vendor/leaflet/0.3.1/leaflet.ie.css" />
<![endif]-->
<link rel="stylesheet" href="css/map.css">

<!-- javascript -->
<script type="text/javascript" src="vendor/leaflet/0.3.1/leaflet.js"></script>
<script type="text/javascript" src="src/view-map.js"></script>
{% endhighlight %}

Now, create a new div for the map:

{% highlight html %}
<div id="mymap"></div>
{% endhighlight %}

Now let's create the map, we will use the existing dataset object created
previously:

{% highlight javascript %}
var $el = $('#mymap');
var map = new recline.View.Map({
  model: dataset
});
$el.append(map.el);
map.redraw();
{% endhighlight %}

<div id="mymap">&nbsp;</div>

<script type="text/javascript">
var $el = $('#mymap');
var map = new recline.View.Map({
  model: dataset
});
$el.append(map.el);
map.redraw();
</script>

