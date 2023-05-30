---
section: help
lead: true
title: Full-text search API
authors:
- Neil Ashton
---
OpenSpending supports full-text search as a research tool for
everyone who wants to investigate the spending information kept
in our database.

It is important to note, however, that search is always performed
on individual entries. More abstract concepts (e.g. "all
health spending in a country over a given year") would mostly be the
result of adding up many individual entries. If your use case
requires that you access such concepts, you may want to look at
the [aggregation API](../aggregate) instead.

#### Basic call and parameters

    GET /api/2/search?q=<query>

Calls will return a set of fully JSON serialized entries, query
statistics, and, depending on the other parameters, other data such as
facets.

The following parameters are recognized:

* ``q``
  Query string. Will usually search a composite text field but can
  be limited to a specific field (i.e. a dimension, attribute, or measure)
  with ``field:value``. Boolean operators such as OR, AND, and ±term can also be used.

* ``dataset``
  Specifies a dataset name to search in. While searching across multiple
  datasets is supported, this parameter can be used to limit the scope and
  increase performance. It can be used multiple times or multiple
  dataset names can be separated with pipe symbols.

* ``category``
  The dataset category can be used to filter datasets by their type,
  e.g. limiting the output to only transactional expenditure (and
  excluding any budget items). Valid values include ``budget``,
  ``spending``, and ``other``.

* ``stats``
  Includes solr statistics on measures, namely the average, mean, and
  standard deviations. This is generated through the indexed data and
   can differ marginally from the
  results of the aggregator due to floating point inaccuracies.
  Note that aggregations
  across datasets with different currencies (or even the same currency
  across different years) are possible but must be avoided.

* ``filter``
  Apply a simple filter of the format ``field:value``. Multiple filters
  can be joined through pipes, e.g. ``fieldA:value|fieldB:value``.

* ``page``
  Page number for paginated results. Defaults to ``1``.

* ``pagesize``
  Size of a page for paginated results. Defaults to ``10000``.

* ``facet_field``
  A field to facet the search by, i.e. give all the distinct values of
  the field in the result set with the count of how often each occurred.

* ``facet_page``, ``facet_pagesize``
  Works analogously to the ``page`` and ``pagesize`` parameters but applies
  to facets instead.

* ``expand_facet_dimensions``
  When a compound dimension name is used for a facet, this will return a
  full representation of this dimension value for each value.

If an error is detected, the system will return a simple JSON response
with a list of ``errors`` describing the fault.

### Solr query syntax

OpenSpending uses Apache Solr for full-text indexing. Some search
parameters are passed directly to Solr:

    GET /api/2/search?q=money%20measure:[min%20TO%20max]&fq=dimension:value

Some useful resources to explore the query language of Solr include:

* [Solr Common Query Parameters](http://wiki.apache.org/solr/CommonQueryParameters)
* [Lucene Query Parser Syntax](http://lucene.apache.org/java/3_4_0/queryparsersyntax.html)
* [Solr Query Syntax](http://wiki.apache.org/solr/SolrQuerySyntax) (Advanced)

**Up**: [OpenSpending API](../)
