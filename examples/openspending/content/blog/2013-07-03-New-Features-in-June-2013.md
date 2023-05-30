---
authors:
- tryggvib
redirect_from: /2013/07/New-Features-in-June-2013/
title: New Features in June 2013
---

![Image by GemiTux (cc-by 2.0)](http://farm1.staticflickr.com/76/196956563_150aee58c0_z.jpg "Outside of OpenSpending!")

The summer is here so shouldn't we be outside? Well, in a way we have. Bulk of the work this month has been on stuff **outside** of the core OpenSpending platform although there have also been some changes to the platform itself.

### Contribution Attribution

First up, and really important to us: **List of Contributors!**

We added a [CONTRIBUTORS file](https://raw.github.com/openspending/openspending/master/CONTRIBUTORS) to the root of the openspending repository, just like you would expect in an open source project like openspending.

If you think your name should be there, we didn't intentionally leave it out. We let *git* list our contributors but unfortunately that's only code contributors, there are plenty of other contributors and we want them in our list as well. Let us know if you are missing from the list and we'll add you!

### Better Documentation

This might seem like a small change, but it's an important one. Our *[installation docs](http://docs.openspending.org/en/latest/install.html)* were slightly wrong, which might have caused users some problems. They also referred to an outdated version of *solr*.

That's been fixed now so we've reduced some frustration involved in getting an instance of OpenSpending up and running. If you notice any places in our docs where improvements are needed let us know, or better yet help us by contributiong improvements.

This month we also released some much needed documentation regarding our development process, to help new contributors (and older ones) to know their way around project contributions. We created a short *[Howto hack on OpenSpending](http://openspending.org/help/hacking.html)* as well as a more detailed documentation about the *[development process](http://openspending.org/help/development-process.html)*. For code reviewers we also documented some *[guidelines for our code review process](http://openspending.org/help/code-review.html)*.

### Satellite Template

Our [satellite template](http://github.com/openspending/satellite-template/) exists to make creation of satellite sites easier. It was created last month (and based on *Where Does My Money Go?*) but it has already been used to create (or initiate) new satellite sites. As always when a fresh piece of software gets used, unforeseen use cases turn up.

We were notified of those problems and were therefore able to put effort into adapting the satellite template to these new use cases. Some of these changes have been added into the template but as more satellite sites pop up, more changes will most definitely get added.

We encourage you to use the satellite site if you are in the process of creating a satellite site, or want to create a satellite site. Also, let us know if you think we can improve the template.

### Preparations for Inflations

We have been working hard on making it possible to do *fair* historical comparisons with OpenSpending by adjusting for inflation. This is quite a large undertaking but nothing we can't handle. This month we've been laying the foundations for these inflation adjustments.

First we had to collect some data. We decided to start small and start by looking at Consumer Price Indices (CPI) only. These give a pretty good indication about the inflation and are frequently used in economics. The data was collected and stored in standardised form as a [data package](http://www.dataprotocols.org/) and made available on [http://data.okfn.org/](http://data.okfn.org/data/cpi/).

We went through a lot of CPI data available online and chose the best open data resource we could find. If you know of better data we could use, please help us improve the data, because better data results in better inflation adjustments on OpenSpending.

Then we created a small module to read in data packages and called it [datapackage](http://github.com/tryggvib/datapackage). We created a fairly generalised module so that it could reused in other areas of OpenSpending or in other projects. This module, which we implemented in Python and made available in the [Python Package Index](https://pypi.python.org/pypi/datapackage/), almost instantly sparked off an equivalent [module in Java](https://github.com/rossjones/datapackage-java). Then later we received an improvement to our python module. All in the scope of one month. By the looks of it we succeeded in creating a generalised, reusable module. Well done!

Using our datapackage module we then proceeded to build a first version of an economical transformation toolkit, which we dubbed *[economics](http://github.com/tryggvib/economics/)* (yes, we are very creative when it comes to naming our python modules). At the moment it can do basic inflation computations using the CPI data and we made that available in the [Python Package Index](https://pypi.python.org/pypi/economics/) as well. You can add more economical methods and computations if you like!

Now we're set to start implementing inflation adjustment in the core OpenSpending platform. A huge thanks to all the economists, developers, data wranglers, and advisors for their help. July will be an exciting month!

### Blog migration

Another big change coming in July is a more standard blogging platform for OpenSpending. We have been using *[Jekyll](http://jekyllrb.com/)* to generate our blogs statically and serving those static pages via the OpenSpending platform. We decided to move our blog back to [WordPress](http://wordpress.com/). This will make blog contributions even simpler since many people are more comfortable with WordPress than markdown.

We're not quite there yet (look for this change in July) but we called upon our task force to help us migrate the content and get the blog up to speed. We launched a *IRC hack session* where we collaborated on a [script to migrate Jekyll content to WordPress](https://github.com/tryggvib/jekyll-to-wordpress/). The content has been migrated but there are some UI/UX tweaks we want to do before we launch our main blog as a WordPress blog.

If you know your way around WordPress and want to help. Let us know and we'll fill you in on what needs to be done.

### FarmSubsidy

In case you hadn't noticed we also launched and relaunched again the [FarmSubsidy project](http://farmsubsidy.openspending.org/) as part of OpenSpending. We initially launched an improved version of the project (after it was adopted by OpenSpending) on our servers but quickly noticed that we needed a dedicated server for the project.

So we took Farmsubsidy down for a couple of days while we sorted out the server issues and moved it to a dedicated server. After reloading the data onto the new server we were able to relaunch Farmsubsidy so that the user experience should be better than it was in the first few days and now you can really start investigating how the European Union subsidises farms.

### Thanks

As always there were loads of other changes and happenings in and around the OpenSpending project. We would love to get some help to achieve even more in the coming months and like before we want to give a shout-out to all those who helped us in June.

Thanks to **Michael Bauer**, **Gunnlaugur Thor Briem**, **Lucy Chambers**, **Velichka Dimitrova**, **Martin Keegan**, **Dan Lemon**, **Andy Lulham**, **Tom Morris**, **Prakash Neupane**, **OpenRotterdam**, **Florian Oswald**, **Daniel O'Huiginn**, **Anders Pedersen**, **Rufus Pollock**, **Niels Erik Kaaber Rasmussen**, **Joel Rebello**, **Todd D. Robbins**, **Nils Toedtmann**, **Stefan Wehrmeyer**, and **Guo Xu** for their contributions this month (there are probably a lot more who've contributed somehow to this month's features so sorry in advance if you're missing from the list).

<small>Image of window used for this blog posts is by [GemiTux](https://www.flickr.com/photos/gemitux/) on [Flickr](http://flickr.com), released under [Creative Commons Attribution, version 2.0](http://creativecommons.org/licenses/by/2.0/).</small>
