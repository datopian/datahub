---
title: "Putting the Open Data Into Open Budgets"
---

# Putting the Open Data Into Open Budgets

We have looked in detail in this report at criteria which make it difficult for organisations to use data that has been released by governments.  In January 2013, we hosted a community call with to look at what the demands of the Open Data Community are with regard to Open Budgets. Despite both featuring the word “Open” - there is still a disconnect between the use of the word “open” in many circles to signify availability and “open” in technical spheres to signify absence of legal, technical and social restrictions. 

The purpose of the call was to investigate whether it would be possible to specify the demands of the Open Data Community with relation to budget and spending data. 

## What do we need and how do we need it? 

### Structured data

So it’s not so labour-intensive to do analysis!

For definitions of structured data, please see section below: *Structured data: What data formats to provide* 

### Bulk access 

* *It should also be possible to download all of the budget information in bulk*. 
* Preventing bulk downloads by using systems such as CAPTCHA is not acceptable. 
* Some interviewees requested data to be released via an API. This is indeed a useful move particularly when data is updated regularly, but should not be the only method to acquire the data - many non-technical users require simply bulk download of the data.

### Updates and amendments

If there is a requirement to update or change the budget documents e.g. as new drafts are produced - it's important to show the versions and keep track of the changes. Some suggestions: 

* Displaying what date the data was "updated on", or using version numbers would be acceptable. 
* Crucial is that there should be access to all drafts (i.e. they should not be removed from their place of publication and should remain available) even when new versions are published.

### Timely data (that stays around)

Data is required: 

* Within a period of time that would allow change to take place
* Early in budget formulation process so that it is possible to participate in discussion about where the funds should actually go
* After budget formulation so that you could monitor whether things had actually happened
* Planned versus execution data while such comparisons still matter - for example, so that one might complain that a project didn’t actually happen, and the guy who would have been responsible for that is still in that job, and the people who would have benefited from it are still going to be angry

<div class="well">

<h3>How long should data be available online? </h3>

<ul>
	<li>The costs of storing information online nowadays are so minimal, that this question is essentially redundant (i.e. the answer is "forever"). </li>
	<li>If a government feels it is absolutely necessary to remove data after a certain period of time *(this should be a minimum of several years after original publication, longer if the period to which the budget relates is greater than a year)*, they should **specify at time of publication, clearly the time and date on which the information will be removed**. This will allow civil society organisations sufficient time to make a backup copy for themselves.</li>
</ul>
</div>

### Classifications

Different users are interested in different aspects of budgets. Not all classifications will be available, and the availability and structure of classifications, as well as the requirements of individuals and organisations, will vary from country to country.


* All available classifications should be published.
* Functional classifications are often the most comprehensible to citizens. They explain the particular themes or sectors on which money is spent. There are also international standards for comparing functional spending (e.g. COFOG).
*  Programmatic classifications are used particularly in developing countries for relating to multi-year development plans
* Administrative classifications show which department or agency received the money – and are therefore important for the accountability of funds down the chain.

##### Breakdown
* Information can then be aggregated up to create more meaningful and digestible information, but the reverse (from aggregate to disaggregate information) is not possible.
* Again, the availability of detailed information, as well as the requirements of individuals and organisations, will vary from country to country.
* Therefore, budgets should be as detailed and disaggregated as possible.

### Spending standard

In the [Technology for Transparent and Accountable Public Finance Report](http://community.openspending.org/research/gift/), we identified the need for a global standard for opening up transaction-level spending data. A couple of further comments on this topic. 

* This is probably going to be more useful at the international level – e.g. to pull all the data together and look at super-aggregate information.
* It could also be useful at country level though, for inter-country comparisons. 

# Structured data: What data formats to provide

The number one low-hanging fruit which could be solved in order to vastly improve the usability of available budget and spending (plus procurement and other types listed above) information is to make data **machine-readable**.

<div class="well"><h2>What does Machine-readable mean?: Implementation guidelines from the UK government.</h2>
<quote>
The UK government have now issued very good clear, <a href="https://www.gov.uk/service-manual/design-and-content/choosing-appropriate-formats.html">plain-language guides</a> for service managers on which data formats are appropriate for publishing data. The US government has also decreed that all data shall be published in machine-readable formats. An extract from the UK service manual from gov.uk is copied below for the convenience of the reader: 
<ul>
<li><quote><strong>“For data, use CSV or a similar ‘structured data’ format (see also JSON and XML). Do not publish structured data in unstructured formats such as PDF</strong></quote>.</li>
<li><quote><strong>If you are regularly publishing data (financial reports, statistical data, etc.) then your users may well wish to process this data programmatically, and it becomes especially important that your data is ‘machine-readable’. PDFs, Word documents and the like are not suitable formats for data publication. In addition, you should consider making your data available through an API if this will simplify your users’ interactions with your publications. [...]</quote></strong> </li>
<li><quote><strong>If you are publishing a written report that contains statistical tables, provide the tables alongside or in addition to your report in suitable data formats.</quote></strong>
</ul>
</quote>

[...] 

<quote>

<h2>Don’t assume your users can read proprietary formats</h2>
Wherever possible, publish in accessible, patent-free, <a href="https://en.wikipedia.org/wiki/Open_format">open formats</a>, for which software is widely available on a variety of platforms. If publishing in proprietary formats, you should always make a non-proprietary alternative available.
[...] For tabular data, provide <strong> <a href="http://en.wikipedia.org/wiki/Comma-separated_values">CSV</a> or <a href="http://en.wikipedia.org/wiki/Tab-separated_values">TSV</a> </strong> rather than Excel spreadsheets (.xls/.xlsx).
<p>
	
</quote>	
Read the full version of the guidelines <a href="https://www.gov.uk/service-manual/design-and-content/choosing-appropriate-formats.html">here</a>.
</p>
</div>

## Why is this so important? 

Civil Society Organisations currently waste a huge amount of time and resources in converting data from non-machine-readable formats into ones that they can use for analysis, visualisations or other projects. Any data project has a data pipeline: 

![Spending Data Pipeline](http://farm9.staticflickr.com/8399/8883957266_d31e9bb404_z.jpg)

Typically, in the projects we have analysed in this report, finding data and getting data (including extracting data out of formats such as PDFs into usable formats) are the most time intensive part of all of the projects. Extracting data out of non-machine readable formats: 

* **is a waste of time and resources for all involved**. In an ideal world, re-users of the data should be able to dedicate the majority of their time to analysis, presentation and action around the data. It can take weeks or months for organisations to extract all the information from one document or file, enough to make a visualisation or simple analysis. 
* **introduces transcription errors during conversion**. Even current software to extract information from PDFs automatically and can introduce errors. 