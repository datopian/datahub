---
title: "Tool Ecosystem"
---

## Spending Data: The Tool Ecosystem 

There are a set of staple tools that can be used to tackle many of the issues highlighted by the organisations in this report. For each one - we’ve outlined the tool - what it’s useful for and what the barrier to entry is. 

We continue to hunt for more and better tools to do the job and hope that some of the problems, such as governments publishing their data in PDFs or HTML, will soon be irrelevant, so that we can all focus on more important things. 

*If you would like to suggest a tool to be added to this ecosystem - please email info [at] openspending.org*

### Key 

For each tool - we’ve outlined the its use and what the barrier to entry is, here's a guide to the rough categorisation we used: 

<p><strong>Basic = An off-the-shelf tool that can be learned and first independent usage made of within 1 day. No installation on servers etc required.</strong></p>
<p><strong>Intermediate = Between 1 day - 1 week to master basic functionality. May require tweaking of code but not new creation thereof. </strong> </p>
<p><strong>Advanced = Requires code. </strong> </p>

## Stage 1: Extracting and getting data 

<table border="1">
    <tr>
        <td><strong>Issue</strong></td>
        <td><strong>Tools</strong></td>
        <td><strong>Level</strong></td>
        <td><strong>Notes</strong></td>
    </tr>
    <tr>
    	<td>Data not available</td>
    	<td>Freedom of Information Portals (e.g. <a href="https://www.whatdotheyknow.com/">What Do They Know</a>, <a href="https://fragdenstaat.de/">Frag den Staat</a>). 
    	<td>Basic - though some education may be required to inform people that they have the right to ask, how to phrase an FOI request, whether it is possible to submit these requests electronically etc.</td>
    	<td>While Freedom of Information portals are a good way of getting data - results often end up scattered. It would be useful to have results structured into data directories so that it was possible to search successful responses together with proactively released data so that there was one common source for data.</td> 
    </tr>
    <tr>
    	<td>Data available online but not downloadable. (e.g. in HTML tables on webpages).</td> 
    	<td> <em>For simple sites</em> (information on an individual webpage) Google Spreadsheets and ImportHTML Function, or the <a href ="https://chrome.google.com/webstore/detail/scraper/mbigbapnjcgaffohmbkdlecaccepngjd?hl=en">Google scraper extension</a> (basic). <p><em>For more complex webpages</em> (information spread across numerous pages) - a scraper will be required. Scrapers are ways to extract structured information from websites using code. There is a useful tool to make doing this easier online - <a href="https://scraperwiki.com/">Scraperwiki</a>.(advanced).</p></td>
    	<td>For the basic level, anyone who can use a spreadsheet and functions can use it. It is not, however, a well-known command and awareness must be spread about how it can be used. (People often daunted because they presume scraping involves code). Scraping using code is advanced, and requires knowledge of at least one programming language. </td>
    	<td><p>The need to be able to scrape was mentioned in <em>every</em> country we interviewed in the Athens to Berlin Series.</p> For more information, or to learn to start scraping, see the <a href="http://schoolofdata.org/handbook/courses/scraping/">School of Data course on Scraping</a>.</td>
    </tr>
    <tr>
    	<td>Data available only in PDFS (or worse, images)</td> 
    	<td>A variety of tools are available to extract this information. Most promising non-code variants are <a href="http://finereader.abbyy.com/">ABBYY Finereader</a> (not free) and <a href="http://tabula.nerdpower.org/">Tabula</a> (new software, still a bit buggy and requires people to be able to host it themselves to use.)</td>
    	<td>Most require knowledge of coding - some progress being made on non-technical tools. For more info and to see some of the advanced methods - see the <a href "http://schoolofdata.org/handbook/courses/extracting-data-from-pdf/">School of Data course.</a></td>
    	<td><p>Note: these tools are still imperfect and it is still vastly preferable to advocate for data in the correct formats, rather than teach people how to extract.</p><p>Recently published <a href="https://www.gov.uk/service-manual/design-and-content/choosing-appropriate-formats.html">guidelines</a> coming directly from government in the UK and US can now be cited as examples to get data in the required formats.</td>
    </tr>
    <tr>
    	<td>Leaked data</td>
    	<td>Several projects made use of secure dropboxes and services for whistleblowers. </td>
    	<td>Advanced - security of utmost concern.</td>
    	<td>For example: <a href="http://atlatszo.hu/magyarleaks/">MagyarLeaks</a> 
    </tr>  
</table>

