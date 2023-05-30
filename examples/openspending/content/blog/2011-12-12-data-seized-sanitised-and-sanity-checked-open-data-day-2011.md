--- 
authors:
- mark
redirect_from: /2011/12/data-seized-sanitised-and-sanity-checked-open-data-day-2011/
title: Data = Seized, Sanitised and Sanity-checked. Open Data Day 2011
tags: 
- CKAN
- events
- IATI
- Open Data Day
- Publish What You Fund
---
**This post is by Mark Brough, Research Officer at [Publish What You Fund](http://www.publishwhatyoufund.org/),  [Lucy Chambers](http://okfn.org/members/lucychambers), Community Coordinator for OpenSpending, and [Irina Bolychevsky](http://okfn.org/members/shevski), Product Owner for CKAN. It is cross-posted on the [OpenSpending Blog](http://blog.openspending.org/2011/12/10/data-seized-sanitised-and-sanity-checked-open-data-day-2011) and the [Open Knowledge Foundation Blog](http://blog.okfn.org/2011/12/12/data-seized-sanitised-and-sanity-checked-open-data-day-2011) and Mark Brough's contribution is also featured on [aidinfolabs.org](http://www.aidinfolabs.org/archives/786).** 

**Saturday, December 3rd was Open Data Day, and London took the challenge to throw a hackday to help data be opened, cleaned and shown off to the world...** 

Fuelled only by enthusiasm, caffeine and 5 packets of ready-made popcorn, the CKAN, OpenSpending and IATI teams, along with some new faces, joined forces to liberate as much data as they could... 

<img alt="" src="http://farm8.staticflickr.com/7157/6471082237_b687e15771_z.jpg" title="Mark Brough hard at Work on IATI wrangling" class="alignnone" width="640" height="480" />

## OpenSpending + IATI + CKAN

As part of the IATI Open Data Day challenges, Mark Brough did some work to get the existing IATI Data into OpenSpending. David Read, from the CKAN team, and a new face to the data wrangling crew, Johannes, scraped data on aid donations from France and Austria that were locked-up in web apps in order to help fill in the gaps in the global aid data jigsaw puzzle. You can see the results on OpenSpending.

* France: <http://thedatahub.org/dataset/france-afd> and on OpenSpending: <http://openspending.org/afd>
* Austria: <http://thedatahub.org/dataset/ada>, on OpenSpending: <http://openspending.org/ada>

The French (AFD) and Austrian (ADA) aid data appears to be incomplete: the AFD's [2010 Annual Report]<http://www.afd.fr/jahia/webdav/site/afd/shared/PUBLICATIONS/Colonne-droite/Rapport-annuel-AFD-VF.pdf> suggests that South Africa is the biggest recipient country, receiving €403 million, but in the data, Morocco is the biggest recipient and there are no transactions in South Africa.

The Austrian Development Agency data was carefully cleaned by Johannes, with region and country codes being added for all entries to create a tidier dataset. However, the original data contained, for example, four different spellings of Bosnia and Herzegovina, suggesting that countries are being manually entered rather than selected from an existing list. [For 2010]<http://openspending.org/ada/?_time=2010&_view=country>, the second biggest recipient of the Austrian Development Agency's aid (after aid not going to a specific country) appears to be Austria.

Nevertheless, despite the issues surrounding data quality, it was a useful exercise to show both the value of open data - that if you release your data, you can do pretty cool things with it - and the costs of keeping it locked away, namely that the data then has to be scraped from sites in quite a labour-intensive way.

These, along with many other datasets discovered on the day via tweets and emails have been added to the [Open Data Day Group](http://thedatahub.org/group/open-data-day) on [theDataHub.org](http://thedatahub.org). 

On the same day, we worked to get the data released as part of the International Aid Transparency Initiative into OpenSpending. You can see the results of the IATI wrangling process on [OpenSpending.org/iati](http://www.openspending.org/iati). This following section is written by Mark. 

### 1. Getting the data

Downloading the existing IATI data has already become quite a big task; with 19 publishers so far, the data currently amounts to over 750MB with 1169 packages. Fortunately this is made easier by the IATI Registry, which provides an API to access all existing datasets, and a simple script (links at end) can retrieve all of the data.

### 2. Extracting the data
Extracting the data from the XML files is more complicated. Although IATI data uses a standard schema, there are a few cases where publishers have either used the markup incorrectly, or else interpreted the definitions slightly differently. This can be simple problems such as stating that an organisation is “implementing” rather than “Implementing”, or placing the date within the text of the <activity-date> tag and not the “iso-date” attribute of that tag, or more significant problems such as placing implementing organisations in the “accountable” organisation field.

However, these problems are still fairly limited and follow fairly regular patterns, so they are not too hard to overcome. There are more significant problems when some donors have for example used three-letter (ISO-3) country codes, rather than two-letter (ISO-2) country codes. (This is considered below in “next steps”.)

### 3. Wrangling the data
OpenSpending is designed to show spending data, and has a powerful aggregation system to show large collections of transactions in a meaningful way. However, IATI data is organised by activities, with transactions nested within activities (projects), and – reflecting the business models of funders – activities sit within other activities (e.g., projects within programs), although they are not nested in the actual XML. Furthermore, one of the significant advantages of IATI compared to other aid data formats is that it permits multiple sectoral classifications, allowing you to assign a proportion of the value of an activity to each sector. So, you might have an activity that is 50% related to health and 50% to education.

To prepare the data for OpenSpending, each transaction inherits the properties of its activity (and, if that activity has a parent, that parent activity’s title and description). Then, the transaction is broken out into mini transactions, with the proportion of the activity assigned to each sector used to assign a proportion of the value of the transaction to each sector. So, from transactions, you get mini “sector-transactions”.

This takes about 40 minutes to compile, and then one final step remains: to convert the currencies to a single currency. Currently, USD, EUR and GBP amounts are used in the IATI data. All data is converted to USD using the average for 2010 from the OECD’s Financial Indicators (MEI) dataset. (This is also considered below in “next steps”.)


### 4. Loading the data
OpenSpending’s new web-based loading interface makes it relatively easy to load data in, although you currently also have to write a model and views (links at end).


### Results
The results can be viewed in the OpenSpending IATI dataset. You can explore the data by recipient country, sectors, funding organisation, and drill down through the data to see the data for an individual country.



### Problems with the data
So far I’ve noticed the following problems:

* “Unknown” recipient location is incorrectly marked as “South Sudan”
* Recipient countries are listed twice, as Spain has used ISO3 rather than ISO2 country codes.
* Sweden is listed as “Ministry of Foreign Affairs” (this is how they have listed themselves as the Funding Organisation in the data)
* Sweden’s implementing organisations have been lost as they placed them in the accountable organisation field.

Please let me know if you see anything else problematic, if you have and criticisms of feedback of the way the data has been presented, or if you think there are other ways you’d like to be able to explore the data, based on the available dimensions.

### Next steps
As mentioned above, there are some problems with the data which should properly be dealt with at the level of the donor agency. But there are others that will probably have to be dealt with by users of the data:

* Mapping between different sector vocabularies, so that you can see all “Health” projects, and not only the health projects according to a single vocabulary
* Mapping between countries and regions, so that every project in a country has a related region
* Correctly converting currencies using the “value-date” column to get a more precise (at least month-specific) conversion.

**What else have you noticed with the data? Is there anything else that should be changed? Anything interesting?**

You can contact Mark about this data via the [OpenSpending mailing list](http://lists.okfn.org/mailman/listinfo/openspending)

### Useful Links
* [IATI on OpenSpending](http://www.openspending.org/iati)
* [Data wrangling scripts and tools](https://github.com/okfn/iatitools)
* [Mapping spreadsheets](https://github.com/okfn/iatitools/tree/master/mapping)
* [Etherpad from Open Data Day - attendees and projects they worked on](http://ckan.okfnpad.org/opendataday)
