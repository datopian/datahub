---
redirect_from: /2013/09/features-in-july-and-august-2013/
title: Features in July and August 2013
authors:
- Tryggvi Björgvinsson
---
We owe you a lot of development updates. Both July and August (and it's well past middle of September now). September is shaping up to be an awesome month, but more on that later (since there is still room for more awesomeness). In this post we'll be sticking to the highlights of development for July and August.

![Image by Alan Cleaver (cc-by 2.0)](http://farm4.staticflickr.com/3071/2661425133_1328692483_z.jpg "Time span")

### Front Page Changes

Let's start with one of the reasons it took so long to get write this blog post. In July and August we started the work of migrating our blog from Jekyll to WordPress. Most of you have probably noticed this but it meant that we had two blogs running at the same time. Our main blog which ran at [community.openspending.org](http://community.openspending.org) (at the time it was blog.openspending.org) and then we had another, outdated version running on our front page.

This setup was slightly embarrasing so we had to fix it and we did. We changed our front page so that it now shows *calls to actions* instead of showing a blog since we felt that this would better represent what people visiting [OpenSpending.org](http://openspending.org) would be looking for.

### Dataset Page

The dual-blog confusion isn't the only embarrasing thing about OpenSpending. The number of datasets in OpenSpending has grown spectacularly in the last few months and an irritating bug popped up. We aren't caching the datasets page properly which means that it takes *ages* (more like around 15 second) to generate a list of all datasets.

This meant that when you clicked on the dataset link in the navigation bar nothing happened for about 15 seconds, and to most if not all people that looked like OpenSpending was broken. What was really happening was that in the background we were generating the list of datasets, but nothing seemed to be happening since this was all being done via AJAX (in the background with no status updates to the browser).

We got a fix contributed that bought us some time where instead of doing everything in the background via AJAX, the link in the navigation bar now takes you to a web page with all of the datasets. It still takes about 15 seconds to generate the dataset but at least the browser gives users feedback (that it's still loading the page).

This isn't the best solution. For example, an remaining issue is that the map on the front page which is generated with the AJAX thing doesn't show for 15 seconds. We really should fix the dataset list generation issue. It all boils down to doing caching properly.

**Would you like to help us out?** All help with this issue is appreciated! We need to take a hard look at how we do caching and improve that to make OpenSpending faster and better for you, the users. You can offer your help as both a code reviewer or a coder. We can help you get started. Just let us know you're interested on our [developer mailing list](http://lists.okfn.org/mailman/listinfo/openspending-dev)!

### Overwrite Drilldown Behaviour in Treemaps

July and August haven't only revolved around embarrasing things for OpenSpending. There were a lot of awesome things that got implemented and deployed in July and August as well. One of those things was the possibility to overwrite drilldown behaviour in treemaps. Yes this is a complicated description but it's a really important and cool feature.

[OpenBudgetOakland](http://openbudgetoakland.org/) is an awesome satellite site powered by data in OpenSpending and our visualisations (and mixes it with more interesting stuff in a cool way). The team behind the site wanted to give their users the possibility to comment on and share specific drilldowns in the treemap, and give their users some breadcrumbs so they could get back to previous levels.

For this they needed to change the treemap so they could overwrite the default drilldown behaviour. This change has now found its way back upstream and is part of OpenSpending. So all you satellite site maintainers out there! You can now do the same thing as OpenBudgetOakland!

If you want to add breadcrumbs and share locations you can do it in the same way as OpenBudgetOakland. The magic happens in [lines 47 to 66 of their main javascript file](https://github.com/adstiles/openbudgetoakland/blob/gh-pages/javascripts/main3.js#L47-L66) where they set the *drilldown* context variable to a self-defined function. You will also have to look at the preceding lines which generate the breadcrumbs based on the urls (since the magic is actually just about redirecting users to another page when drilling down into the treemap).

### Public Profile Page

Users of OpenSpending also now have a public profile page on [openspending.org](http://openspending.org). On the profile page you can now add your twitter handle and choose whether or not you want your email and/or your twitter handle to be visible to the general public (not only OpenSpending administrators).

This makes it far more easier to get in touch with users who are managing interesting datasets (for example if somebody wants to help or meet up). User identity is also more visual since we now show the user's [Gravatar](http://gravatar.com), based on the user's email address.

We also did some minor changes to the navigation bar so that you can see your identity more clearly and the navigation bar isn't as cluttered. Click on your username to access either your dashboard or your settings.

After you log in you're taken to your new dashboard (profile page) and besides the old information which was shown in the old dashboard, and the email and/or twitter handle, we now also show a *Import a dataset* button so you don't have to go through those 15 seconds of loading a dataset list just to upload a new dataset (we need your help to fix it!)

Speaking of help. There is a hidden embarrasing *bug* in the new navigation bar associated with the new profile page. We have since this spring been migrating from [Genshi templates](http://genshi.edgewall.org/) to [Jinja2 templates](http://jinja.pocoo.org/). We're not done yet and the changes to the navigation bar only affect the Jinja2 templates. So sometimes on OpenSpending you'll see the old navigation bar. We really need to finish the migration. There's really not much left to do.

**Do you have any html skills?** If so, you can help us finish the migration from Genshi to Jinja2 so that it'll be more easier to work with OpenSpending's templates *and* users won't be presented with two versions of the navigation bar, depending on where they are on the site.

### Data Range

Are you interested in a particular dataset? Do you want to know if it gets updated? Maybe you're looking at a dataset and want to quickly see the time period for the data or when it was last updated?

OpenSpending now shows important dates for a dataset. When looking at the entries for a dataset you can see at the bottom the time span for all entries (date of the earliest entry and the date of the latest entry).

Also on the about page for the dataset you can now see the date when it was created and the date when it was last updated. Note that these are dates recorded for when things are worked on in OpenSpending, the entries time span is for the dates in the dataset itself. Two different things, but two important things when you're interested in some spending data.

### Dailybread in Satellite Templates

Keen readers might be thinking: "Wait, hasn't dailybread been in the satellite template since the beginning". The answer is: "Yes". However the version which has been in the template since the beginning was kind of useless. It really only worked if you wanted to build exactly the same dailybread as was used on [Where Does My Money Go](http://wheredoesmymoneygo.org/) so that doesn't sound much like a template.

The big change is that the satellite template can now support a non-UK dailybread visualisation. The options of the dailybread visualisation can be overwritten and used in the template. Hopefully this will lead to many more interesting satellite sites.

### Taxman goes around

The dailybread fixes to the satellite template mean little to nothing if [Taxman](http://github.com/openspending/taxman/) isn't updated. So if you want to create a dailybread visualisation for your country you still need to add the tax calculations. In July/August we saw two new countries added to Taxman. *Bosnia and Herzegovina* (with all three of their entities which are taxed differently) and *Japan* (which also introduced a better quality assurance, build process and tests, to Taxman.

Taxman is now up to 6 jurisdictions so there's still a lot of work left to do there. Is your jurisdiction missing? **You can add it to Taxman**. Just follow one of the six jurisdictions to see how it's done. It's easy!

### Other Changes

As you can see there were a lot of big changes to OpenSpending in July and August. There were many more changes, like for example the awesome OpenSpending icons page which is available at http://jmblog.github.io/openspending-icons/ (also linked from the OpenSpendingJS README). Some deprecated functionality was replaced in OpenSpendingJS meaning that we now conform to more recent versions of libraries we use.

Remember that you can help develop OpenSpending. This is a community project and the software and all of its eco-system is only as strong as we are together.

### Thanks

Thanks to **Neil Ashton**, **Vitor Baptista**, **Michael Bauer**, **Tony Hirst**, **Yoshihide Jimbo**, **Andy Lulham**, **Prakash Neupane**, **Anders Pedersen**, **Adam Stiles**, **Marco Voormolen**, and **Kenan Zahirovic** for their contributions these two month (there are probably a lot more who've contributed somehow to OpenSpending so don't be sad if we forgot you - it's a bit hard to manage, just let us know and we'll add you).

<small>Image of clocks used for this blog posts is by [Alan Cleaver](http://www.flickr.com/photos/alancleaver/) on [Flickr](http://flickr.com), released under [Creative Commons Attribution, version 2.0](http://creativecommons.org/licenses/by/2.0/).</small>

