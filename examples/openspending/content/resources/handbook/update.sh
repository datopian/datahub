#!/bin/bash

curl -o book.zip http://okfn.booktype.pro/export/spending-data-handbook/export
unzip -o -d book book.zip

python web_version.py

mkdir -p static
rm static/*
cp book/static/* static/

mogrify -geometry '600x600>' static/*


