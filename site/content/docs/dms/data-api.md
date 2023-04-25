# Data APIs (and the DataStore)

## Introduction

A Data API provides *API* access to data stored in a [DMS][]. APIs provide granular, per record access to datasets and their component data files. They offer rich querying functionality to select the records you want, and, potentially, other functionality such as aggregation. Data APIs can also provide write access, though this has traditionally been rarer.[^rarer]

Furthermore, much of the richer functionality of a DMS or Data Portal such as data visualization and exploration require API data access rather than bulk download.

[DMS]: /docs/dms/dms

[^rarer]: It is rarer  because write access usually means a) the data for this dataset is a structured database rather than a data file (which is normally more expensive both in terms b) the Data Portal has now become the primary (or semi-primary) home of this dataset rather simply being the host of a dataset whose home and maintenance is elsewhere.

### API vs Bulk Access

Direct download of a whole data file is the default method of access for data in a DMS. API access complements this direct download in "bulk" approach. In some situations API access may be the primary access option (so-called "API first"). In other cases, structured storage and API read/write may be the *only* way the data is stored and there is no bulk storage -- for example, this would be a natural approach for time series data which is being rapidly updated e.g. every minute.

*Fig 1: Contrasting Download and API based access*

```bash
# simple direct file access. You download
https://my-data-portal.org/my-dataset/my-csv-file.csv

# API based access. Find the first 5 records with 'awesome'
https://my-data-portal.org/data-api/my-dataset/my-csv-file-identifier?q=awesome&limit=5
```

In addition, to differing volume of access, APIs often differ from bulk download in their data format: following web conventions data APIs usually return the data in a standard format such as JSON (and can also provide various other formats e.g. XML). By contrast, direct data access necessarily supplies the data in whatever data format it was created in.

### Limitations of APIs

Whilst Data APIs are in many ways more flexible than direct download they have disadvantages:

* APIs are much more costly and complex to create and maintain than direct download
* API queries are slow and limited in size because they run in real-time in memory. Thus, for bulk access e.g. of the entire dataset direct download is much faster and more efficient (download a 1GB CSV directly is easy and takes seconds but attempting to do so via the API may crash the server and be very slow).

{/*
TODO: do more to compare and contrast download vs API access (e.g. what each is good for, formats,  etc)
*/}


### Why Data APIs?

Data APIs underpin the following valuable functionality on the "read" side:

* **Data (pre)viewing**: reliably and richly (e.g. with querying, mapping etc). This makes the data much more accessible to non-technical users.
* **Visualization and analytics**: rich visualization and analytics may need a data API (because they need easily to query and aggregate parts of dataset).
* **Rich Data Exploration**: when exploring the data you will want to explore through a dataset quickly only pulling parts of the data and drilling down further as needed.
* **(Thin) Client applications**: with a data API third party users of the portal can build apps on top of the portal data easily and quickly (and without having to host the data themselves)

Corresponding job stories would be like:

* When building a visualization I want to select only some part of a dataset that I need for my visualization so that I can load the data quickly and efficiently.
* When building a Data Explorer or Data Driven app I want to slice/dice/aggregate my data (without downloading it myself) so that I can display that in my explorer / app.

On the write side they provide support for:

* **Rapidly updating data e.g. timeseries**: if you are updating a dataset every minute or every second you want an append operation and don't want to store the whole file every update just to add a single record
* **Datasets stored as structured data by default** and which can therefore be updated in part, a few records at a time, rather than all at once (as with blob storage)


## Domain Model

The functionality associated to the Data APIs can be divided in 6 areas:

* **Descriptor**: metadata describing and specifying the API e.g. general metadata e.g. name, title, description, schema, and permissions
* **Manager** for creating and editing APIs.
  * API: for creating and editing Data API's descriptors (which triggers creation of storage and service endpoint)
  * UI: for doing this manually
* **Service** (read):  web API for accessing structured data (i.e. per record) with querying etc. *When we simply say "Data API" this is usually what we are talking about*
  * Custom API & Complex functions: e.g. aggregations, join
  * Tracking & Analytics: rate-limiting etc
  * Write API: usually secondary because of its limited performance vs bulk loading
  * Bulk export of query results especially large ones (or even export of the whole dataset in the case where the data is stored directly in the DataStore rather than the FileStore). This is an increasingly important featurea lower priority but if required it is substantive feature to implement.
