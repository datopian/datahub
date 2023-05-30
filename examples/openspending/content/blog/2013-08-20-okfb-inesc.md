---
redirect_from: /2013/08/okfb-inesc/
title: Visualizing How the Brazilian Government Underspends on the Public Good
authors:
- Vítor Baptista
---
*This post was co-authored with Neil Ashton and is cross-posted from the [PBS Ideas Blog](http://www.pbs.org/idealab/2013/08/visualizing-how-the-brazilian-government-underspends-for-the-public-good).*

Brazilian NGO INESC (Institute of Socio-Economic Studies) and Open Knowledge Foundation Brasil want Brazilians to participate in the allocation of their public spending and ensure that it is used to construct a free, fair, and sustainable society.

That’s why we partnered to create [Orçamento ao seu Alcance][1], a site which presents the execution of the Brazilian federal budget in an interactive and intuitive form.

We used OpenSpending as our database. This made it easier to focus and develop our visualizations without the need for setting up additional infrastructure for data hosting, and it made the data readily available in an accessible way.

#### What's the project about?

Millions of Brazilians pay the taxes that fund the federal budget, but few actually understand it. Most are unaware of Brazil's unjust regressive tax regime and of the scale of the losses to the public through misallocation. The information they need to understand these realities is simply not available in a comprehensible form. By building Orçamento ao seu Alcance, we hope to change that.

Orçamento ao seu Alcance's development focused particularly on the issue of underspending. All Brazilian public bodies spend less money than is allocated to them, to varying degrees. The Ministry of Education, for example, [left 16.3% of its budget (about US$ 6.1 billion) unspent in 2012][2], and the Ministry of Culture only spent 47.5% of its budget in 2012. If Brazilians’ needs were really being met – if every Brazilian who wanted to study had access to good public schools, for example – this underspending would not be a problem. But that is far from the case; in fact [less than 1% of schools][5] [have an ideal infrastructure][6] (a problem we have [explored previously][7]). To explore and highlight the problem, we created a special-purpose data visualization.

#### How we used OpenSpending

Orçamento ao seu Alcance took data collected by [SIGA Brasil][8], an aggregator for the many systems used by the Brazilian government to organize budget data, and added it to the OpenSpending database. Using OpenSpending freed us from creating our own database and allowed us to use the OpenSpending API to construct visualizations and a full-text search system.

##### Visualizing underspending

We designed our own graph to tackle the problem of underspending. The result is a time series graph that combines bars, lines, and an area. The site constructs such a graph for each budgetary unit, showing how its budget and spending compare for a given year.

<a title="Orçamento ao seu Alcance: underspending" href="http://www.flickr.com/photos/okfn/9517213680/"><img src="http://farm3.staticflickr.com/2820/9517213680_dcb0eee62f_z.jpg" alt="Orçamento ao seu Alcance: underspending" width="500" height="245" /></a>

The blue area in the graph represents the total budget – which, as you can see, changes over the year. Each red *bar* shows how much was spent in a particular month, and the red *line* tracks total spending. The distance from the red line to the tip of the blue area gives the share of the budget remaining to be spent. The amount remaining in December is money that is *underspent*.

This graph was built using [NVD3][9], a JavaScript library with a collection of reusable charts made on top of [D3.js][10]. The data comes from OpenSpending via its [Aggregate API][11].

##### Budget treemap

For the index page, we wanted to show a broad view of the budget across all public bodies. More than that, we wanted to show the amount of money used in each function and subfunction (e.g. Education and Basic Education). To do this, we used the OpenSpending treemap visualization.

<a title="Orçamento ao seu Alcance: treemap" href="http://www.flickr.com/photos/okfn/9517213800/"><img src="http://farm4.staticflickr.com/3712/9517213800_917bd18fae.jpg" alt="Orçamento ao seu Alcance: treemap" width="500" height="289" /></a>

OpenSpending allows you to [create a treemap as a "widget"][12] which can be simply dropped into a site. We used a modified version of the widget code with customized colours and a "back" button for improved navigation.

##### Searching

To help the user find public bodies, we implemented a search box with auto-complete using[ Twitter Bootstrap][13]'s [typeahead][14] library.

<a title="Orçamento ao seu Alcance: search" href="http://www.flickr.com/photos/okfn/9517213914/"><img src="http://farm6.staticflickr.com/5506/9517213914_9c2bde668a_o.png" alt="Orçamento ao seu Alcance: search" width="445" height="264" /></a>

To make the search instantaneous for the user, we load all data entries as soon as the user enters the page. The OpenSpending Aggregate API once again helped with this, allowing us to get a list of all public bodies with a simple query.

#### Problems we had

We did run into a few problems using OpenSpending to build the site, though all of them could be overcome.

The Aggregate API only allows you to request one financial quantity (one measure) at a time. You can't request both a budget quantity and a payment at the same time, for example. Our underspending graph ended up using three measures, requiring three requests. This is a performance problem. Because the API caches results, however, it ends up being OK – and there are already plans to support multiple measures in future versions, so this problem will soon be solved.

With the treemap visualization, our problem was that widgets are not customizable. They're made to be dragged and dropped into a blog post or a newspaper article, not integrated into a site with its own design. To change the treemap's colours and fonts, we had to use a modified version of the widget's code.

#### Conclusions

We're happy with how Orçamento ao seu Alcance turned out, and OpenSpending contributed a lot to its success.

For developers, OpenSpending made it possible to run the site without its own database and to publish its content in a sleek, cacheable form. For the project's NGO supporters, using OpenSpending makes it possible to update the data without needing to deal with the site's developers. Everyone is happy.

We hope that Orçamento ao seu Alcance will inspire other OpenSpending satellite sites that will help spread budgetary awareness around the globe.

[1]: http://orcamento.inesc.org.br/
[2]: http://orcamento.inesc.org.br/26000-ministerio-da-educacao/2012
[5]: http://www.paraonline.com.br/menos-de-1-das-escolas-brasileiras-tem-infraestrutura-ideal/
[6]: http://simaojacinto.blogspot.com.br/2013/06/menos-de-1-das-escolas-brasileiras-tem.html
[7]: http://www.escolaquequeremos.org/
[8]: http://www12.senado.gov.br/orcamento/sigabrasil
[9]: http://nvd3.org/
[10]: http://d3js.org
[11]: http://blog.openspending.org/help/api/aggregate
[12]: http://www.pbs.org/idealab/2013/03/how-to-embed-open-spending-visualizations-in-your-own-website078
[13]: http://getbootstrap.com/2.3.2/
[14]: http://twitter.github.io/typeahead.js/

