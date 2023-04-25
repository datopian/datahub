# CKAN Client Guide

Guide to interacting with [CKAN](/docs/dms/ckan) for power users such as data scientists, data engineers and data wranglers.

This guide is about adding and managing data in CKAN programmatically and it assumes:

* You are familiar with key concepts like metadata, data, etc.
* You are working programmatically with a programming language such as Python, JavaScript or R (_coming soon_).

## Frictionless Formats

Clients use [Frictionless formats](https://specs.frictionlessdata.io/) by default for describing dataset and resource objects passed to client methods. Internally, we then use the a *CKAN {'<=>'} Frictionless Mapper* (both [in JavaScript]( https://github.com/datopian/frictionless-ckan-mapper-js ) and [in Python](https://github.com/frictionlessdata/frictionless-ckan-mapper)) to convert objects to CKAN formats before calling the API. **Thus, you can use _Frictionless Formats_ by default with the client**.

>[!tip]As CKAN moves to Frictionless to default this will gradually become unnecessary.

## Quick start

Most of this guide has Python programming language in mind, including its [convention regading using _snake case_ for instances and methods names](https://www.python.org/dev/peps/pep-0008/#descriptive-naming-styles).

If needed, you can adapt the instructions to JavaScript and R (coming soon) by using _camel case_ instead — for example, if in the Python code we have  `client.push_blob(…)`, in JavaScript it would be `client.pushBlob(…)`.

### Prerequisites

Install the client for your language of choice:

* Python: https://github.com/datopian/ckan-client-py#install
* JavaScript: https://github.com/datopian/ckan-client-js#install
* R: _coming soon_

### Create a client

#### Python

```python
from ckanclient import Client


api_key = '771a05ad-af90-4a70-beea-cbb050059e14'
api_url = 'http://localhost:5000'
organization = 'datopian'
dataset = 'dailyprices'
lfs_url = 'http://localhost:9419'

client = Client(api_url, organization, dataset, lfs_url)
```

#### JavaScript

```javascript
const { Client } = require('ckanClient')

apiKey = '771a05ad-af90-4a70-beea-cbb050059e14'
apiUrl = 'http://localhost:5000'
organization = 'datopian'
dataset = 'dailyprices'

const client = Client(apiKey, organization, dataset, apiUrl)
```

### Upload a resource

That is to say, upload a file, implicitly creating a new dataset.

#### Python

```python
from frictionless import describe


resource = describe('my-data.csv')
client.push_blob(resource)
```

### Create a new empty Dataset with metadata

#### Python

```python
client.create('my-data')
client.push(resource)
```

### Adding a resource to an existing Dataset

>[!note]Not implemented yet.


```python
client.create('my-data')
client.push_resource(resource)
```

### Edit a Dataset's metadata

>[!note]Not implemented yet.


```python
dataset = client.retrieve('sample-dataset')
client.update_metadata(
    dataset,
    metadata: {'maintainer_email': 'sample@datopian.com'}
)
```

For details of metadata see the [metadata reference below](#metadata-reference).

## API - Porcelain

### `Client.create`

Expects as a single argument: a _string_, or a _dict_ (in Python), or an _object_ (in JavaScript). This argument is either a valid dataset name or dictionary with metadata for the dataset in Frictionless format.

### `Client.push`

Expects a single argument: a _dict_ (in Python) or an _object_ (in JavaScript) with a dataset metadata in Frictionless format.

### `Client.retrieve`

Expects a single argument: a string with a dataset name or uniquer ID. Returns a Frictionless resource as a _dict_ (in Python) or as an _Promisse .&lt;object&gt;_ (in JavaScript).

### `Client.push_blob`

Expects a single argument: a _dict_ (in Python) or an _object_ (in JavaScript) with a Frictionless resource.

## API - Plumbing

### `Client.action`

This method bridges access to the CKAN API _action endpoint_.

#### In Python

Arguments:

| Name                 | Type       | Default    | Description                                                  |
| -------------------- | ---------- | ---------- | ------------------------------------------------------------ |
| `name`               | `str`      | (required) | The action name, for example, `site_read`, `package_show`…   |
| `payload`            | `dict`     | (required) | The payload being sent to CKAN. When a payload is provided to a GET request, it will be converted to URL parameters and each key will be converted to snake case. |
| `http_get`           | `bool`     | `False`    | Optional, if `True` will make `GET` request, otherwise `POST`. |
| `transform_payload`  | `function` | `None`     | Function to mutate the `payload` before making the request (useful to convert to and from CKAN and Frictionless formats). |
| `transform_response` | `function` | `None`     | function to mutate the response data before returning it (useful to convert to and from CKAN and Frictionless formats). |

>[!note]The CKAN API uses the CKAN dataset and resource formats (rather than Frictionless formats).
In other words, to stick to Frictionless formats, you can pass `frictionless_ckan_mapper.frictionless_to_ckan` as `transform_payload`, and `frictionless_ckan_mapper.ckan_to_frictionless` as `transform_response`.


#### In JavaScript

Arguments:

| Name         | Type                | Default            | Description                                                  |
| ------------ | ------------------- | ------------------ | ------------------------------------------------------------ |
| `actionName` | <code>string</code> | (required)         | The action name, for example, `site_read`, `package_show`…   |
| `payload`    | <code>object</code> | (required)         | The payload being sent to CKAN. When a payload is provided to a GET request, it will be converted to URL parameters and each key will be converted to snake case. |
| `useHttpGet` | <code>object</code> | <code>false</code> | Optional, if `True` will make `GET` request, otherwise `POST`. |

>[!note]The JavaScript implementation uses the CKAN dataset and resource formats (rather than Frictionless formats).
In other words, to stick to Frictionless formats, you need to convert from Frictionless to CKAN before calling `action` , and from CKAN to Frictionless after calling `action`.

## Metadata reference

>[!info]Your site may have custom metadata that differs from the example set below.


### Profile

**(`string`)** Defaults to _data-resource_.

The profile of this descriptor.

Every Package and Resource descriptor has a profile. The default profile, if none is declared, is `data-package` for Package and `data-resource` for Resource.

#### Examples

- `{"profile":"tabular-data-package"}`

- `{"profile":"http://example.com/my-profiles-json-schema.json"}`

### Name

**(`string`)**

An identifier string. Lower case characters with `.`, `_`, `-` and `/` are allowed.

This is ideally a url-usable and human-readable name. Name `SHOULD` be invariant, meaning it `SHOULD NOT` change when its parent descriptor is updated.

#### Example

- `{"name":"my-nice-name"}`

### Path

A reference to the data for this resource, as either a path as a string, or an array of paths as strings. of valid URIs.

The dereferenced value of each referenced data source in `path` `MUST` be commensurate with a native, dereferenced representation of the data the resource describes. For example, in a *Tabular* Data Resource, this means that the dereferenced value of `path` `MUST` be an array.

#### Validation

##### It must satisfy one of these conditions

###### Path

**(`string`)**

A fully qualified URL, or a POSIX file path..

Implementations need to negotiate the type of path provided, and dereference the data accordingly.

**Examples**

- `{"path":"file.csv"}`

- `{"path":"http://example.com/file.csv"}`

**(`array`)**

**Examples**

- `["file.csv"]`

- `["http://example.com/file.csv"]`

#### Examples

- `{"path":["file.csv","file2.csv"]}`

- `{"path":["http://example.com/file.csv","http://example.com/file2.csv"]}`

- `{"path":"http://example.com/file.csv"}`

### Data

Inline data for this resource.

### Schema

**(`object`)**

A schema for this resource.

### Title

**(`string`)**

A human-readable title.

#### Example

- `{"title":"My Package Title"}`

### Description

**(`string`)**

A text description. Markdown is encouraged.

#### Example

- `{"description":"# My Package description\nAll about my package."}`

### Home Page

**(`string`)**

The home on the web that is related to this data package.

#### Example

- `{"homepage":"http://example.com/"}`

### Sources

**(`array`)**

The raw sources for this resource.

#### Example

- `{"sources":[{"title":"World Bank and OECD","path":"http://data.worldbank.org/indicator/NY.GDP.MKTP.CD"}]}`

### Licenses

**(`array`)**

The license(s) under which the resource is published.

This property is not legally binding and does not guarantee that the package is licensed under the terms defined herein.

#### Example

- `{"licenses":[{"name":"odc-pddl-1.0","path":"http://opendatacommons.org/licenses/pddl/","title":"Open Data Commons Public Domain Dedication and License v1.0"}]}`

### Format

**(`string`)**

The file format of this resource.

`csv`, `xls`, `json` are examples of common formats.

#### Example

- `{"format":"xls"}`

### Media Type

**(`string`)**

The media type of this resource. Can be any valid media type listed with [IANA](https://www.iana.org/assignments/media-types/media-types.xhtml).

#### Example

- `{"mediatype":"text/csv"}`

### Encoding

**(`string`)** Defaults to _utf-8_.

The file encoding of this resource.

#### Example

- `{"encoding":"utf-8"}`

### Bytes

**(`integer`)**

The size of this resource in bytes.

#### Example

- `{"bytes":2082}`

### Hash

**(`string`)**

The MD5 hash of this resource. Indicate other hashing algorithms with the {'{algorithm}'}:{'{hash}'} format.

#### Examples

- `{"hash":"d25c9c77f588f5dc32059d2da1136c02"}`

- `{"hash":"SHA256:5262f12512590031bbcc9a430452bfd75c2791ad6771320bb4b5728bfb78c4d0"}`

## Generating templates

You can use [`jsv`](https://github.com/datopian/jsv) to generate a template  script in Python, JavaScript, and R.

To install it:

```
$ npm install -g git+https://github.com/datopian/jsv.git
```

### Python

```
$ jsv data-resource.json --output py
```

**Output**
```python
dataset_metadata = {
    "profile": "data-resource",  # The profile of this descriptor.
    # [example] "profile": "tabular-data-package"
    # [example] "profile": "http://example.com/my-profiles-json-schema.json"
    "name": "my-nice-name",  # An identifier string. Lower case characters with `.`, `_`, `-` and `/` are allowed.
    "path": ["file.csv","file2.csv"],  # A reference to the data for this resource, as either a path as a string, or an array of paths as strings. of valid URIs.
    # [example] "path": ["http://example.com/file.csv","http://example.com/file2.csv"]
    # [example] "path": "http://example.com/file.csv"
    "data": None,  # Inline data for this resource.
    "schema": None,  # A schema for this resource.
    "title": "My Package Title",  # A human-readable title.
    "description": "# My Package description\nAll about my package.",  # A text description. Markdown is encouraged.
    "homepage": "http://example.com/",  # The home on the web that is related to this data package.
    "sources": [{"title":"World Bank and OECD","path":"http://data.worldbank.org/indicator/NY.GDP.MKTP.CD"}],  # The raw sources for this resource.
    "licenses": [{"name":"odc-pddl-1.0","path":"http://opendatacommons.org/licenses/pddl/","title":"Open Data Commons Public Domain Dedication and License v1.0"}],  # The license(s) under which the resource is published.
    "format": "xls",  # The file format of this resource.
    "mediatype": "text/csv",  # The media type of this resource. Can be any valid media type listed with [IANA](https://www.iana.org/assignments/media-types/media-types.xhtml).
    "encoding": "utf-8",  # The file encoding of this resource.
    # [example] "encoding": "utf-8"
    "bytes": 2082,  # The size of this resource in bytes.
    "hash": "d25c9c77f588f5dc32059d2da1136c02",  # The MD5 hash of this resource. Indicate other hashing algorithms with the {algorithm}:{hash} format.
    # [example] "hash": "SHA256:5262f12512590031bbcc9a430452bfd75c2791ad6771320bb4b5728bfb78c4d0"
}
```


### JavaScript

```
$ jsv data-resource.json --output js
```

**Output**
```javascript
const datasetMetadata = {
  // The profile of this descriptor.
  profile: "data-resource",
  // [example] profile: "tabular-data-package"
  // [example] profile: "http://example.com/my-profiles-json-schema.json"
  // An identifier string. Lower case characters with `.`, `_`, `-` and `/` are allowed.
  name: "my-nice-name",
  // A reference to the data for this resource, as either a path as a string, or an array of paths as strings. of valid URIs.
  path: ["file.csv", "file2.csv"],
  // [example] path: ["http://example.com/file.csv","http://example.com/file2.csv"]
  // [example] path: "http://example.com/file.csv"
  // Inline data for this resource.
  data: null,
  // A schema for this resource.
  schema: null,
  // A human-readable title.
  title: "My Package Title",
  // A text description. Markdown is encouraged.
  description: "# My Package description\nAll about my package.",
  // The home on the web that is related to this data package.
  homepage: "http://example.com/",
  // The raw sources for this resource.
  sources: [
    {
      title: "World Bank and OECD",
      path: "http://data.worldbank.org/indicator/NY.GDP.MKTP.CD",
    },
  ],
  // The license(s) under which the resource is published.
  licenses: [
    {
      name: "odc-pddl-1.0",
      path: "http://opendatacommons.org/licenses/pddl/",
      title: "Open Data Commons Public Domain Dedication and License v1.0",
    },
  ],
  // The file format of this resource.
  format: "xls",
  // The media type of this resource. Can be any valid media type listed with [IANA](https://www.iana.org/assignments/media-types/media-types.xhtml).
  mediatype: "text/csv",
  // The file encoding of this resource.
  encoding: "utf-8",
  // [example] encoding: "utf-8"
  // The size of this resource in bytes.
  bytes: 2082,
  // The MD5 hash of this resource. Indicate other hashing algorithms with the {algorithm}:{hash} format.
  hash: "d25c9c77f588f5dc32059d2da1136c02",
  // [example] hash: "SHA256:5262f12512590031bbcc9a430452bfd75c2791ad6771320bb4b5728bfb78c4d0"
};
```

### R

```
$ jsv data-resource.json --output r
```

**Output** 
```r
# The profile of this descriptor.
profile <- "data-resource"
# [example] profile <- "tabular-data-package"
# [example] profile <- "http://example.com/my-profiles-json-schema.json"
# An identifier string. Lower case characters with `.`, `_`, `-` and `/` are allowed.
name <- "my-nice-name"
# A reference to the data for this resource, as either a path as a string, or an array of paths as strings. of valid URIs.
path <- ["file.csv","file2.csv"]
# [example] path <- ["http://example.com/file.csv","http://example.com/file2.csv"]
# [example] path <- "http://example.com/file.csv"
# Inline data for this resource.
data <- NA
# A schema for this resource.
schema <- NA
# A human-readable title.
title <- "My Package Title"
# A text description. Markdown is encouraged.
description <- "# My Package description\nAll about my package."
# The home on the web that is related to this data package.
homepage <- "http://example.com/"
# The raw sources for this resource.
sources <- [{"title":"World Bank and OECD","path":"http://data.worldbank.org/indicator/NY.GDP.MKTP.CD"}]
# The license(s) under which the resource is published.
licenses <- [{"name":"odc-pddl-1.0","path":"http://opendatacommons.org/licenses/pddl/","title":"Open Data Commons Public Domain Dedication and License v1.0"}]
# The file format of this resource.
format <- "xls"
# The media type of this resource. Can be any valid media type listed with [IANA](https://www.iana.org/assignments/media-types/media-types.xhtml).
mediatype <- "text/csv"
# The file encoding of this resource.
encoding <- "utf-8"
# [example] encoding <- "utf-8"
# The size of this resource in bytes.
bytes <- 2082L
# The MD5 hash of this resource. Indicate other hashing algorithms with the {algorithm}:{hash} format.
hash <- "d25c9c77f588f5dc32059d2da1136c02"
# [example] hash <- "SHA256:5262f12512590031bbcc9a430452bfd75c2791ad6771320bb4b5728bfb78c4d0"

```


## Design Principles

The client **should** use Frictionless formats by default for describing dataset and resource objects passed to client methods.

In addition, where more than metadata is needed (e.g., we need to access the data stream, or get the schema) we expect the _Dataset_ and _Resource_ objects to follow the [Frictionless Data Lib pattern](https://github.com/frictionlessdata/project/blob/master/rfcs/0004-frictionless-data-lib-pattern.md).
