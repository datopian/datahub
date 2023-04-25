# DMS (Data Management System)

This document is an introduction to the technical design of Data Management Systems (DMS). This also covers Data Portals since Data Portals are one major solution one can build with a data management system.

## Domain Model

* Project: a data project. It has has a single dataset in the same way GitHub or Gitlab "project" has a single repo. Traditionally in, say CKAN, this has been implicit and identified with the dataset. There are, however, important differences: a project can include a dataset but also other related functionality such as issues, workflows etc.
* Dataset: a set of data, usually zero or more resources.
* Resource (or File): a single data object.

Revisioning
 
* Revision
* Tag
* (Branch)

Presentation

* View
* Showcase
* Data API

Identity and Permissions

* Account
* Profile
* Permission

Data Factory

* Task
* DAG (Pipeline)
* Run (Job)

### GraphQL version

```graphql=
type Project {
  id: ID!
  description: String
  readme: String
  dataset: Dataset
  views: [View]
  issues: [Issue]
  actions: [Action]
}

type Dataset {
  # data package descriptor structure
  id: ID
  name: String
  ...
  resources: [Resource]
}

type Resource {
  # follows Frictionless Resource
  path: ...
  id: ...
  name: ...
  schema: Schema
}

# Table Schema usually ...
type Schema {

}

# dataset view e.g. table, graph, map etc
type View {
  id: ID!
}
```

## Actions / Flows [component]

* View Dataset: [Showcase page] a page displaying the dataset (or a resource)
  * View a Revision / Tag / Branch:
* Add / Upload: ...
* Tag

## Components

* **Meta~~Store~~Service**: stores dataset metadata (and revisions)
* **HubStore**: stores all the users, organizations and their connections to the datasets.
* **SearchStore + Service**: search index and API
* **BlobStore**: stores blobs (for files)
