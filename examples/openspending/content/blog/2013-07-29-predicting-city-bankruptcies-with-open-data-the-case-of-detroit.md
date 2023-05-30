---
redirect_from: /2013/07/predicting-city-bankruptcies-with-open-data-the-case-of-detroit/
title: 'Predicting city bankruptcies with open data: The case of Detroit'
authors:
- Anders Pedersen
---
This is a guest post by Marc Joffe of <a href="http://www.publicsectorcredit.org/ca">Public Sector Credit Solutions</a>. 

Many have noticed that the United States last week was struck by its biggest municipal bankruptcy ever, when the City of Detroit declared bankruptcy. Less well known is the fact that Moody’s, the major credit rating agency, <a href="http://www.chicagotribune.com/business/breaking/chi-moodys-slashes-chicago-ratings-20130718,0,6620303.story.">downgraded the City of Chicago</a> by three notches at about the same time.

Earlier this year, I used audited financial disclosures to estimate the risk of city bond defaults, which often accompany bankruptcies, in the state of California. The research was funded by a grant from the state, but its conclusions are mine and not those of any official agency. The goal was to see whether open data collected from so called Comprehensive Annual Financial Reports (CAFR), that US governments typically file as PDFs, and open analytics (or open economic modeling), can serve as an alternative to standard credit rating agency analysis.

The model created during the research is <strong>openly available</strong> and designed to calculate default probabilities, where higher scores are worse than lower scores. Since 1940, the annual default rate for American cities has been 0.10%. In 2012 however, 2 out of 265 or 0.75% of California cities defaulted on their debt, and so that is the average score in the model. Scores substantially higher than 0.75% therefore represent heightened credit risk.

A number of people have asked me how the scoring model would have treated Detroit (Michigan) and Chicago (Illinois), which are in other US states. Here is a my response.

A Google spreadsheet containing the model is available <a href="https://docs.google.com/a/okfn.org/spreadsheet/ccc?key=0AvdkMlz2NopEdGtKdnY2VTRPcmFLbmFPanNvc2pCdUE#gid=0">here</a> and embedded below. It is a modified version of <a href="http://www.publicsectorcredit.org/ca">our original model</a>. I entered data from <a href="http://www.detroitmi.gov/Portals/0/docs/finance/CAFR/Final%202012%20Detroit%20Financial%20Statements.pdf">Detroit’s 2012 CAFR</a>, which was published on December 28, 2012 and the <a href="http://www.cityofchicago.org/content/dam/city/depts/fin/supp_info/CAFR/2012/CAFR_2012.pdf">Chicago’s 2012 CAFR</a> which appeared more recently. Based on our open model Detroit’s probability score is 3.34%, which is worse than almost every California city in our survey. Chicago’s score is also pretty bad: at 1.77% it is worse than the score for <a href="http://www.stocktongov.com/government/departments/manager/bankruptcy/default.html">Stockton</a>, which was one of the two California cities to default in 2012.

The main driver of Detroit’s high default probability score is its negative <a href="http://en.wikipedia.org/wiki/Fund_accounting">general fund balance</a>. The ratio of Detroit’s general fund balance to general fund expenditure is -27%. As reported in our <a href="http://papers.ssrn.com/sol3/papers.cfm?abstract_id=2258801">April working paper</a> general fund exhaustion, which means very low or negative general fund balances, were associated with the Vallejo, Stockton and San Bernardino bankruptcies. The situation in Detroit provides further evidence that municipal bond investors and other stakeholders would benefit by monitoring this indicator.

Although Chicago does not have a negative general fund balance, it has an annual general fund deficit and declining revenue, two of the four indicators that drive the default probability score. Chicago also has a relatively high ratio of interest and pension costs to total governmental fund revenues. When these uncontrollable costs become relatively high, bankruptcy is harder to avoid.

Assessing government default probability rates based on open data is today a challenging task, as most cities publish this data in PDF-format. Getting cities to publish such data in machine readable format, would make such research a lot easier. For the OpenSpending community the the bankruptcy of Detroit also underlines the need for addressing not only spending, but also revenue flows and liabilities.

Collecting, extracting and analyzing data from public financial disclosures can help us evaluate the credit risk of our local governments openly and transparent. This could be an important way of using the OpenSpending concept and platform. 

<iframe width='600' height='400' frameborder='0' src='https://docs.google.com/spreadsheet/pub?key=0AvdkMlz2NopEdGtKdnY2VTRPcmFLbmFPanNvc2pCdUE&output=html&widget=true'></iframe>

