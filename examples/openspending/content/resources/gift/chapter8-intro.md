---
title: Chapter 8 - Putting the Parts Together
---

## Chapter 8 - Putting the Parts Together - Getting off-budget on-budget OpenSpending & Publish What You Fund

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
            <img src="../images/invisible_money.png" class="" title="Off-Budget" />
        </td>
        <td class="inner">
            <img src="../images/upload.png" class="" title="Publish Better Data" />
            <img src="../images/educate.png" class="" title="Educate Citizens" />
            <img src="../images/citizen.png" class="" title="Facilitate Direct Participation"/>
            <img src="../images/decision-maker.png" class="" title="Get Feedback to Policy Makers" />
            <img src="../images/data_analysis.png" class="" title="Analyse and Understand Data" />
        </td>
        <td>
            <img src="../images/mobile.png" class="no" title="Mobile Technology" />
            <img src="../images/web.png" class="" title="Web-based Technology" />
            <img src="../images/offline.png" class="no" title="Offline and Print on Demand" />
            <img src="../images/piechart.png" class="" title="Data Visualisation and Maps" />
            <img src="../images/standards.png" class="" title="Formats and Standards" />
            <img src="../images/social_media.png" class="no" title="Social Media" />
            <img src="../images/radio.png" class="no" title="Radio" />
        </td>
    </tr>
    <tr>
        <th class="inner">Geographical Coverage</th>
        <td colspan="2">Uganda (could be re-used in other countries)</td>
    </tr>
    <tr>
	        <th class="inner">Scope</th>
	        <td colspan="2"> central government and international</td>
	</tr>
    <tr>
        <th class="inner">URL</th>
        <td colspan="2"><a href="http://openspending.org">http://openspending.org</a> (OpenSpending site)  <a href="http://bitly.com/uganda-example">http://bitly.com/uganda-example</a>
	</td>
    </tr>
    <tr>
        <th class="inner">Users/Audiences</th>
        <td colspan="2">Donors, recipient country governments, citizens, NGOs. </td>
    </tr>
</table>

<img alt="OS + PWYF" src="http://farm8.staticflickr.com/7092/7272477056_b1cf5eafd2_o.jpg" class="screenshot" />

### Background
Aid flows often do not pass through a recipient government’s conventional budget mechanisms. When this happens, recipient governments themselves may not have the complete overview of where aid money goes and how donor priorities align with their own. This information is vital for governments and aid donors to be able to make the best use of scarce resources.

Normally this overview is not available – leading to waste, overlap and inefficiency. The lack of comparable information means aid donors and recipient country governments can’t work together to coordinate their efforts; it decreases developing country governments’ ownership and undermines the potential for good governance and planning. Donors and governments need to know what others are doing - and crucially, what others are planning on doing - if they are to make sure that these resources are used most effectively. Otherwise, some sectors and areas will not receive enough funding, while others may have too many donors involved.

This project was an effort to combine two key types of fiscal data - revenues from aid and spending information - and present them together in an informative way through an interactive visualisation.

#### How long did the various stages of your project take to implement?

Data Collection: The first step was a huge data-collection effort by the Overseas Development Institute (ODI) and Publish What You Fund (PWYF). It took just over 6 months for the initial data collection, cleaning, and report, with a large amount of manual work by many different people. Not only did the ODI have to manually collect all this data on donors’ aid spending, they then had to map it all to Uganda’s budget. For data collection, detailed financial information was provided by the Ministry of Finance and this existing data for each development partner (or donor) was sent to them for verification, correction and completion, in the form of an MS Access database.

Data Wrangling: 6 months. This data was still not machine-readable and capable of being analysed as it was spread across five different tables. There were other problems as well, e.g. no common currency throughout. PWYF processed the data so that it was in a format suitable for importing into the Open Knowledge Foundation’s OpenSpending software.

Development: 1 man month. The Open Knowledge Foundation created the BubbleTree visualisation so that it was possible to see multiple dimensions of the data at the same time (you can see both which sectors the money is going to, and how that is broken down by type of spender - donor, project aid, budget support).

#### What kind of skills/resources were/are required for the projects?

