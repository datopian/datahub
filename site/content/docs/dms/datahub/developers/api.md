# DataHub API

The DataHub API provides a range of endpoints to interact with the platform. All endpoints live under the URL `https://api.datahub.io` where our API is divided into the following sections: **auth, rawstore, sources, metastore, resolver**. 

## Auth

A generic OAuth2 authentication service and user permission manager. 

https://github.com/datahq/auth#api

## Rawstore

DataHub microservice for storing blobs i.e. files. It is a lightweight auth wrapper for n S3-compatible object store that integrates with the rest of the DataHub stack and especially the auth service.

https://github.com/datahq/bitstore#api

## Sources

An API server for managing a Source Spec Registry.

https://github.com/datahq/specstore#api

## Metastore

A search services for DataHub. 

https://github.com/datahq/metastore#api

## Resolver

DataHub microservice for resolving datapackage URLs into more human readable ones.

https://github.com/datahq/resolver#api
 
