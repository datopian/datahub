--- 
author: $authornamehere
redirect_from: /2012/03/uk-25k-spending-data/
title: UK 25k Spending Data
---
Since the question just came up about what's going on there, figure
this is a good day to tidy this up and send it out...


Most people who managed to submit sources sent in data that was
substantially correct, with the only inconveniences being:

 - arbitrary variation in spelling of column headers. Standardise this
 - reporting of VAT: some include it, some exclude it, some do both, and most do not say which they do
 - currency of amounts. Talk to accountants and come up with a good
 way to report this; it is clear that the bulk of sources just want to
 use GBP, but some departments that operate overseas have complexities
 and no clear exchange rate.
 - reporting of VAT numbers is rare. We should reconsider whether this
 is worth bothering with
 - reporting of dates: invoice date, or payment date?

Many people included too many or too few fields. Standardise on a set
of mandatory and optional fields. Strongly discourage the inclusion of
data not in the optional set, because people tend to add extra columns
reflecting their opinion of how the data should be structured, and
neglect the recommended ones. 20% of submitted sources used exactly
the recommended columns without prompting; let's get this number up.

Most people wanted to include a unique transaction reference
number. Add this to the set of standard columns.

Some people wanted to include a narrative/description field. This
should be encouraged; add as optional field.

Some people wanted to include commentary or cover notes in their
spreadsheets. This should be strongly discouraged. It needs to be
emphasised that they are supposed to be releasing *raw* data for
analysis, not documents for people to read.

Invalid data is heavily skewed towards the same errors:

1. The URL supplied to data.gov.uk does not point to a csv or
spreadsheet. This accounts for about 10% of all entries on data.gov.uk
and in the bulk of those cases, the URL simply points to nothing; the
largest remaining case is a URL pointing to a web page that talks
about the data or lists places it can be downloaded, instead of
pointing directly to the data files.

This could be eliminated entirely by fetching URLs when they are
submitted to data.gov.uk, and rejecting anything that is not a csv or
spreadsheet. A simple check of the first few bytes of each file is
sufficient to identify almost every error immediately and reject URLs
which are obviously wrong, and this would eliminate over 90% of bad
submissions. No other action could be so valuable in terms of data
gained from time spent, so this should be done first and soon. I would
estimate the engineering cost to be substantially less than a day for
a person familiar with the code.

A subset of these cases will be URLs that were once valid, but the
files have since been removed. Data sources should be reminded of the
need to maintain a permanent archive of this data at fixed
URLs. data.gov.uk should regularly revalidate URLs and automatically
mail responsible people when they go away.

2. Automated data extraction/reporting that went wrong - spreadsheets
full of formulas or errors. Automated reporting is a good idea; nobody
looked at these files before uploading them because they are obviously
wrong. It should be straightforward to get them fixed if anybody ever
tells the creator.

Errors not falling into the above two categories are mostly cases of
complete nonsense or lack of understanding from the data
submitter. These should be handled on a case-by-case basis.

There is no evidence of widespread difficulty or need for
education. Clear and precise guidelines about the format to release
data in, and validation of submitted URLs, should be the focus. Only a
tiny number of submitters (<10) had an ignorance problem, and these
are likely to be a simple case of the problem being dumped on a junior
employee because nobody thought it was important.

Areas for further work after everything above this line has been done:

 - unique identification of suppliers. Name isn't very good at
 identifying companies, and we should be able to link in other data
 about companies
 - what value should be in the departmentfamily, expensearea, and expensetype fields?
 - character set of submitted data
