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
    <small>This step-by-step tutorial will quickly get you started with Recline basics, including creating a dataset from local data and setting up a grid, graph, map and timeline to display it.</small>
  </h1>
</div>

### Views

Views display Recline datasets in different ways. This page covers the interesting built-in views. For a full list of views including extensions outside of the Recline.js core, see the [list of currently available views]({{page.root}}docs/views.html#dataset-views-currently-available).

### Preparing your page

Before writing any code with Recline, you need to do the following preparation steps on your page:

* [Download ReclineJS]({{page.root}}download.html) and relevant dependencies.
* Include the relevant CSS in the head section of your document (for view-specific CSS files, see below):
    {% highlight html %}
<!-- you do not have to use bootstrap but we use it by default -->
<link rel="stylesheet" href="vendor/bootstrap/3.2.0/css/bootstrap.css" />
{% endhighlight %}

* Include the relevant Javascript files somewhere on the page (preferably before body close tag; for view-specific Javascript dependencies, see below):
    {% highlight html %}<!-- 3rd party dependencies -->
<script type="text/javascript" src="vendor/jquery/1.7.1/jquery.js"></script>
<script type="text/javascript" src="vendor/underscore/1.4.4/underscore.js"></script>
<script type="text/javascript" src="vendor/backbone/1.0.0/backbone.js"></script>
<script type="text/javascript" src="vendor/mustache/0.5.0-dev/mustache.js"></script>
<script type="text/javascript" src="vendor/bootstrap/3.2.0/js/bootstrap.js"></script>

<!-- note that we could include individual components rather than whole of recline e.g.
<script type="text/javascript" src="src/model.js"></script>
<script type="text/javascript" src="src/backend.memory.js"></script>
<script type="text/javascript" src="src/view-grid.js"></script>
-->

<script type="text/javascript" src="dist/recline.js"></script>{% endhighlight %}

You're now ready to start working with Recline.

### Creating a Dataset

Here's some example data we are going to work with:

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

//Depending on the view, it may be important to set the date type
dataset.fields.models[1].attributes.type = 'date';
{% endhighlight %}

### Setting up the Grid

<div class="alert alert-info">
The source code along with all dependencies for the grid part of the tutorial can be found at <a href="https://github.com/mattfullerton/recline-view-slickgrid-demo">this GitHub repository</a>. See it in action via <a href="http://mattfullerton.github.io/recline-view-slickgrid-demo/">GitHub Pages</a>.
Although it's not demonstrated here, you can also use the simpler Grid view without SlickGrid. Source code along with all dependencies for that can be found at <a href="https://github.com/mattfullerton/recline-view-grid-demo">this GitHub repository</a>. Demo on <a href="http://mattfullerton.github.io/recline-view-grid-demo/">GitHub Pages</a>.
</div>

Let's create a data grid view to display the dataset we have just created.  We're going to use the SlickGrid-based grid so we need the following CSS and JS dependencies in addition to those above:

{% highlight html %}
<link rel="stylesheet" href="css/grid.css" />
<link rel="stylesheet" href="css/slickgrid.css">
<link rel="stylesheet" href="vendor/slickgrid/2.2/slick.grid.css">

<!-- vendor -->
<script type="text/javascript" src="vendor/slickgrid/2.2/jquery-ui-1.8.16.custom.min.js"></script>
<script type="text/javascript" src="vendor/slickgrid/2.2/jquery.event.drag-2.2.js"></script>
<script type="text/javascript" src="vendor/slickgrid/2.2/slick.core.js"></script>
<script type="text/javascript" src="vendor/slickgrid/2.2/slick.grid.js"></script>
<script type="text/javascript" src="vendor/slickgrid/2.2/slick.formatters.js"></script>
<script type="text/javascript" src="vendor/slickgrid/2.2/slick.editors.js"></script>
<script type="text/javascript" src="vendor/slickgrid/2.2/plugins/slick.rowselectionmodel.js"></script>
<script type="text/javascript" src="vendor/slickgrid/2.2/plugins/slick.rowmovemanager.js"></script>

<!-- Recline (only needed when NOT including the combined JS file as shown above) -->
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

<div class="alert alert-info">
The source code along with all dependencies for the graph part of the tutorial can be found at <a href="https://github.com/mattfullerton/recline-view-graph-demo">this GitHub repository</a>. See it in action via <a href="http://mattfullerton.github.io/recline-view-graph-demo/">GitHub Pages</a>.
</div>

Let's create a graph view to display a line graph for this dataset.

First, add the additional dependencies for this view. These are the Flot
library and the Recline Flot Graph view:

{% highlight html %}
<link rel="stylesheet" href="css/flot.css">

<!-- javascript -->
<!--[if lte IE 8]>
<script language="javascript" type="text/javascript" src="vendor/flot/excanvas.min.js"></script>
<![endif]-->
<!-- you only need moment when you have datetime data -->
<script type="text/javascript" src="vendor/moment/2.0.0/moment.js"></script>

<script type="text/javascript" src="vendor/flot/jquery.flot.js"></script>
<script type="text/javascript" src="vendor/flot/jquery.flot.time.js"></script>

<!-- Recline (only needed when NOT including the combined JS file as shown above) -->
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
    graphType: "lines-and-points",
    group: "date",
    series: ["y", "z"]
  }
});
$el.append(graph.el);
graph.render();
graph.redraw();
{% endhighlight %}

