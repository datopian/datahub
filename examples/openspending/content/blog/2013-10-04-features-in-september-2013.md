---
redirect_from: /2013/10/features-in-september-2013/
title: Features in September 2013
authors:
- Tryggvi Björgvinsson
---
![Image by NCTRUCKINGITEMS (cc-by 2.0)](http://farm6.staticflickr.com/5305/5865630148_7c430641dc_z.jpg "Loading...")

Like we said in our last development update, September was going to be awesome. And boy oh boy did that come true. There were a lot of great features added to OpenSpending. Some of them we can safely say might change the way people use OpenSpending.

### Multiple measure aggregation

The *amount* measure is required in all datasets in OpenSpending but that does not mean that it has to be the only measure. You can add how many measures you like. For example, amount could show the amount actually spent and you could have another measure *budget* to show what was budgeted.

For some time now it has been possible to use another measure than amount when aggregating via the api. The only thing you'd have to do is add a url parameter *measure*, for instance *measure=budget* to aggregate over the budget measure instead of the amount measure (amount is default).

However there was a problem if you wanted to show the budget *and* the amount on the same page. You would have to make two requests to OpenSpending, one for the budget and another for the amount. This would make your site (or whatever you have that accesses the aggregation API) slower and adds extra processing to OpenSpending (since it now has to access this twice).

We have solved this! Now you can aggregate multiple measures in the same request. You still use the same url parameter (*measure*) and you separate the measures with a | just like you do with drilldowns: *measure=budget|amount*

### Broken terms of use

Sander van der Waal noticed something really bad about OpenSpending. When users register for an account on OpenSpending they have to agree to our terms of use. There's a link to the terms of use on the site but that link was broken and has been broken for some time. 

Does that tell us more about how many people actually read terms of use or has this been driving people away from registering? We can't know but if it is the latter then this has been fixed now. You can now actually access the terms of use and read them. So if you didn't want to because you couldn't see the terms of use but agree to them now that you can read them, please come and register.

### Timestamps in dataset.json

In August we added important dates to web pages for the datasets so that users can quickly see when a dataset was created or last updated and the time range of the dataset.

You couldn't access this from the API though. Well you can access the timestamps in the dataset by fetching the JSON at http://openspending.org/**a-dataset-id**/time.distinct.json and build the date range. But the timestamps for the dataset in OpenSpending, i.e. created and last modified, were not accessible via the API.

We have now added them to the dataset's json representation. So if you fetch the json at http://openspending.org/**a-dataset-id**.json you'll see an object called timestamps where you can access the created and last_modified timestamps.

### Cleanup of issue tracker

At our September developer meeting we discussed our issue tracker which had passed 100 open issues. We decided to move a few of them into OpenSpendingJS and take a stab at cleaning up any remaining issues. Mark Brough from [publishwhatyoufund.org](http://publishwhatyoufund.org) stepped up and helped us get the issue tracker into shape. We're now down to roughly 60 issues and we've tried to label them (there are still some unlabelled issues left).

Mark Brough actually suggested we should set ourselves a goal of having less than 50 (or even 30) open issues at a given time. That's a great goal and we should definitely aim for it.

**Do you want to help us achieve it?** Don't know where to start? We've labelled issues with *Volunteer: simple*, *Volunteer: medium* and *Volunteer: hard* in our [issue tracker](http://github.com/openspending/openspending/issues). Take a look at [how we hack on OpenSpending](http://community.openspending.org/help/development/volunteer) and start submitting pull requests. It's very easy and we're a very friendly newcomer community!

### Source control

When adding data to a dataset users add a source, analyse it, test it and then load it. The sources added can sometimes have errors in them, errors that are discovered in the analysis, testing, or the loading phase. This means that the source editor can get pretty cluttered.

We now added a possibility to do some source house cleaning. You can remove sources that haven't been successfully loaded into OpenSpending. The reason you can't remove a loaded source is that we can't be sure if we'll be able to access the source url again to find the right entries (watch out for our data package support which might solve this).

We also tried to improve the user interface a bit. You usually could only work with the source you added last. We now allow you to work with (and therefore delete) older sources... and we have **shiny buttons**!

### Inflation adjustments

A lot of users want to be able to compare datasets between years. How much is my government spending on health care this year compared to 5 years ago? This is a common use case but if one looks closely, all across the world governments seem to be spending more on everything than the previous years (well... it depends). The point is, because of inflation everything goes up and skews the numbers. You can't really compare data from now with data from 5 years ago unless you adjust for inflation. After taking inflation into account you might see that your government is actually spending less on health care than it seemed like.

Since this is such a commons use case we felt it was quite important to support inflation adjustments in OpenSpending and now we do! Woah! This is huge! We can do it on an entry basis and for aggregations. The only thing required is for you to add an inflate URL parameter with the date you want to inflate everything against, *inflate=2012-04-22*, so that all amounts will be represented as they were valued at that particular date.

Now, there's a huge catch to this. Inflation adjustment in OpenSpending is far from perfect. We don't have good enough data to do proper adjustments because data is released infrequently and valued differently across countries. The data is also quite granular. The date 2012-04-22 will actually inflate against 2012-01-01 because we only have annual inflation data and that's incorrect. We only get the year 2012 in the data we're using so we have no idea if it's January 1 or December 31 and that's a whole year. So for now we just do the same thing as OpenSpending. When we only have year as value we default to January 1 (even though it's probably more likely that the value applies to the end of the year).

Since data is released a long time after it has been measured we can't even do realtime data. So you won't be able to inflate to the value of money you understand (the current value). You'll have to use data from last year and mentally try to remember how money was valued then, which is problematic -- do you remember the price of bread a year ago?

But even if we cannot represent the value at the current price we can now compare multiple years correctly, by adjusting for inflation (unless the data is so recent we don't have inflation data for it). The remaining problems can be fixed since they just boil down to bad data being published. We need better data and we need it now!

**We need your help!** We manage our CPI data, which we use to do inflation adjustment, in a special [data package repository](http://github.com/datasets/cpi). You can help us maintain it. Can you lobby for, find, and add better and more granular data for your country or other countries? If so you would not only help users of OpenSpending, but users of CPI data all over the world (who would like to use this data package).

### Rename visualisations

About a year ago, J. Félix Ontañón reported an issue where he wanted to be able to rename the visualisations on openspending.org. It took a while but we have now fixed this (sorry for taking so long fontanon).

We actually did more than what was asked for. You can update the name of the visualisation, the description and the visualisation itself. So if you've added a new year to your dataset and the visualisation is for an older year, you can update it to show the most recent year.

The only thing you have to think about is that there might be others that have embedded your visualisations in blog posts or web pages. Now you become a maintainer like us. With OpenSpending we always have to think about how changes affect users of the database and if web sites that rely on OpenSpending might stop working. You have to think about this as well: Will an update to your visualisation break pages that embed it?

### Archive a dataset

Another issue reported about a year ago got fixed as well. Miro Scibrany asked for a feature to make a copy of a complete dataset. This is now possible but only if you have system administrator access to the server (this uses the ostool command that comes with OpenSpending).

You can use the same command *ostool* to load an archived dataset into OpenSpending so this is a really handy way to move complete datasets around. The problem is that it's not publicly available but we don't see this as something everyone wants to do since this mostly just helps people who have a development instance running get data from the central database without too much difficulty (and these people are probably already in touch with the core team that can get datasets for them).

If in the future we ever decide to do federation of data we at least now have a working solution to do it which is exactly what the loading API was built around (a working solution). The loading API you ask?

### Loading API

Yes. The Loading API. The biggest improvement to OpenSpending this month came from [CERN](http://cern.ch) (it's so awesome to say that our loading API came from the same place as the world wide web). Alberto Rodriguez Peon did a great job with help from fukami and Jiri Kuncar to add a possibility to add and update datasets via the API.

This means that you can now create a script that can scrape data from some spending sources you know and immediately upload it into OpenSpending without having to go through the OpenSpending web page (unless you desperately want to see the fancy buttons in the source controls). This is just awesome news for everyone who add data to OpenSpending. You can automate it! Just write a script, sit back, relax, and have a coffee (or something).

Interested in the loading API? You can see how simple it is in [our documentation](http://community.openspending.org/help/api/loading/).

One thing to note is that Alberto Rodriguez Peon developed a authentication mechanism for the API to prevent others from intercepting and gaining access as someone they're not (by getting their API key). This makes everything slightly complicated for the users (not too complicated). Currently this is the simplest way to do it while remaining secure but we've already decided how we're going to make it simpler but still have it secure so you can expect a simpler authentication pretty soon (there's only so much you can do each month) but the loading API itself won't change so you can start using it now.

**If you write loading scripts let us know!** Let's not re-invent the wheel over and over again. If you've created a script make it free and open source so others will benefit (and others might then improve it for you when we get the simpler authentication).

### Other Changes

As always there were smaller changes made to OpenSpending in September (which was a month of huge improvements). We for example renamed blog.openspending.org to community.openspending.org, improved our documentation on the site, and much more.

Remember that you can help develop OpenSpending. Can we top September? If you help us then we have a chance. It's going to be a challenge keeping this pace so come and help us out. Just have a look at our [OpenSpending issue tracker](http://github.com/openspending/openspending/issues) or our [OpenSpendingJS issue tracker](http://github.com/openspending/openspendingjs/issues).

### Thanks

Thanks to **Neil Ashton**, **Vitor Baptista**, **Michael Bauer**, **Mark Brough**, **fukami**, **Jiri Kuncar**, **J. Félix Ontañón**, **Anders Pedersen**, **Alberto Rodriguez Peon**, **Rufus Pollock**, **Miro Scibrany**, **Nick Stenning**, **Marco Voormolen**, and **Sander van der Waal** for their contributions (there are probably a lot more who've contributed somehow to OpenSpending so don't be sad if we forgot you - it's a bit hard to manage, just let us know and we'll add you).

<small>Image of men loading a truck used in this blog post is by [NCTRUCKINGITEMS](http://www.flickr.com/photos/oldtrucks/) on [Flickr](http://flickr.com), released under [Creative Commons Attribution, version 2.0](http://creativecommons.org/licenses/by/2.0/).</small>

