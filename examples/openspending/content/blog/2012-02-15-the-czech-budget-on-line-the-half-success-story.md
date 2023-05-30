--- 
authors:
- michal
redirect_from: /2012/02/the-czech-budget-on-line-the-half-success-story/
title: "The Czech budget on-line: the half success story"
tags: 
- Working Group
---
**This post is by Michal Škop, of KohoVolit.eu.**

<em>The half-success story of implementing <a href="http://openspending.org">OpenSpending.org</a> and <a href="http://otwartedane.pl">OtwarteDane.pl</a> into <a href="http://budovanistatu.cz">BudovaniStatu.cz</a> ('Building of the State', the name referes to <a href="http://en.wikipedia.org/wiki/Ferdinand_Peroutka">Peroutka</a>'s book)
</em>

It all started almost 2 years ago. Our partner NGO <a href="http://nasipolitici.cz">NasiPolitici.cz</a> started to think about putting the Czech public money data on the web and asked us at <a href="http://en.kohovolit.eu">KohoVolit.eu</a> if we were interested. And we said yes, we always wanted to do something 'about money' (we used to be a parliamentary watchdog only till then). 

We found out that there is a <a href="http://wwwinfo.mfcr.cz/cgi-bin/aris/iarisorg/index.pl">huge amount of public financial data</a> available on-line. Every single public organization has to fill several detailed accounting forms every year, the oldest data are from 1994 (not published, but they are there). And it is available even in <a href="http://wwwinfo.mfcr.cz/cgi-bin/aris/iarisxml/index.pl">xml</a>. Can you ask for more?

Later on, we found that there were some serious catches. The Ministry of finance, which provided the data, severely limited the number of downloads from one IP. It would have taken us a couple of months just to download everything (some 60 GB of data). The Tor and mobile connection (changing IP) came in useful. The forms were in xml, but mixing raw basic data with sums with no clear distinction between them at all. Funny. They changed the system for 2010. Et cetera. We were progressing rather slowly, with no financial support at all.

<img alt="" src="http://farm8.staticflickr.com/7189/6876765321_195864d782_z.jpg" title="Budovani Statu" class="alignnone" width="640" height="388" />

Finally, help from <a href="http://www.nfpk.cz/en">Anticorruption Endowment</a> came and we got funding for about two month (developer) to build a site connecting (just) the government budgets with the politicians. That was important, I could not just show the data in some nice way, I needed to do other things with the application – showing historical data, connecting to politicians. 

I spent a month just fiddling with the data, trying to find a suitable 
a) data storage and 
b) application to build on. 

I tried <a href="http://openspending.org">OpenSpending.org</a> first, but I was not able to set up the data there. I tried to tweak <a href="http://community.kohovolit.eu/doku.php/api">our parliamentary API</a>, but it was just too much work, I would not be able to finish it in time. After a few weeks, I still was not sure if I would get the results using <a href="http://openspending.org">OpenSpending.org</a>. The guys behind <a href="http://otwartedane.pl">OtwarteDane.pl</a> were very helpful and so we decided to store the data with them. 

I did not use OpenSpending.org's API, but their <a href="https://github.com/okfn/bubbletree">bubbletree chart</a> was good. I needed to catch a few bugs, but it took me just a few days to get it running more-or-less in a way I wanted (well yes, I still need to clean the code for 'pull request'). And – importantly – it was possible to build our application(s) on it. 

I think, we have hit the bubbletree's limit on number of bubbles there. It runs rather well with data we limited it to later (about 3600 bubbles), but it takes javascript about 10 sec on my medium computer to process the full data, 24000 bubbles for 2010 year, Opera cannot handle it and IE had problems, too (try it on <a href="http://budovanistatu.10dragons.org/bubble?scope=full">our development site</a>).

And how about the '<a href="http://budovanistatu.cz/bread">where does my taxes go</a>' app? Well, it was rather easy from the developer's view. I could copy the British idea, just program it in Javascript instead of the Flash. The hard part was the economics here. We could not use just the income tax as it accounts for about 10 % of all the taxes only (the VAT, the health tax, the social tax are more important). The taxes are messy. The general financial reporting is a mess, too. I have found about 15 % difference in 'public taxes' in different financial reports from <a href="http://czso.cz">Czech Statistical Office</a>. So which one to use to calculate the overall taxes? But this is just one reason more why <a href="http://openspending.org">OpenSpending.org</a> will be useful, to standardize this mess. 


For the future, we will update the project once the 2011 data is available. We shall solve the problem with bubbles' scaling. We will write analyses based on it mainly push others to do it. And I already have the Prague 2012 budget data ready to bubble...
