# CKAN v3

## Introduction

This document describes the architectures of CKAN v2 ("CKAN Classic"), CKAN v3 (also known as "CKAN Next Gen" for Next Generation), and CKAN v3 hybrid. The latter is an intermediate approach towards v3, where we still use CKAN v2 and common extensions, and only create microservices for new features.

You will also find out how to do common tasks such as theming or testing, in each of the architectures.

*Note: this blog post has an overview of the more decoupled, microservices approach at the core of v3: https://www.datopian.com/2021/05/17/a-more-decoupled-ckan/*

## CKAN v2, CKAN v3 and Why v3

In yellow, you see one single Python process:

```mermaid
graph TB
  subgraph ckanclassic["CKAN Classic"]
    ckancore["Core"]
  end
```

When you want to extend core functionality of CKAN v2 (Classic), you write a Python package that must be installed in CKAN. This way, the extension will also run in the same process as the core functionality. This is known as a monolithic architecture.

```mermaid
graph TB
  subgraph ckanclassic["CKAN Classic"]
    ckancore["Core"] --> ckanext["CKAN Extension 1"]
  end
```

When you start to add multiple features, through extensions, what you get is one single Python process running many non-related functionalities.

```mermaid
graph TB
  subgraph ckanclassic["CKAN Classic"]
    ckancore["Core"] --> ckanext["CKAN Extension 1"]
    ckancore --> ckanext2["CKAN Extension 2"]
    ckancore --> ckanext3["CKAN Extension 3"]
    ckancore --> ckanext4["CKAN Extension 4"]
    ckancore --> ckanext5["CKAN Extension 5"]
  end
```

This monolithic approach has advantages in terms of simplicity of development and deployment, especially when the system is small. However, as it grows in scale and scope, there are an increasing number of issues.

In this approach, an optional extension has the ability to crash the whole CKAN instance. Every new feature must be written in the same language and framework (e.g. Python, leveraging Flask or Django). And, perhaps most fundamentally, the overall system is highly coupled, making it complex and hard to understand, debug, extend, and evolve.

### Microservices and CKAN v3

The main way to address these problems while gaining extra benefits is to move to a microservices-based architecture.

Thus, we recommend building the next version of CKAN – CKAN v3 – on a microservices approach.

[!tip]CKAN v3 is sometimes also referred to as CKAN Next Gen(eration).

With microservices, each piece of functionality runs in its own service and process. 

```mermaid
graph TB
  subgraph ckanapi3["CKAN API 3"]
    ckanapi31["API 3"]
  end

  subgraph ckanapi2["CKAN API 2"]
    ckanapi21["API 2"]
  end
  
  subgraph ckanapi1["CKAN API 1"]
    ckanapi11["API 1"]
  end

  subgraph ckanfrontend["CKAN frontend"]
    ckanfrontend1["Frontend"]
  end
  
  ckanfrontend1 --> ckanapi11
  ckanfrontend1 --> ckanapi21
  ckanfrontend1 --> ckanapi31
```

### Incremental Evolution – Hybrid v3

One of the other advantages of the microservices approach is that it can also be used to extend and evolve current CKAN v2 solutions in an incremental way. We term these kinds of solutions "Hybrid v3," as they are a mix of v2 and v3 together. 

For example, a Hybrid v3 data portal could use a new microservice written in Node for the frontend, and combine that with CKAN v2 (with v2 extensions).

```mermaid
graph TB
  subgraph ckanapi3["CKAN API 3"]
    ckanapi31["API 3"]
  end

  subgraph ckanapi2["CKAN API 2"]
    ckanapi21["API 2"]
  end
  
  subgraph ckanapi1["CKAN API 1"]
    ckanapi11["API 1"]
  end

  subgraph ckanfrontend["CKAN frontend"]
    ckanfrontend1["Frontend"]
  end
  
  subgraph ckanclassic["CKAN Classic"]
    ckancore["Core"] --> ckanext["CKAN Extension 1"]
    ckancore --> ckanext2["CKAN Extension 2"]
  end
  
  ckanfrontend1 --> ckancore
  ckanfrontend1 --> ckanapi11
  ckanfrontend1 --> ckanapi21
  ckanfrontend1 --> ckanapi31
```

