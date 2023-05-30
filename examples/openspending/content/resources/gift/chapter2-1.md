---
title: CKAN in Data.Gov.Uk
---

## Out of the Box Solution: CKAN in Data.Gov.UK

<table class="iconmatrix">
    <tr class="icons">
        <th class="inner">Fiscal Scope</th>
        <th class="inner">Project Aims</th>
        <th>Technology</th>
    </tr>
    <tr class="iconbar">
        <td class="inner">
            <img src="../images/revenue.png" class="" title="Revenue Side" />
            <img src="../images/spending.png" class="" title="Spending Side" />
            <img src="../images/invisible_money.png" class="no" title="Off-Budget" />
        </td>
        <td class="inner">
            <img src="../images/upload.png" class="" title="Publish Better Data" />
            <img src="../images/educate.png" class="no" title="Educate Citizens" />
            <img src="../images/citizen.png" class="no" title="Facilitate Direct Participation"/>
            <img src="../images/decision-maker.png" class="no" title="Get Feedback to Policy Makers" />
            <img src="../images/data_analysis.png" class="no" title="Analyse and Understand Data" />
        </td>
        <td>
            <img src="../images/mobile.png" class="no" title="Mobile Technology" />
            <img src="../images/web.png" class="" title="Web-based Technology" />
            <img src="../images/offline.png" class="no" title="Offline and Print on Demand" />
            <img src="../images/piechart.png" class="" title="Data Visualisation and Maps" />
            <img src="../images/standards.png" class="no" title="Formats and Standards" />
            <img src="../images/social_media.png" class="no" title="Social Media" />
            <img src="../images/radio.png" class="no" title="Radio" />
        </td>
    </tr>
    <tr>
        <th class="inner">Country</th>
        <td colspan="2">United Kingdom</td>
    </tr>
    <tr>
        <th class="inner">URL</th>
        <td colspan="2"><a href="http://data.gov.uk/">data.gov.uk</a></td>
    </tr>
</table>

<img alt="OpenSpending Data.Gov.Uk" src="http://farm8.staticflickr.com/7093/7274090358_35c6eff43d_o.png" class="screenshot" />

### Background
Data.Gov.UK is the UK Government’s official open data portal. The site provides a central “way into the wealth of government data” and aims to make that data “easy to find; easy to license; and easy to re-use.” Data.Gov.UK was launched in closed Beta at the start of October 2009 and entered public beta in January 2010. The project is ongoing at the present time.

Data.Gov.UK has been built on a combination of CKAN, the open-source data portal software developed by the Open Knowledge Foundation, and Drupal, the open-source CMS.

Initial requirements for Data.Gov.UK were data catalog capabilities (entering, editing, listing, and searching datasets) combined with basic CMS features (site content, blog, theming etc). The use of open-source plus the use of existing components which allowed for rapid development were desired (the initial prototype was developed in less than a month). Over time a variety of new requirements have arisen, most notably some need for data storage and presentation.

Outcomes have been very positive. The UK government is continuing to use and develop Data.Gov.UK and the site has a global reputation as a leading exemplar of a government data portal. The system has successfully handled growth from a few dozen datasets to many thousands of datasets and a concomitant growth in site traffic, and the site has played a significant enabling role in the UK government’s development of its transparency and open data agenda.

