---
layout: container
title: Library - Multiview Tutorial
recline-deps: true
root: ../
---

<div class="page-header">
  <h1>
    Multiview Tutorial
    <br />
    <small>This tutorial will quickly get you started with Recline Multiview</small>
  </h1>
</div>

<div class="alert alert-info">
The <strong>full</strong> source code along with all dependencies for the tutorial can be found at <a href="https://github.com/mattfullerton/recline-view-multiview-demo">this GitHub repository</a>. Do not try to assemble a working example from the code snippets in this page! See it in action via <a href="http://mattfullerton.github.io/recline-view-multiview-demo/">GitHub Pages</a>.
 The code is almost identical to that used for the <a href="../demos/multiview/">site demo</a>, with the advantage of the code being separated out of the main recline website. You can also see Multiview in action in many <a href="http://www.ckan.org">CKAN</a>-based data catalogs (resource views) and in the <a href="http://explorer.okfnlabs.org">OKFN Labs DataDeck</a></div>

### Multiview

Multiview, as its name suggests, combines multiple [Recline views](views.html) into one visualization. The different views are synced to one dataset. The [technical documentation for Multiview](src/view.multiview.html) details the nuts and bolts.

When building a Multiview from scratch, it is advised to start by getting each individual view to work satisfactorily before combining into a Multiview, to aid debugging.

### Preparing your page

Before writing any code with Recline, you need to do the following preparation steps on your page:

* [Download ReclineJS]({{page.root}}download.html) (downloading the master, developer code is recommended as this example is based on that and all dependencies should be available) or the <a href="https://github.com/mattfullerton/recline-view-multiview-demo/archive/gh-pages.zip">all-in-one demo code</a>.
* Include the Multiview CSS as well as the CSS for each view in the head section of your document, as well as any 3rd party CSS for each view e.g.:
    {% highlight html %}
<!-- you do not have to use bootstrap but we use it by default -->
<link rel="stylesheet" href="vendor/bootstrap/3.2.0/css/bootstrap.css">
<!-- vendor css -->
<link href="vendor/leaflet/0.7.3/leaflet.css" rel="stylesheet">
<link href="vendor/leaflet.markercluster/MarkerCluster.css" rel="stylesheet">
<link href="vendor/leaflet.markercluster/MarkerCluster.Default.css" rel=
  "stylesheet">
<link rel="stylesheet" href="vendor/slickgrid/2.2/slick.grid.css">

<!-- recline css -->
<link href="css/map.css" rel="stylesheet">

<link href="css/multiview.css" rel="stylesheet">
<link href="css/slickgrid.css"rel="stylesheet">
<link href="css/flot.css" rel="stylesheet">
    {% endhighlight %}

* Include the relevant Javascript files somewhere on the page (preferably before body close tag). You will need to include any necessary Javascript dependencies for each view as well, e.g.:
    {% highlight html %}
<!-- Vendor JS - general dependencies -->
<script src="vendor/jquery/1.7.1/jquery.js" type="text/javascript"></script>
<script src="vendor/underscore/1.4.4/underscore.js" type="text/javascript"></script>
<script src="vendor/backbone/1.0.0/backbone.js" type="text/javascript"></script>
<script src="vendor/mustache/0.5.0-dev/mustache.js" type="text/javascript"></script>
<script src="vendor/bootstrap/3.2.0/js/bootstrap.js" type="text/javascript"></script>

<!-- Vendor JS - view dependencies -->
<script src="vendor/leaflet/0.4.4/leaflet.js" type="text/javascript"></script>
<script src="vendor/leaflet.markercluster/leaflet.markercluster.js" type="text/javascript"></script>
<script type="text/javascript" src="vendor/flot/jquery.flot.js"></script>
<script type="text/javascript" src="vendor/flot/jquery.flot.time.js"></script>
<script type="text/javascript" src="vendor/moment/2.0.0/moment.js"></script>
<script type="text/javascript" src="vendor/slickgrid/2.2/jquery-ui-1.8.16.custom.min.js"></script>
<script src="vendor/slickgrid/2.2/jquery.event.drag-2.2.js"></script>
<script src="vendor/slickgrid/2.2/jquery.event.drop-2.2.js"></script>
<script type="text/javascript" src="vendor/slickgrid/2.2/slick.core.js"></script>
<script type="text/javascript" src="vendor/slickgrid/2.2/slick.formatters.js"></script>
<script type="text/javascript" src="vendor/slickgrid/2.2/slick.editors.js"></script>
<script type="text/javascript" src="vendor/slickgrid/2.2/slick.grid.js"></script>
<script type="text/javascript" src="vendor/slickgrid/2.2/plugins/slick.rowselectionmodel.js"></script>
<script type="text/javascript" src="vendor/slickgrid/2.2/plugins/slick.rowmovemanager.js"></script>