The hybrid approach means we can evolve CKAN v2 "Classic" to CKAN v3 "Next Gen" incrementally. In particular, it allows people to keep using their existing v2 extensions, and upgrade them to new microservices gradually.

### Comparison of Approaches

|              | CKAN v2 (Classic) | CKAN v3 (Next Gen) | CKAN v3 Hybrid |
| ------------ | ------------------| -------------------| ---------------|
| Architecture | Monolithic        | Microservice       | Microservice with v2 core |
| Language     | Python            | You can write services in any language you like.<br/><br/>Frontend default: JS.<br/>Backend default: Python | Python and any language you like for microservices. |
| Frontend (and theming) | Python with Python CKAN extension | Flexible. Default is modern JS/NodeJS based | Can use old frontend but default to new JS-based frontend. |
| Data Packages | Add-on, no integration | Default internal and external format | Data Packages with converter to old CKAN format. |
| Extension | Extensions are libraries that are added to core runtime. They must therefore be built in python and are loaded into the core process at build time. "Template/inheritance" model where hooks are in core and it is core that loads and calls plugins. This means that if a hook does not exist in core then the extension is stymied. | Extensions are microservices and can be written in any language. They are loaded into the url space via kubernetes routing manager. Extensions hook into "core" via APIs (rather than in code). Follows a "composition" model rather than inheritance model | Can use old style extensions or microservices. |
| Resource Scaling | You have a single application so scaling is of the core application. | You can scale individual microservices as needed. | Mix of v2 and v3 |

## Why v3: Long Version

What are the problems with CKAN v2's monolithic architecture in relation to microservices v3?

