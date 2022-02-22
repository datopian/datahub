---
title: My awesome data page
data: data.csv
author: Me
---

Steps:

0. Create a new folder with a readme.md(x) file and a data.csv (or another csv file)
1. Copy the Markdown template here
2. change the data.csv paths in the example to the real path where your data lives
3. magic !!!
4. you can check your static site in your browser and publish it wherever you want

# Dataset Website

## Introduction

Here the Dataset description

## Exploration

Here some representations

<Table url='data.csv' />

If there are more data files you can show them like this:

```
<Table path='path/to/my/data2.csv' />
<Table path='path/to/my/data3.csv' />
.
.
.
<Table path='path/to/my/dataN.csv' />
```