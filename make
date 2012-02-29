#!/bin/bash
echo "** Combining js files"
cat src/*.js src/backend/*.js > recline.js

# build docs
echo "** Building docs"
docco src/model.js src/view.js src/view-grid.js src/view-flot-graph.js
mkdir -p /tmp/recline-docs
mkdir -p docs/backend
PWD=`pwd`
FILES=$PWD/src/backend/*.js
DEST=$PWD/docs/backend
cd /tmp/recline-docs && docco $FILES && mv docs/* $DEST
echo "** Docs built ok"

