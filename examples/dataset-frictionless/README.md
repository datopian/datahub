This examples if for presenting a single dataset. The dataset should be a [Frictionless dataset (data package)][fd] i.e. there should be a `datapackage.json`.

[fd]: https://frictionlessdata.io/data-packages/

## Install

Git clone this directory then:

```
yarn install
```

## Usage

In this directory:

```bash
export PORTAL_DATASET_PATH=/path/to/my/dataset
yarn dev
```

And you will get a nice dataset page at `http://localhost:3000`

![](https://i.imgur.com/KSEtNF1.png)
