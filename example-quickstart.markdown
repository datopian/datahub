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
<link rel="stylesheet" href="vendor/bootstrap/2.0.2/css/bootstrap.css" />
<!-- CSS for relevant view components - here we just have grid -->
<link rel="stylesheet" href="css/grid.css" />{% endhighlight %}

3. Include the relevant Javascript files somewhere on the page (preferably before body close tag):
    {% highlight html %}
<!-- 3rd party dependencies -->
<script type="text/javascript" src="vendor/jquery/1.7.1/jquery.js"></script>
<script type="text/javascript" src="vendor/underscore/1.1.6/underscore.js"></script>
<script type="text/javascript" src="vendor/backbone/0.5.1/backbone.js"></script>
<script type="text/javascript" src="vendor/jquery.mustache.js"></script>
<!-- note that we could include individual components rather than whole of recline e.g.
<script type="text/javascript" src="src/model.js"></script>
<script type="text/javascript" src="src/backend/base.js"></script>
<script type="text/javascript" src="src/backend/memory.js"></script>
<script type="text/javascript" src="src/view-grid.js"></script>
-->
<script type="text/javascript" src="recline.js"></script>{% endhighlight %}

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
var dataset = recline.Backend.createDataset(data);
{% endhighlight %}

Note that behind the scenes Recline will create a Memory backend for this dataset as in Recline every dataset object must have a backend from which it can push and pull data. In the case of in-memory data this is a little artificial since all the data is available locally but this makes more sense for situations where one is connecting to a remote data source (and one which may contain a lot of data).


### Setting up the Grid

Let's create a data grid view to display the dataset we have just created, binding the view to the `<div id="mygrid"></div>` we created earlier:

{% highlight javascript %}
var grid = new recline.View.Grid({
  model: dataset,
  el: $('#mygrid')
});
grid.render();
{% endhighlight %}

And hey presto:

<div id="mygrid" class="recline-read-only" style="margin-bottom: 30px; margin-top: -20px;">&nbsp;</div>

<script type="text/javascript">
{% include data.js %}
var dataset = recline.Backend.createDataset(data);
var $el = $('#mygrid');
var grid = new recline.View.Grid({
  model: dataset,
});
$el.append(grid.el);
grid.render();
</script>

