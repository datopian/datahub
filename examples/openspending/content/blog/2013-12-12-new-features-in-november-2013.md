---
redirect_from: /2013/12/new-features-in-november-2013/
title: New Features in November 2013
authors:
- Tryggvi Björgvinsson
---
It's so exciting to participate in the OpenSpending project. We continue to raise the bar when it comes to what we as a community can do and that's just what we did in November. The community is growing and achieving more (as you do when you grow) and this is what makes OpenSpending so exciting to be a part of right now.

![Image by epSos.de (cc-by 2.0)](http://farm9.staticflickr.com/8515/8474532085_6d010ee8d0_z.jpg "OpenSpending is global and local just like money")

### Translations

Sadly we haven't been putting much focus on translations in the last months but that changed in November. We put a lot of effort into internationalising (often  abbreviated as *i18n*), which means we put effort into making OpenSpending better at handling different global communities. The biggest effort would be marking strings as ready for translation, which we did. This had been done before but a lot of the strings weren't marked so we ended up with 150% more strings that needed translation.

The second step in the process is the localisation (often abbreviated as *l10n*), which means doing the adaptation to a specific region or culture. Again the biggest effort there are translations. Going through the strings we marked in the previous step and translating them into a specific target language (locale). The awesome thing is that, that's exactly where our community shines!

Japanese was the first complete translation (100% of all strings translated), not counting English. The most impressive thing was that the Japanese translation team finished the translations only five days after we pushed out the new strings! Bosnian was also quite impressive. It went from zero to more than half of the strings translated in a single day thanks to a single translator! Italian has been steadily getting more and more translations and now has the second most translated strings thanks to a translator who also does French. These all happened in November, just days after we pushed the new strings so it's going to be really fun to watch how we grow in translations in the coming months.

Translations are really important for a global project like OpenSpending. **If you want to help us reach as many people as possible** you can help us translate OpenSpending into your language. Just go to our [project page on Transifex](https://www.transifex.com/projects/p/openspending/) and offer help with translations into your language (or ask us to create your language if it isn't there already). When accepted, just jump in and start translating OpenSpending.

### Jinja2 migrations

One of the reasons we were able to push a lot of the new strings for translations was that we finished the migration to Jinja2. Back in September we wrote about how changes in July and August had caused OpenSpending to have two navigational bars. That was because we were in the middle of a transition from the [Genshi](http://genshi.edgewall.org/) template system to [Jinja2](http://jinja.pocoo.org/). Pages served with Genshi had a different navigational bar than those served with Jinja2.

We have now completed the migration so we're only serving a single version of the navigational bar on OpenSpending. Besides being less confusing for the user and improving *i18n* the Jinja2 templates are simpler for most developer which means we're now even more newcomer friendly than before (there's always room for improvement). We hope that this will drive more people to help us out developing and maintaining the the HTML output of OpenSpending.

**Are you good at or interested in creating web pages?** You can help us make OpenSpending in the browser work better for the users and look better. We use Jinja2 so it's easy as eating a pie to get started and help out. Take a look at our [howto hack](http://community.openspending.org/help/development/volunteer/) for pointers on how to dive in (or offer help).

### Measures and metrics

It's not enough to just have an easy to use template system and an engaged community. We also need to know what to change. That's why we decided to start watching you... no, not in the *NSA revelations* way. We just created some measurements to track how users use OpenSpending. What are they looking for and how do they get there? This can then feed into a site redesign to serve users of OpenSpending better, instead of just randomly changing things and hoping it's good.

We do, of course, have this sneaking suspicion that users go to OpenSpending to either find or upload spending datasets. That's why we also did slightly more than just track mouse clicks and site visits. We created a user scoreboard which is only available for administrators on OpenSpending. The scoreboard is pretty simple. What it does is see how many datasets users are connected to. This helps us analyse things like, are all dataset uploaded by an elite group of users (who might have some bias) or is there a good diversity of users uploading the datasets (the latter being more beneficial to OpenSpending). The scoreboard also shows us how many users are registered but still haven't uploaded any datasets. This is an indicator that people might find uploading datasets difficult (which we can then tackle).

So basically we're just analysing how people use the site to identify problems in order to address them and improve the experience for everyone.

### Community home

We already made our first change and we actually didn't need any analysis to do it because it was really straightforward and obvious that it had to be done.

Back in September, we finalised our community page when we renamed it from blog.openspending.org to community.openspending.org because that's what it is, the home of the OpenSpending community.

The problem was that community.openspending.org hadn't really been integrated into the OpenSpending platform at [openspending.org](https://openspending.org) so in November we finally did just that. We updated the links in the navigational bar to go to different community pages instead of serving content via [openspending.org](https://openspending.org) and we removed all content except the dataset management aspect and the front page from [openspending.org](https://openspending.org) and just redirect people to community.openspending.org instead.

So we're creating a better separation between the platform and the community. The community is much bigger than a single piece of software. We also updated the community.openspending.org site so that instead of serving the blog on the front page we now have a landing page that helps people find what they're looking for without having to guess where in the navigational bar on the community site it is.

The control of the community home is now more in the hands of the community itself instead of some developers. So now developers can now also focus more on improving the tool itself, instead of guiding community members through a technical maze of how to contribute documentation, blog posts or whatever the community as a whole wants to do in their cyberhome.

### Development community growth

The OpenSpending community is growing fast. One concern we have is that the developer sub-community, which hasn't been growing as fast (but still growing) won't be able to handle this growth efficiently which would be a big shame. So we are now going to try and reach out to prospective developers who might be interested in our mission and let them know about us.

In November we took a small step in that direction. We put up a profile for OpenSpending on [OpenHatch](http://openhatch.org/projects/openspending) which is a project that is *"dedicated to matching prospective free and open source contributors to communities, tools, and education."* There are a lot of interesting projects on OpenHatch so we have some competition on the site, but since OpenSpending has a mission to make the world better for everyone, we have a good chance of getting people interested. We are making efforts of being newcomer friendly. We just need some visibility.

**You can help us reach out to developers**. Do you know people who might be interested in developing OpenSpending? Let them know about us and help us get them engaged! You can direct them to our community or you can point them to [our OpenHatch page](http://openhatch.org/projects/openspending).

If you know about any other outreach programs where we can find prospective developers, let us know or help us get in there. We are newcomer friendly and we are an exciting project. This way we all put in a helping hand to help our community grow by helping our development community grow.

### Permissions API

On more technical notes, we created a new API resource to check for permissions a user has on datasets in OpenSpending. Checking for permissions might sound a little bit weird but this enables external tools to check if their users (who are also users on OpenSpending) have permission to create, read, update or delete a dataset *before* they do something. This can, for example, save a lot of bandwidth because the external tools can avoid downloading big datasets in vain because a user didn't have the right permissions.

We are already working on a project, called [os-upload](https://github.com/openspending/os-upload), which allows users to upload datasets on a different page which then sends the datasets onward to OpenSpending.

Currently this uses the API key of users to interact with the site on the users behalf (so that the datasets will be uploaded as the user, not the site). The API key is used to check for permissions and then it's used again to upload the datasets.

Note that you should *avoid* sharing your API key with anybody since the API key allows others to pretend that they are you. We will run os-upload as part of OpenSpending, wrapping it under an SSL certificate for secure communications. We're working on this now but until then we recommend you to test things out with a test account rather than your real account. Going via HTTPS (SSL certificates) is of course not the ultimate security we want but at least we'll mitigate the risk that somebody gets your API key and it's just good to have around.

**We need your help!**. If you know your way around authentication for external sites without giving out your credentials or API key (for example via [OAuth](http://oauth.net/) or another way) get in touch and help us make OpenSpending and external sites more secure.

### Enforced Security

Talking about security and passing API keys around, we decided to make HTTPS the default *and* only way of interacting with [openspending.org](https://openspending.org), just like we plan to do with with os-upload. In October we increased our security by adding SSL certificates and HTTPS to [openspending.org](https://openspending.org). In November we enforced it. If you go to **http**://openspending.org you will be automatically redirected to **https**://openspending.org and a secure communication channel established.

This way we can, with higher confidence, use API keys for authorisation and be less afraid that someone might be able to pretend to be someone else on OpenSpending. It's just all around better to have security by default instead of having it optional.

### Simplified API authentication

The enforced security allowed us to simplify the API authentication which was developed for the data loading API. If you wanted to load data via the API you had to use two API keys, one public and one secret. You had to sign your request with your private key which OpenSpending was then able to verify to be sure you were you.

With the enforced security you now only need one API key which you put into the request header (without doing any computations or processing) and OpenSpending can use that API key to look you up. Of course this is why it's important that you don't share your API key with anybody because that means they'll be able to pretend that they're you.

But now it's way simpler to load data into OpenSpending. Bring on the datasets!

### Taxman standardisation

We touched a lot of important aspects of software development that don't involve coding in November. Translations was a big thing but we also did documentation. The biggest effort in documentation was the first attempt to standardised how Taxman should work.

We created a page on the [Taxman wiki](https://github.com/openspending/taxman/wiki/Api-conventions) to discuss and try to find the common API for all jurisdictions. This is a first stab and trying to create this common API based on the jurisdictions we already have. We expect this to evolve over the coming months and in the end we'll have a simple, generic way to access all of the jurisdictions in Taxman.

As it says in the [Taxman README](https://github.com/openspending/taxman/blob/master/README.md):

> "At the moment we place no restrictions on what you return from the
> calculate function. That said, it is hoped that as we add more jurisdictions
> we will work out which parts of the API we can standardise. Consistency
> across jurisdictions is very important if TaxMan is to be useful, and at the
> moment we are relying entirely on contributors' discipline to ensure it."

We're now heading into the standardisation phase which is very exciting. **Do you want to help?** We need input about all jurisdictions so we can get this right. You can read through this to see if we're missing something important for your jurisdiction (or you can even implement the calculations for your jurisdiction according to the common API to see if it works). Just hop on to the [Taxman repo](https://github.com/openspending/taxman/) and dig in.

### Other Changes

Of course there are other changes we did in November. We, for example, updated READMEs to make the information a bit clearer for users and developers, created some documentation (on community.openspending.org) and worked a lot on the [os-upload](https://github.com/openspending/os-upload) project.

Remember that you can help develop OpenSpending on many fronts, be it the core [OpenSpending platform](https://github.com/openspending/openspending), [OpenSpendingJS](https://github.com/openspending/openspendingjs), [Taxman](https://github.com/openspending/taxman), [the satellite site template](https://github.com/openspending/satellite-template) or any other software project in the [OpenSpending project list](https://github.com/openspending/). Just have a look at our [OpenSpending issue tracker](https://github.com/openspending/openspending/issues) or our [OpenSpendingJS issue tracker](https://github.com/openspending/openspendingjs/issues), that's where most of the issues are being tracked. Feel free though to add features you think are missing in any project and become a contributor to the OpenSpending project.

### Thanks

**Everton Zanella Alvarenga**, **Nigel Babu**, **Maya Barisic**, **Lucy Chambers**, **Tajima Itsuro**, **Yoshihide Jimbo**, **kawando**, **Martin Keegan**, **Iwao Kobayashi**, **Elisabetta Lombardo**, **masanori.katsuragawa**, **Takano Mitsuhiro**, **Prakash Neupane**, **Takashi Nishibayashi**, **nyampire**, **高木祐介**, **Anders Pedersen**, **Rufus Pollock**, **Joel Rebello**, **rigg**, **Toshihide Sato**, **Hal Seki**, **Nick Stenning**, **tosseot**, and **William Waites**. This was quite a big month in terms of development help so there are probably a lot more who have contributed somehow to OpenSpending. Just let us know and we'll add you to the list.

<small>Image of different currencies used in this blog post is by [epSos.de](http://www.flickr.com/photos/epsos/) on [Flickr](http://flickr.com), released under [Creative Commons Attribution, version 2.0](http://creativecommons.org/licenses/by/2.0/).</small>

