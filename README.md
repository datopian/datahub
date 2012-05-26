Recline DataExplorer is an open-source pure javascript data explorer and data
refinery. Imagine it as a spreadsheet plus Google Refine plus Visualization
toolkit, all in pure javascript and html.

Designed for standalone use or as a library to integrate into your own app.

<h3><a href="http://okfnlabs.org/recline/">Recline Website - including Overview, Documentation, Demos etc</a></h3>


## Features

* Open-source (and heavy reuser of existing open-source libraries)
* Pure javascript (no Flash) and designed for integration -- so it is easy to
  embed in other sites and applications
* View and edit your data in clean tabular interface
* Bulk update/clean your data using an easy scripting UI
* Visualize your data
* And more ... see <http://okfnlabs.org/recline/>

![screenshot](http://farm8.staticflickr.com/7020/6847468031_0f474de5f7_b.jpg)


## Developer Notes

Running the tests by opening `test/index.html` in your browser.


## Changelog

### v0.5 - Master

In progress.

Possible breaking changes:

* State only stores backend (name) and dataset url (in url field) rather than entire dataset object
* Backends heavily reorganized

### v0.4 - April 26th 2012

[23 closed issues](https://github.com/okfn/recline/issues?milestone=2&page=1&state=closed) including:

* Map view using Leaflet - #69, #64, #89, #97
* Term filter support - #66
* Faceting support- #62
* Tidy up CSS and JS - #81 and #78
* Manage and serialize view and dataset state (plus support for embed and permalinks) - #88, #67
* Graph view improvements e.g. handle date types correctly - #75
* Write support for ES backend - #61
* Remove JQuery-UI dependency in favour of bootstrap modal - #46
* Improved CSV import support - #92

### v0.3 - March 31st 2012

[16 closed issues](https://github.com/okfn/recline/issues?milestone=1&state=closed) including:

* ElasticSearch (and hence DataHub/CKAN) backend - #54
* Loading of local CSV files - #36
* Fully worked out Data Query support - #34, #49, #53, #57
* New Field model object for richer field information - #25
* Upgrade to Bootstrap v2.0 - #55
* Recline Data Explorer app improvements e.g. #39 (import menu)
* Graph improvements - #58 (more graph types, graph interaction)

### v0.2 - Feb 24th 2012

[17 closed issues](https://github.com/okfn/recline/issues?milestone=3&state=closed) including:

* Major refactor of backend and model relationship - #35 and #43
* Support Google Docs Spreadsheets as a Backend - #15
* Support for online CSV and Excel files via DataProxy backend - #31
* Data Explorer is customizable re loaded views - #42
* Start of documentation - #33
* Views in separate files - #41
* Better error reporting from backends on JSONP errors - #30
* Sorting and show/hide of columns in data grid - #23, #29
* Support for pagination - #27
* Split backends into separate files to make them easier to maintain and reuse separately #50

### v0.1 - Jan 28th 2012

* Core models and structure including Dataset and Document
* Memory and webstore backends
* Grid, Graph and Data Explorer views
* Bootstrap-based theme - #22

## Copyright and License

Copyright 2011 Max Ogden and Rufus Pollock.

Licensed under the MIT license:

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.