<!-- Recline JS (combined distribution, all views) -->
<script src="dist/recline.js" type="text/javascript"></script>
    {% endhighlight %}

### Creating a Dataset

Here's the function to create an example dataset we are going to work with:

{% highlight javascript %}
function createDemoDataset() {
  var dataset = new recline.Model.Dataset({
    records: [
      {id: 0, date: '2011-01-01', x: 1, y: 2, z: 3, country: 'DE', sometext: 'first', lat:52.56, lon:13.40},
      {id: 1, date: '2011-02-02', x: 2, y: 4, z: 24, country: 'UK', sometext: 'second', lat:54.97, lon:-1.60},
      {id: 2, date: '2011-03-03', x: 3, y: 6, z: 9, country: 'US', sometext: 'third', lat:40.00, lon:-75.5},
      {id: 3, date: '2011-04-04', x: 4, y: 8, z: 6, country: 'UK', sometext: 'fourth', lat:57.27, lon:-6.20},
      {id: 4, date: '2011-05-04', x: 5, y: 10, z: 15, country: 'UK', sometext: 'fifth', lat:51.58, lon:0},
      {id: 5, date: '2011-06-02', x: 6, y: 12, z: 18, country: 'DE', sometext: 'sixth', lat:51.04, lon:7.9}
    ],
    // let's be really explicit about fields
    // Plus take opportunity to set date to be a date field and set some labels
    fields: [
      {id: 'id'},
      {id: 'date', type: 'date'},
      {id: 'x', type: 'number'},
      {id: 'y', type: 'number'},
      {id: 'z', type: 'number'},
      {id: 'country', 'label': 'Country'},
      {id: 'sometext', 'label': 'Some text'},
      {id: 'lat'},
      {id: 'lon'}
    ]
  });
  return dataset;
}
{% endhighlight %}

In this data we have 6 documents / rows. Each document is a javascript object
containing keys and values (note that all values here are 'simple' but there is
no reason you cannot have objects as values allowing you to nest data.

### Setting up the Multiview

To create a Multiview, we first create each view that we want to include, and include these in an array. A function to do everything for SlickGrid, Graph and Map views is shown below:

{% highlight javascript %}
var createMultiView = function(dataset, state) {
  // remove existing multiview if present
  var reload = false;
  if (window.multiView) {
    window.multiView.remove();
    window.multiView = null;
    reload = true;
  }

  var $el = $('<div />');
  $el.appendTo(window.explorerDiv);

  // customize the subviews for the MultiView
  var views = [
    {
      id: 'grid',
      label: 'Grid',
      view: new recline.View.SlickGrid({
        model: dataset,
        state: {
          gridOptions: {
            editable: true,
            // Enable support for row add
            enabledAddRow: true,
            // Enable support for row delete
            enabledDelRow: true,
            // Enable support for row ReOrder 
            enableReOrderRow:true,
            autoEdit: false,
            enableCellNavigation: true
          },
          columnsEditor: [
            { column: 'date', editor: Slick.Editors.Date },
            { column: 'sometext', editor: Slick.Editors.Text }
          ]
        }
      })
    },
    {
      id: 'graph',
      label: 'Graph',
      view: new recline.View.Graph({
        model: dataset

      })
    },
    {
      id: 'map',
      label: 'Map',
      view: new recline.View.Map({
        model: dataset
      })
    }
  ];

  var multiView = new recline.View.MultiView({
    model: dataset,
    el: $el,
    state: state,
    views: views
  });
  return multiView;
}
{% endhighlight %}

To tie it all together:
{% highlight javascript %}
jQuery(function($) {
  window.multiView = null;
  window.explorerDiv = $('.data-explorer-here');

  // create the demo dataset
  var dataset = createDemoDataset();
  // now create the multiview
  // this is rather more elaborate than the minimum as we configure the
  // MultiView in various ways (see function below)
  window.multiview = createMultiView(dataset);

  // last, we'll demonstrate binding to changes in the dataset
  // this will print out a summary of each change onto the page in the
  // changelog section
  dataset.records.bind('all', function(name, obj) {
    var $info = $('<div />');
    $info.html(name + ': ' + JSON.stringify(obj.toJSON()));
    $('.changelog').append($info);
    $('.changelog').show();
  });
});
{% endhighlight %}

The HTML is very simple:
{% highlight html %}
<div class="container">
  <style type="text/css">
    .recline-slickgrid {
      height: 300px;
    }

    .changelog {
      display: none;
      border-bottom: 1px solid #ccc;
      margin-bottom: 10px;
    }
  </style>

  <div class="changelog">
    <h3>Changes</h3>
  </div>

  <div class="data-explorer-here"></div>
  <div style="clear: both;"></div>
</div>
{% endhighlight %}
