---
redirect_from: /2015/03/presenting-public-finance-just-got-easier/
title: Presenting public finance just got easier
authors:
- Tryggvi Björgvinsson
---
<em>This blog post is cross-posted from the <a href="http://ckan.org/2015/03/20/presenting-public-finance-just-got-easier/" target="_blank">CKAN blog</a>.</em>

<a href="http://ckan.okblogfarm.org/files/2015/03/mexico_ckan_openspending.png"><img class="aligncenter wp-image-3446 size-large" src="http://ckan.okblogfarm.org/files/2015/03/mexico_ckan_openspending-1024x519.png" alt="mexico_ckan_openspending" width="591" height="300" /></a>

<b>CKAN 2.3 is out! The world-famous data handling software suite which powers data.gov, data.gov.uk and numerous other open data portals across the world has been significantly upgraded. How can this version open up new opportunities for existing and coming deployments? Read on.</b>

One of the new features of this release is the ability to create extensions that get called before and after a new file is uploaded, updated, or deleted on a CKAN instance.

This may not sound like a major improvement  but it creates a lot of new opportunities. Now it's possible to analyse the files (which are called resources in CKAN) and take them to new uses based on that analysis. To showcase how this works,<a href="https://okfn.org"> Open Knowledge</a> in collaboration with the<a href="http://gov.mx"> Mexican government</a>,<a href="http://worldbank.org"> the World Bank</a> (via <a href="https://twitter.com/pforod">Partnership for Open Data</a>), and the<a href="https://openspending.org"> OpenSpending project</a> have created a new CKAN extension which uses this new feature.

It's actually two extensions. One, called<a href="http://budget"> ckanext-budgets</a> listens for creation and updates of resources (i.e. files) in CKAN and when that happens the extension analyses the resource to see if it conforms to the data file part of the <a href="http://fiscal.dataprotocols.org/">Budget Data Package specification</a>. The budget data package specification is a relatively new specification for budget publications, designed for comparability, flexibility, and simplicity. It's similar to data packages in that it provides metadata around simple tabular files, like a csv file. If the csv file (a resource in CKAN) conforms to the specification (i.e. the columns have the correct titles), then the extension automatically creates the Budget Data Package metadata based on the CKAN resource data and makes the complete Budget Data Package available.

It might sound very technical, but it really is very simple. You add or update a csv file resource in CKAN and it automatically checks if it contains budget data in order to publish it on a standardised form. In other words, CKAN can now automatically produce standardised budget resources which make integration with other systems a lot easier.

The second extension, called<a href="http://openspending"> ckanext-openspending</a>, shows how easy such an integration around standardised data is. The extension takes the published Budget Data Packages and automatically sends it to <a href="https://openspending.org/">OpenSpending</a>. From there OpenSpending does its own thing, analyses the data, aggregates it and makes it very easy to use for those who use OpenSpending's visualisation library.

So thanks to a perhaps seemingly insignificant extension feature in CKAN 2.3, getting beautiful and understandable visualisations of budget spreadsheets is now only an upload to a CKAN instance away (and can only get easier as the two extensions improve).

To learn even more, see this report about <a href="https://docs.google.com/a/okfn.org/document/d/1J-TI94i4s15xXTayJldthOTENoV-1sp24PwfOPZHBLs/edit#">the CKAN and OpenSpending integration</a> efforts.

