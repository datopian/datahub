---
redirect_from: /2013/11/new-features-in-october-2013/
title: New Features in October 2013
authors:
- Tryggvi Björgvinsson
---
Compared to September, October may seem a less active month in terms of development. However, though there were fewer features in October they were bigger and took longer to develop. Let's just dive in.

![Image by CarbonNYC (cc-by 2.0)](http://farm4.staticflickr.com/3245/2294144289_a54db90ac5_z.jpg "Security without obscurity")

### Increased security

One of the most important features we added in October was SSL certificates, or access via HTTPS. This means we can now encrypt communications between you and the [openspending.org](http://openspending.org).

When you use websites you usually send things like cookies and headers in plain, text (visible for those who want to see it). Cookies are for example used to store who you are and let the server know. If these are sent in plain text, other people can pretend that they are you. Remember how [Firesheep](http://codebutler.com/firesheep/) was used to gain access to people's accounts on Facebook, GMail, etc.?

When using our API users can authenticate via the headers they send. When people from CERN added the Data Loading API to OpenSpending back in September they wanted it to be more secure, so instead of just sending your API key you had to use a private api key to sign your request. If we hadn't done that, other people would have been able to just grab your API key from the plain text header and then start uploading data as you which could cause you some problems.

With HTTPS all that gets encrypted so it'll be harder for those bad people to pretend they are you (and probably not worth the effort since they'd have to break the same security measures as online banking uses).

Now this is not perfect yet. We don't enforce the use of HTTPS yet so you will have to ask [openspending.org](http://openspending.org) to serve you the content over HTTPS. We are preparing to enforce traffic over HTTPS in November so you can be secure without even thinking about it (you actually should never stop thinking about security, but this will make your life easier). Until then you can use browser plugins like [HTTPS Everywhere](https://www.eff.org/https-everywhere) that try to use HTTPS first.

When we have the enforced HTTPS we will fall back to the old version of the API authentication because the communications will be secure enough to drop your API key into the header without compromising your account. Easier and more secure times ahead.

### Faster dataset index

One of the features we introduced [in July and August](http://community.openspending.org/2013/09/features-in-july-and-august-2013/) was a dataset page. The reason for it was that it took a long time to load all of the datasets in OpenSpending so when users clicked on the Datasets link in the navigational bar, nothing happened (even though behind the scenes the browser was just waiting for a response).

We decided to go for a quick fix back in July and August and redirect people to a specific dataset page instead of doing things behind the scenes. That way users would at least see that the browser was working. We also acknowledged that this was not the best solution and invited you to help us out.

We're now proud to say that the dataset page has been improved. We're still using the dedicated dataset page *but* we have put it behind a cache so it's way faster. We went from the 15 seconds (and up to 24 seconds) measured down to around 0.3 seconds! That's an awesome improvement and if you've ever doubted caching, this is one good reason to use it.

Now there are still tweaks that we could do. For example when the dataset list updates (e.g. when somebody publishes a new dataset) we need to regenerate the cache. We don't do that automatically at the moment so the first user to visit the dataset page will have to wait all those seconds for anything to happen. We would like to autogenerate the new cache so you'll never have to wait for seconds.

There are two approaches we could take. One would be to find the bottleneck in the dataset index functionality itself, the other would be to regenerate on dataset publication and serve the older version until the new one is ready.

**Would you like to help us out?** You can offer your help as both a code reviewer or a coder. We can help you get started. Just let us know you’re interested on our [developer mailing list](http://lists.okfn.org/mailman/listinfo/openspending-dev) or our IRC channel, *#openspending on irc.freenode.net*!

### Bosnian budget analysis

For quite some time we have been working on a satellite site, similar to [Where does my money go?](http://wheredoesmymoneygo.org) for Bosnia and Herzegovina, [Budzeti.ba](http://budzeti.ba). In October we finally launched the Bosnian site! If you look at these pages (Where does my money go? and Budzeti.ba) you'll see similar functionality but there are a lot of special things about Budzeti.ba.

The country is divided into three entities (they actually have rotating presidents from these three entities) and one of these entities is further divided into cantons. The tax system is different in each of the three entities and people look at salary and taxes differently there than in the United Kingdom.

So we had to make some big changes to the daily bread visualisation, which in their case became a tax calculator (not showing the daily taxes, but just how the taxes are split). We took the chance and redid how we created the colours in the visualisation so the bubbles now follow the same colour scheme as in the bubbletree (on *Where does my money go?* all of the bubbles were purple).

We also commented the code and hopefully made things more simple for those who want to put up a daily bread visualisation on their site. If you're interested in the code behind the page, it's hosted as a github page and the code is accessible from [that repository](http://github.com/openspending/budzeti.ba).

**Are you setting up your own satellite site?** Join the [developer mailing list](http://lists.okfn.org/mailman/listinfo/openspending-dev) or our IRC channel, *#openspending on irc.freenode.net* and we can help you out if you run into some problems.

### Other Changes

As always there were smaller changes made to OpenSpending. These other changes were mostly related to the three big changes mentioned above. Things like restructuring the code around the caching mechanism, moving assets behind a CDN (content delivery network), new taxman jurisdictions (actually added a while back) and preparations for the new OpenSpendingJS visualisation library.

Remember that you can help develop OpenSpending on many fronts, be it the core OpenSpending platform, OpenSpendingJS, Taxman, the satellite site template or whatever. Just have a look at our [OpenSpending issue tracker](http://github.com/openspending/openspending/issues) or our [OpenSpendingJS issue tracker](http://github.com/openspending/openspendingjs/issues), that's where most of the issues are being tracked. Feel free though to add features you think are missing in any project and become a contributor to the OpenSpending project.

### Thanks

Thanks to **Jiri Kuncar**, **Alberto Rodriguez Peon**, **Joel Rebello**, and **Nick Stenning** for their contributions (there are probably a lot more who've contributed somehow to OpenSpending so don't be sad if we forgot you - it's a bit hard to manage, just let us know and we'll add you).

<small>Image of padlock used in this blog post is by [CarbonNYC](http://www.flickr.com/photos/carbonnyc/) on [Flickr](http://flickr.com), released under [Creative Commons Attribution, version 2.0](http://creativecommons.org/licenses/by/2.0/).</small>

