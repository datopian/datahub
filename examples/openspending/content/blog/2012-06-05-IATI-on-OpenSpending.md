--- 
authors:
- mark
redirect_from: /2012/06/IATI-on-OpenSpending/
title: Aid Data - From XML to Visualisations
---

Are the World Bank and Department for International Development (DfID) spending money on projects in similar sectors and countries?  Does all aid to Kenya go the North-East?  How much aid in total did India receive last year?

Until recently, it was impossible to know. But now, thanks to the International Aid Transparency Initiative (IATI), we've been able to start to answer these questions - making the aid process more transparent, which is crucial for making it more effective.

[IATI](http://aidtransparency.net) is a political agreement by the world's major donors - including international banks, private foundations and NGOs - on a common way to publish aid information. It also defines a technical standard for exactly how that information should be published, IATI-XML.

So far, 29 donors representing 74% of Official Development Finance (ODF) [have committed to publishing](http://aidtransparency.net/implementation) to IATI. A further [13 donors](http://iatiregistry.org/group) representing 45% of ODF have already published, and 12 NGOs and foundations have published their own data.

This post details how we converted each donor's data, using simple scripts and open source tools, from raw XML data in the [IATI Registry](http://iatiregistry.org/) into a consolidated dataset and then, via loading into [OpenSpending](http://openspending.org/) to visualisations like those shown above and an easy-to-use RESTful API.

#### From this....

<img alt="" src="http://farm8.staticflickr.com/7086/7242714654_13d481e785.jpg" width="500" height="337" />


#### ... to this. 

<img alt="" src="http://farm8.staticflickr.com/7092/7242078030_d2240d7c10_z.jpg" title="To this" width="640" height="575" />

## Getting the Data Together

Full details of how we got the data together are in this case study on OpenSpending ... but to summarize:

* We grabbed a list of all the IATI data files via the IATI Registry API (the IATI registry is running [CKAN](http://ckan.org/) so this is very easy)
* We converted the data to an SQLite database and a simplified CSV format and posted these on the [IATI dataset on the DataHub](http://datahub.io/dataset/iati-registry)
* Modelled and loaded it into OpenSpending, creating views to visualize it in basic forms.

## What you can see

You can now explore the complete dataset of [aid data released so far through IATI, exploring the aggregate and detailed data on OpenSpending](http://openspending.org/iati/). You can drill down through the data and look at it from different perspectives, from exploring the largest sectors in a country, to different implementing organisations in that sector, to looking at all the projects implemented by a single organisation.

#### Drill down from one layer...

![IATI 1](http://farm8.staticflickr.com/7092/7341296378_c6ae9b8d6e_z.jpg)

#### ... to the next - we're zooming in on China here, breaking down by flow type...

![IATI China Zoom](http://farm9.staticflickr.com/8006/7341296584_1dfbd5ac5a_z.jpg)

#### ... and you can switch between breakdowns - slicing data here up by organisations implementing the aid...

![IATI China Implementing Organisation](http://farm8.staticflickr.com/7232/7341296452_857af887ba_z.jpg)

#### ... and here by funding organisation

![IATI China Funding Organisation](http://farm9.staticflickr.com/8024/7156094599_a2e8c531e2_z.jpg)

## More details

We've also just put together a [briefing on how we worked with the IATI data on OpenSpending.org](http://openspending.org/resources/iati/index.html). The briefing covers in depth what IATI is, using the IATI registry, consolidating data into a simple format, loading data into OpenSpending and using the API.

## Next steps & get involved.

For those keen to put coding knowledge to good use to further the IATI mission, some ideas below:

* Use the API - you can use OpenSpending's API to build applications - read the [briefing](http://openspending.org/resources/iati/index.html) for more ideas and instructions
* [Review our scripts](https://github.com/okfn/iatitools) for converting IATI data. We've been compiling a list of known [issues](https://github.com/okfn/iatitools/issues) with possible future extensions such as geo-coding, reconciling organisations and handling currencies.

## What's in the data, what's still to come

The dataset contains current and future spending by major aid donors representing 44% of ODF, with disbursement data running up to the current month in some cases. It also contains commitment data up to 2016 from one donor (and from multiple donors up to 2014).

However, the data does not contain any information from donors who have not yet published to IATI, and it also does not yet include results, project documents or geo-coded data.

Future projects might include:

 * Validation - to ensure that data is properly formatted and uses standard codelists;
 * Adding results, [geo-coding](http://open.aiddata.org/content/index/geocoding) and project documents to the OpenSpending visualisation - some of this is already available in the original source data, but has not yet been incorporated to this dataset;
 * Other visualisations - for example, a map, and activity and transaction views;
 * Running the dataset compilation automatically - so that it runs on a server nightly, is up-to-date and imports the latest version to OpenSpending as it's updated.

## The future

Eventually what we'd like to see is something like this: an integrated dataset of aid and budgets in each country, so that the full picture of resource flows is available.

![PWYF Uganda](http://farm8.staticflickr.com/7089/7242685452_5a849c773b_z.jpg)

**Which country will be next to join up their aid and budgetary flows?** You can get in touch with us via the [mailing list](http://lists.okfn.org/mailman/listinfo/openspending) if you have any questions about this project or the data.

This post was written by [Mark Brough](http://okfn.org/members/markbrough). 