### Available Fiscal Data
1. In 2010 the UK government committed to the ongoing release of a substantial amount of open fiscal data. Specifically, in the Prime Minister’s letter of 31 May 2010 the [Government committed to](http://www.number10.gov.uk/news/letter-to-government-departments-on-opening-up-data/):
2. Historic COINS spending data to be published online in June 2010.
3. All new central government ICT contracts to be published online from July 2010.
4. All new central government lender documents for contracts over £10,000 to be published on a single website from September 2010, with this information to be made available to the public free of charge.
5. New items of central government spending over £25,000 to be published online from November 2010.
6. All new central government contracts to be published in full from January 2011.
7. Full information on all DFID international development projects over £500 to be published online from January 2011, including financial information and project documentation.
8. New items of local government spending over £500 to be published on a council-by-council basis from January 2011.
9. New local government contracts and tender documents for expenditure over £500 to be published in full from January 2011.
10. Other key government datasets:
* Names, grades, job titles and annual pay rates for most Senior Civil Servants with salaries above £150,000 to be published in June 2010.
* Names, grades, job titles and annual pay rates for most Senior Civil Servants and NDPB officials with salaries higher than the lowest permissible in Pay Band 1 of the Senior Civil Service pay scale to be published from September 2010.

The actual delivery of individual commitments obviously took some time, but, for example:

1. The COINS database was released in June 2010. The COINS database is the central government database for budgetary information, used by HM Treasury to manage budgeting and outturn against budget from all departments. This data was published on <http://data.gov.uk/> at <http://data.gov.uk/dataset/coins> (More information here: <http://thedatahub.org/dataset/coins-data>).
2. In November 2010 the government released, and committed to ongoing monthly release of, detailed departmental and local authority transactional spending data (all spending above £25,000 for departments and above £500 for local authorities). Departmental spending data was published onto <http://data.gov.uk/> while local authorities usually published their data onto their local website or data catalog.
3. In Autumn 2010 details of central government contracts became available online.

In July 2011 the Prime Minister issued another [letter](http://www.number10.gov.uk/news/letter-to-cabinet-ministers-on-transparency-and-open-data/ ). In addition to reviewing performance against commitments from the previous year, the letter proposed various improvements and extensions in relation to fiscal data (note that almost all major fiscal information was now open so there was little to do in terms of new data release):

1. All government spending data to include plain English descriptions explaining the scope and purpose of every transaction, from September 2011
2. Every department, working with the Cabinet Office transparency team, to produce an action plan in November 2011 for improving the quality and comparability of data
3. Unique reference indicators to be introduced by DBIS and HMRC beginning in December 2011. These will enable the public to track more easily the interaction between companies and government bodies
4. Working with the purchase and payment card providers to provide a consistent method of reporting government procurement card spend data for transactions above £500 in value, so this is available for publication on departmental websites, from end September 2011.


### Overview of Features
Data.Gov.UK acts both as a data portal and as a home for some of the government’s information on transparency and open data (for example, minutes and notes from the Transparency Board). As a data portal, its main features are:

1. Publish and find datasets: full data catalog with rich search capabilities
2. Store and manage data: the majority of the datasets that data. gov.uk lists are hosted elsewhere e.g. on individual departments’ websites. However, there has been the need to store and manage data and an upcoming release will see these features substantially enhanced.
3. Community and social features such as the ability for users to list applications or ideas that relate to a dataset, comment, share dataset information on social media, and subscribe to RSS/Atom feeds to be kept up to date with the latest developments.
4. Federation and Harvesting: data.gov.uk acts as the UK’s hub for geospatial metadata aggregation in relation to the EU’s INSPIRE directive and therefore harvests information on geospatial datasets from a large number of other data catalogs and hubs.
5. Geospatial: Add and manage geospatial information about a dataset, view this information on maps and incorporate into search queries.
6. Rich API: Access to all dataset information over an API (Application Programming Interface).

While this is a very rich feature-set it should be emphasised that essentials of a successful data portal can be substantially less -- data.gov.uk itself in its original incarnation had many fewer features. A data portal in its simplest form need only have a mechanism for easily listing datasets (both in human-readable and machine-readable form) -- and datasets may “point out” to data stored on other sites (e.g. individual ministries’ or departments’ websites) rather than being stored on the portal itself (though over time, there may be a need to store data, at least for archival purposes).

### Successes
Data.Gov.UK has won widespread recognition as an exemplar data portal and its influence has been felt widely within the international community. In the UK, it has become the online home of the UK Government’s open data and transparency efforts and the data published on the site has been widely used and reused by companies, journalists, CSOs, and citizens.

By providing a clear, and very visible, home for UK government open data it has also played a direct role in driving forward the open data and transparency agenda -- departments were already releasing datasets onto the site voluntarily *before* there was any specific policy mandating this, and publicity and interest around the site at its early stages from developers, media and others helped to galvanize further policy developments.

In addition, data.gov.uk has played a significant role in the development of a very clear open licensing policy for UK government data by ensuring that all datasets found on the site are under an open license -- the [Open Government License](http://www.nationalarchives.gov.uk/doc/open-government-licence/open-government-licence.htm) drafted by the UK Government’s Office of Public Sector Information (now within the National Archives).


### Challenges
Data.Gov.UK has seen some failures. Largely, these relate to processes around data release that are not under the direct control of that project itself (though the project could take steps to ameliorate these problems).


To take one example related to fiscal data and the publication of the £25k spending by departments: Because each department publishes individually, this data on government spending is spread across approximately 1000 datasets on data.gov.uk (it can actually be hard to find them all because there are so many and there is no straightforward method to search for them). In addition, not all data is published in the correct format and some data links disappear as departments move data on their website. While ultimately this is a process issue, data.gov.uk have been taking steps to help improve this: for example, by ensuring consistent tagging of datasets when they are created, automatically checking datasets on a regular basis for broken links, developing validators to ensure that data is provided in a consistent format, and developing reporting tools so that Ministers and managers can get an overview of the process.


### Project Resources
The project was initiated in September 2009 with a go-live data 1-month later for the first version of the site. This target was met and a closed beta started in early October 2009. In January 2010 the site was made public.

<table border="1" padding= "1em">
    <tr>
        <td><strong>Phase</strong></td>
        <td><strong>Duration</strong></td>
        <td><strong>Full-time human resources</strong></td>
    </tr>
    <tr>
        <td>Planning and data-collection</td>
        <td>1 month</td>
        <td>3</td>
    </tr>
    <tr>
        <td>Design and implementation</td>
        <td>3-4 (person) months (up to closed beta stage), 8 person months (up to launch)</td>
        <td>3-6</td>
    </tr>
    <tr>
        <td>Ongoing</td>
        <td>Since Jan 2010</td>
        <td>3-6</td>
    </tr>
</table>

<div class="pull-right"><a class="btn btn-default btn-mini" href="../chapter2-2">Next &raquo;</a></div>
