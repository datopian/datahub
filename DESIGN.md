# Design Notes

## Roadmap

General comment: let's do "README" (docs) driven development here.

* [x] [show] Local functionality for Frictionless datasets with CSV #528
  * [x] Move in new work (portal-experiment) into portal.js and refactor https://github.com/datopian/portal.js.bak/issues/59
* [ ] [show] Uber Epic covering all functionality **See below**
  * [ ] [show] README only + data datasets (don’t have to be frictionless)
    * (?) Graphs direct in README with say visdown …
  * [ ] [show] SQL interface to the data (alasql or sql.js … https://github.com/agershun/alasql/wiki/Performance-Tests)
  * [ ] file/resource subpages ... (for datasets with lots of resources)
* [ ] Docs **80% analysed** #
* [ ] Create portal components and library i.e. have a Table, Graph, Dataset component
  * [ ] publish to @datopian/portal
  * [ ] Examples
* [ ] Catalog functionality **20% analysed**
 
## [uber][epic] Show functionality for single datasets

### Features

* Elegant
* Description (README/Description)
* Data preview and exploration (for tablular)
  * Basic: some sample data shown
  * Data exploration v1: filterable
  * Data Exploration v2: can do sql etc ...
* Graphs / visualization
* Validation: this row does not match schema in column X
* Summarization e.g. this columns has this range of values, this average value, this number of nulls

### Dataset structure support (in rough order of priority / like implementation)

* Frictionless
* Plain README (with frontmatter)
* README (no frontmatter) and LICENSE file (?)

Data has roughly two dimensions that are relevant

* Format
  * CSV
  * xlsx
  * JSON
  * ...
* Size
  * Small: < 5mb (can just load inline ...)
  * Medium < 100mb
  * Large < 5Gb
  * xlarge > 5Gb

* TODO: How does show/build work with remote files e.g. a resource ...

  ```
  path: abc.csv
  remote_storage_url: s3://.../.../.../
  ```

  Options:

  * We clone the data into path locally ...
    * Possible problem if data is big ...
  * Load data direct from remote_storage_url (as long as supports CORs)




## Architecture

Portal.js is a React and NextJS based framework for building dataset/resources pages and catalogs. It consists of:

* React components for data portal functionality e.g. data tables, graphs, dataset pages etc
* Tooling to load data (based on Frictionless)
* Template sites you can reuse using `create-next-app`
  * Single dataset micro-site
  * Github backed catalog
  * CKAN backed catalog
  * ...
* Local development environment
* Deployment integration with DataHub.io

In summary, technically PortalJS is: NextJS + data specific react components + data loading glue (mostly using frictionless-js).
