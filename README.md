<h1 align="center">

🌀 Portal.JS<br/>
A gateway to your data

</h1>

🌀 `Portal` is the data presentation framework. `Portal` can be used to showcase a single dataset or build a full-scale data catalog/portal. `Portal` is built in Javascript and React on top of the popular Next.js framework.

## Status

`Portal` is currently focused on presenting a single (Frictionless) dataset for viewing and exploration.

## Install

Git clone then:

```
yarn install
```

## Usage

In this directory:

```bash
export PORTAL_DATASET_PATH=/path/to/my/dataset
yarn dev
```

And you will get a nice dataset page at `http://localhost:3000`

![](https://i.imgur.com/KSEtNF1.png)


## Design Notes

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
