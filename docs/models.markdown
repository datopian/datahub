---
layout: container
title: Models
root: ../
---

<div class="page-header">
  <h1>
    Models
  </h1>
</div>

Models help you structure your work with data by providing several objects and
functions. The key ones are Dataset and Record -- a Dataset being a collection
of Records. Additionally, there is a a Field object for describing the columns
of a Dataset, a Query object for describing queries, and a Facet object for
holding summary information about a Field (or multiple Fields).

All the models are Backbone models, that is they extend Backbone.Model. Note,
however, that they do not 'sync' (load/save) like normal Backbone models.


<h2 id="dataset">Dataset</h2>

A Dataset is *the* central object in Recline. Standard usage is:

{% highlight javascript %}
var dataset = new recline.model.Dataset({
  // general metadata e.g. 
  id: ...
  title: ...
  // information about data source e.g.
  url: http://url.to.my.data.endpoint/
  // backend string or object
  backend: a string identifying the backend we are using - see below
});

// initialize dataset with data from the backend.
dataset.fetch();

// we will now have the following (and more) set up - see below for details 
dataset.fields // collection of Fields (columns) for this Dataset
dataset.records // collection of Records resulting from latest query
dataset.docCount // total number of Records in the last query
{% endhighlight %}

### Key Attributes

* records: a collection of `Record`s currently loaded for viewing
  (updated by calling query method) - note that this need <strong>not</strong>
  be all the records in the dataset (for example, you may have connected to a
  source where the complete dataset contains a million records but you have
  only loaded a 1000 records)
