---
title: "Example: Simple data catalog"
authors: ['Luccas Mateus']
date: 2023-04-20
filetype: blog
---

The simple-example added to PortalJS is intended to provide users with an easy way to set up a data catalog that can be used to display and share data stores stored in GitHub repositories. With this example, users can quickly set up a web-based portal that allows them to showcase their data and make it accessible to others, all this being done thru the configuration of a simple `datasets.json` file.

## Demo

To get a feel of the project, users can check the [live deployment](https://example.portaljs.org).

Below are some screenshots:

#### Front page

![](https://i.imgur.com/jAljJ9C.png)

#### Individual dataset page

![](https://i.imgur.com/AoJd4O0.png)

## How to use this example as a template

- Create a new file inside of `examples` with `create-next-app`:
```
npx create-next-app <app-name> --example https://github.com/datopian/portaljs/tree/main/ --example-path examples/simple-example
```
- Inside `<app-name>` go to the `project.json` file and replace all instances of `simple-example` with `<app-name>`
- Edit the file `datasets.json` to your liking, some examples can be found inside this [repo](https://github.com/datasets)
- Run the app using:
```
nx serve <app-name>
```

Congratulations, you now have something similar to this running on `http://localhost:4200`
![](https://i.imgur.com/JrDLycF.png)

If you go to any one of those pages by clicking on `More info` you will see something similar to this

![](https://i.imgur.com/cpKMS80.png)

## Links

- [Repo](https://github.com/datopian/portaljs/tree/main/examples/simple-example)  
- [Live Demo](https://example.portaljs.org)  
