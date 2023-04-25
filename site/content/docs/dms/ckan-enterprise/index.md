# CKAN Enterprise

## Introduction

CKAN Enterprise is our name for what we plan would become our standard "base" distribution for CKAN going forward:

* It is a CKAN standard code base with micro-services.
* Enterprise grade data catalog and portal targeted at Gov (open data portals) and Enterprise (Data Catalogs +).
* It is also known as [Datopian DMS](https://www.datopian.com/datopian-dms/).

## Roadmap 2021 and beyond

|                   | Current                                                                                    | CKAN Enterprise                                                 |
|-------------------|--------------------------------------------------------------------------------------------|-----------------------------------------------------------------|
| Raw storage       | Filestore                                                                                  | Giftless                                                        |
| Data Loader (db)  | DataPusher extension                                                                       | Aircan                                                          |
| Data Storage (db) | Postgres                                                                                   | Any database engine. By default, Postgres                       |
| Data API (read)   | Built-in DataStore extension's API including SQL endpoint                                  | GraphQL based standalone micro-service                          |
| Frontend (public) | Build-in frontend into CKAN Classic python app (some projects are using nodejs app)        | PortalJS or nodejs app                                          |
| Data Explorer     | ReclineJS (some projects that uses nodejs app for frontend have React based Data Explorer) | GraphQL based Data Explorer                                     |
| Auth              | Traditional login/password + extendable with CKAN Classic extensions                       | SSO with default Google, Github, Facebook and Microsoft options |
| Permissions       | CKAN Classic based permissions                                                             | Existing permissions exposed via JWT based authz API            |

## Timeline 2021

To develop a base distribution of CKAN Enterprise, we want to build a demo project with the features from the roadmap. This way we can:

* understand its advantages/limitations;
* compare against other instances of CKAN;
* demonstrate for the potential clients.

High level overview of the planned features with ETA:

| Name                          | Description                          | Effort | ETA |
| ----------------------------- | ------------------------------------ | ------ | --- |
| [Init](#Init)                 | Select CKAN version and deploy to DX | xs     | Q2  |
| [Blobstore](#Blobstore)       | Integrate Giftless for raw storage   | s      | Q2  |
| [Versioning](#Versioning)     | Develop/integrate new versioning sys | l      | Q3  |
| [DataLoader](#DataLoader)     | Develop/integrate Aircan             | xl     | Q3  |
| [Data API](#Data-API)         | Integrate new Data API (read)        | m      | Q2  |
| [Frontend](#Frontend)         | Build a theme using PortalJS         | s      | Q2  |
| [DataExplorer](#DataExplorer) | Integrate into PortalJS              | s      | Q2  |
| [Permissions](#Permissions)   | Develop permissions in read frontend | m      | Q4  |
| [Auth](#Auth)                 | Integrate                            | s      | Q4  |

### Init

Initialize a new project for development of CKAN Enterprise.

Tasks:

* Boot project in Datopian-DX cluster
* Use CKAN v2.8.x (latest patch) or 2.9.x
* Don't setup DataPusher
* Namespace: `ckan-enterprise`
* Domain: `enterprise.ckan.datopian.com`

### Blobstore

See [blob storage](/docs/dms/blob-storage#ckan-v3)

### Versioning

See [versioning](/docs/dms/versioning#ckan-v3)

### DataLoader

See [DataLoader](/docs/dms/load)

### Data API

* Install new [Data API service](https://github.com/datopian/data-api) in the project
* Install Hasura service in the project
* Set it up to work with DB of CKAN Enterprise
* Read more about Data API [here](/docs/dms/data-api#read-api-3)

Notes:

* We could experiment and use various features of Hasura, eg:
  * Setting up row/column limits per user role (permissions)
  * Subscriptions to auto load new data rows

### Frontend

PortalJS for the read frontend of CKAN Enterprise. [Read more](/docs/dms/frontend/#frontend).

### DataExplorer

A new Data Explorer based on GraphQL API: https://github.com/datopian/data-explorer-graphql

### Permissions

See [permissions](/docs/dms/permissions#permissions-authorization).

### Auth

Next generation, Kratos based, authentication (mostly SSO with no Traditional login by default) with following options out of the box:

* GitHub
* Google
* Facebook
* Microsoft

Easy to add:

* Discord
* GitLab
* Slack
