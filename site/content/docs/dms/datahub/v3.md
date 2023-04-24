# DataHub v3 (Next) 

## Introduction

Overview of the third generation DataHub. In planning since 2019 this will launch in 2021. For background on v1 and v2 and how we came to v3 see [History section below](#history).

## What

Make it stupidly easy, fast and reliable to share your data in a **useable**<sup>*</sup> way<sup>**</sup>. 
 
<small><sup>*</sup> It is already easy to "share" data: just use dropbox, google drive, s3, github etc. However, it’s not so easy to share it in a way that’s usable e.g. with descriptions for the columns, data that’s viewable and searchable (not just raw), with clearly associated docs, with an API etc.</small>
 
<small><sup>**</sup> Not only with others but with *yourself*. This may sound a bit odd: don’t you already have the data? What we mean is, for example, going from a raw CSV to a browseable table (share it with your "eyes") or converting it to an API so that you can use it in a data driven app or analysis (sharing from one tool to another).</small>
 
Make it easy **for whom**? Power users like data engineers and data scientists. People familiar with a command line and github.

### An Analogy

There is a useful analogy with Vercel (Zeit). Vercel focuses on webapp deployment and developer experience. We focus on data "deployment" and data (wrangler) experience.

| Vercel | DataHub |
|--------|---------|
| A platform for deploying webapps (esp Next.JS) with a focus on simplicity, speed and DX | A platform for "deploying" datasets with a focus on simplicity, speed and DX (data experience). Deploying = a "portal-like" presentation of the data plus e.g. APIs, workflows etc. |

Aside: in a further analogy, we will also have an open-source data presentation framework "Portal.JS" which has some analogies with Next.JS:

| Vercel | DataHub |
|--------|---------|
| **Next.JS**: a framework for building webapps (with react) | **Portal.JS**: the data presentation framework (a framework for presenting data(sets) and building data-driven micro web apps | 


## Features

`data` will be used throughout for the DataHub command line tool.

* Get a Portal (Present your data)
  * Local (Preview)
  * Deployed online
* Data API
  * (?) Local
  * Deployed online
* Hub: management UI (and API)

### Portal

I have a dataset `my-data`

```bash
README.md
data.csv
## descriptor is optional (we infer if not there) 
# datapackage.json
```

I can do:

```bash
cd my-dataset
data portal
```
 
And I get a nice dataset page like this available locally at e.g. http://localhost:3000:

![](https://i.imgur.com/KSEtNF1.png)

#### Details

* Elegant presentation
* Shows the data in a table etc (searchable / filterable)
  * Supports other data formats e.g. json, xlsx etc
* Show graphs (vega, plotly)
* Show maps
* Data summary
* Works with …
  * README + csv
  * Frictionless dataset
  * Frictionless resource
  * pure README with frontmatter

Bonus

* Copes with lots of data files
* (?) Git history if you have it … (with data oriented support e.g. diffs)
* ?? (for local not sure?) gives me a queryable api with the data … (< 100MB)
 
Bonus ++:

* Customizable themes 

### Deploy

```bash
cd my-data
data deploy
```
 
Gives me a url like:
 
```
https://dataset.owner.datahub.io
```

#### Details

* Deploys a shareable url with the content of show
  * Semi-private
  * Can integrate access control (?)
* Deploys a data API
* [Other integrations e.g. push to google spreadsheets]

### API

Run `data deploy` and you get an API to your data that you can others can use (as well as the portal):

```bash
https://dataset.owner.datahub.io/api
# query it ...
https://dataset.owner.datahub.io/api?file=data.csv&q=abc
```

NB: this is tabular data only (or JSON data in tabular structure.)

#### Details

* GraphQL by default (?)
  * Maybe a basic
* Also can expose raw SQL
* Get an API explorer
* API shows up in portal presentation
* Can customize the API with a yml file

Bonus

* Authentication
* Usage tracking
* Billing per usage

### Hub

I can login at datahub.io and go to datahub.io/dashboard and I have a Dashboard showing all my DataHub projects

### Github integration

Push to github and automatically deploy to DataHub.

#### Details

* Overview and add/track your GitHub projects from DataHub dashboard.
* In the future, we may add other platforms like GitLab etc.
* Deploy on every push to any branch
  * Main branch => production => main URL
  * Other branches => with hash or branch name => branchOrHash.dataset.username.datahub.io
* Create a new project/dataset from a template (?)
* Have a status check in the GitHub UI that shows if your deployment succeeded/failed/pending


## History

### v1 DataHub(.io)

This was the original CKAN.net starting from 2007 up until circa 2016. It was powered by CKAN and changed from CKAN.net to DataHub.io (first thedatahub.org) around 2012.

### v2 DataHub(.io)

In 2016-2017 DataHub v2 was created and launched. This was a rewrite from scratch with a vision of a next generation DataHub. Datasets were all Frictionless, all data was stored (no more metadata only datasets), there was built in data workflows for processing data including validation, data summarization, CSV to JSON. Visualizations were supported, completely new and elegant UI, command line by default (in fact no UI for creating datasets though one was planned).

v2 was actively worked on from ~2016 to late 2018. It was a major advance technically and product wise on the old DataHub. However, it did not get traction and was rather complex (even if simpler than old CKAN): not only did we build presentation but we were also building our own data factory from the ground up plus doing versioning. There are other people doing parts of that better (we even argued for using airflow vs build our own factory at the time). In addition, i would observe that:

* Code goes with the data so you want to keep them together
* People want to use their existing tools (e.g. pandas or airflow vs another ETL system)
* People want to keep their data (and code) in their “system” if possible (for security, compliance, privacy etc)
 
We were trying to solve several different problems (with very limited resource):

* Data showcasing
* Lightweight ETL (data factory)
* Data deployment (some combination of the above)
* Marketplace

In particular, we never resolved an ambiguity slightly ambiguous whether we were a data marketplace (we tried this as a pivot for some period from late 2017) or a data publishing platform.

### v3 DataHub

We've been thinking about a v3 of DataHub since 2019. Originally, the core idea was to retain catalog aspect but move to being more git(hub) backed. See for example this (deprecated) outline idea for v3: https://github.com/datopian/datahub-next (NB: Git(hub) backed data portals remain an active idea and as of Q1 2021 we've implemented one and plan more. However it is not the focus for DataHub but is instead probably part of the Portal.JS and CKAN evolution).