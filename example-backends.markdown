---
layout: container
title: Library - Example - Loading data from different sources using Backends
recline-deps: true
---

<div class="page-header">
  <h1>
    Loading data from different sources using Backends
  </h1>
</div>

These set of examples will show you how you can load data from different
sources such as Google Docs or the DataHub using Recline.

<div class="alert alert-info">
<p><strong>Note</strong>: often you are loading data from a given source in
order to display it using the various Recline views. However, you can also
happily use this data with your own code and app and this is a very common
use-case.</p>
<p>Moreover, Recline is designed so you need <strong>only</strong> include the
backend and its dependencies without needing to include any of the dependencies
for the view portion of the Recline library.</p>
</div>

## Overview

Backends connect Dataset and Documents to data from a specific 'Backend' data
source. They provide methods for loading and saving Datasets and individuals
Documents as well as for bulk loading via a query API and doing bulk transforms
on the backend.

You can instantiate a backend directly e.g.

{% highlight javascript %}
var backend = recline.Backend.ElasticSearch();
{% endhighlight %}

But more usually the backend will be created or loaded for you by Recline and all you need is provide the identifier for that Backend e.g.

{% highlight javascript %}
var dataset = recline.Model.Dataset({
    ...
  },
  'backend-identifier'
);
{% endhighlight %}

<div class="alert alert-info">
<strong>Backend identifiers</strong>
How do you know the backend identifier for a given Backend? It's just the name of the 'class' in recline.Backend module (but case-insensitive). E.g. recline.Backend.ElasticSearch can be identified as 'ElasticSearch' or 'elasticsearch'.
</div>

### Included Backends

* [memory: Memory Backend (local data)](docs/backend/memory.html)
* [elasticsearch: ElasticSearch Backend](docs/backend/elasticsearch.html)
* [dataproxy: DataProxy Backend (CSV and XLS on the Web)](docs/backend/dataproxy.html)
* [gdoc: Google Docs (Spreadsheet) Backend](docs/backend/gdocs.html)
* [csv: Local CSV file backend](docs/backend/localcsv.html)

Backend not on this list that you would like to see? It's very easy to write a new backend -- see below for more details.

## Preparing your app

This is as per the [quickstart](example-quickstart.html) but the set of files is much more limited if you are just using a Backend. Specifically:

{% highlight html %}
<!-- 3rd party dependencies -->
<script type="text/javascript" src="vendor/jquery/1.7.1/jquery.js"></script>
<script type="text/javascript" src="vendor/underscore/1.1.6/underscore.js"></script>
<script type="text/javascript" src="vendor/backbone/0.5.1/backbone.js"></script>
<!-- include the backend code you need e.g. here for gdocs -->
<script type="text/javascript" src="src/backend/base.js"></script>
<script type="text/javascript" src="src/backend/memory.js"></script>
<script type="text/javascript" src="src/backend/gdocs.js"></script>

<!-- Or you can just include all of recline. -->
<script type="text/javascript" src="recline.js"></script>
{% endhighlight %}


## Loading Data from Google Docs

We will be using the [following Google
Doc](https://docs.google.com/spreadsheet/ccc?key=0Aon3JiuouxLUdGZPaUZsMjBxeGhfOWRlWm85MmV0UUE#gid=0).
For Recline to be able to access a Google Spreadsheet it **must** have been
'Published to the Web' (enabled via File -> Publish to the Web menu).

<div class="alert alert-info">
<strong>Want a real world example?</strong> This <a
href="http://okfnlabs.org/opendatacensus">Open Data Census micro-app</a> loads
data from Google Docs and then displays it on a specialist interface combining
a bespoke chooser and a Kartograph (svg-only) map.
</div>

{% highlight javascript %}
{% include example-backends-gdocs.js %}
{% endhighlight %}

### Result

<div id="my-gdocs" class="doc-ex-rendered">&nbsp;</div>

<script type="text/javascript">
{% include example-backends-gdocs.js %}
</script>


## Writing your own backend

Writing your own backend is easy to do. Details of the required API are in the
[Backend documentation](docs/backend/base.html).