Expert knowledge of budget and aid data. Data wrangling capabilities. Development skills.

### Successes

1. The data collected in this project was far more comprehensive than the data in the Government of Uganda’s budget. In fact, for the Financial Year in which the report was being conducted (2006/7), donors planned to spend almost double the amount of project-based aid compared with what the Government of Uganda was aware of.
2. The project proved that it was possible to collect all the necessary data to be able to do this type of analysis for an individual country. Standards, such as IATI, make it easier for such approaches to be replicated at scale.
3. The visualisations drew attention to a couple of interesting patterns e.g. very occasionally aid money showed up in defence spending, big chunks of money going to disaster management and the north. It also made it possible to establish and compare how donors are (or not) aligning to the policy priorities of the Ugandan government.

### Challenges

The project required considerable human resources to clean and collect the data. If data had been published in a consistent and machine readable format, this would have been considerably easier.

The feedback below comes from people we asked to review the platform:

1. When we tried to solicit for feedback and encourage journalists to use the visualisation in their reports, they still asked us ‘where are the stories?’. The visualisations gave a high level overview, useful to assess overall priorities and aid distribution, but more work with capacity building to help journalists understand and work with fiscal data is required to help them find the stories.
2. Another reason journalists were reluctant to cover the story was that the data was not up-to-date enough. The most recent data available was from 2006 and the visualisation was completed in 2011.
3. Further work needed on explanatory texts - what exactly can you do with the visualisation and what are the known limits?
4. Visualisation inevitably implies a level of editorial judgement. We received a comment that if Uganda receives general budget support, all the bubbles should show a sliver of aid (since general budget support funds the overall budget, not specific sectors). In the current version, many sectors do not show a budget support component. The decision to show this at the top level only, and not in each of the sectors, was taken because by that point (i.e. at the sectoral level) it is then considered part of the Government of Uganda’s revenues.

### Scalability

OpenSpending is an international platform which allows anyone to upload and visualise government financial data. The database already holds many international, national and sub-national datasets and the software can easily be translated into other languages. OpenSpending is open source and open to contributions on any level from the community; contributing data or code and translation are the most common activities.

A similar approach could be taken in other countries, and work currently underway on the standardisation of aid-sector codes may make this easier. In addition, possibilities of mapping IATI compliant aid data onto COFOG compliant budgets are being researched, although more granular standards may be required in order to accurately represent the data<sup>[1]</sup>. If standards were widely adopted, this approach could be replicated.

To extend the project further and make it even more useful, the following are needed:

1. Aid information (but crucially, it needs to be timely, detailed and comparable): Donors representing over 30% of global Official Development Assistance already publish their data as of 18/11/2011, but more work will be needed to encourage the other 70% to do so.
2. Budgets in a machine-readable format: some governments have already begun publishing these (e.g. Kenyan open data initiative); many others have budgets available online in PDF (including Uganda, Sierra Leone, for 2010).
3. Mapping from aid to budgets: work is currently underway in this area.

### Where next?

Possible further areas for exploration and development of the platform:

1. Seeing budget in perspective of the legislative process, although this is a) difficult and b) only part of the story, as a lot of the most interesting changes happen when the Budget has been agreed and moves to the Executive.
2. Heuristics: On a basic level, show average, maximum, minimum aid donations to a sector. Variance: flagging differences above/below a certain amount
3. Comparisons, e.g. Spending relative to other districts. Ability to see the context of your current view: (what filters have you selected?).
4. Feedback and comment features, ability to annotate data points as well as collections / facets of the data e.g. to show absence of data.

<p style="text-align: right">Thanks for input from Mark Brough</p>

<div class='footnote'>
    <sup>[1]</sup>COFOG, which was designed specifically to describe the activities government undertakes, is an appropriate starting point to examine alignment between recipient budget classifications and existing international aid classifications. COFOG represents country sector and administrative classifications fairly well at aggregated levels, but at the lower levels tends not to disaggregate the functions of government in the same ways or to the same degree that many governments do‘ (Moon and Mills, 2010).
</div>

<div class="pull-right"><a class="btn btn-default btn-mini" href="../chapter9-intro">Next &raquo;</a></div>
