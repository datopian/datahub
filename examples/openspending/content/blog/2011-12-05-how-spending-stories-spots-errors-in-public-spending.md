--- 
authors:
- martin
redirect_from: /2011/12/how-spending-stories-spots-errors-in-public-spending/
title: How Spending Stories Spots Errors in Public Spending
tags: 
- Data Journalism
- Spending Stories
---
*This article was originally published on [MediaShift Idea Lab](http://www.pbs.org/idealab/2011/12/how-spending-stories-spots-errors-in-public-spending328.html) and was co-written by Martin Keegan, project lead for Spending Stories and Lucy Chambers, Community Coordinator for OpenSpending.*

How public funds should be spent is often controversial. Information about how that money has already been spent should not be ambiguous at all. People arguing about the future will care about the present, and if data about past or present public spending is available, many will certainly look at it. When they do, occasionally they will find errors, or believe themselves to have found errors.
 
[OpenSpending](http://openspending.org/), which aims to track every (public) government and corporate financial transaction across the world, encourages users to: 

 * augment the existing spending database with additional sources of data 
 * use that data -- e.g., to write evidence-based articles and formulate informed decisions about how their society is financed.

[Spending Stories is our effort](http://www.pbs.org/idealab/2011/09/spending-stories-to-help-journalists-analyze-spending-data258.html) to make OpenSpending a natural way to do data journalism about public spending.

<img alt="openspending.jpg" src="http://www.pbs.org/idealab/openspending.jpg" width="500" height="170" class="mt-image-center" style="text-align: center; display: block; margin: 0 auto 20px;" />

## The Problem

**FACT 1:** Errors occur in data, no matter how official the source. 

**FACT 2:** Data wrangling (manipulating or restructuring datasets to correct inaccuracies, remix with other datasets to augment the data, or perform calculations on the data), *generally* improves data quality, for example, through reconciling entities and flagging amounts that are obviously incorrect. 

**FACT 3:** Data wrangling can also *introduce* errors if not tackled correctly.

Crucial to ensuring the use of this data in articles or ensuring re-use by concerned citizens is the ability to show that the data is valid. In addition, maintaining a good relationship with public bodies who are confident that they are not being misrepresented in the data is vital to ensuring the data continues to be released in the first place. In practice, this means that the provenance of the data has to be clear including: 

 * where the data originally came from (preferably a URL)
 * whether anyone (e.g., government, community data wrangler, or OpenSpending) has worked on the data since it was published, and what steps they took to change the data (i.e., these steps should be reproducible to produce the same result)

The OpenSpending team has gone to lengths to retain enough information to say who was responsible for both of the above. 

OpenSpending is a system, somewhat like a wiki, which allows you to track back through the data wrangling process and work out what changes were made to the data, when and by whom.

## Error reporting in practice

OpenSpending recently received a pointed inquiry from the U.K. Treasury disputing the claims we were making about the payment of British public money to a private company. Believing that an error had been introduced, we attempted to retrace our steps and find out where this had occurred, and who was responsible.

As we discovered, the payment *had* actually taken place, but the the OpenSpending descriptions used to label the transaction were not sufficiently detailed to accurately reflect the item in question.

With Spending Stories, we were able to retrace our steps because we had preserved a copy of the software tools we used for collecting the data (the data is published by about 50 public bodies, and must be downloaded, stitched together, and firmly molded into shape). These tools had been also made available to the public, so the Treasury and other concerned citizens could have checked our work themselves; the availability of this kind of check keeps all participants in the fiscal debate honest.

What had gone wrong was a problem of terminology: The transactions existed, but ambiguous language had been used to describe them, glossing over the distinction between the government department reporting what money had been spent and the government agency which actually spent the money. The bodies in question were the Department of Health and a regional health care trust; this distinction is certainly one which a concerned citizen would expect to be made clearly -- so we should make sure our system makes it easy to know which question is being asked.

## Checkpoints in OpenSpending

In the short term, we are mitigating the problem of data errors as follows:

 * **Data provenance** - is the source identifiable and the process reproducible? OpenSpending encourages people to add modified datasets to a "package" in the Data Hub. This allows other users to see the original document alongside any modified documents and track the chain of changes made to see clearly which points errors could have been introduced. 
 * **Crowdsourcing feedback** on spending data.
 * **Permitting re-use of the structured data** we present, so that it can inform decisions in other fact-checking systems.

Ultimately, we will build our part of the ecosystem to provide feedback to the political process, by improving democratic discourse about the public finances.

*Lucy Chambers is a community coordinator at the Open Knowledge Foundation. She works on the OKF's OpenSpending project and coordinates the data-driven-journalism activities of the foundation, including running training sessions and helping to streamline the production of a collaboratively written handbook for data journalists.*

*Martin Keegan is a software engineer and linguist, currently leading the Open Knowledge Foundation's OpenSpending project. He is also on the Open Knowledge Foundation's board, and has worked for SRI, Citrix, University of Cambridge and co-founded and worked for various civil society organizations.*