* **Data Loader**: bulk loading data into the system that powers the data API. **This is covered in a [separate Data Load page](/docs/dms/load/).**
  * Bulk Load: bulk import of individual data files
  * Maybe includes some ETL => this takes us more into data factory
* **Storage (Structured)**: the underlying structured store for the data (and its layout). For example, Postgres and its table structure.This could be considered a separate component that the Data API uses or as part of the Data API -- in some cases the store and API are completely wrapped together, e.g. ElasticSearch is both a store and a rich Web API.

>[!tip]Visualization is not part of the API but the demands of visualization are important in designing the system.

## Job Stories

### Read API

When I'm building a client application or extracting data  I want to get data quickly and reliably via an API so that I can focus on building the app rather than manging the data

* Performance: Querying data is **quick**
* Filtering: I want to filter data easily so that I can get the slice of data that I need.
  * ❗ unlimited query size for downloading eg, can download filtered data with millions of rows
* can get results in 3 formats: CSV, JSON and Excel.
* API formats
  * "Restful" API (?)
  * SQL API (?)
  * ❗ GraphQL API (?)
  * ❗ custom views/cubes (including pivoting)
* Query UI

:exclamation: = something not present atm

#### Retrieve records via an API with filtering (per resource) (if tabular?)

When I am building a web app, a rich viz, display the data, etc I want to have an API to data (returns e.g. JSON, CSV) [in a resource] so that I can get precise chunks of data to use without having to download and store the whole dataset myself

* I want examples
* I want a playground interface …

#### Bulk Export

When I have a query with a large amount of results I want to be able to download all of those results so that I can analyse them with my own tools

#### Multiple Formats

When querying data via the API I want to be able to get the results in different formats (e.g. JSON, CSV, XML (?), ...) so that I can get it in a format most suitable for my client application or tool

#### Aggregate data (perform ops) via an API …

