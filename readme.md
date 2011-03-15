# Removalist

A [CouchApp](http://couchapp.org) that lets you export and import data into CouchDB. 

## Features

* CSV export your entire database for integration with spreadsheets or [Google Refine](http://code.google.com/p/google-refine/)

![screenshot](http://i.imgur.com/ts6T6.png)

## Installation

After you install it, visit this link to open Removalist: 

    http://yourcouch/yourdb/\_design/removalist/\_rewrite

### Quick install

* [Get a couch](http://couchone.com/get), make a database and put some data into it.
* Copy these utilities to the new db: 

    curl -X POST http://user:pass@YOURCOUCH/\_replicate -d '{"source":"http://max.couchone.com/apps","target":"YOURDB", "doc\_ids":["_design/removalist"]}' -H "Content-type: application/json"

### In-depth install

You'll have to get yourself a couch. The easiest way is from [the instructions on this page](http://couchone.com/get). Once it's going, open up `http://YOURCOUCH/_utils` and create a new database to store your data.

You can either replicate the couchapp from my couch [max.couchone.com/apps/_design/removalist](http://max.couchone.com/apps/_design/removalist) (quickest option) or, if you want to hack on the removalist source code first, you'll need to install the [CouchApp command line utility](http://couchapp.org/page/installing) and check out this repo.

If you want to hack on removalist, once you have the couchapp utility working, <code>git clone</code> this repo and go into this folder and execute <code>couchapp init</code>. To upload removalist into your couch just run <code>couchapp push http://YOURCOUCH/DATABASENAME</code>. Otherwise see the Quick install section above.