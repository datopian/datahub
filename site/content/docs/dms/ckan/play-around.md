---
sidebar: auto
---

# How to play around with CKAN

In this section, we are going to show some basic functionality of CKAN focused on the API.

## Prerequisites

- We assume you've already completed the [Getting Started Guide](/docs/dms/ckan/getting-started).
- You have a basic understanding of Key data portal concepts:

CKAN is a tool for making data portals to manage and publish datasets. You can read about the key concepts such as Datasets and Organizations in the User Guide -- or you can just dive in and play around!

https://docs.ckan.org/en/2.9/user-guide.html

>[!tip]
Install a [JSON formatter plugin for Chrome](https://chrome.google.com/webstore/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa?hl=en) or browser of your choice.

If you are familiar with the command line tool `curl`, you can use that.

In this tutorial, we will be using `curl`, but for most of the commands, you can paste a link in your browser. For POST commands, you can use [Postman](https://www.getpostman.com/) or [Google Chrome Plugin](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop).


## First steps

>[!tip]
By default the portal is accessible on http://localhost:5000. Let's update your `/etc/hosts` to access it on http://ckan:5000:

```
vi /etc/hosts      # You can use the editor of your choice
# add following
127.0.0.1 ckan
```


At this point, you should be able to access the portal on http://ckan:5000.

![CKAN Home Page](https://i.imgur.com/T5LWo8A.png)

Let's add some fixtures to it. For software, a fixture is something used consistently (in this case, data for you to play around with). Run the following from your terminal (do NOT cut the previous docker process as this one depends on the already launched docker, run in another terminal):

```sh
docker-compose -f docker-compose.dev.yml exec ckan-dev ckan seed basic
```

Optionally you can `exec` into a running container using 

```sh
docker exec -it [name of container] sh
```

and run the `ckan` command there
```sh
ckan seed basic
```

You should be able to see 2 new datasets on home page:

![CKAN with data](https://i.imgur.com/BiSifyb.png)

To get more details on ckan commands please visit [CKAN Commands Reference](https://docs.ckan.org/en/2.9/maintaining/cli.html#ckan-commands-reference).

### Check CKAN API

This tutorial focuses on the CKAN API as that is central to development work and requires more guidance. We also invite you to explore the user interface which you can do directly yourself by visiting http://ckan:5000/.

#### Let's check the portal status

Go to http://ckan:5000/api/3/action/status_show.

You should see something like this:

```json
{
  "help": "https://ckan:5000/api/3/action/help_show?name=status_show",
  "success": true,
  "result": {
  "ckan_version": "2.9.x",
  "site_url": "https://ckan:5000",
  "site_description": "Testing",
  "site_title": "CKAN Demo",
  "error_emails_to": null,
  "locale_default": "en",
  "extensions": [
    "envvars",
    ...
    "demo"
    ]
  }
}
```

This means everything is OK: the CKAN portal is up and running, the API is working as expected. In case you see an internal server error, please check the logs in your terminal.

### A Few useful API endpoints to start with

CKAN's Action API is a powerful, RPC-style API that exposes all of CKAN's core features to API clients. All of a CKAN website's core functionality (everything you can do with the web interface and more) can be used by external code that calls the CKAN API.

#### Get a list of all datasets on the portal

http://ckan:5000/api/3/action/package_list

```json
{
  "help": "http://ckan:5000/api/3/action/help_show?name=package_list",
  "success": true,
  "result": ["annakarenina", "warandpeace"]
}
```

#### Search for a dataset

http://ckan:5000/api/3/action/package_search?q=russian

```json
{
  "help": "http://ckan:5000/api/3/action/help_show?name=package_search",
  "success": true,
  "result": {
    "count": 2,
    ...
  }
}
```

#### Get dataset details

http://ckan:5000/api/3/action/package_show?id=annakarenina

```json
{
  "help": "http://ckan:5000/api/3/action/help_show?name=package_show",
  "success": true,
  "result": {
    "license_title": "Other (Open)",
    ...
  }
}
```

#### Search for a resource

http://ckan:5000/api/3/action/resource_search?query=format:plain%20text

```json
{
  "help": "http://ckan:5000/api/3/action/help_show?name=resource_search",
  "success": true,
  "result": {
    "count": 1,
    "results": [
      {
        "mimetype": null,
        ...
      }
    ]
  }
}
```

#### Get resource details

http://ckan:5000/api/3/action/resource_show?id=288455e8-c09c-4360-b73a-8b55378c474a

```json
{
  "help": "http://ckan:5000/api/3/action/help_show?name=resource_show",
  "success": true,
  "result": {
    "mimetype": null,
    ...
  }
}
```

*Note:* These are only a few examples. You can find a full list of API actions in the [CKAN API guide](https://docs.ckan.org/en/2.9/api/#action-api-reference).

### Create Organizations, Datasets and Resources

There are 4 steps:

- Get an API key;
- Create an organization;
- Create dataset inside an organization (you can't create a dataset without a parent organization);
- And add resources to the dataset.

#### Get a Sysadmin Key

To create your first dataset, you need an API key.

You can see sysadmin credentials in the file `.env`. By default, they should be

- Username: `ckan_admin`
- Password: `test1234`

1. Navigate to http://ckan:5000/user/login and login.
2. Click on your username (`ckan_admin`) in the upright corner.
3. Scroll down until you see `API Key` on the left side of the screen and copy its value. It should look similar to `c7325sd4-7sj3-543a-90df-kfifsdk335`.

#### Create Organization

You can create an organization from the browser easily, but let's use [CKAN API](https://docs.ckan.org/en/2.9/api/#ckan.logic.action.create.organization_create) to do so.

```sh
curl -X POST http://ckan:5000/api/3/action/organization_create -H "Authorization: 9c04a69d-79f4-4b4b-b4e1-f2ac31ed961c" -d '{
  "name": "demo-organization",
  "title": "Demo Organization",
  "description": "This is my awesome organization"
}'
```

Response:

```json
{
  "help": "http://ckan:5000/api/3/action/help_show?name=organization_create",
  "success": true,
  "result": {"users": [
    {
    "email_hash":
    ...
    }
  ]}
}
```

#### Create Dataset

Now, we are ready to create our first dataset.

```sh
curl -X POST http://ckan:5000/api/3/action/package_create -H "Authorization: 9c04a69d-79f4-4b4b-b4e1-f2ac31ed961c" -d '{
 "name": "my-first-dataset",
 "title": "My First Dataset",
 "description": "This is my first dataset!",
 "owner_org": "demo-organization"
}'
```

Response:

```json
{
  "help": "http://ckan:5000/api/3/action/help_show?name=package_create",
  "success": true,
  "result": {
    "license_title": null,
    ...
  }
}
```

This will create an empty (draft) dataset.

#### Add a resource to it

```sh
curl -X POST http://ckan:5000/api/3/action/resource_create -H "Authorization: 9c04a69d-79f4-4b4b-b4e1-f2ac31ed961c" -d '{
  "package_id": "my-first-dataset",
  "url":  "https://raw.githubusercontent.com/frictionlessdata/test-data/master/files/csv/100kb.csv",
  "description": "This is the best resource ever!" ,
  "name": "brand-new-resource"
}'
```

Response:

```json
{
  "help": "http://ckan:5000/api/3/action/help_show?name=resource_create",
  "success": true,
  "result": {
    "cache_last_updated": null,
    ...
  }
}
```

That's it! Now you should be able to see your dataset on the portal at http://ckan:5000/dataset/my-first-dataset.

## Next steps

* [Install Extensions](/docs/dms/ckan/install-extension).
