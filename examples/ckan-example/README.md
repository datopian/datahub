This is a repo intended to serve as an example of a data catalog that get its data from a CKAN Instance.

- Creating a new file inside o `examples` with `create-next-app` like so:
```
npx create-next-app <app-name> --example https://github.com/datopian/portaljs/tree/main/ --example-path examples/ckan-example
```
- Inside `<app-name>` go to the `project.json` file and replace all instances of `ckan-example` with `<app-name>`
- Set the `DMS` env variable to the Url of the CKAN Instance Ex: `export DMS=https://demo.dev.datopian.com`
- Run the app using:
```
nx serve <app-name>
```
Congratulations, you now have something similar to this running on `http://localhost:4200`
![](https://media.discordapp.net/attachments/1069718983604977754/1098252297726865408/image.png?width=853&height=461)
If yo go to any one of those pages by clicking on `More info` you will see something similar to this
![](https://media.discordapp.net/attachments/1069718983604977754/1098252298074988595/image.png?width=853&height=461)