## Stage 2: Cleaning, Working with and Analyzing Data 
 

<table border="1">
    <tr>
        <td><strong>Issue</strong></td>
        <td><strong>Tools</strong></td>
        <td><strong>Level</strong></td>
        <td><strong>Notes</strong></td>
    </tr>
    <tr>
    	<td>Messy data, typos, blanks (various)</td>
    	<td>Spreadsheets, <a href="http://openrefine.org/">Open Refine</a>, Powerful text editors e.g. <a href="http://www.barebones.com/products/textwrangler/">Text Wrangler</a> plus knowledge of Regular Expressions.</td>
    	<td>Basic -> Advanced</td> 
    	<td></td>
    </tr> 
    <tr>
    	<td>Need to reconcile entities against one another to answer questions such as, "what is company X?", "Is company X Ltd. the same as company X?" (ditto for other types of entities e.g. departments, people).</td>
    	<td><a href="http://nomenklatura.okfnlabs.org/">Nomenklatura</a>, <a href="http://opencorporates.com/">OpenCorporates</a>, <a href="http://publicbodies.org/"</a></td>
    	<td>Advanced (all)</td>
    	<td><p>Reconciling entities is complicated both due to the tools needed as well due to the often inaccurate state of the data.</p>
    	<p>Working with data without common identifiers and data of poor quality makes entity reconciliation highly complicated and can cause big gaps in analysis.</p></td>
    </tr>
    <tr> 
    	<td>Need to be able to conceptualize networks and relationships between entities (See dedicated section on Network Mapping below).</td>
    	<td>Gephi</td>
    	<td>Intermediate - advanced.</td> 
    	<td></td> 
    </tr> 
    <tr>
    	<td> Need to be able to work with many many lines of data (too big to be able to fit in Excel).</td> 
    	<td> OpenSpending.org, Other database software (PostGres, MySQL), Command line tools</td>
    	<td> OpenSpending.org - easy for basic upload search and interrogation, in OpenSpending and other databases some advanced queries may require knowledge of coding. </td>
    	<td> Note: As few countries currently release transaction level data, this is not a frequent problem, but is already problematic in places such as Brazil, US and the UK. As we push for greater disclosure, this will be needed ever more.</td>
    </tr> 
    <tr> 
    	<td>Performing repetitive tasks or modelling </td>
    	<td>Macros - Excel</td>
    	<td>Basic - Intermediate.</td>
    	<td></td>
    </tr> 
    <tr> 
    	<td>Entity Extraction (e.g. from large bodies of documents) </td>
    	<td> <a href="http://www.opencalais.com/">Open Calais</a>, <a href="http://developer.yahoo.com/contentanalysis/">Yahoo/YQL Content Analysis API</a>, <a href="http://openup.tso.co.uk/des">TSO data enrichment service</a></td> 
    	<td> Intermediate</td> 
    	<td> This is far from a perfect method and it would be vastly easier to answer questions relating to entities if they were codified by a unique identifier. </td> 
    </tr> 
    <tr>
    	<td>Analysis needs to be performed on datasets that are published in different languages (e.g. in India) </td> 
    	<td>To some extent: Google Translate for web based data.</td>
    	<td>Basic</td>
    	<td>Still searching for a solution to automatically translate offline spreadsheets. </td>
    </tr> 
    <tr> 
    	<td> Figures change in data after publication </td> 
    	<td> <p>For non-machine readable data - tricky.</p> <p>For simple, machine readable file formats, such as CSV - version control is a possibility. </p> <p> For web-based data - some scrapers can be configured to trigger (e.g. email someone) whenever a field changes.</p> 
    	<td> Intermediate to advanced </td> 
    	<td> Future projects that are likely to tackle this problem: <a href="http://dansinker.com/post/49856260511/opennews-code-sprints-do-some-spring-cleaning-on-data">DeDupe</a>.</td> 
    </tr> 
    <tr> 
    	<td> Finding statistical patterns in spending data (such analysis is depends on high data quality) </td> 
    	<td> R (free), SPSS (proprietary) and other statistical software for clustering and anomaly detection (also see note). </td> 
    	<td> Advanced </td> 
    	<td> Examples: Data from Supervizor has been used to track changes in spending on contractors changes in government. 
(<a href="https://www.kpk-rs.si/en/project-transparency/supervizor-73">Supervizor.)<p><em>A note on statistical analysis software can be found below</em></a></td>
	</tr> 
</table> 

