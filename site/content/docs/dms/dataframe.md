# DataFrame

Designing a dataframe.js - and understanding data libs and data models in general.

TODO: integrate https://github.com/datopian/dataframe.js - my initial review from ~ 2015 onwards.

## Introduction

Conceptually a data library consists of:

* A data model i.e. a set of classes for holding / describing data e.g. Series (Vector/1d array), DataFrame (Table/2d array) (and possibly higher dim arrays)
* Tooling
  * Operations e.g. group by, query, pivot etc etc
  * Import / Export: load from csv, sql, stata etc etc

## Our need

We need to build tools for wrangling and presenting data ... that are ... 

* focused on smallish data
* run in the browser and/or are lightweight/easy to install

Why? Because ... 

* We want to build easy to use / install applications for non-developers (so they aren't going to use pandas or a jupyter notebook PLUS they want a UI PLUS probably not big data (or if it is we can work with a sample))
* We're often using these tools in web applications (or in e.g. desktop app like electron)

Discussion

* Could we not have browser act as thin client and push code to some backend ...? Yes we could but that means a whole other service ...

What we want: Something like openrefine but running in the browser ...

### Why not just use R / Pandas

Context: R, Pandas are already awesome. In fact, super-awesome. And they have huge existing communities and ecosystems.

Furthermore, not only do they do data analysis (so all the data science folks are using) but they are also pretty good for data wrangling (esp pandas)

So, we'd heavily recommend these (esp pandas) if you are developer (and doing work on your local machine).

However, ... 

* if you're not a developer they can be daunting (even wrapped up in a juypyter notebook).
* if you are a developer and actually doing data engineering there are some issues
  * pandas is a "kitchen-sink" of a library and depends on numpy. This makes it a heavy-weight dependency and harder to put into data pipelines and flows
  * monolithic nature makes them hard to componentize ... 


## Pandas

### Series

https://pandas.pydata.org/pandas-docs/stable/getting_started/dsintro.html#series

> Series is a one-dimensional labeled array capable of holding any data type (integers, strings, floating point numbers, Python objects, etc.). The axis labels are collectively referred to as the index. The basic method to create a Series is to call:
>
> ``>>> s = pd.Series(data, index=index)``

* Series is a 1-d array with the convenience of labelling each cell in the array with the index (which defaults to 0...n if not specified).
* This allows you to treat Series as an array *and* a dictionary
* You can give it a name "Series can also have a name attribute:
  &nbsp;
  `s = pd.Series(np.random.randn(5), name='something')`"

### DataFrame

https://pandas.pydata.org/pandas-docs/stable/getting_started/dsintro.html

> DataFrame is a 2-dimensional labeled data structure with columns of potentially different types. You can think of it like a spreadsheet or SQL table, or a dict of Series objects. It is generally the most commonly used pandas object. Like Series, DataFrame accepts many different kinds of input:

### Higher dimensional arrays

Not supported. See xarray.

## XArray

Comment: mature and well thought out. Exists to generalize pandas to higher levels.

http://xarray.pydata.org/en/stable/ => multidimensional arrays in pandas

> xarray has two core data structures, which build upon and extend the core strengths of NumPy and pandas. Both data structures are fundamentally N-dimensional:
> 
> DataArray is our implementation of a labeled, N-dimensional array. It is an N-D generalization of a pandas.Series. The name DataArray itself is borrowed from Fernando Perez’s datarray project, which prototyped a similar data structure.
> 
> Dataset is a multi-dimensional, in-memory array database. It is a dict-like container of DataArray objects aligned along any number of shared dimensions, and serves a similar purpose in xarray to the pandas.DataFrame.

(Personally not sure about the analogy: Dataset is like a collection of series *or* DataFrames)

## NTS


* Pandas 2: https://dev.pandas.io/pandas2/ - https://github.com/pandas-dev/pandas2 (from 2017 for pandas2)
  * Pandas 2 never happened https://github.com/pandas-dev/pandas2 (stalled in 2017 ...). May happen in 2021 according to this milestone for it https://github.com/pandas-dev/pandas/milestone/42

## Inbox

* Out-of-Core DataFrames for Python, ML, visualize and explore big tabular data at a billion rows per second. 3.2 ⭐
* https://ray.io/ - distributed computing in python (??)
  * Seems to be an alternative / competitor to ray but more general (dask is very oriented to scaling pandas style stuff)
* https://modin.readthedocs.io/en/latest/ - a way to convert pandas to run in parallel "Scale your pandas workflow by changing a single line of code"
* https://github.com/reubano/meza - meza is a Python library for reading and processing tabular data. It has a functional programming style API, excels at reading/writing large files, and can process 10+ file types. 
  * Quite a few similarities to frictionless data type stuff
  * Mainly active 2015-2017 afaict and last commit in 2018
* https://github.com/atlanhq/camelot  PDF Table Extraction for Humans
* http://blaze.pydata.org/ - seems inactive since 2016 (according to blog) and github repos look quiet since ~ 2016
  * Datashape - https://datashape.readthedocs.io/en/latest/overview.html - Datashape is a data layout language for array programming. It is designed to describe in-situ structured data without requiring transformation into a canonical form.
  * Dask: https://dask.org - "Dask natively scales Python. Dask provides advanced parallelism for analytics, enabling performance at scale for the tools you love". Was part of Blaze and now split out as a separate project. this is still *very* active (in fact main maintainer formed a consulting company for this in 2020)
    * https://github.com/dask/dask "Parallel computing with task scheduling" 
  * odo - https://odo.readthedocs.io/en/latest/ - https://github.com/blaze/odo  - Odo: Shapeshifting for your data

  > odo takes two arguments, a source and a target for a data transfer.
  > 
  > ```
  > >>> from odo import odo
  > >>> odo(source, target)  # load source into target
  > ```
  >
  > It efficiently migrates data from the source to the target through a network of conversions.

### Blaze

The Blaze ecosystem is a set of libraries that help users store, describe, query and process data. It is composed of the following core projects:

* Blaze: An interface to query data on different storage systems
* Dask: Parallel computing through task scheduling and blocked algorithms
* Datashape: A data description language
* DyND: A C++ library for dynamic, multidimensional arrays
* Odo: Data migration between different storage systems

## Appendix: JS "DataFrame" Libraries

A list of existing libraries.

*Note: when we started research on this in 2015 there were none that we could find so a good sign that they are developing.*
* https://github.com/opensource9ja/danfojs 274⭐️ - ACTIVE Last update Aug 2020
* https://github.com/StratoDem/pandas-js 280⭐️ - INACTIVE last update sep 2017
* https://github.com/fredrick/gauss 428⭐️ - INACTIVE last update 2015 - JavaScript statistics, analytics, and data library - Node.js and web browser ready
* https://github.com/Gmousse/dataframe-js 283⭐️ - INACTIVE? started in 2016 and largely inactive since 2018 (though minor update in early 2019)
  * dataframe-js provides another way to work with data in javascript (browser or server side) by using DataFrame, a data structure already used in some languages (Spark, Python, R, ...).
  * Comment: support browser and node etc. Pretty well structured. A long way from Pandas still.
* https://github.com/osdat/jsdataframe 26⭐️ - INACTIVE started in 2016 and not much activity since 2017. Seems fairly R oriented (e.g. melt)
  * Jsdataframe is a JavaScript data wrangling library inspired by data frame functionality in R and Python Pandas. Vector and data frame constructs are implemented to provide vectorized operations, summarization methods, subset selection/modification, sorting, grouped split-apply-combine operations, database-style joins, reshaping/pivoting, JSON serialization, and more. It is hoped that users of R and Python Pandas will find the concepts in jsdataframe quite familiar.
* https://github.com/maxto/ubique 91⭐️ - ABANDONED last update in 2015 and stated as discontinued. A mathematical and quantitative library for Javascript and Node.js
* https://github.com/misoproject/dataset 1.2k⭐️ - now abandonware as no development since 2014, site is down (and maintainers seem unresponsive) (was a nice project!)

Other ones (not very active or without much info):

* https://github.com/walnutgeek/wdf - 1⭐️  "web data frame" last commit in 2014 http://walnutgeek.github.io/wdf/DataFrame.html
* https://github.com/cjroth/dataframes
* https://github.com/jpoles1/dataframe.js
* https://github.com/danrobinson/dataframes

### References

* https://stackoverflow.com/questions/30610675/python-pandas-equivalent-in-javascript/43825646 (has a community wiki section)
* https://www.man.com/maninstitute/short-review-of-dataframes-in-javascript (2018) - pretty good review in june 2018. As it points there is no clear solution.

