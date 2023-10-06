---
section: help
lead: true
title: How does OpenSpending represent data?
authors:
- Neil Ashton
---
OpenSpending maintains a collection of datasets, each of which represents a set of data from a separate source. Inside each dataset, individual transactions are represented by a set of entries. Each dataset has its own model that maps the structure of the data. The model encodes the properties of each dataset entry in terms of *dimensions*.

#### Datasets

The basic unit in the OpenSpending system is the dataset. Financial transactions sharing a common theme (e.g. a particular city’s spending, a budget for a particular year) are grouped together and stored as a dataset. A dataset is a collection of "entries", and each entry represents a single transaction associated with a quantity of money and a time.

Datasets also include metadata to characterize their contents. The metadata includes a description of the dataset, information about the source of the data, and other such information which helps users find the dataset and interpret its contents.

#### Models

The structure of each dataset is completely up to the creator of the dataset. This structure is created by specifying a *model*, which provides the dimensions along which entries can differ from one another.

A model consists of a set of *dimensions*. A dimension is a property that potentially differentiates one entry from another. If you imagine a dataset as a spreadsheet, each dimension can be thought of as a column. Dimensions can have more structure than an ordinary spreadsheet column, however.

Dimensions come in several types. The most important is the *measure* type. Measures are dimensions which can contain a single numerical value. Another important dimension type is the *time* type, which represent dates and times. Every data needs at least one each of measure and time dimensions, representing respectively the amount of money represented by the transaction and the time when it took place.

The remaining dimension types are used to represent other properties that entries might have, e.g. transaction numbers, labels from a classification scheme, or the names of individuals or companies involved. Such dimensions include *attributes*, which can hold a single value, and *compound dimensions*, which can hold a nested set of values. Compound dimensions are useful when a property includes several sub-properties which could each be used to aggregate the data.

**Next**: [Adding data: overview](../adding-data-overview/)

**Up**: [OpenSpending Guide](../)
