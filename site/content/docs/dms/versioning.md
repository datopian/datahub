# Versioning

## Introduction

Versioning is a feature that records changes to metadata and/or data. Think of it like "git for data".

Versioning means that so we can go back to previous revisions, track history and more. Versioning can also include features such as the ability to "tag" a given revision with a label e.g. "v1.0".

### Features

All the benefits you get with revisioning for code but for data ...

* Rollback: you can rollback (aka revert) to previous states of the data.
  * => Greater freedom to make changes: This, in turn, brings more freedom in making changes and the ability to recover from errors
* Pinning: the ability for dependent applications (e.g. an analytic workflow, or a data-driven web app) to "pin" their use of this data to a particular revision. This would be like declaring explicit version dependences in a software application.
  * => Reduced coupling, improving collaboration and independence: data curators can make changes (without worrying about breaking downstream users) *and* client users have confidence that their applications won't suddenly break
* Pull requests: the ability to receive contribution from other parties in a structured way (you have a middle way between everyone needing access to contribute and no-one having access to contribute).
  * => Easier, faster, distributed collaboration: therefore structured contribution model which in turn allows much faster, more open, more distributed collaboration
* Complex Merge: distributed contribution models, feature branches etc
* Changelogs: ... and therefore auditability (NB: this can be achieved other ways)

Also worth mentioning is the potential integration with code: now that your data has revisioning too, you can keep in sync between, for example, your machine learning model in code and your training data in the data management system.


### Terminology

Versioning as a term can be confusing because it is ambiguous. For example, when some people say "version" they mean a revision e.g. "does this tool support data versioning" (i.e. does it support recording each change to the data). Whilst, when other people say "version" they mean a release (revision tag) e.g. "what version of this software are you using" (answer: "version 1.3".[^rda]

We avoid this ambiguity by using specific terms -- revisioning and releases -- for these different features and reserving versioning for the overall system incorporating these.

[^rda]: Our terminology is the same as that identified by the [Research Data Alliance Data Versioning Working Group Report (2020)][rda-report]. They use the terminology Revision and Release (they also include Manifestation for the same data in e.g. different formats taking inspiration from FRBR).

[rda-report]: https://www.rd-alliance.org/group/data-versioning-wg/outcomes/principles-and-best-practices-data-versioning-all-data-sets-big

#### Revisioning

When you update a dataset (metadata or data) a new revision is created and the current state is "snapshotted" and preserved.

More generally, revisioning is functionality whereby changes to a dataset (and its child resources) are logged and prior state is accessible. For example, if a dataset with value "Foo" is changed to have value "Bar", one can still to access the previous revision where it had value "Foo".

Notes:

* Metadata or metadata and data revisioning: revisioning can be metadata only (it is rarely data only). For example, CKAN (as of v2) only revisions metadata.
* DAG or linear: revisioning can be simple "linear" revisioning or it can be full "DAG" (directed acyclic graph).
  * Linear: each revision has a single parent and successor e.g.
    ```mermaid
    graph LR

    a[rev A] --> b[rev B]
    b --> c[rev C]
    ```
    * DAG: "DAG" (directed acyclic graph) is where there can be branching and merging e.g.
    ```mermaid
    graph LR

    a[rev A] --> b[rev B]
    a --> c[rev C]
    b --> d[rev D]
    c --> d
    ```
* Branch labelling and management: with a DAG one can have multiple "branches" rather than just the single "trunk" of the linear case. With branches it can be useful to label these branches and to designate a "master" or primary branch to which new revisions are appended by default.

#### Releases

A Release is a specifically labelled revision (or tagged in git terminology) e.g. "v1.2". It is named Release because it is usually identifying a significant change in the data and hence something worthy of being "released" (i.e. formally shared). The tagging terminology arises because the simplest way to implement is "tag" a revision, i.e. create a labelled pointer to that revisions e.g. `v1.2`.

In addition, to a convenient name e.g. `v1.2` a release may also incorporate other metadata, for example a description e.g. `Introduced new column xyz and reformatted column abc`.

A release in itself is relatively simple functionality (once we have revisions). However, there may be significant business and technical processses associated e.g. downstream users have to make changes for a major release.

### Domain Model

* Revision: an object recording metadata of a revision e.g. when it happened, who created it etc.
* Release: a pointer to a specific revision with additional metadata e.g. name, description.

## CKAN v2

Out of the box CKAN has the following support:

* Revisioning: CKAN v2 (up to v2.8) used `vdm` to provide metadata revisioning. However, there was no data revisioning. In v2.9 `vdm` was removed and metadata revisioning is provided by the activity stream system.
* Releases: no support for releases.

There are significant limitations:

* Data revisioning is not supported.
* Releass (revision tags) are not supported.
* Only linear revision trees i.e. no branching

There have been efforts to implement this functionality via extensions however the functionality is limited (see e.g. Appendix re ckanext-datasetversions).

**Recently as part of CKAN v3 work there is now support for data versioning in CKAN v2 (>= 2.8) via extensions.**

## CKAN v3

The CKAN v3 approach is based on extensions that are backwards compatible with CKAN v2. Implementing data versioning in CKAN involves three distinct aspects:

* *Data* revisioning (CKAN already has metadata revisioning).
* Releases: support creating and managing releases (named labels plus a description for a specific revision of a dataset e.g. “v1.0”)
* General UI and functionality: things like diffs, reverting, etc

The first of these is is accomplished by using the new [Blob Storage v3](/docs/dms/blob-storage#ckan-v3).

The latter two are accomplished via [ckanext-versions][] extension.

**Status: Beta**

[ckanext-versions]: https://github.com/datopian/ckanext-versions


## Design

See [Versioning Design doc](/docs/dms/versioning/design).


## Open Questions

* How does revisioning work when a revisioned object e.g. Dataset has a reference to an unrevisioned object e.g. a Tag? For example, imagine an old dataset revision has a reference to a tag that has been deleted from the system? In this case displaying a link to that tag will fail.

## Appendix: Mapping against Git

Git terminology on left, our terminology on the right.

* Commit {'<=>'} Revision
* Tag {'<=>'} Release

## Appendix: ckanext-datasetversions

https://github.com/aptivate/ckanext-datasetversions/

There is an extension called ckanext-datasetversions with a basic implementation of dataset versioning. It implements the version as a child - father relationship between datasets. There is a detailed analysis of the package in this document.

The package internally use child_of relationship to model versions: "The plugin models dataset versions internally by creating a parent dataset, with minimal metadata and no resources. A child dataset is created for each version." So new versions are new datasets, and CKAN restrictions applies: these datasets cannot share url or name.

The package was created 4y ago and does not seem to be actively maintained.
