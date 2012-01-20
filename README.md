Recline DataExplorer is an open-source pure javascript data explorer and data
refinery. Imagine it as a spreadsheet plus Google Refine plus Visualization
toolkit, all in pure javascript and html.

Designed for standalone use or as a library to integrate into your own app.

Live demo: http://okfnlabs.org/recline/demo/


## Features

* Open-source (and heavy reuser of existing open-source libraries)
* Pure javascript (no Flash) and designed for integration -- so it is easy to
  embed in other sites and applications
* View and edit your data in clean tabular interface
* Bulk update/clean your data using an easy scripting UI
* Visualize your data

![screenshot](http://i.imgur.com/XDSRe.png)


## Demo App

Open demo/index.html in your favourite browser.


## Developer Notes

### Minifying dependencies

    npm install -g uglify
    cd vendor
    cat *.js | uglifyjs -o ../src/deps-min.js
    
note: make sure underscore.js goes in at the top of the file as a few deps currently depend on it


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


