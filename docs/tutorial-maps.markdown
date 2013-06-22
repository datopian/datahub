---
layout: container
title: Maps - Customizing Maps in Recline - Tutorial
recline-deps: true
root: ../
---

<div class="page-header">
  <h1>
    Doing More with the Map View
    <br />
    <small>This tutorial goes beyond the <a href="tutorial-views.html">basic
    views tutorial</a> and shows you how to do more with maps</small>
  </h1>
</div>

### Preparing your page

See the instructions in the [basic views tutorial](tutorial-views.html).

### Creating a Dataset

Just like in the main tutorial, here's some example data We are going to work with:

{% highlight javascript %}
{% include data.js %}
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

### General Pointers

Check out the <a href="{{page.root}}/docs/src/view.map.html">Map reference
(source) docs</a>. In particular this has details of the various state options.

In addition, remember that Recline's map view is just a relatively lightweight
wrapper around Leaflet. This means that pretty much anything you can do with
Leaflet you can do with Recline's map. Specifically a `recline.View.Map`
instance has the following attributes exposed:

    map: the Leaflet map (L.Map)
    features: Leaflet GeoJSON layer (L.GeoJSON) containing all the features

(Recline converts all records in a dataset that yield geospatial info to a
GeoJSON feature and adds it to the features layer).

### Customizing the infobox

The default infobox just shows all of the dataset attributes. Usually you'll
want something a bit nicer. All you need to do is override the infobox
function. For example, in our case let's make a nicer title and only show some
data.

{% highlight javascript %}
{% include tutorial-maps-infobox.js %}
{% endhighlight %}

<div id="map-infobox">&nbsp;</div>

<script type="text/javascript">
{% include tutorial-maps-infobox.js %}
</script>

### Customizing the marker

We're going to show how to replace the default marker with a circular marker.
Even more exciting, we'll show how to have the marker size vary with an
attribute of our data. We do the customization by via over-riding the
pointToLayer function:

{% highlight javascript %}
{% include tutorial-maps-customize.js %}
{% endhighlight %}

<div id="map-customize">&nbsp;</div>

<script type="text/javascript">
{% include tutorial-maps-customize.js %}
</script>

### Customing features (which aren't points)

Leaflet treats points and features differently. To customize features that
aren't point we will need to bind to the feature layers featureparse event. As
the feature layer can get re-rendered you don't do this directly but rather set
the featureparse function on the recline view. For example, for classic popup
behaviour:

{% highlight javascript %}
view.featureparse = function (e) {
  if (e.properties && e.properties.popupContent) {
    e.layer.bindPopup(e.properties.popupContent);
  }
};
{% endhighlight %}


### Turning on clustering

You can turn on clustering of markers by setting the cluster option:

    var map = new recline.View.Map({
      model: dataset
      state: {
        cluster: true;
      }
    });

You could also enable marker clustering only if you have more than a
certain number of markers. Here's an example:

    // var map is recline.View.Map instance
    // marker cluster threshold
    var threshold = 65;
      
    // enable clustering if there is a large number of markers
    var countAfter = 0;
    map.features.eachLayer(function(){countAfter++;});
    if (countAfter > threshold) {
      // note the map will auto-redraw when you change state!
      map.state.set({cluster: true});
    }

