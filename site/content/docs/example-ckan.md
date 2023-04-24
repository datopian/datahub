---
title: "Example: Data catalog with data coming from CKAN"
authors: ['Luccas Mateus']
date: 2023-04-20
filetype: blog
---

The ckan-example added to PortalJS is intended to provide users with an easy way to set up a data catalog that can be used to display and share data stores behind a CKAN Backend. With this example, users can quickly set up a web-based portal that allows them to showcase their data and make it accessible to others, all this being done just by adding a simple env variable pointing to a CKAN Deployment.

## Demo

To get a feel of the project, users can check the [live deployment](https://ckan-example.portaljs.org).

Below are some screenshots:

#### Front page

![](https://i.imgur.com/NlTAIAg.png)

#### Individual dataset page

![](https://i.imgur.com/RRoIlGf.png)

## How to use this example as a template

- Create a new file inside of `examples` with `create-next-app`:
```
npx create-next-app <app-name> --example https://github.com/datopian/portaljs/tree/main/ --example-path examples/ckan-example
```
- Inside `<app-name>`, go to the `project.json` file and replace all instances of `ckan-example` with `<app-name>`
- Set the `DMS` env variable to the Url of the CKAN Instance, eg.: `export DMS=https://demo.dev.datopian.com`
- Run the app:
```
nx serve <app-name>
```

Congratulations, you now have something similar to this running on `http://localhost:4200`
![](https://media.discordapp.net/attachments/1069718983604977754/1098252297726865408/image.png?width=853&height=461)

If yo go to any one of those pages by clicking on `More info` you will see something similar to this

![](https://media.discordapp.net/attachments/1069718983604977754/1098252298074988595/image.png?width=853&height=461)
