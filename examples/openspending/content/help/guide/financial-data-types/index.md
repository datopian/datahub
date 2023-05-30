---
section: help
lead: true
title: What types of financial data can go into OpenSpending?
authors:
- Neil Ashton
---
OpenSpending is very flexible in the types of financial data it supports. Although the OpenSpending project has a strong focus on government finance, this is not a technical constraint. OpenSpending supports any dataset consisting of a set of transactions, each associated with a quantity of money and a time.

Most of the data currently hosted on OpenSpending can be categorized as either transactional or budgetary data. The main difference between these is their level of granularity. Transactional data tracks individual transactions, whereas budgetary data aggregates transactions into categories.

#### Transactional spending data

Transactional data, or simply "spending data", tracks individual financial transactions. Each payment from one entity to another on a given date and for a specific purpose (e.g. a project or service) is listed individually. Transactional spending data includes various types of records, including information on government grants, commitments, and actual expenditure.

Aggregate information (e.g. subtotals) should not be included in transactional data. Data that has been partially or completely aggregated calls for a different mode of analysis and should be treated as budgetary data rather than transactional data. This does not mean, however, that several "physical" payments which amount to a single “logical” transaction cannot be represented by a single transaction in transactional data.

Transactional data on OpenSpending includes:

* [DC Vendors and Contractors](http://openspending.org/dc-vendors-contractors)

* [Austrian Development Agency](http://openspending.org/ada/)

Another related type of data deals with the public procurement procedures. Public Procurement data is data about public tenders: what was tendered, for how much, and who won the tender. It can be seen as a subset of transactional data.

Procurement data on OpenSpending includes:

* [Marchés publics au Sénégal](http://openspending.org/marches-publics-senegal/views/liste-des-attributaires)

* [Marchés publics France 2011](http://openspending.org/marches-publics-france-2011)

#### Budgetary data

In budgetary data, expenditures and incomes are aggregated into categories. The goal of this aggregation is to aid the reader in understanding the budget, which is typically a policy document that is used to provide readers with an overview of the government’s most important financial choices. Allocation is typically structured by a classification scheme rather than by the actual recipients of funds.

Budgetary data often jointly presents data on past outcomes and appropriations for a future period. In such a presentation, amounts spent in previous years on a particular sector are used to inform how much should be allocated for the coming budgeting period. Budget information is often based on aggregated data and statistical estimates.

Different regions make different types of budgetary information available, including: Pre-Budget Statements; Executive Budget Proposals; Enacted Budgets; and Citizen's Budgets (simplified versions of the budget for the benefit of citizens).

Budgetary data on OpenSpending includes:

* [Berlin Budget](http://openspending.org/berlin_de)

* [Seville Spending Budget](http://openspending.org/seville-budget)

**Next**: [How does OpenSpending represent data?](../data-model/)

**Up**: [OpenSpending Guide](../)