* **Poor Developer Experience (DX), innovability, and scalability due to coupling**. Monolithic means "one big system" => Coupling & Complexity => hard to understand, change and extend. Changes in one area can unexpectedly affect other areas. 
  * DX to develop a small new API requires wiring into CKAN core via an extension. Extensions can interact in unexpected ways.
  * The core of people who fully understand CKAN has stayed small for a reason: there's a lot of understand.
  * https://github.com/ckan/ckan/issues/5333 is an example of a small bug that's hard to track down due to various paths involved.
  * Harder to make incremental changes due to coupling (e.g. Python 3 upgrade requires *everything* to be fixed at once - can't do rolling releases).
* **Stability**. One bad extension crashes or slows down the whole system
* **One language => Less developer flexibility (Poor DX)**. Have to write *everything* in Python, including the frontend. This is an issue especially for the frontend: almost all modern frontend development is heavily Javascript-based and theme is the #1 thing people want to customize in CKAN. At the moment, that requires installing *all* of CKAN core (using Docker) plus some familiarity with Python and Jinja templating. This is a big ask.
* **Extension stablity and testing**. Testing of extensions is painful (at least without careful factoring in a separate mini library) and are therefore often not tested; they don't have Continuous Integration (CI) or Continuous Deployment (CD). As an example, a highly experienced Python developer at Datopian was still struggling to get extension tests working 6 months into their CKAN work.
* **DX is poor especially when getting started**. Getting CKAN up and running requires multiple external services (database, Solr, Redis, etc.) making Docker the only viable way for bootstraping a local development environment. This makes getting started with CKAN daunting and painful.
* **Vertical scalability is poor**. Scaling the system is costly as you have to replicate the whole core process in every machine.
* **System is highly coupled.** Extensions b/c in process tend to end up with significant coupling to core which makes them brittle (has improved with plugins.toolkit)
  * Upgrading core to Python 3 requires upgrading *all* extensions because they run in the same process.
  * Search Index is not a separate API, but in Core. So replacing Solr is hard.

The top 2 customizations of CKAN are slow and painful and require deep knowledge of CKAN:

* Theming a site.
* Customizing the metadata.

## Architectures

### CKAN v2 (Classic)

This diagram is based on the file `docker-compose.yml` of [github.com/okfn/docker-ckan](https://github.com/okfn/docker-ckan) (`docker-compose.dev.yml` has the same components, but different configuration).
 
A difference from this diagram to the file is that we are not including DataPusher, as it is not a required dependency.

>[!tip]Databases may run as Docker containers, or rely on third-party services such as Amazon Relational Database Service (RDS).



```mermaid
graph LR

CKAN[CKAN web app]

CKAN --> DB[(Database)]
CKAN --> Solr[(Solr)]
CKAN --> Redis[(Redis)]

subgraph Docker container
  CKAN
end
```

Same setup showing some of the key extensions explicitly:

```mermaid
graph LR
  core[CKAN Core] --> DB[(Database)]
  datastore --> DB2[(Database - DataStore)]
  core --> Solr[(Solr)]
  core --> Redis[(Redis)]
  
  subgraph Docker container
    core
    datastore
    datapusher
    imageview
    ...
  end
```

CKAN ships with several core extensions that are built-in. Here, together with the list of main components, we list a couple of them:

Name | Type | Repository | Description
-----|------|------------|------------
CKAN | Application (API + Worker) | [Link](https://github.com/ckan/ckan) | Data management system (DMS) for powering data hubs and data portals. It's a monolithical web application that includes several built-in extensions and dependencies, such as a job queue service. In theory, it's possible to run it without any extensions.
datapusher | CKAN Extension | [Link](https://github.com/ckan/ckan/tree/master/ckanext/datapusher) | It could also be called "datapusher-connect." It's a glue code to connect with a separate microservice called DataPusher, which performs actions when new data arrives.
datastore | CKAN Extension | [Link](https://github.com/ckan/ckan/tree/master/ckanext/datastore) | The interface between CKAN and the structure database, the one receiving datasets and resources (CSVs). It includes an API for the database and an administrative UI.
imageview | CKAN Extension | [Link](https://github.com/ckan/ckan/tree/master/ckanext/imageview) | It provides an interface for creating HTML templates for image resources.
multilingual | CKAN Extension | [Link](https://github.com/ckan/ckan/tree/master/ckanext/multilingual) | It provides an interface for translation and localization.
Database | Database | | People tend to use a single PostgreSQL instance for this. Separated in multiple databases, it's the place where CKAN stores its own information (sometimes referred as "MetaStore" and "HubStore"), rows of resources (StructuredStore or DataStore), and raw datasets and resources ("BlobStore" or "FileStore"). The latter may store data in the local filesystem or cloud providers, via extensions.
Solr | Database | | It provides indexing and full-text search for CKAN.
Redis | Database | | Lightweight key-value store, used for caching and job queues.

### CKAN v3 (Next Gen)

CKAN Next Gen is still a DMS, as CKAN Classic; but rather than a monolithical architecture, it follows the microservices approach. CKAN Classic is not a dependency anymore, as we have smaller services providing functionality that we may or many not choose to include. This description is based on [Datopian's Technical Documentation](/docs/dms/ckan-v3/next-gen/#roadmap).

```mermaid
graph LR
  subgraph api3["..."]
    api31["API"]
  end

  subgraph api2["Administration"]
    api21["API"]
  end
  
  subgraph api1["Authentication"]
    api11["API"]
  end

  subgraph frontend["Frontend"]
    frontendapi["API"]
  end
  
  subgraph storage["Raw Resources Storage"]
    storageapi["API"]
  end
  
  storageapi --> cloudstorage[(Cloud Storage)]
  
  frontendapi --> storageapi
  frontendapi --> api11
  frontendapi --> api21
  frontendapi --> api31
```

At this moment, many important features are only available through CKAN extensions, so that brings us to the hybrid approach.

### CKAN Hybrid v3 (Next Gen)

We may sometimes make an explit distinction between CKAN v3 "hybrid" and "pure." The reason is because we want to ensure that we're not there yet – we have many opportunities to extract features out of CKAN and CKAN Extensions.

In this approach, we still rely on CKAN Classic and all its extensions. Many already had many tests and bugs fixed, so we can deliver more if not forced to rewrite everything from scratch.

```mermaid
graph TB
  subgraph ckanapi3["CKAN API 3"]
    ckanapi31["API 3"]
  end

  subgraph ckanapi2["CKAN API 2"]
    ckanapi21["API 2"]
  end
  
  subgraph ckanapi1["CKAN API 1"]
    ckanapi11["API 1"]
  end

  subgraph ckanfrontend["Frontend"]
    ckanfrontend1["Frontend v2"]
    theme["[Project-specific theme]"]
  end
  
  subgraph ckanclassic["CKAN Classic"]
    ckancore["Core"] --> ckanext["CKAN Extension 1"]
    ckancore --> ckanext2["[Project-specific extension]"]
  end
  
  ckanfrontend1 --> ckancore
  ckanfrontend1 --> ckanapi11
  ckanfrontend1 --> ckanapi21
  ckanfrontend1 --> ckanapi31
```

Name | Type | Repository | Description
-----|------|------------|------------
Frontend v2 | Application | [Link](https://github.com/datopian/frontend-v2) | Node application for Data Portals. It communicates with a CKAN Classic instance, through its API, to get data and render HTML. It is written to be extensible, such as connecting to other applications and theming.
[Project-specific theme] | Frontend Theme | e.g., [Link](https://github.com/datopian/frontend-oddk) | Extension to Frontend v2 where you can personalize the interface, create different pages, and connect with other APIs.
[API 1] | Application | e.g., [Link](https://github.com/datopian/data-subscriptions) | Any application with an API to communicate with the user-facing Frontend v2 or to run tasks in background. Given the current architecture, often, this API is usually designed to work with CKAN interfaces. Over time, we may choose to make it more generic, and even replace CKAN Core with other applications.

## Job Stories

In this spreadsheet, you will find a list of common job stories in CKAN projects. Also, how you can accomplish them in CKAN v2, v3, and Hybrid v3.

https://docs.google.com/spreadsheets/d/1cLK8xylprmVsoQIbdphqz9-ccSpdDABQExvKdvNJqaQ/edit#gid=757361856

## Glossary

### API

An HTTP API, usually following the REST style.

### Application

A Python package, an API, a worker... It may have other applications as dependencies.
  
### CKAN Extension

A Python package following specification from [CKAN Extending guide](https://docs.ckan.org/en/2.8/extensions/index.html).
  
### Database

An organized collection of data.

### Dataset

A group of resources made to be distributed together.
  
### Frontend Theme

A Node project specializing behavior present in [Frontend v2](https://github.com/datopian/frontend-v2).
  
### Resource

A data blob. Common formats are CSV, JSON, and PDF.
  
### System

A group of applications and databases that work together to accomplish a set of tasks.
  
### Worker

An application that runs tasks in background. They may run recurrently according to a given schedule, or as soon as it's requested by another application.

## Appendix

### Architecture - CKAN v2 with DataPusher

```mermaid
graph TB
  subgraph DataPusher
    datapusherapi["DataPusher API"]
    datapusherworker["CKAN Service Provider"]
    SQLite[(SQLite)]
  end
  
  subgraph CKAN
    core
    datapusher[datapusher ext]
    datastore
    ...
  end
  
  core[CKAN Core] --> datastore
  datastore --> DB[(Database)]
  datapusherapi --> core
  datapusher --> datapusherapi
```

Name | Type | Repository | Description
-----|------|------------|------------
DataPusher | System | [Link](https://github.com/ckan/datapusher) | Microservice that parses data files and uploads them to the datastore.
DataPusher API | API | [Link](https://github.com/ckan/datapusher) | HTTP API written in Flask. It is called from the built-in `datapusher` CKAN extension whenever a resource is created (and has the right type).
CKAN Service Provider | Worker | [Link](https://github.com/ckan/ckan-service-provider) | Library for making web services that make functions available as synchronous or asynchronous jobs.
SQLite | Database | | Unknown use. Possibly a worker dependency.

### Old Next Gen Page

Prior to this page, we had one called "Next Gen." It has intersections with this article, although it focuses more on the benefits of microservices. For the time being, the page still exists in [/ckan-v3/next-gen](/docs/dms/ckan-v3/next-gen), although it may get merged with this one in the future.
