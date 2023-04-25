---
sidebar: auto
---

# Installing extensions

A CKAN extension is a Python package that modifies or extends CKAN. Each extension contains one or more plugins that must be added to your CKAN config file to activate the extension’s features.

In this sections we will teach you only how to install existing extensions. See [next steps](/docs/dms/ckan/create-extension) in case you need to create or modify extensions

## Add new extension

Lets install [Hello World](https://github.com/rclark/ckanext-helloworld) on the portal. For that we need to do 2 thing:

1. Install extension when building docker image
2. Add new extension to CKAN plugins

### Install extension on docker build

For this we need to modify Dockerfile for ckan service. Let's edit it:

```
vi ckan/Dockerfile.dev

# Add following
RUN pip install -e git+https://github.com/rclark/ckanext-helloworld.git#egg=ckanext-helloworld
```

*Note:* In this example we use vi editor, but you can choose any of your choice.

### Add new extension to plugins

We need to modify .env file for that - Search for `CKAN_PLUGINS` and add new extension to the existing list:

```
vi .env

CKAN__PLUGINS=helloworld envvars image_view text_view recline_view datastore datapusher
```

## Check extension is installed

After modifying configuration files you will need to restart the portal. If your CKAN protal is up and running bring it down and re-start

```
docker-compose -f docker-compose.dev.yml stop
docker-compose -f docker-compose.dev.yml up --build
```

### Check what extensions you already have:

http://ckan:5000/api/3/action/status_show

Response should include list of all extensions including `helloworld` in it.

```
"extensions": [
  "envvars",
  "helloworld",
  "image_view",
  "text_view",
  "recline_view",
  "datastore",
  "datapusher"
]
```

### Check the extension is actually working

This extension simply adds new route `/hello/world/name` to the base ckan and says hello

http://ckan:5000/hello/world/John-Doe

## Next steps

[Create your own extension](/docs/dms/ckan/create-extension)