When querying data to use in a client application I want to be able to perform aggregations such as sum, group by etc so that I can get back summary data directly and efficiently (and don't have to compute myself or wait for large amounts of data)

#### SQL API

When querying the API as a Power User I want to use SQL so that I can do complex queries and operations and reuse my exisitng SQL knowledge

#### GeoData API

When querying a dataset with geo attributes such as location I want to be able use geo-oriented functionality e.g. find all items near X so that I can find the records I want by location

#### Free Text Query (Google Style / ElasticSearch Style)

When querying I want to do a google style search in data e.g. query for "brown" and find all rows with brown in them or do `brown road_name:*jfk*` and get all results with brown in them and whose field `road_name` has `jfk` in it so that I can provide a flexible query interface to my users

#### Custom Data API

As a Data Curator I want to create a custom API for one or more resources so that users can access my data in convenient ways …

* E.g. query by dataset or resource name rather than id ...

#### Search through all data (that is searchable) / Get Summary Info

As a Consumer I want to search across all the data in the Data Portal at once so that I can find the value I want quickly and easily … (??)

#### Search for variables used in datasets

As a Consumer (researcher/student …) I want to look for datasets with particular variables in  them so that I can quickly locate the data I want for my work

* Search across the column names so that ??

#### Track Usage of my Data API

As a DataSet Owner I want to know how much my Data API is being used so that I can report that to stakeholders / be proud of that

#### Limit Usage of my Data API (and/or charge for it)

As a Sysadmin I want to limit usage of my Data API per user (and maybe charge for above a certain level) so that I don’t spend too much money

#### Restrict Access to my Data API

As a Publisher I want to only allow specific people to access data via the data API so that …

* Want this to mirror the same restrictions I have on the dataset / resources elsewhere (?)

### UI for Exploring Data

>[!warning]This probably is not a Data API epic -- rather it would come under the Data Explorer.

* I want an interface to “sql style” query data
* I want a filter interface into data
* I want to download filtered data
* ...

### Write API

When adding data I want to write new rows via the data API so that the new data is available via the API

* ? do we also want a way to do bulk additions?


### DataStore

When creating a Data API I want a structured data store (e.g. relational database) so that I can power the Data API and have it be fast, efficient and reliable.


## CKAN v2

In CKAN 2 the bulk of this functionality is in the core extension `ckanext-datastore`:

* https://docs.ckan.org/en/2.8/maintaining/datastore.html
* https://github.com/ckan/ckan/tree/master/ckanext/datastore

In summary: the underlying storage is provided by a Postgres database. A dataset resource is mapped to a table in Postgres. There are no relations between tables (no foreign keys). A read and write API is provided by a thin Python wrapper around Postgres. Bulk data loading is provided in separate extensions.

### Implementing the 4 Components

Here's how CKAN 2 implements the four components described above:

* Read API: is provided by an API wrapper around Postgres. This is written as a CKAN extension written in Python and runs in process in the CKAN instance.
	* Offers both classic Web API query and SQL queries.
	* Full text, cross field search is provided via Postgres and creating an index  concatenating across fields.
	* Also includes a write API and functions to create tables
* DataStore: a dedicated Postgres database (separate to the main CKAN database) with one table per resource.
* Data Load: provided by either DataPusher (default) or XLoader. More details below.
	* Utilize the CKAN jobs system to load data out of band
	* Some reporting integrated into UI
	* Supports tabular data (CSV or Excel) : this converts CSV or Excel into data that can be loaded into the Postgres DB.
* Bulk Export: you can bulk download via the extension using the dump functionality https://docs.ckan.org/en/2.8/maintaining/datastore.html#downloading-resources
	* Note however this will have problems with large resources either timing out or hanging the server

### Read API

The CKAN DataStore extension provides an ad-hoc database for storage of structured data from CKAN resources.

See the DataStore extension: https://github.com/ckan/ckan/tree/master/ckanext/datastore

[Datastore API](https://docs.ckan.org/en/2.8/maintaining/datastore.html#the-datastore-api)

[Making Datastore API requests](https://docs.ckan.org/en/2.8/maintaining/datastore.html#making-a-datastore-api-request)

[Example: Create a DataStore table](https://docs.ckan.org/en/2.8/maintaining/datastore.html#ckanext.datastore.logic.action.datastore_create)

```sh
curl -X POST http://127.0.0.1:5000/api/3/action/datastore_create \
	-H "Authorization: {YOUR-API-KEY}" \
	-d '{ "resource": {"package_id": "{PACKAGE-ID}"}, "fields": [ {"id": "a"}, {"id": "b"} ] }'
```


### Data Load

See [Load page](/docs/dms/load#ckan-v2).

### DataStore

Implemented as a separate Postgres Database.

https://docs.ckan.org/en/2.8/maintaining/datastore.html#setting-up-the-datastore

### What Issues are there?

Sharp Edges

* connection between MetaStore (main CKAN objects DB) and DataStore is not always well maintained e.g, if I call “purge_dataset” action, it will remove stuff from MetaStore but it won’t delete a table from DataStore. This does not break UX but your DataStore DB raises in size and you might have junk tables with lots of data.

DataStore (Data API)

* One table per resource and no way to join across resources
* Indexes are auto-created and no way to customize per resource. This can lead to issues on loading large datasets.
* No API gateway (i.e. no way to control DDOS’ing, to do rate limiting etc)
* SQL queries not working (with private datasets)

## CKAN v3

Following the general [next gen microservices approach][ng], the Data API is separated into distinct microservices.

[ng]: /docs/dms/ckan-v3/next-gen

### Read API

Approach: Refactor current DataStore API into a standalone microservice. Key point would be to break out permissioning. Either via a call out to separate permissioning service or a simple JWT approach where capability is baked in.

Status: In Progress (RFC) - see https://github.com/datopian/data-api

### Data Load

Implemented via AirCan. See [Load page](/docs/dms/load).

### Storage

Back onto Postgres by default just like CKAN 2. May also explore using other backends esp from Cloud Providers e.g. BigQuery or AWS RedShift etc.

* See Data API service https://github.com/datopian/data-api
* BigQuery: https://github.com/datopian/ckanext-datastore-bigquery
