--- 
authors:
- fabiano
redirect_from: /2012/01/transparency-and-technology-in-brazil-linking-politicians-to-bad-entrepreneurs/
title: "Transparency and technology in Brazil: linking politicians to bad entrepreneurs"
tags: 
- Data Journalism
- Spending Stories
---
**This story by Fabiano Angélico, who formerly worked at Transparencia Brasil, is about how technology and the help of coders can be used to highlight links between politicians and corrupt entrepreneurs. It is followed by a brief "Behind the News" interview which shows some of the time costs of datawrangling and problems faced when getting the story out.** 

How can transparency and technology point out connections between politicians and bad entrepreneurs? Well, first of all you will need some information about the politicians and about the entrepreneurs.

In Brazil, in spite of the historical lack of transparency in governments (Brazil's freedom of information law was sanctioned just late last year), the Electoral Court has been proactively providing information on political candidates since 2002. One piece of info is the financial donation to the candidates, containing info about who is donating to whom and how much. Although this database is released only after the elections -- the info would surely be more powerful if it were released DURING the political campaigns --, one must admit this is a rich source of information.

<a href="http://www.flickr.com/photos/elaws/3883627250/sizes/z/in/photostream/"><img alt="" src="http://farm3.staticflickr.com/2542/3883627250_067b94c247_z.jpg" title="Roger Schultz via Flickr (CC-BY)" class="alignnone" width="640" height="425" /></a>

January, 2010. Elections for President and for the Parliament, as well as for State Governors and State Parliaments, would happen in only 9 months time, in October. However, many people were already discussing them.

At that time, 2010 had just begun, I was at work, thinking of how to find rich and useful information on the candidates. Then I was reminded of the so-called ["Dirty List"](http://www.mte.gov.br/sgcnoticia.asp?IdConteudoNoticia=6680&PalavraChave=lista%20suja) -- this is a list regularly published by the Ministry of Labour which indicates the companies and farmers who are caught by government officials using workers in very lousy conditions, similar to slavery.

The list published in the Ministry's website is in not-so-friendly PDF format, but it has a plus: there is not only the name of the companies or the entrepreneur/farmer, but also their registry numbers within the government. I remembered that in the Electoral Court one can also find the numbers. That was important because having the registry numbers would avoid ambiguities.

I had both lists: the donators to the previous elections (2008, 2006, 2004 and 2002) and the "Dirty" companies. But I had a problem; I did not know how to matchup the datasets. My tech knowledge allowed me to transform the PDFs into CSV, but I could no go further without help.

I then sent the datasets, in CSV format, to [Transparencia Hacker](http://thacker.com.br/), a Google Groups list which now gathers over 800 people interested in the connections between transparency and politics/public administration.

Within 2 days, the guys made the datasets talk, and we found that 16 politicians had been elected with the help of "Dirty" money in the 4 previous elections. Other 13 politicians had received donations from the "Dirty List" but had not succeeded in winning the elections.

[A local newspaper told the story](http://www.agenciasebrae.com.br/noticia.kmf?canal=36&cod=9376495&indice=0).

In October 2012, there are local elections in Brazil. Hope we can shed even more light in the candidates.

# Behind the news: 

## Roughly how long did it take you to extract the data from the PDFs? Do you know how long the guys from Transparencia Hacker spent working on the data?

This was kind of easy. It took me just some minutes. The "Dirty List" is a 20-page PDF. I always use a website to convert it into xls or csv (I like [Cometdocs](http://www.cometdocs.com/) for this work). 

[Here](http://portal.mte.gov.br/data/files/8A7C812D3374524E0133835496AF7D72/CADASTRO%20DE%20EMPREGADORES%2008%20de%20novembro%202011.pdf) is the Dirty List, in PDF (last updated on the 8th of November, 2011; the list we used is in CSV but it it very outdated because it was due to January 2010) 
Here are the Electoral Court pages for the list of donators: [2002](http://www.tse.jus.br/internet/eleicoes/2002/prest_blank.htm), [2004](http://www.tse.jus.br/internet/eleicoes/2004/prest_blank.htm), [2006](http://www.tse.jus.br/eleicoes/eleicoes-anteriores/eleicoes-2006/prestacao-de-contas-eleicoes-2006), [2008](http://www.tse.jus.br/eleicoes/contas-eleitorais/candidatos-e-comites/prestacao-de-contas-eleitorais-2008) and [2010](http://spce2010.tse.jus.br/spceweb.consulta.prestacaoconta2010/pesquisaCandidato.jsp). 

What I asked the Transparencia Hacker community was to check whether the CNPJs (companies register number within the governments) in the CSV would match any item in the Electoral Court webpage. The guys worked on the data for 2 days.

## Is sufficient data available to visualise the total amount lobbyists donated to political campaigns, and would it be useful to / no? If you were to visualise the info - what would the priorities be to show? Would any tools be useful to explore the data?

Yes, there is enough data. And YES, it would be very useful to visualize those links. I would prioritise the presidential and governor candidates as well as some Congressmen who hold top-positions in both Houses of Congress. Also, the donations to political parties (not to individual politicians) would be a plus. 

A search form would be very useful. The search could have filters for position (Presidential candidate, governor candidate, political party etc), geography (Brazil, states) and donators (with no filters, just a blank for writing)

## In your ideal world, in time for the impending elections - what would be done differently from last time? Any additional data you would like to see released? 

I'd have to think more carefully to respond that, but concerning additional data: the number which identifies the market (the field) in which the companies work. 

*Interested in writing a "Behind the News" piece for the OpenSpending blog? Get in touch via our [twitter account](https://twitter.com/#!/openspending) or email **info [at] openspending.org**.*

Some useful links (mainly in Portuguese):

 * [Brasil adopts access to information law](http://www.article19.org/resources.php/resource/2862/en/brazil-adopts-access-to-information-law)
 * [View the Dirty List in Full](http://www.mte.gov.br/sgcnoticia.asp?IdConteudoNoticia=6680&PalavraChave=lista%20suja)
