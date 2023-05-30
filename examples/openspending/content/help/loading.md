---
section: help
lead: true
title: Dataset loading API
authors:
- Neil Ashton
---

#### OpenSpending Loading API

Users can load datasets (or add sources to them) by making a *POST* request to ``https://openspending.org/api/2/new`` (notice *https*) with the following url parameters:

* *csv_file* - A **url** to the csv file to me imported for the dataset
* *metadata* - A **url** to the json file with dataset metadata (name, currency, etc.) and the model. Views can also be defined in this file. Take a look at [a sample json file](https://dl.dropbox.com/u/3250791/sample-openspending-model.json) to see how it should be structured (the value for *mapping* is the model - how the csv file should be cast into dataset dimensions, and the value for *dataset* is the metadata itself). To gain a better understanding of how to do the mapping, take a look at [the corresponding csv file](http://mk.ucant.org/info/data/sample-openspending-dataset.csv).

Along with these two an api key must be provided in the header of the request. For more details see [API Conventions](/help/conventions/).

**Up**: [OpenSpending API](../)
