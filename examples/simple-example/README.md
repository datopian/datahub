This is a repo intended to serve as a simple example of a data catalog that get its data from a series of github repos, you can init an example just like this one by.

- Creating a new file inside o `examples` with `create-next-app` like so:
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
If yo go to any one of those pages by clicking on `More info` you will see something similar to this
![](https://i.imgur.com/cpKMS80.png)

