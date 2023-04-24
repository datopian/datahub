---
sidebar: auto
---

# Data Explorer

The Datopian Data Explorer is a React single page application and framework for creating and displaying rich data explorers (think Tableau-lite). Use stand-alone or with CKAN. For CKAN it is a drop-in replacement for ReclineJS in CKAN Classic.

![Data Explorer](/static/img/docs/dms/data-explorer/data-explorer.png)
> [Data Explorer for the City of Montreal](http://montreal.ckan.io/ville-de-montreal/geobase-double#resource-G%C3%83%C2%A9obase%20double)

## Features / Highlights

"Data Explorer" is an embedable React/Redux application that allows users to:

* Explore tabular, map, PDF, and other types of data
* Create map views of tabular data using the [Map Builder](#map-builder)
* Create charts and graphs of tabular data using [Chart Builder](#chart-builder)
* Easily build SQL queries for Data Store API using graphical interface of [Datastore Query Builder](#datastore-query-builder)

## Components

The Data Explorer application acts as a coordinating layer and state management solution -- via [Redux](https://redux.js.org/) -- for several libraries, also maintained by Datopian.

### [Datapackage Views](https://github.com/datopian/datapackage-views-js)

![Datapackage Views](/static/img/docs/dms/data-explorer/datapackage-views.png)

Datapackage View is the rendering engine for the main window of the Data Explorer.

The above image displays a table shown at the `Table` tab, but note that Datapackage-views renders _all_ data visualizations: Tables, Charts, Maps, and others.

### [Datastore Query Builder](https://github.com/datopian/datastore-query-builder)

<img alt="Datastore Query Builder" src="/static/img/docs/dms/data-explorer/query-builder.png" width="250px" />

The Datastore Query Builder interfaces with the Datastore API to allow users to search data resources using an SQL like interface. See the docs for this module here - [Datastore Query Builder docs](/docs/dms/data-explorer/datastore-query-builder/).

### [Map Builder](https://github.com/datopian/map-builder)

<img alt="Map Builder" src="/static/img/docs/dms/data-explorer/map-builder.png" width="250px" />

Map Builder allows users to build maps based on geo-data contained in tabular resources.

Supported geo formats:
* lon / lat (separate columns)

### [Chart Builder](https://github.com/datopian/chart-builder)

<img alt="Chart Builder" src="/static/img/docs/dms/data-explorer/chart-builder.png" width="250px" />

Chart Builder allows users to create charts and graphs from tabular data.

## Quick-start (Sandbox)

* Clone the data explorer
```bash
$ git clone git@gitlab.com:datopian/data-explorer.git
```
* Use yarn to install the project dependencies
```bash
$ cd data-explorer
$ yarn
```
* To see the Data Explorer running in a sandbox environment run [Cosmos](https://github.com/react-cosmos/react-cosmos) 
```bash
$ yarn cosmos
```

## Configuration

[`data-datapackage` attribute](#add-data-explorer-tags-to-the-page-markup) may influence how the element will be displayed. It can be created from a [datapackage descriptor](https://frictionlessdata.io/specs/data-package/).

### Fixtures

Until we have better documentation on Data Explorer settings, use the [Cosmos fixtures](https://gitlab.com/datopian/data-explorer/blob/master/__fixtures__/with_widgets/geojson_simple.js) as an example of how to instantiate / configure the Data Explorer.

### Serialized state 

`store->serializedState` is a representation of the application state _without fetched data_
A data-explorer can be "hydrated" using the serialized state, it will refetch the data, and will render in the same state it was exported in

### Share links

Share links can be added in `datapakage.resources[0].api` attribute.

There is common limit of up 2000 characters on URL strings. Our share links contain the entire application store tree, which is often larger than 2000 characters, in which the application state cannot be shared via URL. Thems the breaks.

## Translations

### Add a Translation To Data Explorer

To add a translation to a new language to the data explorer you need to:

1. clone the repository you need to update

  ```bash
  git clone git@gitlab.com:datopian/data-explorer.git
  ```
2. go to `src/i18n/locales/` folder
3. add a new sub-folder with locale name and the new language json file (e.g. `src/i18n/locales/ru/translation.json`)
4. add the new file to resources settings in `i18n.js`:
`src/i18n/i18n.js`:
```javascript
import en from './locales/en/translation.json'
import da from './locales/da/translation.json'
import ru from './locales/ru/translation.json'
    ...
      ru: {
        translation: {
          ...require('./locales/ru/translation.json'),
          ...
        }
      },
    ...
```
5. create a merge request with the changes

### Add a translation To a Component

Some strings may come from a component, to add translation for them will require some extra steps, e.g. datapackage-views-js:

1. clone the repository
  ```bash
  https://github.com/datopian/datapackage-views-js.git
  ```
2. go to `src/i18n/locales/` folder
3. add a new sub-folder with locale name and the new language json file (e.g. `src/i18n/locales/ru/translation.json`)
4. add the new file to resources settings in `i18n.js`:
`src/i18n/i18n.js`:
```javascript
...
import ru from './locales/ru/translation.json'
    ...
    resources: {
      ...
      ru: {translation: ru},
    },
    ...
```
5. create a pull request for datapackage-views-js
6. get the new datapackage-views-js version after merging (e.g. 1.3.0)
7. clone data-explorer
8. upgrade the data-explorer's datapackage-views-js dependency with the new version:
  a. update package.json
  b. run `yarn install`
9. add the component's translations path to Data Explorer:
```javascript
import en from './locales/en/translation.json'
import da from './locales/da/translation.json'
import ru from './locales/ru/translation.json'
    ...
      ru: {
        translation: {
          ...require('./locales/ru/translation.json'),
          ...require('datapackage-views-js/src/i18n/locales/ru/translation.json'),
        }
      },
    ...
```
10. create a merge request for data-explorer

### Testing a Newly Added Language

To see your language changes in Data Explorer you can run `yarn start` and change the language cookie of the page (`defaultLocale`):

![i18n Cookie](/static/img/docs/dms/data-explorer/i18n-cookie.png)

### Language detection

Language detection rules are determined by `detection` option in `src/i18n/i18n.js` file. Please edit with care, as other projects may already depend on them.

## Embedding in CKAN NG Theme

### Copy bundle files to theme's `public` directory

```bash
$ cp data-explorer/build/static/js/*.js frontend-v2/themes/your_theme/public/js
$ cp data-explorer/build/static/js/*.map frontend-v2/themes/your_theme/public/js
$ cp data-explorer/build/static/css/* frontend-v2/themes/your_theme/public/css
```


#### Note on app bundles

The bundled resources have a hash in the filename, for example `2.a3e71132.chunk.js`

During development it may be preferable to remove the hash from the file name to avoid having to update the script tag during iteration, for example

```bash
$ mv 2.a3e71132.chunk.js 2.chunk.js
```

A couple caveats:
* The `.map` file names should remain the same so that they are loaded properly
* Browser cache may need to be invalidated manually to ensure that the latest script is loaded


### Require Data Explorer resources in NG theme template

In `/themes/your-theme/views/your-template-wth-explplorer.html`

```html
<!-- Everything before the content block goes here -->
{% block content %}

<!-- Data Explorer CSS -->
<link rel="stylesheet" type="text/css" href="/static/css/main.chunk.css">
<link rel="stylesheet" type="text/css" href="/static/css/2.chunk.css">
<!-- End Data Explorer CSS -->
```

### Configure datapackage

```htmlmixed=
<!-- where datapackage is -->
<srcipt>
  const datapackage = {
    resources: [{resource}], // single resource for this view
    views: [...], // can be 3 views aka widgets
    controls: { 
      showChartBuilder: true,
      showMapBuilder: true 
    }
  }
</srcipt>
```

### Add data-explorer tags to the page markup

Each Data Explorer instance needs a corresponding `<div>` in the DOM. For example:

```html
{% for resource in dataset.resources %}
  <div class="data-explorer" id="data-explorer-{{ loop.index - 1 }}" data-datapackage='{{ dataset.dataExplorers[loop.index - 1] | safe}}'></div>
{% endfor %}
```

Note that each container div needs the following attributes:
* `class="data-explorer"` (All explorer divs should have this class)
* `id="data-explorer-0"` (1, 2, etc...)
* `data-datapackage=`{'{JSON CONFIG}'}` (A valid JSON configuration)

### Add data explorer scripts to your template

```html
<script type="text/javascript" src="/static/js/runtime~main.js"></script>
<script type="text/javascript" src="/static/js/2.chunk.js"></script>
<script type="text/javascript" src="/static/js/main.chunk.js"></script>
```

*NOTE* that the scripts should be loaded _after the container divs are in the DOM, typically by placing the `<script>` tags at the bottom of the footer_

See [a real-world example here](https://gitlab.com/datopian/clients/ckan-montreal/blob/master/views/showcase.html)

## New builds

In order to build files for production, run `npm run build` or `yarn build`.

You need to have **node version >= 12** in order to build files. Otherwise a 'heap out of memory error' gets thrown.

### Component changes

If the changes involve component updates that live in separate repositories make sure to upgrade them too before building:
1. Prepare the component with dist version (eg run yarn build:package in the component repo, see [this](/docs/dms/data-explorer/datastore-query-builder#release) for an example)
2. run `yarn add <package>` to get latest changes, e.g. `yarn add @datopian/datastore-query-builder` (do not use `yarn upgrade`, see here on why https://github.com/datopian/data-explorer/issues/28#issuecomment-700792966)
3. you can verify changes in `yarn.lock` - there should be the latest component commit id
4. `yarn build` in data-explorer

### Testing not yet released component changes

If there are some changes to be tested that are not ready to be released in a component the best option is to use
cosmos directly in the component repository, but if that is not enough you can add the dependency from a branch
temporarily:

```
yarn add https://github.com/datopian/datastore-query-builder.git#<branch name>
```

## Appendix: Design

See [Data Explorer Design page &raquo;](/docs/dms/data-explorer/design/)
