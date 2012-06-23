---
layout: container
title: Models and Backends
---

<div class="page-header">
  <h1>
    Models and Backends
  </h1>
</div>

Models help you structure your work with data by providing some standard objects. The key ones are Dataset and Record -- a Dataset being a collection of Records. Additionally, there is a a Field object for describing the columns of a Dataset, a Query object for describing queries, and a Facet object for holding summary information about a Field (or multiple Fields).

# Models

## Dataset

A Dataset is *the* central object in Recline. It has the following key attributes:

* currentRecords: a collection of `Record`s currently loaded for viewing (updated by calling query method) - note that this need <strong>not</strong> be all the records in the dataset (for example, you may have connected to a source where the complete dataset contains a million records but you have only loaded a 1000 records)
* fields: (aka columns) is a Backbone collectoin of `Field`s listing all
  the fields on this Dataset (this can be set explicitly, or, will be
  set by Dataset.fetch()
* docCount: total number of records in this dataset
* backend: the Backend (instance) for this Dataset.
* queryState: a `Query` object which stores current queryState.
  queryState may be edited by other components (e.g. a query editor
  view) changes will trigger a Dataset query.
* facets: a collection of `Facet`s

<h2 id="record">Record (aka Row)</h2>

A Record represents a single entry or row in a dataset. As Record fits very nicely with the default behaviour of a Backbone Model object it has little additional functionality.

<h2 id="field">Field (aka Column)</h2>

A Field should have the following attributes as standard:

{% highlight javascript %}
var field = new Field({
  // a unique identifer for this field- usually this should match the key in the records hash
  id: 'my-field-id'
  // (optional: defaults to id) the visible label used for this field
  label: 'My Field Name',
  // (optional: defaults to string) the type of the data in this field.
  // Should be a string as per type names defined by ElasticSearch - see
  //  Types list on <http://www.elasticsearch.org/guide/reference/mapping/>
  type: 'string',
  // (optional - defaults to null) used to indicate how the data should be formatted. See below.
  format: null,
  // (default: false) attribute indicating this field has no backend data but is just derived from other fields (see below).
  is_derived: false
{% endhighlight %}

#### Rendering, types and formats

One can customize the rendering of fields in the user interface and elsewhere by setting a renderer function on the field. You do this by setting a field attribute:

{% highlight javascript %}
myfield.renderer = myRenderFunction;
{% endhighlight %}

Your renderer function should have the following signature:
  
      function(value, field, record)

where value is the value of this cell, field is corresponding field
object and record is the record object (as simple JS object). Note that
implementing functions can ignore arguments (e.g.  function(value) would
be a valid formatter function).

To guide the behaviour of renderers we have type and format information. Example types and formats are:

  * type=date, format=yyyy-mm-dd
  * type=float, format=percentage
  * type=string, format=markdown (render as markdown if Showdown available)

Default renderers are provided - see the source for details, but a few examples are:

  * type = string
    * no format provided: pass through but convert http:// to hyperlinks 
    * format = plain: do no processing on the source text
    * format = markdown: process as markdown (if Showdown library available)
  * type = float
    * format = percentage: format as a percentage

#### Derived fields:

* deriver: a function to derive/compute the value of data
in this field as a function of this field's value (if any) and the current
record. It's signature and behaviour is the same as for renderer.  Use of
this function allows you to define an entirely new value for data in this
field. This provides support for a) 'derived/computed' fields: i.e. fields
whose data are functions of the data in other fields b) transforming the
value of this field prior to rendering.


<h2 id="query">Query</h2>

Query instances encapsulate a query to the backend (see <a
href="backend/base.html">query method on backend</a>). Useful both
for creating queries and for storing and manipulating query state -
e.g. from a query editor).

**Query Structure and format**

Query structure should follow that of [ElasticSearch query
language](http://www.elasticsearch.org/guide/reference/api/search/).

**NB: It is up to specific backends how to implement and support this query
structure. Different backends might choose to implement things differently
or not support certain features. Please check your backend for details.**

Query object has the following key attributes:

 * size (=limit): number of results to return
 * from (=offset): offset into result set - http://www.elasticsearch.org/guide/reference/api/search/from-size.html
 * sort: sort order - <http://www.elasticsearch.org/guide/reference/api/search/sort.html>
 * query: Query in ES Query DSL <http://www.elasticsearch.org/guide/reference/api/search/query.html>
 * filter: See filters and <a href="http://www.elasticsearch.org/guide/reference/query-dsl/filtered-query.html">Filtered Query</a>
 * fields: set of fields to return - http://www.elasticsearch.org/guide/reference/api/search/fields.html
 * facets: specification of facets - see http://www.elasticsearch.org/guide/reference/api/search/facets/

Additions:

 * q: either straight text or a hash will map directly onto a [query_string
 query](http://www.elasticsearch.org/guide/reference/query-dsl/query-string-query.html)
 in backend

  * Of course this can be re-interpreted by different backends. E.g. some
  may just pass this straight through e.g. for an SQL backend this could be
  the full SQL query

 * filters: array of ElasticSearch filters. These will be and-ed together for
 execution.

**Examples**

<pre>
{
   q: 'quick brown fox',
   filters: [
     { term: { 'owner': 'jones' } }
   ]
}
</pre>

<h2>Facet <small>&ndash; Store summary information (e.g. values and counts) about a field obtained by some 'faceting' or 'group by' method</small>
</h2>

Structure of a facet follows that of Facet results in ElasticSearch, see:
<http://www.elasticsearch.org/guide/reference/api/search/facets/>

Specifically the object structure of a facet looks like (there is one
addition compared to ElasticSearch: the "id" field which corresponds to the
key used to specify this facet in the facet query):

<pre>
{
  "id": "id-of-facet",
  // type of this facet (terms, range, histogram etc)
  "_type" : "terms",
  // total number of tokens in the facet
  "total": 5,
  // @property {number} number of records which have no value for the field
  "missing" : 0,
  // number of facet values not included in the returned facets
  "other": 0,
  // term object ({term: , count: ...})
  "terms" : [ {
      "term" : "foo",
      "count" : 2
    }, {
      "term" : "bar",
      "count" : 2
    }, {
      "term" : "baz",
      "count" : 1
    }
  ]
}
</pre>

# Backends

1. Data is held in an in memory store on the Dataset object.
2. Data is transparently sourced from a backend store.

