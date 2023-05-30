---
redirect_from: /2014/03/hackathon-odd14-barcelona/
title: 'Hackathon #ODD14 Barcelona'
authors:
- Concha Catalan
---
On Saturday, February 22, International OpenDataDay (ODD), [opengov.cat](http://opengov.cat/ca/castellano/) coordinated a hackathon for the first time. It took place in the great working space [Makers of Barcelona](http://www.mob-barcelona.com/).

![opengov.cat](http://opengov.cat/wp-content/uploads/2014/02/opengovcatlogo.jpeg)

A hackathon is a meeting of journalists, programmers, and developers to work  on a specific project. There were about twenty people, and we suggested *three* challenges to make different information about our public
administration and the autonomous government of [Generalitat de Catalunya](http://www.gencat.cat/) more accessible. We thought one or two would be chosen, but our attendants' skills were so great that they added a new challenge to our list, and we ended up working on all our suggestions!

![NO-PDF](http://opengov.cat/wp-content/uploads/2014/03/NO-PDF.png)

## Challenge 1

*Clean the dataset of [Generalitat budget 2014](http://www20.gencat.cat/portal/site/dadesobertes/menuitem.160770a4eab24e0b16572d32b0c0e1a0/?vgnextoid=49b19ee9acb42310VgnVCM1000000b0c1e0aRCRD&vgnextchannel=49b19ee9acb42310VgnVCM1000000b0c1e0aRCRD&vgnextfmt=detall&q=pressupostos&newLang=ca_ES) to include it on [openspending.org](https://openspending.org), the free and open database of public financial transactions, and to be able to visualize it.*

![tweet](http://opengov.cat/wp-content/uploads/2014/03/tuit-14_02_13.png)

> Q: Hello, when will your budget dataset be available in open data?
>
> A: We plan to publish it next week. Thank you.
>
> Q: Which day next week? Thank you.

The budget of our autonomous government for 2014 had been released in a reusable format on [the Generalitat open data portal](http://www20.gencat.cat/portal/site/dadesobertes?newLang=en_GB) only a week before, and we had exchanged a few tweets about it even before the final version was [passed by Parliament](http://www20.gencat.cat/portal/site/economia/menuitem.9542de278d3a7ee508d1b110b0c0e1a0/?vgnextoid=64be5bccbb222410VgnVCM1000008d0c1e0aRCRD&amp;vgnextchannel=64be5bccbb222410VgnVCM1000008d0c1e0aRCRD&amp;vgnextfmt=detall&amp;contentid=b3d597110beb3410VgnVCM2000009b0c1e0aRCRD) on 23 January.

![tweet](http://opengov.cat/wp-content/uploads/2014/03/tuit-14_02_14.png)

> – The budget is available on our open data portal.
>
> – Thank you very much for posting budget 2014.

We're still working with openspending.org and, together with [openkratio](http://openkratio.org/), we will soon contribute to launching [historiasdegasto.org](http://openkratio.github.io/okf-spending-stories/), the Spanish version of [spendingstories.org](http://spendingstories.org). All of them are projects of the [Open Knowledge Foundation](http://barcelonalittleshell.blogspot.com.es/2014/02/nace-historiasdegastoorg-para-explorar.html). 

## Challenge 2

*Enter senior officials' salaries and allowances on a spreadsheet so as to have it in a reusable format.*

![Captura de pantalla 2014-03-03 a la(s)
18.35.53](http://opengov.cat/wp-content/uploads/2014/03/Captura-de-pantalla-2014-03-03-a-las-18.35.53.png)

Such information started to be available in the Government and President section of the [Generalitat transparency portal](http://transparencia.gencat.cat/) in PDF format last summer, with no metadata about each file. It is not easy to use, but it is better than nothing: the story [We've won the Grand Prize,
627.45 euros per month](http://opengov.cat/en/2014/02/weve-won-the-grand-prize-627-45-euros-per-month/) derived from it.

Here in [`retribucions_README`](http://opengov.cat/wp-content/uploads/2014/03/retribucions_README.txt) you can find a technical explanation about how and with what software the documents were cleaned. 

## Challenge 3

*Familiarise ourselves with the [Generalitat 2014 budget dataset](http://www20.gencat.cat/portal/site/dadesobertes/menuitem.160770a4eab24e0b16572d32b0c0e1a0/?vgnextoid=49b19ee9acb42310VgnVCM1000000b0c1e0aRCRD&amp;vgnextchannel=49b19ee9acb42310VgnVCM1000000b0c1e0aRCRD&amp;vgnextfmt=detall&amp;q=pressupostos&amp;newLang=ca_ES), the law that regulates the budget, the concept of chapters, items, and others; compare it to the 2012 budget (extended to 2013), to see which concepts are no longer there and the work out increases and decreases.*

Later I was given this [interesting link](http://virtual.eapc.cat/pluginfile.php/110865/mod_resource/content/1/gest_pressup/estructura_del_pressupost._classificacio_de_l_estat_de_despeses.html) (in Catalan) which clearly details everything, straight from the Catalan Public Administration School.

![Captura de pantalla 2014-03-04 a la(s)
01.45.43](http://opengov.cat/wp-content/uploads/2014/03/Captura-de-pantalla-2014-03-04-a-las-01.45.43.png)

Each budget file has around 12k rows and over 25 columns. We didn't know how to go about it, and it is not easy if you aren't an expert. As we aren't, we looked for and found people who are... and they want to help us! Meanwhile, we are reviewing basic mathematical and statistical notions.

We are working on budget changes in different Generalitat organizations, and we hope to be able to tell you more about it soon. 

## Challenge 4

A girl who attended the morning presentations stated: "I can only do maps. If I can help, I'll stay for the hackathon." We quickly rummaged through [what we had on ice at opengov.cat](http://opengov.cat/ca/castellano/) and found a half-made map of the Generalitat Departaments buildings, with all the available (or non-available) contact information for each one: address, phone, webpage, email, Twitter.

In many cases, a horrible form—one of those that asks for all your personal information but leaves no trace of your information request—replaces the contact email. A form [like this](https://ovt.gencat.cat/gsitfc/AppJava/generic/conqxsGeneric.do?webFormId=6&amp;set-locale=ca_ES).

We had made the map some time before, but we didn't like its format, so it remained unpublished. The new one will be better and made properly from a spreadsheet using [CartoDB](http://cartodb.com/) software.

![CartoDB logo](http://opengov.cat/wp-content/uploads/2014/03/cartodb-logo-300x150.jpeg)

Oscar Marín from [Outliers](http://outliers.es/) gave us a workshop about how to make maps in a recent data journalism session at the CCCB that has now been posted [here](http://www.cccb.org/ca/curs_o_conferencia-periodisme_de_dades_sessi_de_treball_ii-45371).

If you key in "periodismo de datos" and "2013" o "2014" in the search box, you'll see the videos of all the sessions held since September 2013. (PUBLICITY - In the first session, in [September 2013](http://www.cccb.org/ca/curs_o_conferencia-periodisme_de_dades_sessi_de_treball_i-44601), we presented this project!)

Just an addition: Thanks everybody who organised, participated, and helped (specially [@doublebyte](http:/twitter.com/doublebyte)), and *happy open data!*

