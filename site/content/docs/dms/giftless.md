# Giftless - the GIT LFS server

## Introduction

Our work on Giftless started from the context of two distinct needs:

* Need: direct to (cloud) storage uploading (and download) including from client => you need a service that will issue tokens to upload direct to storage -- what we term a "Storage Access Gateway" =>The Git LFS server protocol actually provides this with its `batch` API. Rather than reinventing the wheel let's use this existing protocol.
* Need: git is already widespread and heavily used by data scientists and data engineers. However, git does not support large files well whilst data work often involves large files. Git LFS is the protocol designed to support large file storage stored outside of git blobstore. If we have our own git lfs server then we can integrate any storage we want with git.

From these we arrived at a vision for a standalone Git LFS server (standalone in contrast to the existing git lfs servers provided as an integrated part of existing git hosting providers such as github or gitlab). We also wanted to be able to customize it so it could be backed onto any major cloud storage backend (e.g. S3, GCS, Azure etc). We also had a preference for Python.

**Why build something new?** We looked around at the existing [Git LFS server implementations][impl] and couldn't find one that looked like it suit our needs: there were only a few standalone servers, only one in Python, and those that did exist were usually quite out of date and supported old versions of the LFS protocol (see appendix below for further details).

[impl]: https://github.com/git-lfs/git-lfs/wiki/Implementations

## Giftless API

Giftless follows the [gif-lfs API][lfsapi] in general, with the following differences and extensions:

* Locking: no support at present
* Multipart: giftless adds support for multi-part transfers. See XXX for details
* Giftless adds optional support for `x-filename` object property, which allows specifying the filename of an object in storage (this allows storage backends to set the "Content-disposition" header when the file is downloaded via a browser, for example)

Below we summarize the key API endpoints.

[lfsapi]: https://github.com/git-lfs/git-lfs/tree/master/docs/api

### `POST /foo/bar/objects/batch`

```
{
  "transfers": ["multipart-basic", "basic"],
  "operation": "upload",
  "objects": [
    {
      "oid": "20492a4d0d84f8beb1767f6616229f85d44c2827b64bdbfb260ee12fa1109e0e",
      "size": 10000000
    }
  ]
}
```

### Optional API endpoints

The following endpoints are also exposed by Giftless, but may not be used in some workflows, depending on your setup:

#### `POST /foo/bar/objects/storage/verify`

Verify an object in storage; This is used by different storage backends to check
a file after it has been uploaded, corresponding to the Git LFS `verify` action.

#### `PUT /foo/bar/objects/storage`

Store an object in local storage; This is only used if Giftless is configured to also
act as the storage backend server, which is not a typical production setup. This accepts
the file to be uploaded as HTTP request body.

An optional `?jwt=...` query parameter can be added to specify a JWT auth token, if JWT
auth is in use.

#### `GET /foo/bar/objects/storage`

Fetch an object from local storage; This is only used if Giftless is configured to also
act as the storage backend server, which is not a typical production setup. This will
return the file contents.

An optional `?jwt=...` query parameter can be added to specify a JWT auth token, if JWT
auth is in use.

### Comment: why the slightly weird API layout

The essence of giftless is to hand out tokens to store or get data in blob storage. One would anticipae the basic API to be a bit simpler e.g. something like implemented in our earlier effort `bitstore`: https://github.com/datopian/bitstore#get-authorized-upload-urls

```json=
POST /authorize

{
    "metadata": {
        "owner": "<user-id-of-uploader>",
        "name": "<data-set-unique-id>"
    },
    "filedata": {
        "filepath": {
            "length": 1234, #length in bytes of data
            "md5": "<md5-hash-of-the-data>",
            "type": "<content-type-of-the-data>",
            "name": "<file-name>"
        },
        "filepath-2": {
            "length": 4321,
            "md5": "<md5-hash-of-the-data>",
            "type": "<content-type-of-the-data>",
            "name": "<file-name>"
        }
        ...
    }
}
```

However, the origins of git lfs with github means that it has a slightly odd setup whereby the start of the url is `/foo/bar` corresponding to `{org}/{repo}`.

## Mapping from Giftless to Storage

One important question when using giftless is how a file maps from api call to storage ...

This call:

```
/foo/bar/objects/batch

oid: (sha256) xxxx
```

Maps in storage to ...

```
storage-bucket/{prefix}/foo/bar/xxx
```

Where `{prefix}` is configured as env variable to Giftless server (and can be empty)


## Authentication and Authorization

How does giftless determine that you are allowed to upload to

```
/foo/bar/objects/batch

oid: XXXX
```

Does that based on scopes on jwt token ...

See https://github.com/datopian/giftless/blob/feature/21-improve-documentation/docs/source/auth-providers.md for more details.


## Use with git

https://github.com/git-lfs/git-lfs/blob/master/docs/api/server-discovery.md

Set `.lfsconfig`

## Appendix: Summary of Git LFS

https://github.com/git-lfs/git-lfs/blob/master/docs/api/batch.md

* TODO: sequence diagram of git interaction with gif lfs server
* TODO: summary of server API

### Summary of interaction (for git client)

* Perform server discovery to discover the git lfs server: https://github.com/git-lfs/git-lfs/blob/master/docs/api/server-discovery.md
  * Use `.lfsconfig` if it exists
  * Default: Git LFS appends .git/info/lfs to the end of a Git remote url to build the LFS server URL it will use:
* Authentication (?)
* Send a `batch` API call to the server configured in the Git client's .lfsconfig (TODO: verify config location)
    * The specifics of the `batch` request depend on the current operation being performed and the objects (that is files) operated on;
* The response to `batch` includes "instructions" on how to download / upload files to storage
    * Storage can be on the same server as Git LFS (in some dedicated endpoints) or on a whole different server, for example S3 or Google Cloud Storage
    * Git LFS defines a few "transfer modes" which define how to communicate with the storage server; The most basic mode (known as `"basic"`), uses HTTP GET and PUT to download / upload the files given a URL and some headers.
    * There could be other transfer modes - for example, Giftless defines a custom transfer mode called `multipart-basic` which is specifically designed to take advantage of Cloud storage vendors' multipart upload features.
* Based on the transfer mode & instructions (typically URL & headers) specified in the response to the `batch` call, the git lfs client will now interact with the storage server to upload / download files

### How git lfs works for git locally

* Have special git lfs blob storage in git directory
* On checkout pull from that blob store rather than standard one
* on Add and commit write a pointer file inito "git" tree instead of actual file and put file in git lfs blob storage
* On push: push git lfs blobs to blob server
* On pull: pull git lfs blobs that i need for current checkout
  * TODO: do i pull other stuff?

### Git LFS Server API

https://github.com/git-lfs/git-lfs/tree/master/docs/api

### Batch API

https://github.com/git-lfs/git-lfs/blob/master/docs/api/batch.md

TODO: summarize here.

## Appendix: Existing Git LFS server implementations

A review of some of the existing GIT LFS server implementations.

* https://github.com/kzwang/node-git-lfs Node, well developed but now archived and last updated 5y ago. This implementation provided inspiration for giftless.
* https://github.com/mgax/lfs: Python, only speaks legacy v1 API and last updated properly ~2y ago
* https://github.com/meltingice/git-lfs-s3 - Ruby, repo is archived. Last updated 6y ago.
