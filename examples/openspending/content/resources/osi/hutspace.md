---
title: "Hutspace"
---

# Hutspace, Ghana

<div class="well">Project: scraping, analysing and publishing procurement data. In progress, with version 1.0 scheduled for publication June, 2013.</div>

<em>This chapter is based on an interview with Emmanuel Okyere, Hutspace (Ghana).</em>

Emmanuel Okyere is running a project to scrape, publish, and
analyse the Ghana procurement register, while working on his own
IT startup.

Emmanuel has built a database of contract awards for Ghana using Python
scrapers and parsers, [Celery](http://www.celeryproject.org), and PostgresSQL. The
preliminary result shows 4000 contract awards and 2000 current
procurement opportunities. Future plans include building a searchable
database and a flat CSV file download option in order to enable
journalists and CSOs to work with the data.

## Technical challenges

### Cleaning data

> “Cleaning the data has been a substantial issue for the
> project. There’s a lot of validation, which we need to do before we can
> publish it simply because the data appear to be inaccurate. As an
> example, we might have unrealistically small amounts appearing in a
> contract award, or a date might not make sense. This has been the most
> substantial bottleneck for the project.”

### Reconciling company entities

> “Many companies appear with a variety of
> entities, and so finding a good way to reconcile companies which are
> actually the same has been difficult.”

Emmanuel is planning to utilize a helpful codebase from the open
parliament field, originally developed by MySociety for name
reconciliation of parliament members, for reconciling the company
entities.

### Identifying the correct amounts

A surprising problem in the procurement
data has turned out to be the varying currency denominations appearing,
such as GBP and USD. Finding appropriate historical exchange rates and
calculating these has been cumbersome, but it is important in
order to make the data as accessible as possible.

## Community challenges

Emmanuel points out that both the lack of knowledge about the
availability of procurement data as well as the lack of skills to
analyse it among journalists and CSOs are the main barriers for
achieving more usage of the data.

> “For much of the work to be done on the data, having skills to use Excel
> would actually be sufficient for journalists in order to get to work
> with the data. However, skills to use Excel for analysis are lacking
> among almost all journalists today. When it comes to more challenging
> tasks which require coding skills for analysing the data, I know
> actually only one journalist. She will be involved in this project.

> “Trainings could help equip more journalists to work with the
> procurement data we are planning to release. We really need more people
> to look and use the data, but that require that they have the skills. I
> think that is what trainings like data bootcamps are for.

> “As publishers of the database, we would like to build visualisations to
> spot trends in the data. For instance, we have noticed that when new
> governments get into power, we see this reflected in the procurement
> data as new contractors appear while others vanish. This is analytical
> work we can do which I think journalists will not be able to do on
> their own.”