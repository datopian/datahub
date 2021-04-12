# Design Notes

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
