---
title: "Texty"
---

# Texty

<div class="well">Project: <a href="http://z.texty.org.ua/">z.texty.org.ua</a>, a procurement database based on data from the Ukrainian government.</div>

Texty.ua was established in 2010 as an NGO by Anatoliy Bondarenko and
Roman Kulchynsky (Editor in chief). They both have a background inside
Ukrainian media outlets, Roman as Editor in Chief at the Ukrainian
weekly, Tyzhden. Anatoliy has served as an editor and programmer with
a scientific educational background.

Texty decided to pursue procurements, as this proved to be the
best possible way to cover public spending due to the fact that
transactional spending is not available. The result was <a href="http://z.texty.org.ua/">z.texty.org.ua</a>, a
searchable database for public procurements completed in the spring
of 2012. The database is updated weekly and contains procurement data
from 2008 onwards.

State and local budgets also remain priorities for Texty, though they
do not currently have the resources to conduct analysis more frequently than
once a year. The state budget process in Ukraine is complex
and difficult to follow, so the site is currently monitoring changes
to the budget, and Texty would like to play a role in this.

## Tools

Texty work on budget and procurement data with a variety of tools.

* Open Refine: working with raw data

* R: analysis of data

* D3.js: online data visualization

## Model

Texty sustains its activities by providing data analysis and
visualisations for both CSOs and media outlets.
They delivered [data
analysis for Forbes Ukraine](http://forbes.ua/ratings/people) concerning
concentration in procurement contracts within the business elite.

## Challenges 

Texty points to the lack of resources in the data journalism
field as the biggest challenge. While both data and tools are available,
the lack of resources for completing the required data analysis
currently hinders more elaborate projects on spending transparency.
While CSOs and media outlets regularly source data investigations with
Texty, the demand is currently not enough for taking advantage of the
data actually available. Texty is supplementing their investigations
with offering data-journalism trainings.

### Open database for public procurements in Ukraine
In 2011, when Texty began working on public procurements in Ukraine,
getting the data was a top priority because of the huge volumes
available and rumors about massive corruption in the field. In
2012, spending on procurements was approaching 40% of the GDP of Ukraine, which
could be one of the highest in the world.

### Problems with the govermental site

[http://tender.me.gov.ua](http://tender.me.gov.ua), the source of procurement data, presents several issues. It requires an account and login, and it only gives access to the
data via an HTML table with max 100 results from one of the issues of the
official bulletin about public procurements. No tables are sortable, and
no records have been linked to one other. Finally and most
importantly, the data is dirty; you can, for example, easily find several different
versions of the same supplier (company) name.

## Getting data from the government site

The Texty team wrote a Ruby script to mimic user login, check for
updates, and to scrape data from HTML webpages, all of which had a
different structure. After cleaning, they imported the data into a relational
database as normalised data, for example creating links between records
for each participant. The database is updated approximately twice per
week.

The tool stack:

*  [nginx](http://wiki.nginx.org/Main)
*  [sinatra](http://www.sinatrarb.com/)
*  [mysql](http://www.mysql.com/)
*  [Tangle.js](http://worrydream.com/Tangle/) (for a novel approach to the user interface)

## Features

From the main page, it is possible to explore data about tenders in realtime and to change the textual query and immediately get information on the total volume for a particular industry, participant, and/or period of time.

Additionally, clicking on total volume yields all tenders therein. For each company participating in a tender, the database contains information on all other deals which the company has won. Recently, an "advanced search" page has been added, with the possibility to export result in form of a simple and portable CSV format

## Impact and coverage of the project

One year into the project's existence, the site reached about 1,500 daily
users per day, despite having almost zero advertising. It has gained
attention and been used by investigative journalists as well. Some
stories were published in the biggest independent
internet outlet, Ukrainian Pravda, which has approximately 200,000 readers per day.

In Autumn 2012, a joint project with Forbes.ua called "Champions of
tenders" was launched. The Texty team shared the open part of their data, information about
deals from their database (including the names of firms and volumes of money),
through a simple web API. Next, the team from Forbes.ua used the data in
their database to link firms to names of owners—Forbes.ua mantains a
proprietary database of these. The Texty team also made an [interactive
visualization of this data](http://forbes.ua/ratings/people) for Forbes.ua.

<a href="http://www.flickr.com/photos/94746900@N06/8895650387/" title="thumbnail by anderspedersenOKF, on Flickr"><img src="https://farm9.staticflickr.com/8123/8895650387_c1f6582979_o.jpg" width="600" height="373" alt="thumbnail"></a>

## Impact of open tender data

Since 2008, when information about tenders became openly available for
the first time, there has been a shift in public opinion about
tenders and public spending on procurement. Today there seems to be a
real awareness about corruption in procurements, though still not a
clear idea about the actual scale of the problem. For example, there is
even a TV-programme on the channel TVi, opposing the government, called
"Tenders News".

Ukraine has a couple of projects about tenders, though Texty appears to
be the most sizeable and complete database. There has, however, been continuing lobby attempts to close down access to
as much information about tenders as possible, and many of these have
unfortunately been successful. The most recent example was a law accepted by a
majority of the Ukrainian parliament in Autumn 2012, which meant that 35% of
all volumes of tenders would be hidden from the public.

The ongoing hope for transparency in public procurement is based on a
proposed agreement about association between Ukraine and the EU, which
includes requirements about transparency in tenders.