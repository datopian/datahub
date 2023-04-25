<div className="hero" style={{textAlign: "center"}}>
  <h1>Datopian Tech</h1>

  <a href="https://datopian.com/">
    <img src="/static/img/datopian-logo.png" style={{maxWidth: "280px", display: "block", margin: "3rem auto 1.5rem"}} />
  </a>

  <p className="description" style={{fontSize: "1.6rem", lineHeight: 1.3}}>
    We are experts in data management and engineering

    This is an overview of our technology

  </p>
</div>

## Data Management Systems

A [Data Management System (DMS)][dms] is a _framework_. It can be used to create a variety of _solutions_ such as [Data Portals][], [Data Catalogs][], [Data Lakes][] (or Data Meshes) etc. We have developed two DMS stacks that share a set of underlying core components:

- [CKAN][]: the open source data management system we created in 2007 and that we continue to develop and maintain. The main information on CKAN is at https://ckan.org/. Here we have some specific notes on how we develop and deploy CKAN as well as our thoughts on the [next generation of CKAN (v3)][v3].
- [DataHub][]: a simpler version of CKAN focused on SaaS platform at DataHub.io. DataHub and CKAN v3 share many of the same core components.

[data portals]: /docs/dms/data-portals
[data lakes]: /docs/dms/data-lake
[data catalogs]: /docs/dms/data-portals
[dms]: /docs/dms/dms
[CKAN]: /docs/dms/ckan

### Solutions

You can use a DMS to build many kinds of specific solutions

- [Data Portals][portals] are gateways to data. That gateway can be big or small, open or restricted. For example, data.gov is open to everyone, whilst an enterprise "intra" data portal is restricted to its personnel.
- Data Catalog: see https://ckan.org/
- Metadata manager: see [Publishing][]
- Data Lake: you can use a DMS to rapidly create a data lake using existing infrastructure. For example, using the DMS' catalog and storage gateway with existing cloud storage and data processing capabilities.
- Data Engineering: you can use components of the DMS to rapidly create, orchestrate and supply data pipelines.

[dms]: /docs/dms/dms
[portals]: /docs/dms/data-portals
[publishing]: /docs/dms/publish
[datahub]: /docs/dms/datahub
[ckan]: /docs/dms/ckan
[v3]: /docs/dms/ckan-v3

### Features

A DMS has a variety of features. This section provides an overview and links to specific feature pages that include details of how they work in CKAN and CKAN v3 / DataHub.

<img src="https://docs.google.com/drawings/d/e/2PACX-1vRdMzNeIAEkjDRGtBfuocy6zDyRg_qDujSkLrTe69U1qlu_1kfTYN0OL_v4IZKKo0eDXRbCzgzQMlFz/pub?w=622&amp;h=635" />

> [!tip] There are many ways to break down features and this is just one framing. We are thinking about others and if you have thoughts please get in touch.


- [Discovering and showcasing data (catalog and presenting)](/docs/dms/frontend)
- [Views on data](/docs/dms/views) including visualizing and previewing data as well [Data Explorers][explorer] and [Dashboards][]
- [Publishing data](/docs/dms/publish)
- [Data API DataStore](/docs/dms/data-api)
- [Permissions](/docs/dms/permissions) and [Authentication](/docs/dms/authentication)
- [Versioning](/docs/dms/versioning)
- [Harvesting](/docs/dms/harvesting)

[dashboards]: /docs/dms/dashboards
[explorer]: /docs/dms/data-explorer

### Components

A DMS has the following key components:

- [HubStore](/docs/dms/hubstore)
- [Data Flows and Factory](/docs/dms/flows)
  - [Loading to DataStore](/docs/dms/load)
- [Storage](/docs/dms/storage)
  - [Blob Storage](/docs/dms/blob-storage)
  - [Structured Storage - see DataStore](/docs/dms/data-api)

https://coggle.it/diagram/Xiw2ZmYss-ddJVuK/t/data-portal-feature-breakdown

<iframe width='540' height='480' src='https://embed.coggle.it/diagram/Xiw2ZmYss-ddJVuK/b24d6f959c3718688fed2a5883f47d33f9bcff1478a0f3faf9e36961ac0b862f' frameBorder='0' allowFullScreen></iframe>

## Frictionless

The Frictionless approach to data. See https://frictionlessdata.io/

Our team created this whilst at Open Knowledge Foundatioin and continue to co-steward it.

## OpenSpending

https://openspending.org/

## Developer Experience

Service Reliability Engineering (SRE) and Developer Experience (DX) for our CKAN cluster technology.

- [Developer Experience][dx]
- [DX - Deploy](/docs/dms/dx/deploy)
- [DX - Cluster](/docs/dms/dx/cluster)

Old cluster

- [Deploy in old cluster](/docs/dms/deploy)
- [Exporting from CKAN-Cloud](/docs/dms/migration)
- [Cloud](/docs/dms/cloud) - start on CKAN cloud documentation

## Research

- [Data Frames and what would a JS data frame library look like](/docs/dms/dataframe)
- [Dataset Relationships](/docs/dms/relationships)

## Miscellaneous

- [Glossary &raquo;](/docs/dms/glossary)
- [Notebook -- our informal blog &raquo;](/docs/dms/notebook)

[dx]: /docs/dms/dx