<strong>Note on SPSS and R:</strong> It’s our impression that interviewees seemed largely to have been trained to use SPSS. R is however important to mention as it offers a free access to a broad section of the same models, though based on a programming interface. 

A few examples of analysis on spending data, which can be done with statistical software such as SPSS or R: 

<p>
<strong>a)</strong> <a href="http://en.wikipedia.org/wiki/Hidden_Markov_model">Hidden Markov</a>: Hidden Markov was originally developed for finding patterns in bioinformatics, but has turned out useful for predicting fraudulent and corrupt behaviour. Using Hidden Markov requires high quality data, and was for instance used to analyse spending data from 50 mio transactions in the Slovenian platform Supervizor. </p>
<p>
<strong>b)</strong> <a href="http://en.wikipedia.org/wiki/Benford%27s_law">Benford's law</a>: Benford's law examines the distribution of figures in your data, against how it should actually look. Diversions from the normal distribution can help detect fraudulent reporting (eg. if companies tend to report ernings less than $500 mio. in order to fit a particular regulation Benford’s law could be a tool to detect that). Check this example using Benford’s law to test the release of all <a href="http://friism.com/tax-records-for-danish-companies">Danish corporate tax filings</a> and check this <a href="http://friism.com/tax-records-for-danish-companies">R blog post on the topic</a>. </p>

Finally a few notes on the differences between SPSS and R: Though SPSS is fairly easy to get started using, it can be difficult to collaborate around as it applies its own SPSS data format. Some models might also be unavailable from the basic SPSS package. R is the free alternative, uses a programme interface, where all extensions are accessible, and where community support and code samples are widely available. One possible compromise bridging the convenience of SPSS and the wide usability of R, is the proprietary software <a href="http://www.revolutionanalytics.com/">R Revolution</a>.

## Stage 3: Presenting Data 


<table border="1">
    <tr>
        <td><strong>Issue</strong></td>
        <td><strong>Tools</strong></td>
        <td><strong>Level</strong></td>
        <td><strong>Notes</strong></td>
    </tr>
    <tr>
    	<td> Basic visualisation, time series, bar charts </td>
    	<td> <a href="http://datawrapper.de/">DataWrapper</a>, <a href="http://www.tableausoftware.com/public/">Tableau Public</a>, <a href="http://www-958.ibm.com/software/analytics/manyeyes/">Many Eyes</a>, Google Tools </td> 
    	<td> Basic</td>
    	<td></td>
    </tr> 
    <tr> 
    	<td> More advanced visualisation</td> 
    	<td> <a href="http://d3js.org/">D3.js</a> </td> 
    	<td> Advanced </td> 
    	<td> Used in e.g. <a href="http://openbudgetoakland.org/2012-2013-sankey.html">OpenBudgetOakland</a> </td> 
    </tr> 
    <tr> 
    	<td> Mapping </td> 
    	<td> <a href="http://www.mapbox.com/tilemill/">TileMill</a>, <a href="http://www.google.com/drive/apps.html#fusiontables">Fusion Tables</a>, <a href="http://kartograph.org/">Kartograph</a> <a href="http://www.qgis.org/">QGIS</a> </td>
    	<td> Basic -> Advanced </td> 
    	<td></td> 
    </tr> 
    <tr>
    	<td> Creating a citizen’s budget </td> 
    	<td> OpenSpending.org, Off-the shelf tools listed above. Disqus commenting module added to OS for commenting and feedback.</td> 
    	<td> OpenSpending.org - making a custom visualisation - basic. Making a custom site enabling discussion -  advanced. </td>
    	<td> Used in e.g. <a href="http://openbudgetoakland.org/2012-2013-sankey.html">OpenBudgetOakland</a> </td> 
    </tr> 
</table>

## Publishing Data 

<table border="1">
    <tr>
        <td><strong>Issue</strong></td>
        <td><strong>Tools</strong></td>
        <td><strong>Level</strong></td>
        <td><strong>Notes</strong></td>
    </tr>
    <tr>
    	<td> Need a place online to store and manage data, raw, especially from Freedom of Information Requests. </td> 
    	<td> DataNest, CKAN, Socrata - various Data Portal Software options. </td> 
    	<td> Basic to use. </td> 
    	<td> Can require a programmer to get running and set up a new instance. </td> 
    </tr> 
    <tr>
    	<td>Individual storage of and online collaboration around datasets</td> 
    	<td> Google Spreadsheets, Google Fusion Tables, Github </td> 
    	<td> 1-3 Basic. Github - intermediate. </td> 
    	<td> </td> 
    </tr> 
