---
authors:
- anders
redirect_from: /2013/06/universities-on-the-spending-map/
title: Budget transparency for an open university
---

<iframe width='600' height='400' src='http://openspending.org/upo-income-budget/embed?widget=treemap&state=%7B%22drilldown%22%3A%22articulo%22%2C%22year%22%3A%222012%22%2C%22cuts%22%3A%7B%7D%2C%22drilldowns%22%3A%5B%22articulo%22%5D%7D&width=600&height=400' frameborder='0'></iframe>

This is a guest post by [José Félix Ontañón](https://twitter.com/fontanon) of [Openkratio](http://openkratio.org/).

The project began by scraping budget documents in PDF format published by the University of Grenade to a machine-readable format with the purpose of making it easier for citizens, journalists and even employees at the university to work with the data, using tools from spreadsheets to visualization suites. The resulting app allow users to download the income and expenditure budgets in CSV format and provides a set of comprehensive visualizations.

The idea emerged at the International Open Data Day, a gathering of citizens in cities around the world to write applications, using open public data to show support for and encourage the adoption open data policies by the world's local, regional and national governments. The Open Knowledge Foundation's local Spanish chapter did a call for participants and the Free Software Office at the University of Grenade accepted the challenge.

The set of tools used for the project included:

* [CometDocs](http://www.cometdocs.com/) (online pdf 2 excel converter)
* [Open Refine](http://openrefine.org/) (data cleaning)
* [DataHub](http://datahub.io) (data hosting)
* [OpenSpending API](http://docs.openspending.org/en/latest/model/design.html) & [D3.js](http://d3js.org) (visualizations)

###The importance on University budget transparency

The Spanish Public Universities are almost solely funded by several Public Administration Offices. With the University of Grenade as an example, the amount of income coming from Public Payments (including college tuition) only raise up to 11% of the total. As a result of the Spanish economic crisis some college tuition rates rose, having a deep impact on the
pocket of those on the verge of being able to pay their studies.

By releasing University budgeting data, the project:

* Highlighted the reality of the resources available at the university
* Helped identify potential best practices in savings that could be used by other universities
* Helped citizens to make smart proposals on why-and-where the public should invest in higher education

Spanish public universities are equipped with system called SIIU (Integrated University Information System) and they are required to report budget data using this
system. Thus in reality most of the technical challenges around developing budgets in electronic and harmonized formats has already been completed. The question is therefore why the Ministry of Education will not make this information available to the public.

###Reactions following the publication of the app
Honestly, budget transparency at universities is not a hot-topic today. Fortunately, a growing community in Spain where David Rey Jordan, a colleague at OpenKratio citizen group, member
of Open University group at OKFN Spain, and a public employee at Universidad Pablo de Olavide (Seville, Spain) encouraged me to replicate the same exercise for Olavide. Universidad Pablo de Olavide University opened its own Open Data Portal on 2012 releasing data about budgets and qualifications. Some visualizations using OpenSpending were done at the Open Data Day.

Find Openkratio on [github](http://openkratio.github.io/ugr-presupuestos/)

Nota: There are some weak points on the data. While income budget is broken down in
four levels, only three levels for the spending budget are available. The official University
spending budget document (with 5 levels) has been published as scanned PDF images
making them virtually imposible to be scrapped.
