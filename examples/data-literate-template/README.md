This example renders markdown + CSV into an elegant web page. These type of data setup we term [data literate][]

[data literate]: https://portaljs.org/data-literate

## How to use

```bash
npx create-next-app -e https://github.com/datopian/portal.js/tree/main/examples/data-literate
# choose a name for your portal when prompted e.g. your-portal or go with default my-app

# then run it
cd your-portal
yarn #install packages
yarn dev # start app in dev mode
```

You should see the demo portal running with the example dataset provided in `http://localhost:3000/demo`

For the moment there is no root path and each markdown file will have it's own path (route) for the generated html code.

TODO
### Use your own dataset

You can try it out with your own data literate setups:

In the directory of your portal do:

```bash
export PORTAL_DATASET_PATH=/path/to/my/dataset
```

Then restart the dev server:

```
yarn dev
```

Check the portal page and it should have updated e.g. like:

TODO

### Static Export

Build the export:

```
yarn build
```

Results will be in `out/` subfolder.

To test you will need to run a local webserver in the folder (just opening the relevant file in your browser won't work):

Here we do this with another (non nodejs based) server to show that the static site works. Python3 as a really useful simple http server that one can use here:

```
cd out
python3 -m http.server
```

