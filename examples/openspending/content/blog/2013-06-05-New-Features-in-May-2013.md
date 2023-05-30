---
authors:
- tryggvib
redirect_from: /2013/06/New-Features-in-May-2013/
title: New Features in May 2013
---

![Image by Mosman Library (cc-by 2.0)](https://farm9.staticflickr.com/8205/8206356927_3d5c720658_c.jpg "Badges!")

This is perhaps not a very attention grabbing title for this post, but some cool new features have landed in OpenSpending this month. We're really proud of them so we thought we'd share them with you.

### Badges

We've got badges! OpenSpending administrators can now award badges to outstanding datasets. To begin with there are only a few badges but we foresee collaboration with organisations that want to give their approval to datasets. These organisations can do quality assurance on datasets originating from them but have been modified to fit better into OpenSpending (the badge would then say: *"Yes this is still the data we published"*). These organisations could also give badges to datasets that help their cause (the badge would then say: *"This dataset helps us reach our goal"*).

If you're representing an organisation and want to be able to give out badges, please [get in touch](http://openspending.org/about/contact.html).

If you're managing a dataset, find out which [badges you can get](http://openspending.org/badges) and start collecting!

### Show Analysis Results

After loading a source users can't really see if the load was successful. It may appear to be successful but that might be just because OpenSpending was able to download something.

To provide some kind of feedback OpenSpending now shows the results of the analysis it does on the data. In particular it shows the columns that it found. If there aren't any columns or the column names are weird, users might now catch it before something goes wrong.

### EU Cookie Compliance

This may not be a big thing for you and it might even be slightly irritating but for us this is really important. We want to follow the law and OpenSpending now does so by implementing the EU Cookie Directive (if you want to know about cookies being placed on your computer this is important to you too).

Users are now presented with a small banner that tells them about the cookies and offers them link to a page where they can read more about [our cookie policy](http://okfn.org/cookie-policy/).

### OpenSpending Contacts Map

There are many projects out in the world that work in some way with spending data. We want to be able to connect those initiatives together. They can attract new contributors, learn from other projects and spark new interesting projects (even in other countries).

To help you establish these connections or to find projects you are interested in we've put up an OpenSpending app on [apps.openspending.org/oscontactsmap](http://apps.openspending.org/oscontactsmap/). There you can see the world and find all of the projects that relate to OpenSpending in some way.

If your project isn't there, don't panic! Thera are lot of projects so we might have missed some of you. Please let us know about your project and we'll add it to the list right away. When we're sure we have most of the projects on the list we'll make this map more prominent on OpenSpending's main site.

### Satellite Template

Before May users had to fork [Where Does My Money Go?](http://wheredoesmymoneygo.org/) or some other site in order to create their own satellite site (a site that provides context to the data and analysis in OpenSpending).

In May we created a satellite site template so you can easily recreate sites like *Where Does My Money Go?* with a simple config file without having to remove a lot of context specific information.

Just fork [our satellite template repository](https://github.com/openspending/satellite-template) and start configuring your own satellite site.

### Other Changes

There are loads of other smaller changes we did this month. We went through all of the issues in our issue tracker that were labelled as *bug* and fixed them. We tried to make some instructions clearer. We made small headway in getting better IE7 compatibility and we now show the type of a dimension that has been created with the model editor.

### Want to contribute? We need code reviewers!

We're really proud of what we've achieved this month. There are a lot of upcoming changes in the pipelines (in the form of pull requests). Quality assurance is really important to OpenSpending so we don't add anything new to the platform unless it's been looked at by at least one other developer (this is called code review).

If you're interested in contributing to OpenSpending, code reviews are a good place to start. You get familiar with the code base and you can (and should) raise all kinds of questions (so if in doubt about anything, just ask the developers).

There's even a law in open source software (Linus' Law): *"Given enough eyeballs, all bugs are shallow"*. That means the more people do code review, the better OpenSpending will get. That's why we'd appreciate your help in getting some more quality code into OpenSpending. Look at the pull requests in our repositories on GitHub and comment, both if you see something fishy and if you don't!

**Interested in being a code reviewer? [Get in touch!](http://openspending.org/about/contact.html)**

###Data Clinics and Community Hangouts - going forward
A lot of great spending projects in the making are in the need of community support for tips on how to clean and upload the data.

For this reason we'll therefore begin to run bi-weekly Data Clinics - a community drop in for all kinds of technical troubleshooting you need in order to get working on OpenSpending. 
All you need to bring is your messy data, and you'll be able to ask the community on tips on how to tackle your spending data.

The first Data Clinic will take place **today Wednesday 5 June at 19:00 CET / 18:00 BST / 13:00 EDT** as chat via skype (ping: anpehej) or IRC #openspending. [Sign up here!](https://docs.google.com/a/okfn.org/document/d/1vx9oSJieuqfQ2xdBTyFSTmDRsPRenTrJLKJDo_ZP8z4/edit#)

With the introduction of the Data Clinic we'll now offering community activities every Wednesday - either as Data Clinic or Community GoogleHangout. We hope that you'll join some of the activities!

###Current community projects
Here are some of the projects currently in the works. Many of them could need a helping hand: 
- Felix is working on Andalusian procurement data. Data quality seems good, and would be interesting to compare with the data available in OpenTED.
- Cecilia and the investigative journalism team at IRPI has claimed the Italian structural fund data and will be working to add it to OpenSpending. They need help cleaning a few of the data fields so please get in touch if you can help! 
- Tarek would be interested looking at spending data from Egypt
- Pierre has helped scrape, clean and upload procurement data from Senegal to OpenSpending. He'll post on the OpenSpending blog soon. 
- Benjamin is working on the EU procurement data opendted.pudo.org
- Transactional spending data from the city of [Washington DC](http://openspending.org/dc-vendors-contractors) was added during theweekend as part of #Hackforchange. 

###Global Weekend on city spending data July 20-21 
The past months has seen strong growth in local spending projects with [86 cities mapped](http://apps.openspending.org/maps/). As we want to support and grow these initiatives we're asking if you'll join us to organise a global spending weekend to open city spending on July 20-21. The spending weekend will offer online trainings and support to your local group to help you get your project off the ground. 
Hiroichi (OKF Japan), Mor (Hasadna) and Adam (Open Budget Oakland) have already expressed interest in the idea, and we'd love to hear if you want to be involved. 

Have a look and add your self to the [planning document](https://docs.google.com/a/okfn.org/document/d/1Zh-TPxgMiFDrzk-rNJqL9CmCbbtlZmp2xjWlZ6T20TA/edit#heading=h.6416s7qbnyrt). 

### Thanks

Thanks to **Nigel Babu**, **Lucy Chambers**, **Martin Keegan**, **Anders Pedersen**, **Rufus Pollock**, **Stephen Russett**, and **Stefan Wehrmeyer** for their contributions this month (there are probably a lot more who've contributed somehow to this month's features so don't be sad if we forgot you, let us know and we'll add you).

<small>Image of badges used for this blog posts is by [Mosman Library](https://www.flickr.com/photos/mosmanlibrary/) on [Flickr](http://flickr.com), released under [Creative Commons Attribution, version 2.0](http://creativecommons.org/licenses/by/2.0/).</small>
