# Dashboards

## What you can do?

* Describe vizualizations in JSON and create interactive widgets 
* Customize dashboard layout using well-known HTML
* Style dashboard design with TailwindCSS utility classes 
* Rapidly create basic charts using "simple" graphing specification 
* Create advanced widgets by utilizing "vega" visualization grammar 

## How?

To create a dashboard you need to have some basic knowledge of:

* git
* JSON
* HTML

Before proceeding further, make sure you have forked the dashboards repository - https://github.com/datopian/dashboards.

### Create a directory for your dashboard

In the root of the project, create a directory for your dashboard. Name of this directory is the name of your dashboard so make it short and meaningful. Here is some good examples:

* population
* environment
* housing

So that your dashboard will be available at https://domain.com/dashboards/your-dashboard-name.

Note that your dashboard directory will contain 2 files:

* `index.html` - [HTML template](#Set-up-your-layout)
* `config.json` - [configurations for widgets](#Configure-vizualizations)

### Set up your layout

You need to prepare HTML template for your dashboard. No need to create entire HTML page but only snippet that is needed to inject the widgets:

```html
<h1>My example dashboard</h1>
<div id="widget1"></div>
<div id="widget2"></div>
```

In the example above, we've created 2 div elements that we can reference by id when configuring vizualizations.

Note that you can add any HTML tags and make your layout stand out. In the next section we'll explain how you do some stylings.

### Style it

This step is optional but if you have a dashboard with lots of widgets and metadata, you might want to style it so it appears nicely:

* Use TailwindCSS utility classes **(recommended)**
  * Official docs - https://tailwindcss.com/
  * Cheat sheet - https://nerdcave.com/tailwind-cheat-sheet
* Add inline CSS

Example of using TailwindCSS utility classes:

```html
<h1 class="text-gray-700 text-lg">My example dashboard</h1>
<div class="inline-block bg-gray-200 m-10" id="widget1"></div>
<div class="inline-block bg-gray-200 m-10" id="widget2"></div>
```

### Configure vizualizations

In your config file `config.json` you can describe your dashboard in the following way:

```json
{
  "widgets": [],
  "datasets": []
}
```

* `widgets` - a list of objects where each object contains information about where a widget should be injected and how it should look like (see below for examples).
* `datasets` - a list of dataset URLs.

Example of a minimal widget object:

```json
{
  "elementId": "widget1",
  "view": {
    "resources": [
      {
        "datasetId": "",
        "name": ""
      }
    ],
    "specType": "",
    "spec": {}
  }
}
```

where:

* `elementId` - is "id" of the HTML tag you want to use as a container of your widget. See [how we defined it here](#Set-up-your-layout).
* `view` - descriptor of a vizualization (widget).
  * `resources` - a list of resources needed for a widget and required manipulations (transformations).
  	* `datasetId` - the id (name) of the dataset from which the resource is extracted.
  	* `name` - name of the resource.
  	* `transform` - transformations required for a resource (optional). If you want to learn more about transforms:
  	  * Filtering data and applying formula: https://datahub.io/examples/transform-examples-on-co2-fossil-global#readme
  	  * Sampling: https://datahub.io/examples/example-sample-transform-on-currency-codes#readme
  	  * Aggregating data: https://datahub.io/examples/transform-example-gdp-uk#readme
  * `specType` - type of a widget, e.g., `simple`, `vega` or `figure`.
  * `spec` - specification for selected widget type. See below for examples.
  * `title`, `legend`, `footer` - these are optional metadata for a widget. All must be a string.

#### Basic charts

Simple graph spec is the easiest and quickest way to specify a vizualization. Using simple graph spec you can generate line and bar charts:

https://frictionlessdata.io/specs/views/#simple-graph-spec

#### Advanced vizualizations

Please check this instructions to create advanced graphs via Vega specification:

https://frictionlessdata.io/specs/views/#vega-spec

#### Figure widget

The figure widget is used to display a single value from a dataset. For example, you might want to show latest unemployment rate in your dashboard so that it indicates current status of your cities economy. See left-hand side widgets here - https://london.datahub.io/.

A specification for the figure widget would have the following structure:

```
{
  "fieldName": "",
  "suffix": "",
  "prefix": ""
}
```

where "fieldName" attribute will be used to extract specific value from a row. The "suffix" and "prefix" attributes are optional strings that is used to surround a figure, e.g., you can prepend a percent sign to indicate the number's value.

Note that the first row of the data is used which means you need to transform data to show the relevant value. See this example for details - https://github.com/datopian/dashboard-js/blob/master/example/script.js#L12-L22.

#### Example

Check out carbon emission per capita dashboard as an example of creating advanced vizualizations:

https://github.com/datopian/dashboards/tree/master/co2-emission-by-nation

## Share it with the world!

To make your dashboard live on the data portal, you need to:

1. Simply create a pull request
2. Wait until your work gets reviewed and merged into "master" branch.
3. Implement any requested changes in your work.
4. Done! Your dashboard is now available at https://domain.com/dashboards/your-dashboard-name


## Research

* http://dashing.io/ - no longer maintained as of 2016
  * Replaced by https://smashing.github.io/
