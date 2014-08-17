---
layout: container
title: Backends
root: ../
---

<div class="page-header">
  <h1>
    Backends
    <small>Connect to data sources</small>
  </h1>
</div>

Backends connect Dataset and Documents to data from a specific 'Backend' data
source. They provide methods for loading and saving Datasets and individuals
Documents as well as for bulk loading via a query API and doing bulk transforms
on the backend.

<div class="alert alert-info">Looking for quickstart tutorial rather than reference documentation? See the <a href="tutorial-backends.html">Backends Tutorial</a>.</div>

Backends come in 2 flavours:

* Loader backends - only implement fetch method. The data is then cached in a
  Memory.Store on the Dataset and interacted with there. This is best for
  sources which just allow you to load data or where you want to load the data
  once and work with it locally.
* Store backends - these support fetch, query and, if write-enabled, save.
  These are suitable where the backend contains a lot of data (infeasible to
  load locally - for examples a million rows) or where the backend has
  capabilities you want to take advantage of.

Examples of the 2 types of backends are provided by the Google docs backend (a
"Loader" backend) and the ElasticSearch backend (a Store backend).

# Available Backends

You can find a list of the available Backends along with examples of how to use
them in the [Backends Tutorial](tutorial-backends.html).

Note that it's easy to write your own backend - you just need to implement the
Recline Backend API described below.

# Backend API

Backend modules must implement the following API:

{% highlight javascript %}
__type__: 'name-of-backend' // e.g. elasticsearch

// Initial load of dataset including initial set of records
fetch: function(dataset)

// Query the backend for records returning them in bulk.
// This method will be used by the Dataset.query method to search the backend
// for records, retrieving the results in bulk.
query: function(queryObj, dataset)

// Save changes to the backend
save: function(changes, dataset)
{% endhighlight %}

Details of each function below. Note that:

* Each backend function takes a dataset object. This is not a Dataset object
  but is simple JS object representation resulting from calling
  Dataset.toJSON().

  It is required because the Dataset attributes contain details of specific
  backend (e.g. url for ElasticSearch etc).

* Each function returns a promise API object - that is something conforming to
  the jquery promise API and, in particular, having a done and fail function.

### fetch: function(dataset)

On success, promise callback must return an object with the following structure:

{% highlight javascript %}
{
  // (optional) Set of record data
  // Either an array of arrays *or* an array of objects corresponding to initial set of records for this object
  // May not provided if data only returned by query
  records: [...]

  // (optional) Set of field data
  // Either an array of string or an array of objects corresponding to Field specification (see `Field` above)
  fields: { ... } // as per recline.Model.Field

  // (optional) metadata fields to set on the Dataset object
  metadata: { title: ..., id: ... etc }

  // boolean indicating whether to use a local memory store for managing this dataset
  useMemoryStore:
}
{% endhighlight %}

### query: function(queryObj, dataset)

`queryObj`: JS object following <a href="models.html#query-structure">Query specification</a> above.

#### Callbacks

On success must return a 'QueryResult' object which has the following structure:

{% highlight javascript %}
{
  // total number of results (can be null)
  total: ...

  // one entry for each result record
  hits: [
    {
      // JS object that can be used to initialize a Record object
    } 
  ],

  // (optional) 
  facets: {
    // facet results (as per <http://www.elasticsearch.org/guide/reference/api/search/facets/>)
  }
}
{% endhighlight %}

The QueryResult is partially modelled on ElasticSearch - see <a
href="https://github.com/okfn/recline/issues/57">this issue for more
details</a>.

### save: function(changes, dataset)

<div class="alert alert-warning">The save function is still being revised and
its API and arguments are subject to change</div>

`changes`: an object with the following structure:

{% highlight javascript %}
{
  creates: [ record.toJSON(), record.toJSON(), ... ]
  updates: [ ... ]
  deletes: [ ... ]
}
{% endhighlight %}

Each key has an array of records (as simple JS objects resulting from a call to
Record.toJSON()) that are in that state.

The backend should take appropriate actions for each case.


