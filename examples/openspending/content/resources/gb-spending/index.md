---
title: UK Departmental Spending
---

Every entity within the UK central government has to report its
expenditure once a month. However, the data released through this
mechanism is patchy - some national bodies and local councils report
all of their spending in great detail, while others report nothing or
export their data in forms which are hard to interpret. This leads to
a skewed picture of government finances - as it becomes hard for data
users to distinguish between the absence of data and the absence of
transactions having taken place.

This is why we decided to initiate a collaboration between
OpenSpending and the team behind <a
href="http://data.gov.uk/">data.gov.uk</a> to help fix this
issue. We've built a data cleansing and validation toolkit which makes
the data available in regular intervals while it easier to spot
departments that are not keeping up with their publication
requirements.

The tool <a href="report/index.html">lists all public bodies
registered as data publishers on data.gov.uk</a> and details how well
they have followed the <a
href="http://www.hm-treasury.gov.uk/psr_transparency_index.htm">HM
Treasury reporting guidelines</a>. It will also make the whole of the
reported data available for search and analysis - either within the
OpenSpending platform or as a bulk download.

## Clean-up stages

The clean-up and integration of the (over 6000) spreadsheet documents
required a number of stages, ranging from retrieval to
validation. Below we provide a brief overview of the technical stages
involved in the process:

- Going through the <a href="http://data.gov.uk/data/search?tags=spend-transactions">index on data.gov.uk</a>, we tried to <strong>retrieve all of the linked resources</strong>. Many of them turned out to be missing, either because they had been invalid in the first place, or because the data had been removed since their publication.
- Next, the <strong> format of the downloaded files had to be detected</strong>. While the treasury mandates that files should be released as CSV (comma-separated values), many entities publish their spending in Excel or OpenOffice formats. Some departments are also still publishing PDF files, which cannot be analyzed automatically.
- Once the format of the data is understood, we need to <strong>find and match the given column headers</strong> from the data with those field names mandated by the Treasury. While the guidance names 16 headers, few departments actually report on all of them. On the other hand, many add their own data, such as project identifiers or non-standard classification schemes. To ensure data quality, many of the column headers had to be matched manually, using the <a href="http://nomenklatura.okfnlabs.org/">nomenklatura</a> web interface.
- Within some of the required fields, we decided to further <strong>apply cleansing and integration tools</strong>. This included simple tools to interpret dates and numbers, but also <a href="http://opencorporates.com">OpenCorporates</a> to reconcile supplier names and <a href="http://nomenklatura.okfnlabs.org/">nomenklatura</a> for department family names.
- Finally, data had to <strong>pass validation</strong>. Out of a total of 7mn extracted transactions, only 4mn met the minimum requirement of having both an amount and date associated with them.
- We then created a report which detailed any issues in getting the data. Data.gov.uk supported this by giving us information on which departments were core (thus had to report), and which were just recommended to do so.

In all, the process is still very prone to errors and the messiness of
the input data is making a strong case for the enforcement (and
technical implementation) of a <a
href="http://spendingdata.org/">standard for transactional spending
data</a>.

## Use the data

- <a href='http://data.gov.uk/openspending'><strong>Browse the data</strong></a>
- <a href='report/index.html'><strong>Report on data publishers</strong></a>

## Official guidance

- <a href="http://hm-treasury.gov.uk/psr_transparency_index.htm">HM Treasury Guidance</a>
- <a href="http://www.communities.gov.uk/corporate/transparencyingovernment/">Information on council spending</a>

## Data and tools

- <a href="http://data.etl.openspending.org/uk25k/">Raw data dumps (CSV)</a>
- <a href="https://github.com/openspending/dpkg-uk25k">Extraction &amp; reporting tool on GitHub</a>
- <a href="http://opencorporates.com">OpenCorporates.com</a>
- <a href="http://nomenklatura.okfnlabs.org/uk25k-column-names">Column mappings (Codesheet)</a>
- <a href="http://nomenklatura.okfnlabs.org/uk25k-departments">Department families (Codesheet)</a>
