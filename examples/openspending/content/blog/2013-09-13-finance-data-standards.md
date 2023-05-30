---
redirect_from: /2013/09/finance-data-standards/
title: What public finance can learn from public transit about data standards
authors:
- Friedrich Lindenberg
---
<a href="http://www.flickr.com/photos/stockholmtransportmuseum_commons/6082466716/" title="Tram in Gothenburg in 1962 by Stockholm Transport Museum Commons, on Flickr"><img src="http://farm7.staticflickr.com/6085/6082466716_f408c1e889_z.jpg" width="640" height="424" alt="Tram in Gothenburg in 1962"></a><!--magazine.image = http://farm7.staticflickr.com/6085/6082466716_f408c1e889_z.jpg -->

<em><strong><a href="http://tabbforum.com/opinions/xbrl-standard-could-increase-technology-complexity-obscure-municipal-financial-disclosure?page=1">Cross-posted</a> from TabbFORUM, a discussion board on important issues affecting global capital markets.</strong></em>

Last week, Marc Joffe published a piece describing the potential of standardized financial disclosure for municipal governments (<em>“<a href="http://tabbforum.com/opinions/the-case-for-muni-xbrl-bringing-municipal-financial-disclosure-into-the-21st-century" target="blank">The Case for Muni XBRL: Bringing Municipal Financial Disclosure Into the 21st Century</a>,” TabbFORUM</em>). I fully agree with the core of his argument – that the availability of structured information about a city's accounts helps, amongst other things, to estimate its creditworthiness. However, Mr. Joffe suggested a standard called XBRL, which should, in my opinion, be avoided in order to bring some sunshine into municipal finances.

XBRL has seen incredible adoption over the last few years, as more and more government agencies across the globe are following the example of the US FDIC and SEC and now require companies to release their accounts using the standard. A proposed DATA Act that is under consideration by the US Congress would mainstream XBRL as standard across the federal government. Mr. Joffe's argument is based on this success: As XBRL is already recognized by various regulatory bodies, it should be simpler to convince government to apply it to itself. This is a valid point, and clearly, data released as XBRL is greatly preferable to the traditional PDF reports issued by many agencies.

Yet I believe that we can do even better – by putting greater emphasis on the requirements of data re-users rather than regulatory bodies and data publishers. While the <a href="http://xbrl.org/members" target="_blank">XBRL consortium members</a> are mainly data publishers and IT solutions providers, government transparency efforts should invest additional effort into considering the needs of other types of re-users, such as analysts, investors and financial journalists.

Implementing XBRL is stunningly complex; accessing the right information inside an XBRL document requires specialist software – and the list of <a href="http://www.xbrlwiki.info/index.php?title=Open_Source_and_XBRL" target="_blank">open source efforts</a> that would make such technology widely available is not very impressive.

Data formats matter because of the target audience: As part of the <a href="http://openspending.org/" target="_blank">OpenSpending project</a>, I've been involved in training journalists in the use of simple spreadsheet software – and, frankly, the prospect of introducing a non-technical audience to XML processing scares me.

Rather than opening up data, we risk raising a new barrier, which will limit use of data that should be easy to reuse in the public domain. For a non-governmental organization, the cost of hiring developers to process XBRL would not be very different from the barriers imposed by having to extract information from PDF documents or by having to pay for the data directly.

Essentially, we're closing off the data from those most interested in its meaning, in the interest of expressing all the complexity that our accounting systems are able to produce.

The open data community has already seen some of the issues caused by supplier-driven standards in one of its greatest successes, the International Aid Transparency Initiative (IATI). IATI, an XML-based standard, is now used to publish information <a href="http://www.aidtransparency.net/news/iati-welcomes-new-secretariat" target="_blank">on 76% of all official development assistance</a> globally. It is easy to imagine the benefits of having activity information from more than 180 development organizations released in a common format: Simplifying the analysis and comparison of projects will lead to much improved effectiveness in foreign aid.

But the story isn't quite as simple. The complexity of the XML-based standard has sometimes failed to support the eccentricities of individual publisher's databases, leading to incomplete and divergent data. Virtually any IATI project that I'm aware of starts off by converting the data to a more accessible format, often either CSV files or web services based on <a href="http://json.org/" target="_blank">JSON</a>, a data format that can easily be processed by web browsers.

A very different approach can be seen in another field, public transport. The demand for data in this domain was pushed forward by a singular killer application: Google Maps. In order to get their transit information included in Google's service, municipalities were asked to submit their data in a format called GTFS, the <a href="https://developers.google.com/transit/gtfs/" target="_blank">General Transit Format Specification</a>.

Unlike XBRL or IATI, GTFS relies on the Swiss Army knife of data: CSV. This proto-spreadsheet format has been around since the late ’60s, yet it still remains one of the most popular and widely understood means of data transfer.

To express complex timetable information, GTFS defines a set of files – such as bus stop locations, operator agencies, routes and stop times. Some of these are required, others are optional. Any of them can be interpreted on their own, but of course they must be linked up to create a moving model of a city's public transit. Convergence on a common format is eventually achieved through the standard's thorough documentation, which assists implementers with explanations of each field’s semantics as well as many practical examples.

This model of many loosely linked components is a simple but efficient method to masquerade the differences between public transit systems world-wide. Such flexibility will also be required to look at public finance across many national and regional accounting cultures; while corporate accounting may have converged globally toward US GAAP over recent years, half of the municipalities in my home country Germany still run on a system of single-entry bookkeeping that has seen little change since they invented the printing press.

Still, a format like GTFS does not impede our ability to converge on the semantics of the data: taxonomies and charts of account can be expressed in CSV the same as in XML – and a wide variety of tools exist to check the conformance of released data to external standards.

So why not get over the complexity rush and start simple: by releasing a couple of easily generated CSV files, and by having an incremental discussion about how these can be aligned to achieve the eventual objective of applying common models and comparisons.

