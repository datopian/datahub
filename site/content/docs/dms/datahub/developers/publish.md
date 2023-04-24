# Publish

Explanation of DataHub publishing flow from client and back-end perspectives.

```mermaid

graph TD


  cli((CLI fa:fa-user))
  auth[Auth Service]
  cli --login--> auth
  
	
	cli --store--> raw[Raw Store API<br>+ Storage]  
  
	cli --package-info--> pipeline-store
  raw --data resource--> pipeline-runner
  
  pipeline-store -.generate.-> pipeline-runner
	
  pipeline-runner --> package[Package Storage]
	package --api--> frontend[Frontend]
  frontend --> user[User fa:fa-user]
  

  
  package -.publish.->metastore[MetaStore]
  pipeline-store -.publish.-> metastore[MetaStore]
  metastore[MetaStore] --api--> frontend
  
```

## Diagram for upload process

```mermaid
graph TD

  CLI --jwt--> rawstore[RawStore API]
  rawstore --signed urls--> CLI
  CLI --upload using signed url--> s3[S3 bucket]
  s3 --success message--> CLI
  CLI --metadata--> pipe[Pipe Source]
```

## Identity Pipeline

**Context: where this pipeline fits in the system**

```mermaid
graph LR

  specstore --shared db--> assembler
  assembler --identity pipeline--> pkgstore
  pkgstore --> frontend
```

**Detailed steps**

```mermaid
graph LR

  load[Load from RawStore] --> encoding[Encoding Check<br>Add encoding info]
  encoding --> csvkind[CSV kind check]
  csvkind --> validate[Validate data]
  validate --> dump[Dump S3]
  dump --> pkgstore[Pkg Store fa:fa-database]
  load -.-> dump
  validate --> checkoutput[Validation<br>Reports]
```


## Client Perspective

Publishing flow takes the following steps and processes to communicate with DataHub API:

```mermaid
sequenceDiagram
Upload Agent CLI->>Upload Agent CLI: Check Data Package valid
Upload Agent CLI-->>Auth(SSO): login
Auth(SSO)-->>Upload Agent CLI: JWT token
Upload Agent CLI->>RawStore API: upload using signed url
RawStore API->>Auth(SSO): Check key / token
Auth(SSO)->>RawStore API: OK / Not OK
RawStore API->>Upload Agent CLI: success message
Upload Agent CLI->>pipeline store: package info
pipeline store->>Upload Agent CLI: OK / Not OK
pipeline store->>pipeline runner: generate
RawStore API->>pipeline runner: data resource
pipeline runner->>Package Storage: generated
Package Storage->>Metadata Storage API: publish
pipeline store->>Metadata Storage API: publish
Metadata Storage API->>Upload Agent CLI: OK / Not OK
```
<br/>

* Upload API - see `POST /source/upload` in *source* section of [API][api]
* Authentication API - see `GET /auth/check` in *auth* section of [API][api].
* Authorization API - see `GET /auth/authorize` in *auth* section of [API][api].

See example [code snippet in DataHub CLI][publish-code]

[api]: /docs/dms/datahub/developers/api
[publish-code]: https://github.com/datahq/datahub-cli/blob/b869d38073248903a944029cf93eddf3ef50001a/bin/data-push.js#L34

[api]: /docs/dms/datahub/developers/api

