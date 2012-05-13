---
layout: container
title: Library - Example - Quickstart
recline-deps: true
---

<div class="page-header">
  <h1>
    Recline Quickstart Guide
  </h1>
</div>

This step-by-step guide will quickly get you started with Recline basics, including creating a dataset from local data and setting up a data grid to display this data.

### Preparing your page

Before writing any code with Recline, you need to do the following preparation steps on your page:

1. [Download ReclineJS](download.html) and relevant dependencies.
2. Include the relevant CSS in the head section of your document:
    {% highlight html %}
<!-- you do not have to use bootstrap but we use it by default -->
<link rel="stylesheet" href="vendor/bootstrap/2.0.2/css/bootstrap.css">
<!-- CSS for relevant view components - here we just have grid -->
 <link rel="stylesheet" href="css/grid.css" />{% endhighlight %}

3. Include the relevant Javascript files somewhere on the page (preferably before body close tag):
    {% highlight html %}
<!-- you do not have to use bootstrap but we use it by default -->
<link rel="stylesheet" href="vendor/bootstrap/2.0.2/css/bootstrap.css">
<!-- 3rd party dependencies -->
<script type="text/javascript" src="vendor/jquery/1.7.1/jquery.js"></script>
<script type="text/javascript" src="vendor/underscore/1.1.6/underscore.js"></script>
<script type="text/javascript" src="vendor/backbone/0.5.1/backbone.js"></script>
<script type="text/javascript" src="vendor/jquery.mustache.js"></script>
<!-- note that we could include individual components rather than whole of recline  -->
<script type="text/javascript" src="recline.js"></script>{% endhighlight %}

4. Create a div to hold the Recline view(s):
    {% highlight html %}
    <div id="recline-grid"></div>{% endhighlight %}

You're now ready to start working with Recline.

### Creating a Dataset

We are going to be working with the following set of data:

{% highlight javascript %}
var data = [
    {id: 0, x: 1, y: 2, z: 3, country: 'UK', label: 'first'},
    {id: 1, x: 2, y: 4, z: 6, country: 'UK', label: 'second'},
    {id: 2, x: 3, y: 6, z: 9, country: 'US', label: 'third'}
  ];
{% endhighlight %}

Here we have 3 documents / rows each of which is a javascript object containing keys and values (note that all values here are 'simple' but there is no reason you cannot have full objects as values.

We can now create a recline Dataset object (and memory backend) from this raw data: 

{% highlight javascript %}
var dataset = recline.Backend.createDataset(data);
{% endhighlight %}

Note that behind the scenes Recline will create a Memory backend for this dataset as in Recline every dataset object must have a backend from which it can push and pull data. In the case of in-memory data this is a little artificial since all the data is available locally but this makes more sense for situations where one is connecting to a remote data source (and one which may contain a lot of data).


### Setting up the Grid

Let's create a data grid view to display the dataset we have just created, binding the view to the `<div id="recline-grid"></div>` we created earlier:

{% highlight javascript %}
var grid = new recline.View.Grid({
  model: dataset,
  el: $('#recline-grid')
});
grid.render();
{% endhighlight %}

And hey presto:

<div id="recline-grid" class="recline-read-only">&nbsp;</div>

<script type="text/javascript">
var data = [
    {id: 0, x: 1, y: 2, z: 3, country: 'UK', label: 'first'}
    , {id: 1, x: 2, y: 4, z: 6, country: 'UK', label: 'second'}
    , {id: 2, x: 3, y: 6, z: 9, country: 'US', label: 'third'}
  ];
var dataset = recline.Backend.createDataset(data);
var $el = $('#recline-grid');
var grid = new recline.View.Grid({
  model: dataset,
});
$el.append(grid.el);
grid.render();
</script>

