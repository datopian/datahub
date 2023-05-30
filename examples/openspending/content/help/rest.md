---
section: help
lead: true
title: REST resources
authors:
- Neil Ashton
---
OpenSpending pages generally support multiple representations, at least
a user-facing HTML version and a JSON object that represents the contained
data. For various technical and non-technical reasons, most of the data is
read-only.

Content negotiation can be performed either via HTTP ``Accept`` headers or
via suffixes in the resource URL. The following types are generally
recognized:

* **HTML** (Hyptertext Markup), MIME type ``text/html`` or any value not
  otherwise in use, suffix ``.html``. This is the default representation.
* **JSON** (JavaScript Object Notation), MIME type ``application/json`` and
  suffix ``.json``.
* **CSV** (Comma-Separated Values), MIME type ``text/csv`` and suffix
  ``.csv``. CSV is only supported where listings can be exported with some
  application-level meaning.

The key resources in OpenSpending are datasets, entries, dimensions, and
dimension members. Each of these has a listing and an entity view that can
be accessed.

#### Listing datasets

    GET /datasets.json

All datasets are listed, including their core metadata. Additionally, certain
parameters are given as facets (i.e. territories and languages of the
datasets). Both ``territories`` and ``languages`` can also be passed in as
query parameters to filter the result set. Supported formats are HTML, CSV and JSON.

    "territories": [
      /* ... */
      {
        "count": 2,
        "url": "/datasets?territories=BH",
        "code": "BH",
        "label": "Bahrain"
      },
      /* ... */
    ],
    "languages": /* Like territories. */
    "datasets": [
      {
        "name": "cra",
        "label": "Country Regional Analysis v2009",
        "description": "The Country Regional Analysis published by HM Treasury.",
        "currency": "GBP"
      },
      /* ... */
    ]

#### Getting dataset metadata

    GET /{dataset}.json

Core dataset metadata is returned. This call does not have any
parameters. Supported formats are HTML and JSON.

    {
      "name": "cra",
      "label": "Country Regional Analysis v2009",
      "description": "The Country Regional Analysis published by HM Treasury.",
      "currency": "GBP"
    }

Another call is available to get the full model description of
the dataset in question, which includes the core metadata and also
a full description of all dimensions, measures, and views. The
format for this is always JSON::

    GET /{dataset}/model.json

#### Listing dataset dimensions

    GET /{dataset}/dimensions.json

A listing of dimensions, including type, description, and attribute
definitions is returned. This call does not have any parameters.
Supported formats are HTML and JSON.

    [
      {
        "name": "from",
        "html_url": "http://openspending.org/ukgov-finances-cra/from",
        "label": "Paid from",
        "key": "from",
        "attributes": {
          "gov_department": {
            "column": null,
            "facet": false,
            "constant": "true",
            "datatype": "constant",
            "end_column": null
          },
          "name": {
            "column": "dept_code",
            "facet": false,
            "constant": null,
            "datatype": "string",
            "end_column": null
          },
          "label": {
            "column": "dept_name",
            "facet": false,
            "constant": null,
            "datatype": "string",
            "end_column": null
          }
        },
        "type": "compound",
        "description": "The entity that the money was paid from"
      },
      /* ... */
    ]

#### Listing dimension members

    GET /{dataset}/{dimension}.json

The returned JSON representation contains the dimension metadata,
including type, label, description and attribute definitions.

    {
      "name": "from",
      "html_url": "http://openspending.org/ukgov-finances-cra/from",
      "label": "Paid from",
      "key": "from",
      "attributes": {
        "gov_department": {
          "column": null,
          "facet": false,
          "constant": "true",
          "datatype": "constant",
          "end_column": null
        },
        "name": {
          "column": "dept_code",
          "facet": false,
          "constant": null,
          "datatype": "string",
          "end_column": null
        },
        "label": {
          "column": "dept_name",
          "facet": false,
          "constant": null,
          "datatype": "string",
          "end_column": null
        }
      },
      "type": "compound",
      "description": "The entity that the money was paid from"
    }

This call's return includes dimension metadata, but it may be too expensive
to call for just this aspect.

#### Getting dimension members

    GET /{dataset}/{dimension}/{name}.json

This will return the data stored on a given member ``name`` of the
``dimension``, including its ``name``, ``label``, and any other
defined attributes.

    {
      "id": 2,
      "name": "10",
      "label": "Social protection",
      "description": "Government outlays on social protection ...",
      "level": "1"
    }

#### Listing entries in a dataset

Listing all the entries in a dataset (and offering export functionality)
is handled by the full-text search. See [the search API](../search).

### Getting an entry

    GET /{dataset}/entries/{id}.json

This will return a full representation of this entry, including all
measures and all attributes of all dimensions. The entry ``id`` is a
semi-natural key derived from dataset metadata which should be stable
across several loads.

A CSV representation is available but will only have one row.

**Up**: [OpenSpending API](../)
