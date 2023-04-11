Live Demo:
- https://portal-js.vercel.app/

## Create a single frictionless dataset portal

The dataset should be a frictionless dataset i.e. it should have a [datapackage.json](https://specs.frictionlessdata.io/data-package/)


Create a frictionless dataset portal app from the default template by executing the following command in your terminal:
```
$ npx create-next-app -e https://github.com/datopian/portal.js/tree/main/examples/dataset-frictionless
```
> Choose a name for your portal when prompted e.g. your-portal

Next, connect the frictionless dataset to `your-portal` by declaring the path to the directory level that contains the `datapackage.json` via an environment variable by executing the following command in your terminal:
```
$ cd your-portal
$ export PORTAL_DATASET_PATH=path/to/your/dataset
```
In `your-portal` directory, run the command below in your terminal to start the portal:
```
$ yarn dev
```
Open the page in your browser via the localhost url(usually http://localhost:3000) returned in the terminal to see your frictionless dataset portal.

### Styling 🎨

We use Tailwind as a CSS framework. Take a look at `/styles/tailwind.css` to see what we're importing from Tailwind bundle. You can also configure Tailwind using `tailwind.config.js` file.

Have a look at Next.js support of CSS and ways of writing CSS:

https://nextjs.org/docs/basic-features/built-in-css-support
