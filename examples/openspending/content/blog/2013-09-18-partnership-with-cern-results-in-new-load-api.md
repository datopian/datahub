---
redirect_from: /2013/09/partnership-with-cern-results-in-new-load-api/
title: Partnership with CERN results in new Load API
authors:
- albertorodriguezpeon
---
This summer OpenSpending and the <a href="http://openlab.web.cern.ch/">Openlab at CERN</a> partnered on an internship programme to enhance financial transparency at CERN. Under the partnership <a href="http://openlab.web.cern.ch/about/people/alberto-rodriguez-peon">Alberto Rodriguez Peon</a> spent 8 weeks working with the <a href="http://lists.okfn.org/mailman/listinfo/openspending-dev">OpenSpending developer community</a> and supervisors at CERN to build the first load API for the tool. At OKCon Jiri Kuncar (CERN) who supervised the project will give a talk about the project at the session <a href="http://okcon.org/open-data-government-and-governance/session-11/">Open Finance and OpenSpending</a> Wednesday 18 September, 14:45 – 16:00 @ Room 7, Floor 2.

In this guest post <a href="http://openlab.web.cern.ch/about/people/alberto-rodriguez-peon">Alberto Rodriguez Peon</a> describes how he created the tool.

### Problem
The collaboration between CERN and the Open Knowledge Foundation implies the need of sending financial data to <a href="http://openspending.org">OpenSpending</a>, a project for mapping the financial transactions of governments and institutions.

OpenSpending manages the input of new datasets through a CSV file with raw data and a form (containing information like name, country, language, currency, etc.) filled in manually by the user.

However there is no opportunity for dynamically adding a dataset, which is what CERN needs in order to push financial information in an automated way. The OpenSpending API does not cover the process of introducing data, just searching and visualising it. To overpass this issue, we are developing this API for the OpenSpending site.

### Solution
The idea consists of adding a new method to the existing API to complement the manual input of the metadata.

For that, we replace the form with a JSON file containing all the information that we have to provide in order to create a dataset. This works in the same way that the internal tool “ostool” is used in OpenSpending for the installation and setup.

So, technically, the API request should be something like this:

<blockquote>POST /api/new?csv_file=&amp;metadata=
</blockquote>
This information would be enough to process a dataset and add it to OpenSpending except that there is no way to know which user has actually made the request and therefore we do not know the creator of the dataset.

Each OpenSpending user has an API key which can be used to identify himself for API request.

<blockquote>POST /api/new?csv_file=&amp;metadata=&amp;apikey=
</blockquote>
The problem is that we cannot just put the API key in the request as anybody can intercept it and use it as if it was its own.

### Authentication via API key
To solve this issue, we propose a solution using symmetric key as the authorization method (in an Amazon-like way).

Instead of having only a public API key for each user, we create a “secret” one as well. The idea is therefore to put the public one in the request and adding a signature, calculated using the ‘secret’ API key and a cryptographic hash algorithm (in our case MD5).

<blockquote>POST /api/new?csv_file=&amp;metadata=&amp;apikey=&amp;signature=
</blockquote>
The signature is calculated concatenating all the params in the request, sorted alphabetically and starting with the ‘secret’ key.

<blockquote>api_keycsv_filemetadata
</blockquote>
The generated string is ‘hashed’ with MD5 to obtain the signature.

Therefore, in order to validate the user, the server will calculate the signature from the params and compare it against the provided one. If both are equal, the user is authenticated.

The developed API will provide a tool for governments and organisations (including CERN) to publish data in OpenSpending without the heavy task of adding the data manually.

