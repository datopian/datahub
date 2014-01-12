---
layout: container
title: Library - Example - Quickstart
recline-deps: true
root: ../
---

<div class="page-header">
  <h1>
    Views Tutorial
    <br />
    <small>This step-by-step tutorial will quickly get you started with Recline basics, including creating a dataset from local data and setting up a grid, graph and map to display it.</small>
  </h1>
</div>

### Preparing your page

Before writing any code with Recline, you need to do the following preparation steps on your page:

1. [Download ReclineJS]({{page.root}}download.html) and relevant dependencies.
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
<script type="text/javascript" src="src/backend/memory.js"></script>
<script type="text/javascript" src="src/view-grid.js"></script>
-->
<script type="text/javascript" src="dist/recline.js"></script>{% endhighlight %}

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
var dataset = new recline.Model.Dataset({
  records: data
});
{% endhighlight %}


### Setting up the Grid


Let's create a data grid view to display the dataset we have just created.  We're going to use the SlickGrid-based grid so we need the following:

{% highlight html %}
<link rel="stylesheet" href="css/slickgrid.css">

<!-- vendor -->
<script type="text/javascript" src="{{page.root}}vendor/slickgrid/2.0.1/jquery-ui-1.8.16.custom.min.js"></script>
<script type="text/javascript" src="{{page.root}}vendor/slickgrid/2.0.1/jquery.event.drag-2.0.min.js"></script>
<script type="text/javascript" src="{{page.root}}vendor/slickgrid/2.0.1/slick.grid.min.js"></script>

<!-- Recline -->
<script type="text/javascript" src="src/view.slickgrid.js"></script>
{% endhighlight %}

Now, let's create an HTML element to for the Grid:

{% highlight html %}
<div id="mygrid" style="height: 400px"></div>
{% endhighlight %}

Now let's set up the Grid:

{% highlight javascript %}
var $el = $('#mygrid');
var grid = new recline.View.SlickGrid({
  model: dataset,
  el: $el
});
grid.visible = true;
grid.render();
{% endhighlight %}

And hey presto:

<div id="mygrid" class="recline-read-only" style="margin-bottom: 30px; height: 200px;">&nbsp;</div>

<script type="text/javascript">
{% include data.js %}
var dataset = new recline.Model.Dataset({
  records: data
});
var $el = $('#mygrid');
var grid = new recline.View.SlickGrid({
  model: dataset,
  el: $el
});
grid.visible = true;
grid.render();
</script>

### Creating a Graph

Let's create a graph view to display a line graph for this dataset.

First, add the additional dependencies for this view. These are the Flot
library and the Recline Flot Graph view:

{% highlight html %}
<link rel="stylesheet" href="css/flot.css">

<!-- javascript -->
<!--[if lte IE 8]>
<script language="javascript" type="text/javascript" src="vendor/flot/excanvas.min.js"></script>
<![endif]-->
<script type="text/javascript" src="vendor/flot/jquery.flot.js"></script>
<script type="text/javascript" src="vendor/flot/jquery.flot.time.js"></script>
<script type="text/javascript" src="src/view.graph.js"></script>
{% endhighlight %}

Next, create a new div for the graph:

{% highlight html %}
<div id="mygraph"></div>
{% endhighlight %}

Now let's create the graph, we will use the same dataset we had earlier, and we will need to set the view 'state' in order to configure the graph with the column to use for the x-axis ("group") and the columns to use for the series to show ("series").

<div class="alert alert-info">
<strong>State</strong>: The concept of a state is a common feature of Recline views being an object
which stores information about the state and configuration of a given view. You
can read more about it in the general <a href="../docs/views.html">Views
documentation</a> as well as the documentation of individual views such as the
<a href="../docs/src/view.graph.html">Graph View</a>.
</div>

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
graph.render();
graph.redraw();
{% endhighlight %}

The result is the following graph:

<div id="mygraph" style="margin-bottom: 30px;">&nbsp;</div>

<script type="text/javascript">
var $el = $('#mygraph');
var graph = new recline.View.Graph({
  model: dataset,
  state: {
    graphType: "lines-and-points",
    group: "x",
    series: ["y", "z"]
  }
});
$el.append(graph.el);
graph.render();
graph.redraw();
</script>

### Creating a Map

Now, let's create a map of this dataset using the lon/lat information which is
present on these data points.

First, add the additional dependencies for the map view. These are the Leaflet
library and the Recline Map view:

{% highlight html %}
<!-- css -->
<link rel="stylesheet" href="vendor/leaflet/0.4.4/leaflet.css">
<!--[if lte IE 8]>
<link rel="stylesheet" href="vendor/leaflet/0.4.4/leaflet.ie.css" />
<![endif]-->
<link rel="stylesheet" href="vendor/leaflet.markercluster/MarkerCluster.css">
<link rel="stylesheet" href="vendor/leaflet.markercluster/MarkerCluster.Default.css">
<!--[if lte IE 8]>
<link rel="stylesheet" href="vendor/leaflet.markercluster/MarkerCluster.Default.ie.css" />
<![endif]-->
<link rel="stylesheet" href="css/map.css">

<!-- javascript -->
<script type="text/javascript" src="vendor/leaflet/0.4.4/leaflet.js"></script>
<script type="text/javascript" src="vendor/leaflet.markercluster/leaflet.markercluster.js"></script>
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
map.render();
{% endhighlight %}

<div id="mymap">&nbsp;</div>

<script type="text/javascript">
var $el = $('#mymap');
var map = new recline.View.Map({
  model: dataset
});
$el.append(map.el);
map.render();
</script>

### Creating a Timeline

Now, let's create a timeline for this dataset using the date information which is
present on these data points.

First, add the additional dependencies for the timeline view. The timeline is built on the excellent Verite Timeline widget so that library is the key one for this view:

{% highlight html %}
<!-- css -->
<link rel="stylesheet" href="vendor/timeline/css/timeline.css">

<!-- javascript -->
<script type="text/javascript" src="vendor/moment/2.0.0/moment.js"></script>
<script type="text/javascript" src="vendor/timeline/js/timeline.js"></script>
{% endhighlight %}

Now, create a new div for the map (must have an explicit height for the timeline to render):

{% highlight html %}
<style type="text/css">#mytimeline .recline-timeline { height: 400px; }</style>
<div id="mytimeline"></div>
{% endhighlight %}

Now let's create the timeline, we will use the existing dataset object created
previously:

{% highlight javascript %}
{% include tutorial-views-timeline.js %}
{% endhighlight %}

<style type="text/css">#mytimeline .recline-timeline { height: 400px; }</style>
<div id="mytimeline"></div>
<div style="clear: both;"></div>

<script type="text/javascript">
{% include tutorial-views-timeline.js %}
</script>

