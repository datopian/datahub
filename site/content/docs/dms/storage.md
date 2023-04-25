# Data Storage for Data Portals

Data Portals often need to *store* data 😉 As such, they require a system for doing this. The systems for storing data can be classified into two types:

* [Blob Storage][] (aka Bulk or Raw): for storing data as "blobs", a raw stream of bytes like files on a filesystem. Think local filesystem or cloud storage like S3, GCS, etc. See [Blob Storage][] for more on this.
* Structured Storage: for storing data in a structured way e.g. tabular data in a relational database or "documents" in a document database.

>[!tip]In CKAN 2 Blob Storage (and associated functionality) was known as FileStore and Structured Storage was known as DataStore.

[Blob Storage]: /docs/dms/blob-storage
