---
layout: container
title: Loading data from different sources using Backends - Tutorial
recline-deps: true
root: ../
---

<div class="page-header">
  <h1>
    Loading data from different sources using Backends
    <br />
    <small>These set of examples will show you how you can load data from different
sources such as Google Docs or the DataHub using Recline</small>
  </h1>
</div>


<div class="alert alert-info">
<p><strong>Note</strong>: often you are loading data from a given source in
order to load it into a Recline Dataset and display it in a View. However, you
can also happily use a Backend to load data on its own without using any other
part of the Recline library as all the Backends are designed to have no
dependency on other parts of Recline.</p>
</div>

## Overview

Backends connect Dataset and Documents to data from a specific 'Backend' data
source. They provide methods for loading and saving Datasets and individuals
Documents as well as for bulk loading via a query API and doing bulk transforms
on the backend.

Backends come in 2 flavours:

1. Loader backends - only implement fetch method. The data is then cached in a Memory.Store on the Dataset and interacted with there. This is best for sources which just allow you to load data or where you want to load the data once and work with it locally.
2. Store backends - these support fetch, query and, if write-enabled, save. These are suitable where the backend contains a lot of data (infeasible to load locally - for examples a million rows) or where the backend has capabilities you want to take advantage of.

### Instantiation and Use

You can use a backend directly e.g.

{% highlight javascript %}
var backend = recline.Backend.ElasticSearch.fetch({url: ...});
{% endhighlight %}

But more usually the backend will be created or loaded for you by Recline and
all you need is provide the identifier for that Backend e.g.

{% highlight javascript %}
var dataset = recline.Model.Dataset({
  backend: 'backend-identifier'
});
{% endhighlight %}

<div class="alert alert-info">
<p><strong>Backend identifiers</strong>
How do you know the backend identifier for a given Backend? It's just the name
of the 'class' in recline.Backend module (but case-insensitive). E.g.
recline.Backend.ElasticSearch can be identified as 'ElasticSearch' or
'elasticsearch'.</p>
<p><strong>What Backends are available from Recline?</strong>
{% include backend-list.html %}
</p>
<p><strong>Backend you'd like to see not available?</strong> It's easy to write your own &ndash; see the <a href="backends.html">Backend reference docs</a> for details of the required API.
</p>
</div>


## Preparing your app

This is as per the [quickstart](tutorial-views.html) but the set of files is
much more limited if you are just using a Backend. Specifically:

{% highlight html %}
<!-- 3rd party dependencies -->
<script type="text/javascript" src="vendor/jquery/1.7.1/jquery.js"></script>
<script type="text/javascript" src="vendor/underscore/1.1.6/underscore.js"></script>
<script type="text/javascript" src="vendor/backbone/0.5.1/backbone.js"></script>
<!-- include the backend code you need e.g. here for csv -->
<script type="text/javascript" src="src/backend.csv.js"></script>

<!-- Or you can just include all of recline. -->
<script type="text/javascript" src="dist/recline.js"></script>
{% endhighlight %}


## Loading Data from Google Docs

We will be using the [following Google
Doc](https://docs.google.com/spreadsheet/ccc?key=0Aon3JiuouxLUdGZPaUZsMjBxeGhfOWRlWm85MmV0UUE#gid=0).
For Recline to be able to access a Google Spreadsheet it **must** have been
'Published to the Web' (enabled via File -> Publish to the Web menu).

<div class="alert alert-info">
<strong>Want a real world example?</strong> This <a
href="http://dashboard.opengovernmentdata.org/census/">Open Data Census micro-app</a> loads
data from Google Docs and then displays it on a specialist interface combining
a bespoke chooser and a Kartograph (svg-only) map.
</div>

{% highlight javascript %}
// include the Recline backend for Google Docs
<script type="text/javascript" src="http://okfnlabs.org/recline.backend.gdocs/backend.gdocs.js"></script>
{% include example-backends-gdocs.js %}
{% endhighlight %}

### Result

<div id="my-gdocs" class="doc-ex-rendered">&nbsp;</div>

<script type="text/javascript" src="http://okfnlabs.org/recline.backend.gdocs/backend.gdocs.js">&nbsp;</script>

<script type="text/javascript">
{% include example-backends-gdocs.js %}
</script>


## Loading Data from ElasticSearch

Recline supports ElasticSearch as a full read/write/query backend via the
[ElasticSearch.js library][esjs]. See the library for examples.

[esjs]: https://github.com/okfn/elasticsearch.js


## Loading data from CSV files

For loading data from CSV files there are 3 cases:

1. CSV is online but on same domain or supporting CORS (S3 and Google Storage support CORS!) -- we can then load using AJAX (as no problems with same origin policy)
2. CSV is on local disk -- if your browser supports HTML5 File API we can load the CSV file off disk
3. CSV is online but not on same domain -- use DataProxy (see below)

### Local online CSV file

Let's start with first case: loading a "local" online CSV file. We'll be using this [example file]({{page.root}}/demos/data/sample.csv).

{% highlight javascript %}
{% include example-backends-online-csv.js %}
{% endhighlight %}

#### Result

<div id="my-online-csv" class="doc-ex-rendered">&nbsp;</div>

<script type="text/javascript">
{% include example-backends-online-csv.js %}
</script>

### CSV file on disk

This requires your browser to support the HTML5 file API. Suppose we have a file input like:

<input type="file" class="my-file-input" />

Then we can load the file into a Recline Dataset as follows:

{% highlight javascript %}
{% include example-backends-csv-disk.js %}
{% endhighlight %}

#### Try it out!

Try it out by clicking on the file input above, selecting a CSV file and seeing what happens.

<div id="my-csv-disk" class="doc-ex-rendered">&nbsp;</div>

<script type="text/javascript">
{% include example-backends-csv-disk.js %}
</script>


## Loading data from CSV and Excel files online using DataProxy

The [DataProxy](http://github.com/okfn/dataproxy) is a web-service run by the Open Knowledge Foundation that converts CSV and Excel files to JSON. It has a convenient JSON-p-able API which means we can use it to load data from online CSV and Excel into Recline Datasets.

Recline ships with a simple DataProxy "backend" that takes care of fetching data from the DataProxy source.

The main limitation of the DataProxy is that it can only handle Excel files up to a certain size (5mb) and that as we must use JSONP to access it error information can be limited.

{% highlight javascript %}
{% include example-backends-dataproxy.js %}
{% endhighlight %}

### Result

<div id="my-dataproxy" class="doc-ex-rendered">&nbsp;</div>

<script type="text/javascript">
{% include example-backends-dataproxy.js %}
</script>

### Customizing the timeout

As we must use JSONP in this backend we have the problem that if DataProxy errors (e.g. 500) this won't be picked up. To deal with this and prevent the case where the request never finishes We have a timeout on the request after which the Backend sends back an error stating that request timed out.

You can customize the length of this timeout by setting the following constant:

{% highlight javascript %}
// Customize the timeout (in milliseconds) - default is 5000
recline.Backend.DataProxy.timeout = 10000;
{% endhighlight %}

