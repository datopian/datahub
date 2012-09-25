A simple but powerful library for building data applications in pure Javascript and HTML.

<h3><a href="http://reclinejs.com/">Recline Website - including Overview, Documentation, Demos etc</a></h3>


## Features

* Open-source (and heavy reuser of existing open-source libraries)
* Pure javascript (no Flash) and designed for integration -- so it is easy to
  embed in other sites and applications
* View and edit your data in clean grid interface
* Bulk update/clean your data using an easy scripting UI
* Visualize your data
* And more ... see <http://reclinejs.com/>

## Developer Notes

Running the tests by opening `test/index.html` in your browser.

### Contributing

We welcome patches and pull requests and have a few guidelines.

For small bugfixes or enhancements:

* Please run the tests

For larger changes:

* Cleanup your code and affected code parts
* Run the tests from `/test/index.html` in different browsers (at least Chrome and FF)
* Update the documentation and tutorials where necessary
* Update `/_includes/recline-deps.html` if you change required files (e.g. leaflet libraries)
* Try to build the demos in `/demos/` with jekyll and then check out the `/demos/multiview/` which utilizes most aspects of Recline


## Changelog

### v0.6 - Aug/Sept 2012 (tbc)

[v0.6 milestone](https://github.com/okfn/recline/issues?milestone=5)

Possible breaking changes

* Updated Leaflet to latest version 0.4.4 #220
* Added marker clustering in map view to handle a large number of markers
* Dataset.restore method removed (not used internally except from Multiview.restore)
* Views no longer call render in initialize but must be called client code

### v0.5 - July 5th 2012 (first public release)

[40 closed issues](https://github.com/okfn/recline/issues?milestone=2&page=1&state=closed)

Lots of breaking changes to the API from v0.4 (should be very few going forwards) including:

* State only stores backend (name) and dataset url (in url field) rather than entire dataset object
* Backends heavily reorganized
* Rename Document -> Record
* Rename DataExplorer view to MultiView
* ...

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


