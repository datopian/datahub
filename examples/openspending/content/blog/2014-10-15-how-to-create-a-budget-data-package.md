---
redirect_from: /2014/10/how-to-create-a-budget-data-package/
title: How to create a budget data package
authors:
- Neil Ashton
---

This tutorial will show you how to create a [budget data package](https://github.com/openspending/budget-data-package/blob/master/specification.md) from a (relatively clean) spreadsheet dataset by walking you through the process of converting the [Armenian budget](http://wbi.worldbank.org/boost/country/armenia) from the [Open Budgets Portal](http://wbi.worldbank.org/boost/).

## Getting started

The Armenia BOOST government expenditure database contains planned, adjusted, and executed expenditures covering the years 2006 to 2012. It is coded with rich classification systems, including COFOG functional categories. This makes it perfect as an example budget data package dataset.

To download the Armenia dataset, go to the [Armenia BOOST Socrata instance](https://databox.worldbank.org/dataset/Armenia/4bk3-zxmf) and export the dataset as a CSV.

<a href="{{ site.baseurl }}/img/blog/2014/08/tutorial01.png"><img class="aligncenter size-large wp-image-1877" src="{{ site.baseurl }}/img/blog/2014/08/tutorial01-1024x558.png" alt="Export as CSV" width="591" height="322" /></a>

This dataset now needs to be cleaned and processed. To do this, we will use [OpenRefine](http://openrefine.org/).

## Processing data: splitting fields

Before we can use the Armenia dataset in Budget Data Package, a few properties need to be fixed. The easiest of these processing steps is splitting up numerical IDs and human-readable text, which the source dataset combines together in single fields. This is easy to do with OpenRefine.

To split up a column like this, click the arrow next to the column name, select **Edit column**, and click **Split into several columns**.

<a href="{{ site.baseurl }}/img/blog/2014/08/tutorial02.png"><img class="aligncenter size-full wp-image-1878" src="{{ site.baseurl }}/img/blog/2014/08/tutorial02.png" alt="Splitting columns" width="445" height="414" /></a>

Each column is in the format "1234 Description", where 1234 is the ID. We can therefore extract the numerical ID by splitting the column up on spaces and limiting the resulting number of columns to 2.

<a href="{{ site.baseurl }}/img/blog/2014/08/tutorial03.png"><img class="aligncenter size-full wp-image-1879" src="{{ site.baseurl }}/img/blog/2014/08/tutorial03.png" alt="Splitting on spaces" width="621" height="345" /></a>

Do this with each column that combines a numerical ID with a text description.

At this point, you can also rename the columns in the dataset to match the budget data package specification. The columns "Administrative Classification (Level 1) -- Agency 1" and "Administrative Classification (Level 1) -- Agency 2" resulting from splitting up "Administrative Classification (Level 1) -- Agency" can be renamed "adminID" and "admin", for example.

## Processing data: programming step

Once you've renamed the columns appropriately, you can move on to performing three more complex processing steps: splitting up the dataset by year and status; adding unique IDs to data rows; and fixing the COFOG values.

A simple Python script that performs these processing steps is available here:

* [Armenia data processing script](https://gist.github.com/nmashton/442cea7f852ee92c343e)

### Splitting up files

Budget Data Package datasets represent a single fiscal year at a single stage in the budget cycle.

Our source dataset combines many fiscal years, and every row in the dataset also contains money values from three separate stages in the cycle.

It's therefore necessary to split up the source dataset into several files. This involves two steps:

1. Turning each row into three rows, one for each money value.
2. Splitting up the set of rows by year.

Lines 15-45 of the [Armenia data processing script](https://gist.github.com/nmashton/442cea7f852ee92c343e#file-armenia-processing-py-L15) carry out these two transformations.

### Adding unique IDs

Each row of data in a Budget Data Package must have a unique identifier in its `id` field.

This is easy to do; just append an `id` field to the header row of each dataset, then add a unique value to every data row.

Lines 48-67 of the [Armenia data processing script](https://gist.github.com/nmashton/442cea7f852ee92c343e#file-armenia-processing-py-L48) add IDs in this way. Here, unique UUIDs are generated and added to the data.

### Fixing COFOG values

Budget Data Package datasets need to have well-formed COFOG values in the `cofog` column. Here, "well-formed" means that the values comply with [the COFOG standard](http://data.okfn.org/data/core/cofog#resource-cofog).

Our source dataset has a (mostly) COFOG-compatible functional classification system, but it formats its COFOG codes in an idiosyncratic way. It's necessary to transform these codes from values like "010101" to values like "01.1.1" for compliance.

Lines 69-126 of the [Armenia data processing script](https://gist.github.com/nmashton/442cea7f852ee92c343e#file-armenia-processing-py-L69) fix all the COFOG values. They repair the existing COFOG-compatible functional classification codes, and they also add a new `cofog` column for good measure.

## Adding metadata

Once all datasets have been processed and made ready for Budget Data Package, they need to be wrapped up with a metadata file.

A [sample metadata file](https://gist.github.com/nmashton/442cea7f852ee92c343e#file-armenia-json) for the Armenia BOOST dataset, as prepared in the last section, is available as a Gist. This file illustrates several crucial features of BDP metadata:

* Metadata for the data package itself goes in the outermost object. This includes the data package's name (a URL-compatible string), title (a human-readable name), description (a prose description of the package), and version (a version number for the release).
* Each CSV included in the package needs its own metadata in the `resources` field of the package metadata. (See the Budget Data Package specification for details about what needs to go here.)

You can see from looking at the metadata that it is mostly repetitious and predictable—time-consuming to create by hand, but not too challenging!

## Wrapping up

Once the metadata file for the budget data package has been created and saved alongside the processed datasets, the budget data package has been created. You can now serve it up from whatever platform you prefer.
