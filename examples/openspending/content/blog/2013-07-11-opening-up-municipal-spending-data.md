---
redirect_from: /2013/07/opening-up-municipal-spending-data/
title: Opening up municipal spending data
authors:
- Niels Erik Kaaber Rasmussen
---
<p id="docs-internal-guid-48a607d4-cf05-030f-18f7-77fd498f5751" dir="ltr">The open data web-agency <a href="http://www.buhlrasmussen.eu">Buhl &amp; Rasmussen</a> has developed <a title="Kend din kommune" href="http://kommune.politiken.dk">a site visualizing the budgets of all 98 Danish municipalities</a> for one of the biggest Danish news sites, Politiken.

<p dir="ltr">Municipalities are central for the functioning of the welfare state Denmark. They take care of a range of important tasks like social- and health care, primary education, social benefits, traffic and much more. However even in a year with local elections they do not attract much public attention.

<p dir="ltr">One reason to this might be that the barriers for ordinary citizens to engage in local politics are too high. One way to lower the barriers might be to make it easier to understand the most central decision made by municipalities each year: their budgets.

<p dir="ltr"><strong>The data</strong>

<p dir="ltr">There are comprehensive data openly available on Danish municipal budgets and accounts. Budgets and accounts are structured in a hierarchy with 4 levels and roughly 250 possible expenditure and income posts. Data for all 98 municipalities can be obtained from <a href="http://www.dst.dk/en/Statistik/emner/kommuner-og-regioner/kommunernes-budgetter.aspx">Statistics Denmark</a> and dates back to 1978. Obviously a lot of changes has taken place since 1978 but historical data for the last 5 years or so are reasonable comparable with today’s figures.

<p dir="ltr"><strong>Reducing complexity - preparing the data</strong>

<p dir="ltr">Multiple problems arise when comparing historical accounts to the latest budget, as I decided to do for this project. First inflation must be taken into account. Secondly the responsibilities of the municipalities are not fixed over time and thirdly accounting practices changes over time.

<p dir="ltr">I choose to adjust time series using a combined consumer price and wage index. While this does not fix the problem with changing responsibilities and accounting practices it improves the overall comparability.

<p dir="ltr"><strong>Dealing with national reimbursements</strong>

<p dir="ltr">Some expenses paid for by local government are reimbursed in part by national government. Shall the reimbursed part be included as an expense or not? I decided to do both(!). When presenting the budget using the bubble diagram all figures represents expenditure minus related income if any. In addition to the bubble diagram a table view shows the budgets with<a href="http://kommune.politiken.dk/tabel.php?type=ind"> income</a> and <a href="http://kommune.politiken.dk/tabel.php?type=ud">expenditures</a> separated from each other.

<p dir="ltr">In the budgets expenditure posts are split in operational and construction expenses. The separation makes good sense for a lot of analyses however for simplicity I choose not to differ (the separate parts of an expenditure post are shown with mouseover).

<p dir="ltr">I made an effort to include not just spending data but also figures describing the different sources of income. Openspending makes such a good case in highlighting public spending but seems to ignore income. To get a reasonable understanding of municipal budgets you’d have to consider both spending and income.

<p dir="ltr"><strong>The solution</strong>

<p dir="ltr">The <a href="http://kommune.politiken.dk/boble.php?kid=530#/~/budgetteret-i-alt-br---billund-kommune/social--og-sundhedsv-sen/tilbud-til--ldre-og-handicappede-i-alt/pleje-og-omsorg-mv--af--ldre-og-handicappede">main visualization</a> is the well-known bubble chart from OpenSpending slightly altered to include an information box, when users click at the lowest level. The popup includes information on historical spending, related income and presents the expenditure as part of the total budget, divided by the number of inhabitants and as compared to national average.<img class="aligncenter" src="https://lh5.googleusercontent.com/TRzOOu2z7zQLArG-zU8aL3FwJpD3XRnrzGSdAfjsRv5bovcaJxzsW59kz98KcX5X8YPO9Os3TOBZ32_qFo4HdMs8F_zCsp9gZgkyX6IdKYs-fr-pXrUNBWpxyQ" alt="" width="368px;" height="333px;" />

<p dir="ltr">Information popup showing historical data, expenditure as part of the total budget, expenditure per inhabitants and expenditure compared to national average.

<p dir="ltr">The bubble chart itself is an inspiring tool - thanks to the <a href="http://okfn.org">Open Knowledge Foundation</a> and the OpenSpending-project for providing it.

<p dir="ltr">In addition to the bubble chart I created some features useful when dealing with multiple budgets with same structured format. For users interested in a specific expenditure post, <a href="http://kommune.politiken.dk/mestmindst.php#0-6-prindb">that post can be selected</a> and a list of the municipalities spending the most/least per inhabitant (of in percent of the total budget) can be shown.

<p style="text-align: left;" dir="ltr">The standardized structure of the budgets also made it possible to build a function to <a href="http://kommune.politiken.dk/sammenlign.php#101-751">compare two different municipalities</a> in details.

<p style="text-align: center;" dir="ltr"><img src="https://lh6.googleusercontent.com/Idynpqpo9gPdb3T-KlJ9JRB9swcL6Q3FLJi1rdRxLW_aMuRJTD1dTtq9Z1qSz8-xhYCHAPoYrVIZ8JUtf_PYbYGqUMmXMF96zrHLSLKjLrW6uPnlBkFJk_oUOA" alt="" width="495px;" height="325px;" /><em>
Comparing two municipalities. The small charts shows historical data.</em>

<p dir="ltr">The compare-feature makes it easy for one to see how the neighbour municipal prioritize differently.

<p dir="ltr">Municipal elections are going to be held in Denmark later this year. Hopefully the opening of the budgets will help lowering the barrier for citizens to engage in discussions.

<p dir="ltr"><strong>Local spending in your city</strong>

<p dir="ltr">While data on budgets and accounts for municipalities in Denmark are relatively easy to obtain this is far from the case in every municipal or city around the world. Some places the data is not published at all, many places the data is not published in a machine-readable format and seldomly is data made available in a manner that makes it possible to compare one city to another in a meaningful way.

<p dir="ltr">The OpenSpending project is organizing a <a href="http://blog.openspending.org/2013/06/30/spending-data-party-announce/">City Spending Data Party</a> on July 19-21 - if you’re interesting in local spending data this is a great chance to get involved.

