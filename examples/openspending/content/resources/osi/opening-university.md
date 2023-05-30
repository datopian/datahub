---
title: "Budget transparency for an open university"
---

# Budget transparency for an open university

The demand for financial data doesn't just come from CSOs, and it doesn't just target national or even regional governments. The University of Granada's budget data app provides an example of a demand for budget data originating and being met within the hyper-local space of a single university. Empowering local actors to demand and make use of data is the next frontier in spending transparency.

## University of Granada budget app

The idea to build an app to make the University of Granada's budget data more accessible emerged during International Open Data Day, a gathering of citizens in cities around the world to write applications using open public data to show support for and encourage the adoption open data policies by the world's governments. The Open Knowledge Foundation's Spanish chapter did a call for participants, and the Free Software Office at the University of Granada accepted the challenge.

The project began by scraping the budget documents published by the University of Granada in PDF format and converting their data to a machine-readable format. The goal of this step was to make it easier for citizens, journalists and even employees at the university to work with the data, using tools ranging from spreadsheet programs to visualization suites. The project then went on to build an app to allow users to download the income and expenditure budgets in CSV format and to provide a set of comprehensive visualizations.

The set of tools used for the project included:

* [Cometdocs](http://www.cometdocs.com) (online PDF-to-Excel converter)
* [OpenRefine](http://openrefine.org) (data cleaning) 
* [DataHub](http://datahub.io) (data hosting)
* [OpenSpending](http://openspending.org) API & [D3.js](http://d3js.org) (visualization)

<iframe width='100%' height='400' src='http://openspending.org/upo-income-budget/embed?widget=treemap&state=%7B%22drilldown%22%3A%22articulo%22%2C%22year%22%3A%222012%22%2C%22cuts%22%3A%7B%7D%2C%22drilldowns%22%3A%5B%22articulo%22%5D%7D&width=700&height=400' frameborder='0'></iframe>

## The importance of university budget transparency 

Spanish Public Universities are almost solely funded by the various Public Administration Offices. In the University of Grenada's revenues, for example, the amount of income coming from public payments (including college tuition) only covers 11% of the total. As a result of the Spanish economic crisis, some college tuition rates rose, having a deep impact on the 
pockets of those on the verge of being unable to pay for their studies.

By releasing the University's budget data, the project:

* Highlighted the reality of the resources available at the university
* Helped identify potential best practices in savings that could be used by other universities
* Helped citizens to make smart proposals on why and where the public should invest in higher education

Spanish public universities are equipped with system called SIIU (Integrated University Information System), and they are required to report budget data using this system. Thus, in reality, most of the technical challenges around developing budgets in electronic and harmonized formats has already been completed. The question is therefore why the Ministry of Education does not make this information available to the public.

*Summary based on blog post by J. Félix Ontañón at OpenKratio.*