* fields: (aka columns) is a Backbone collectoin of `Field`s listing all the
  fields on this Dataset (this can be set explicitly, or, will be set by
  Dataset.fetch()
* docCount: total number of records in this dataset
* backend: the Backend (instance) for this Dataset. (NB: this is a the backend
  attribute on the object itself not the backend in the Backbone attributes
  i.e. the result of dataset.get('backend'). The latter is a string identifying
  the backend.
* queryState: a `Query` object which stores current queryState.  queryState may
  be edited by other components (e.g. a query editor view) changes will trigger
  a Dataset query.
* facets: a collection of `Facet`s

### Querying

{% highlight javascript %}
dataset.query(queryObj)
{% endhighlight %}

`queryObj` is an object following the <a href="#query-structure">query
specification below</a>.


<h2 id="record">Record (aka Row)</h2>

A Record is a single entry or row in a dataset. A Record needs little more than
what is provided by the standard Backbone Model object. In general, you will
never create a Record directly -- they will get created for you by Datasets
from query results.

<h2 id="field">Field (aka Column)</h2>

A Field should have the following attributes as standard:

{% highlight javascript %}
var field = new Field({
  // a unique identifer for this field- usually this should match the key in the records hash
  id: 'my-field-id'

  // (optional: defaults to id) the visible label used for this field
  label: 'My Field Name',

  // (optional: defaults to string) the type of the data in this field.
  // For list of type names see below
  type: 'string',

  // (optional - defaults to null) used to indicate how the data should be
  // formatted. See below.
  format: null,

  // (default: false) attribute indicating this field has no backend data but
  // is just derived from other fields (see below).
  is_derived: false
{% endhighlight %}

#### Types

The type attribute is a string indicating the type of this field.

Types are
based on the [type set of json-schmea][types-1] with a few minor additions and
modifications (cf other type lists include those in [Elasticsearch](es-types)).

The type list is as follows (brackets indicate
possible aliases for specific types - these types will be recognized and
normalized to the default type name for that type):

* **string (text)**: a string
* **number (double, float, numeric)**: a number including floating point numbers.
* **integer (int)**: an integer.
* **date**: a date. The preferred format is YYYY-MM-DD.
* **time**: a time without a date
* **date-time (datetime, timestamp)**: a date-time. It is recommended this be in ISO 8601
  format of YYYY-MM- DDThh:mm:ssZ in UTC time.
* **boolean (bool)**
* **binary**: base64 representation of binary data.
* **geo_point**: as per
  <http://www.elasticsearch.org/guide/reference/mapping/geo-point-type.html>.
  That is a field (in these examples named location) that has one of the
  following structures:

      location: {
        lon: ...
        lat: ...
      }
      
      location: [lon,lat]
      
      location: "lat, lng"

  As bonus there is also support for (beyond the ES style geo_point):

      // geonames style
      location: {
        lng: ...
        lat: ...
      }
      // found on the web
      location: "(lat, lon)"

* **geojson**: as per <http://geojson.org/>
* **array**: an array
* **object (json)**: an object
* **any**: value of field may be any type

<div class="alert">NB: types are not validated so you can set the type to
whatever value you like (it does not have to be in the above list). However,
using types outside of the specified list may limit functionality.</div> 

[types-1]: http://tools.ietf.org/html/draft-zyp-json-schema-03#section-5.1
[es-types]: http://www.elasticsearch.org/guide/reference/mapping/

#### Rendering, types and formats

One can customize the rendering of fields in the user interface and elsewhere
by setting a renderer function on the field. You do this by setting a field
attribute:

{% highlight javascript %}
myfield.renderer = myRenderFunction;
{% endhighlight %}

Your renderer function should have the following signature:
  
    function(value, field, record)

Where the arguments passed in are as follows:

* `value`: the value of the cell (record value for this field)
* `field`: corresponding `Field` object
* `record`: is the `Record` object (as simple JS object)

Note that implementing functions can ignore arguments (e.g.  function(value)
would be a valid formatter function).

To guide the behaviour of renderers we have type and format information.
Example types and formats are:

* type=date, format=yyyy-mm-dd
* type=float, format=percentage
* type=string, format=markdown (render as markdown if Showdown available)

Default renderers are provided - see the source for details, but a few examples
are:

* type = string
  * no format provided: pass through but convert http:// to hyperlinks 
  * format = plain: do no processing on the source text
  * format = markdown: process as markdown (if Showdown library available)
* type = float

  * format = percentage: format as a percentage

#### Derived fields

Some fields may be 'dervied' from other fields. This allows you to define an
entirely new value for data in this field. This provides support for a)
'derived/computed' fields: i.e. fields whose data are functions of the data in
other fields b) transforming the value of this field prior to rendering.

To use derived fields set a `deriver` function on the Field. This function will
be used to derive/compute the value of data in this field as a function of this
field's value (if any) and the current record. It's signature and behaviour is
the same as for renderer.
 

<h2 id="query">Query</h2>

Query instances encapsulate a query to the backend (see <a
href="backend/base.html">query method on backend</a>). Useful both
for creating queries and for storing and manipulating query state -
e.g. from a query editor).


<h3 id="query-structure">Query Structure and format</h3>

Query structure should follow that of [ElasticSearch query
language](http://www.elasticsearch.org/guide/reference/api/search/).

**NB: It is up to specific backends how to implement and support this query
structure. Different backends might choose to implement things differently
or not support certain features. Please check your backend for details.**

Query object has the following key attributes:

 * size (=limit): number of results to return
 * from (=offset): offset into result set - http://www.elasticsearch.org/guide/reference/api/search/from-size.html
 * sort: sort order - see below
 * query: Query in ES Query DSL <http://www.elasticsearch.org/guide/reference/api/search/query.html>
 * filter: See filters and <a href="http://www.elasticsearch.org/guide/reference/query-dsl/filtered-query.html">Filtered Query</a>
 * fields: set of fields to return - http://www.elasticsearch.org/guide/reference/api/search/fields.html
 * facets: specification of facets - see http://www.elasticsearch.org/guide/reference/api/search/facets/

Additions:

* q: either straight text or a hash will map directly onto a [query_string
 query](http://www.elasticsearch.org/guide/reference/query-dsl/query-string-query.html)
 in backend

  * Of course this can be re-interpreted by different backends. E.g. some may
    just pass this straight through e.g. for an SQL backend this could be the
    full SQL query

* filters: array of ElasticSearch filters. These will be and-ed together for
  execution.

#### Sort

Sort structure is inspired by <http://www.elasticsearch.org/guide/reference/api/search/sort.html> but with some standardization.

Sort structure must be as follows:

    "sort" : [
          { field: "post_date",  "order" : "desc"},
          { field: "user" },
          { "name" : "desc" },
          { "age" : "desc" },
          {"_score": null}
      ]

If order is omitted it is assumed to be "desc" except in the case of _score.
_score is a special case which is used for match score if that is supported by
the backend.

#### Examples

<pre>
{
   q: 'quick brown fox',
   filters: [
     { term: { 'owner': 'jones' } }
   ]
}
</pre>


<h2>Facet <small>&ndash; Summary information (e.g. values and counts) about a field obtained by a 'faceting' or 'group by' method</small>
</h2>

Structure of a facet follows that of Facet results in ElasticSearch, see:
<http://www.elasticsearch.org/guide/reference/api/search/facets/>

Specifically the object structure of a facet looks like (there is one
addition compared to ElasticSearch: the "id" field which corresponds to the
key used to specify this facet in the facet query):

{% highlight javascript %}
{
  id: "id-of-facet",
  // type of this facet (terms, range, histogram etc)
  _type : "terms",
  // total number of tokens in the facet
  total: 5,
  // @property {number} number of records which have no value for the field
  missing : 0,
  // number of facet values not included in the returned facets
  other: 0,
  // term object ({term: , count: ...})
  terms: [ {
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
{% endhighlight %}