</table> 

### Notes 

<p>See also the resources section in the <a href="http://openspending.org/resources/handbook/ch014_resources.html">Spending Data Handbook</a></p>
<p>Note: Many of these tools will have difficulty working on Internet Explorer (especially older versions), but we have yet to find more powerful tools which also work there.</p>

## A note on Network Analysis 

As you will see from the case studies in the videos, Network Analysis is an area that more and more people are looking into with regard to public procurement and contracts. 

Network visualisations are commonly used as a solution to this problem, however, we offer a note of caution to use them sparingly; due to the amount of data on which they are often used, they can sometimes be overwhelming and the average non-expert can find them hard to interpret. 

Often the types of information that it is possible to extract from a network visualisation e.g. “who is best connected?”, “are there links between person X and person Y?” -  could be more easily be found with a searchable database of connections. 

It may also be wise to separate tools suitable for investigating the data, and tools used to present the data. In the latter case, clarity and not-overloading the visualisation will most likely yield a clearer result - so this is one area in which custom infographics may win out in terms of delivering value.  

### Existing solutions for network mapping: 

For producing network visualisations there are currently open source solutions: 

* [Gephi](https://gephi.org/) (Again note that Gephi has non-visualisation functions to explore the data, which at times may be more useful in exploring the interconnections than the visualisations themselves).
* [Mapa 76](http://mapa76.com/) - This is also interesting due to the function which is being developed to extract individual entities. 
* [RelFinder](http://www.visualdataweb.org/relfinder.php) Based off DBPedia, this tool structures and maps out relations between entities based on which articles they feature in on Wikipedia. 
* Google Fusion Tables has a network function 
* NodeXL is a powerful network toolkit for Excel. 
* [Cytoscape](http://www.cytoscape.org/)


## Some favourite examples of (non) Network ways of presenting hierarchies, relationships and complex systems: 

* [Connected China (Reuters)](http://connectedchina.reuters.com/) - enables the user to easily see family connections, political coalitions, leaders and connections. Additionally - it gives a detailed organisational diagram of the Communist Party of China, as well as timelines of people’s rise to power. 
* [Little Sis](http://littlesis.org/). This is an American database of political connections, including party donations, career histories and family members. Read their About Page for more details of the questions they seek to answer. 

### Further reading: 

<ul><li><a href="http://www.ucl.ac.uk/secret/events/event-tabbed-box/seminars-accordian/social-network">UCL Materials</a></li>
<li> <a href="http://www.cgi.com/sites/cgi.com/files/white-papers/Implementing-social-network-analysis-for-fraud-prevention.pdf">CGI Materials</a></li>
</ul>

# Obvious tools gaps 

<ul><li>A pipeline for local councils to address privacy concerns about publishing transaction-level data. In the UK, despite clear guidelines about what should be removed from data before publication, a few councils have published sensitive data over the past year. Some companies are looking at maintaining suppression lists for this data, however ideally this should be done in government, prior to publication - so workflows need to be developed for this. </li>
<li>Tools to help spot absence of publication as it happens. Currently, civil-society led initiatives such as the Open Budget Survey can only monitor publication of key budget documents retrospectively, and using large amounts of people power. There are a couple of possibilities which spring to mind:</li>
    <ul> 
<li>In the UK - the OpenSpending team have been working with the team of data.gov.uk to <a href="http://community.openspending.org/2012/09/uk-departmental-government-spending-improving-the-quality-of-reporting/">produce automated reports</a> to help those enforcing transparency obligations to see which departments are not compliant with said regulations. The reports check both timeliness as well as structure and format of the data. This proved very successful at prompting data release initially - departments were given advance warning that the tool would be featured and any departments without up to date data would be flagged up in red; by launch date, nearly all departments had updated data. This is possible where:</li>
<ul>
<li>The data are published via a central platform (e.g. data.gov.uk)</li>
<li>The data are machine readable, so a computer program can quickly ascertain whether the required fields are present.</li>
<li>There is a standard layout for the data, so a computer can quickly verify whether column headings are correct and all present.</li>
</ul>

<li>Introducing a calendar of expected dates of publication of a particular dataset so that organisations could know when a document is expected to be published and enforce that it is. This could be done either on a country by country basis, or simply by aligning with internationally recognised, best practice guidelines.</li>
</ul>
<li>Tools which help to remove duplication of effort. For example, if one organisation has already cleaned up or extracted data from a PDF, encouraging them to share that data so another organisation does not have to waste time doing the same. </li>
</ul>























