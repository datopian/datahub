# Extensions

Extensions are Views, Backends or other pieces of code that build on Recline but which do not ship as part of the core distribution. Here we have:

* Instructions on creating an extension
* A list of existing extensions
 * **If you have created an extension please add it to the list below**

## Creating an Extension

At its minimum its just a single JS file. However, we suggest a bit more structure:

* Put the extension in its own repo named e.g. recline.view.{viewname} or recline.backend.{backendname}
* Including (essential):
  * README.md
  * the extension code itself name view.{name}.js or backend.{name}.js (or recline.view.{name}.js etc)
* Optional
  * [optional but recommended] a test for the extension
  * [optional] one or more demo html files showing your extension in action

You may want to include recline as a submodule for testing purposes if you need some of its code
        
    git submodule add git://github.com/okfn/recline.git

Or you can just pull the latest recline.js directly from: http://okfnlabs.org/recline/dist/recline.js

----

## Views

#### Line graphs in nvd3

Line graphs in [nvd3](http://nvd3.org/)

* https://github.com/Moviri/recline/blob/master/src/extensions/views/view.nvd3.graph.js
* https://github.com/NuCivic/recline.view.nvd3.js

#### Kartograph

Integration with [Kartograph](http://kartograph.org/)

* https://github.com/Moviri/recline/blob/master/src/extensions/views/view.kartograph.js

#### Map View using Ordnance Survey

[http://oslabs.github.com/recline-view-osmap/](http://oslabs.github.com/recline-view-osmap/)

A new map view using the Ordnance Survey OpenSpaces tile service. It supports both the free and paid for (pro) stacks. More info and docs are found on the github project page.

----

## Backends

#### Google Docs

This is the official Google Docs backend for Recline (part of the Recline distribution in v0.5) 

https://github.com/okfn/recline.backend.gdocs

#### CouchDB

CouchDB backend for Recline.

https://github.com/okfn/recline.backend.couchdb