For the axis date formatting to work, it is crucial that the date type is set for that field as shown in the code concerning the dataset above. The result is the following graph:

<div id="mygraph" style="margin-bottom: 30px;">&nbsp;</div>

<script type="text/javascript">
dataset.fields.models[1].attributes.type = 'date';
var $el = $('#mygraph');
var graph = new recline.View.Graph({
  model: dataset,
  state: {
    graphType: "lines-and-points",
    group: "date",
    series: ["y", "z"]
  }
});
$el.append(graph.el);
graph.render();
graph.redraw();
</script>

### Creating a Map

<div class="alert alert-info">
The source code along with all dependencies for the map part of the tutorial can be found at <a href="https://github.com/mattfullerton/recline-view-map-demo">this GitHub repository</a>. See it in action via <a href="http://mattfullerton.github.io/recline-view-map-demo/">GitHub Pages</a>.
</div>

Now, let's create a map of this dataset using the lon/lat information which is
present on these data points.

First, add the additional dependencies for the map view. These are the Leaflet
library and the Recline Map view:

{% highlight html %}
<!-- css -->
<link rel="stylesheet" href="vendor/leaflet/0.7.3/leaflet.css">
<!--[if lte IE 8]>
<link rel="stylesheet" href="vendor/leaflet/0.7.3/leaflet.ie.css" />
<![endif]-->
<link rel="stylesheet" href="vendor/leaflet.markercluster/MarkerCluster.css">
<link rel="stylesheet" href="vendor/leaflet.markercluster/MarkerCluster.Default.css">
<link rel="stylesheet" href="css/map.css">

<!-- javascript -->
<script type="text/javascript" src="vendor/leaflet/0.7.3/leaflet.js"></script>
<script type="text/javascript" src="vendor/leaflet.markercluster/leaflet.markercluster.js"></script>

<!-- Recline (only needed when NOT including the combined JS file as shown above) -->
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

<div class="alert alert-info">
The source code along with all dependencies for the timeline part of the tutorial can be found at <a href="https://github.com/mattfullerton/recline-view-timeline-demo">this GitHub repository</a>. See it in action via <a href="http://mattfullerton.github.io/recline-view-timeline-demo/">GitHub Pages</a>.
</div>

Now, let's create a timeline for this dataset using the date information which is
present on these data points.

First, add the additional dependencies for the timeline view. The timeline is built on the excellent Verite Timeline widget so that library is the key one for this view:

{% highlight html %}
<!-- css -->
<link rel="stylesheet" href="vendor/timeline/css/timeline.css">
<link rel="stylesheet" href="css/map.css">

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

