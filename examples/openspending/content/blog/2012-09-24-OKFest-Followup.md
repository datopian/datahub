---
authors:
- lucy
redirect_from: /2012/09/OKFest-Followup/
title: Where Does the Money Go - International. Updates from OKFestival 
---

We got a chance to catch up with many old OpenSpending friends at [OKFestival](http://okfestival.org/) last week and got the chance to meet some new ones. For any of you who missed the action, here's a quick recap...  

## Machine Readable Budgets for the Netherlands 

The week started with Ton Zijlstra announcing a scoop in the "State of Play: The Open Government Data movement and related initiatives", for the first time, the Netherlands announced that it would publish its budget plan in machine-readable format.

Naturally, we wanted to get this into OpenSpending as quickly as possible... but when working with the data, we had some questions. For example, we could not make the numbers align with any other [official estimates](http://rijksbegroting.nl/binaries/pdfs/miljoenennota_bijlagen.pdf) (see page 5). With the help of representatives from the Court of Audit of the Netherlands we did a comparison of the differences of the [open format](http://opendata.rijksbegroting.nl/opendata.html) with the [PDF version](http://rijksbegroting.nl/binaries/pdfs/miljoenennota_bijlagen.pdf) and could not make all of the numbers match (PDFs as reference material can be useful!). We've approached the Ministry of Finance to clarify the discrepancies between the two documents and hope to have an update soon.     

<iframe width='600' height='400' src='http://openspending.org/nl-budget/embed?widget=treemap&state=%7B%22drilldown%22%3A%22begrotingsstaat%22%2C%22year%22%3A%222013%22%2C%22cuts%22%3A%7B%22flow%22%3A%22U%22%7D%2C%22drilldowns%22%3A%5B%22begrotingsstaat%22%5D%7D&width=700&height=400' frameborder='0'></iframe>

## Converging on Standards 

Publishing to the IATI standard is now becoming more commonplace, but how do we take it to the next level? The OpenSpending team is particularly keen to work towards [standards for government financial data](http://openspending.org/resources/standard/index.html) - so that we can answer questions such as 'how do the budgeting priorities of governments in developing countries align with donor priorities?' (as we did for Uganda with our project with Publish What You Fund) on a systematic and automated, rather than a time-consuming case-by-case basis. Such standards may make other, more ambitious projects, possible at scale, such as geocoding projects and mapping the budgeting process from start to finish, e.g. to answer questions such as whether what was budgeted aligns with what was actually spent. 

In the session ["Open Development and aid flow: using open aid data"](http://okfestival.org/open-development-and-aid-flows-how-to-use-aid-data/) we discussed how important it is to align the spheres of budgeting and aid distribution and talked about some of the shortcomings and benefits of some of the systems currently in place. A few notes from the session: 

<img alt="" src="http://farm9.staticflickr.com/8316/8019242524_c9a8d662ff_m.jpg" title="Session with Development Data crowd on how we could align spending and Aid data" class="pull-right" style="margin-left: 1em; width="200" height="200""/>

* First and foremost, we need to work out what can be combined and what can't, then produce the tools to map one to another. In order to do this, there is a **need to distinguish between file formats (*grammar*) and reference data (*vocabulary*)** if we are interested in making interoperable standards. 
* While IATI is by and large considered a success in terms of getting aid data published, there are still some areas for improvement. For example, **how can we spot which data is missing in order to know how complete a picture we have of total aid to developing countries?** To a certain extent, this has been done in the UK for spending data with the recent announcement of the [report generator](http://openspending.org/blog/2012/09/13/uk25k-reporting.html) for Data.Gov.UK. The question is: *could a similar tool be built for the IATI registry?*
* Feedback on data. Even within those organisations who publish their data to the IATI standard - there are discrepancies in what data is contained within. For example, some publishers may leave fields blank while completing all other fields. It was felt within the group that **there should be some kind of feedback mechanism** to encourage publishers to improve the quality of the data that they published. 
* Lastly - **the forum for this discussion needs to be decided**. Should bringing these people together be a role of the [Open Government Partnership](http://www.opengovpartnership.org/), or of the [Global Initiative for Fiscal Transparency](http://fiscaltransparency.net/) or do we need a specific forum for this?

We're going to be continuing this discussion over the coming weeks via the [OpenSpending Mailing list](http://lists.okfn.org/mailman/listinfo/openspending). We welcome input from anyone involved in this area, so please, join the mailing list and chime in. 

## Connecting with Citizens 

<img alt="" src="http://farm9.staticflickr.com/8305/8019242120_3d617890ba_m.jpg" title="Damir Mehmedbasic speaking on his work in Bosnia to connect financial data with citizen's issues" class="pull-left" style="margin-right: 3em; width="200" height="200""/>

We were very fortunate to have a fantastic panel of speakers from around the world to talk about their experiences in connecting government financial data to citizens' issues in the panel ["The Money and the Many"](http://okfestival.org/the-money-and-the-many/). Our stellar cast included:

* Damir Mehmedbasic, Executive Director, [Public Interest Advocacy Center (PIAC)](http://www.cpi.ba/). Bosnia and Herzegovina.
* Oluseun Onigbinde, Team Lead, [BudgIT](http://yourbudgit.com/). Nigeria. 
* Federico Ramírez Corona, Lead Programmer, Fundar, Centro de Análisis e Investigación. Mexico. Talking about Fundar's [Farm Subsidies Project](http://subsidiosalcampo.org.mx/index.html/) - blogpost to follow. 
* Gisele Craveiro, Professor and Coordinator of Research Group on Public Policy for Access to Information (GPOPAI), University of São Paulo. Brazil. Talking about the ["Caring for my Neighbourhood Project"](http://www.gpopai.usp.br/cuidando/). 

We heard a variety of approaches, from installing physical counters of the national budget in one of the busiest streets in Sarajevo, to actively engaging with twitter users and teaming up with the Occupy movement in Nigeria, to painstakingly geo-coding public projects in Brazil. 

Many NGOs around the world continue to grapple with this incredibly complex topic, and there were words of wisdom for those embarking upon the journey. Their tips:

* The key to reaching the many is packaging media-compatible messages with specific budget information.
* It is important to bear in mind what type of audience you are writing for. If you are a team of academics, make sure you get someone on board who can help you translate the key issues into non-jargonised language for a layman audience. 
* Online data-vis can be a key tool in delivering information, but it's not the end, (particularly in developing countries) you need tools to help get the message across offline, perhaps through wall paintings or mobile outreach. 

The topic of engagement with citizen issues is something which we will continue to discuss via the [OpenSpending Mailing list](http://lists.okfn.org/mailman/listinfo/openspending) and we look forward to hearing updates from teams like these all around the world on this topic.  

## Public Participation

Starting with a bold opening statement? Why did Athens outperform other city states? - Better than usual information processing, leveraged by participatory institutions. Want to know how higher levels can lead to lower rates of child mortality? How participation can increase willingness of citizens to pay their taxes or improve the precision of budgeting practices? Watch the presentation below to hear Tiago's talk (from 45:00. It's worth it, there are kittens!). 

<iframe src="http://embed.bambuser.com/broadcast/2995373" width="460" height="310" frameborder="0">Your browser does not support iframes.</iframe>

*If anyone does have photos or videos from any of the sessions, please upload them to Flickr and tag them with '#OKFest'!*
