# Recline

A HTML5 port of Google Refine's UI that lets you bulk import, edit and export your data in and out of CouchDB

## Features

* CSV/JSON export your entire database for integration with spreadsheets or [Google Refine](http://code.google.com/p/google-refine/)
* Bulk update/clean your data using an easy scripting UI
* Import by directly downloading from JSON APIs or by uploading files

![screenshot](http://i.imgur.com/XDSRe.png)

## Installation

After you install it, visit this link to open Recline: 

    http://yourcouch/yourdb/_design/recline/_rewrite

### Quick install

[Get a couch](http://www.iriscouch.com/service), make a database and put some data into it.

Copy these utilities to the new db:

    curl -X POST http://user:pass@YOURCOUCH/_replicate -d '{"source":"http://max.couchone.com/apps","target":"YOURDB", "doc_ids":["_design/recline"]}' -H "Content-type: application/json"

### In-depth install

You'll have to get yourself a couch. The easiest way is from [the instructions on this page](http://couchone.com/get). Once it's going, open up `http://YOURCOUCH/_utils` and create a new database to store your data.

You can either replicate the couchapp from my couch [max.couchone.com/apps/_design/recline](http://max.couchone.com/apps/_design/recline) (quickest option) or, if you want to hack on the recline source code first, you'll need to install `mikeal/node.couchapp.js` and clone this repo.