---
redirect_from: /2014/01/new-features-in-december-2013/
title: New Features in December 2013
authors:
- Tryggvi Björgvinsson
---
Happy New Year OpenSpending! The last month of 2013 was exciting. Even though the community took some time off around the holidays we still managed to squeeze in some really great developments and some big releases.

![Image by mattcornock (cc-by 2.0)](http://farm8.staticflickr.com/7440/8801652469_0ca89fa40c_z.jpg "We have bar charts!")

### Commandline loading

Our loading API got some attention this month when one community member wanted to load data into OpenSpending directly from the commandline. That caused some problems so we needed to do some modifications, both to our documentation which wasn't clear enough and also some code changes.

After those changes we were finally ready for commandline loading with the help of the wonderful [cURL](http://curl.haxx.se/) software. How you may ask. It's as easy as doing:

    curl -X POST -H "Authorization: ApiKey <your-api-key-here" https://openspending.org/api/2/new --data "csv_file=<url-to-your-csv-file-here>" --data "metadata=<url-to-your-model-file-here>"

If you have a lot of similar data to upload you can now script it with a simple commandline call like that (or a similar one from your favourite scripting language).

Just like the community member said when we finished:

> "Time to load some data..."

### Translations

We continue to provide better international support to our users. In December, two new languages went up to 100%: Nepali and Russian. The teams behind those translations did a great job. The Nepali translation went from zero to complete translation in only a few days while the Russian had slightly bigger problems. For example, they didn't have a Russian word for *dataset* (which is a pretty important term in OpenSpending). The Russians are even taking a step further and reviewing the translations to ensure the quality of the translations. This is a precedent other translators can take up, even though we won't enforce it.

Other climbers on the translation list in December were Czech, Italian (both up to over 60%), Indonesian which is not far from surpassing German (which had been completely translated before we uploaded the new strings back in November) and French, which is not far away from Indonesian.

So, we can start to get excited about some more complete translations soon. Will it be one of the more recent translation teams, one of the older teams, or a completely new language -- never before seen in OpenSpending? **You can help us reach as many people as possible** by helping us translate OpenSpending into your language (if it isn't available in it yet). Just go to our [project page on Transifex](https://www.transifex.com/projects/p/openspending/) and offer help with translations into your language (or ask us to create your language if it isn't there already). When accepted, just jump in and start translating OpenSpending.

### OpenSpending visualisation library

Probably one of the bigger changes in December was what we did to OpenSpendingJS, which we use for our visualisations. We took the first official step in our move away from the *bunch-of-javascript-code* approach to versioned releases of a javascript visualisation library.

This means that we build a version of the library and you can just drop that into your web page and be certain that it won't change in the future. This frees us from the problem of not being able to take OpenSpendingJS into new directions. Another big change this brings with it is a clearer distinction between OpenSpending core javascript and OpenSpendingJS visualisations. The previous way to add a visualisation was weird. Either you added it into the OpenSpending core visualisation builder or made it available outside it in a way developers had to grok the whole project to be able to use some visualisation.

Now we've made it as easy as possible to add visualisation based on OpenSpending to your sites, drop in the javascript file and create a beautiful visualisation with a simple div element. Want to create a treemap for your dataset? Just do this:

<div class="treemap" data-dataset="<your-dataset-id>" data-drilldowns="<first-drilldown>,<second-drilldown>,
<third-drilldown>"></div>
Want more configurations of your treemap. You can also create these elements with a jQuery extension call:

    $('#id-of-div').treemap({/*configuration object*/});

This also hopefully makes it simpler to contribute new visualisations to OpenSpendingJS. Just follow how all of the other visualisations are doing things by looking at the code in *src/visualisations/*. They're built as jQuery extensions and are well commented.

We've already made two bigger releases (0.1.0 and 0.2.0) and one bugfix release (0.2.1) so you can expect a lot of activity around these in the future. **Want to help out?** Just dive in and help us mold and improve OpenSpendingJS. One thing we want to do is clean up the older code a bit, perhaps package it up in one release and then just remove the code. We won't hit version 1.0 until at least when we've done that.

### OpenSpending WordPress plugin

Another thing the new approach to creating the visualisations in OpenSpendingJS as a library allows us to do is create CMS plugins for our visualisations... and that's exactly what we did. We released our WordPress plugin into the wild. We started work on it a while back but now, with release 0.5, we think it's usable to the public.

First of all it includes the new OpenSpendingJS library (version 0.2) and we can easily update it with new releases of the OpenSpendingJS library. The other reason is that we submitted it to WordPress and got approved so we'll be adding it as an official plugin, installable from any WordPress instance in the world with a click of a button (we have yet to upload it, but that's going to happen really soon).

The WordPress library uses the new visualisation rendering technique by creating divs with the visualisation configurations. We try to standardise the input for all visualisations to focus more on ease of use instead of configurability. If you're configuring the visualisations a lot, we believe you'll know how to add a javascript file to your page and call it directly. For some users, ease of use is more important and that's where the WordPress plugin comes in. Interested in how it works? Take a look at [the documentation](https://github.com/openspending/openspending-wordpress-plugin/blob/master/docs/user-interface.md)

This is yet another software package we're maintaining as part of the ever-increasing arsenal of OpenSpending tools. **That's why we need your help!** Do you know PHP/WordPress? Help us improve and maintain the WordPress plugin. It's quite simple code. Go take a look at [the repository](https://github.com/openspending/openspending-wordpress-plugin).

### Bar charts

One thing which finally got released with the new OpenSpendingJS library after having been around for a long time in the code branch containing the new library set up is bar charts. Yes, we now have bar charts! The bar chart implementation that we had in that branch was developed to present time series only, but before releasing the first version of OpenSpendingJS they got a face lift. They can now show time series if you include time in your drilldowns but they can also show COFOG categories (with our well known icons).

This got added into the OpenSpending WordPress plugin discussed earlier so you can easily create the bar charts now, either using OpenSpendingJS directly or the OpenSpending WordPress plugin. Yay!

### Inflation support in visualisations

A while back we implemented inflation support in OpenSpending. This has only been accessible to those who know about it but with the release of OpenSpendingJS version 0.2 we have added support for inflation adjustments. This is especially important when creating time series with the new bar charts since that compares data across history and each amount is valued differently.

Inflation adjustment is done automatically in the OpenSpending WordPress plugin where we try to inflate to the value of the year before the current year. In the case where this fails, for example if there is no inflation data available (e.g. when showing budgets for future years or just if the country hasn't got good data) we don't do the inflation adjustments.

In OpenSpending this is done using the *inflate* configuration where you define the target year you want all amounts to be inflated to.

### Flakes

A while back we created three issues with focus on improving the code readability and speed of OpenSpending. These issues were the results of running a python source code checker, flake8 (which is just a wrapper around other source code checkers). The issues all touched upon three different checkers, one was for pep8 compatibility (coding convention), another was for pyflakes (unneccessary imports) and the third was about McCabe's complexity (too complicated methods).

Running these checkers on the OpenSpending code base gave us a lot of errors, i.e. areas for improvement. Near the end of the year a community member decided to start doing something about it, especially the flakes errors (is there anything better to work on than flakes in December with snow flakes all around us... well if it's snowing outside).

There were some flake errors left unfixed because they caused test failures so we need slightly more development effort to fix them but we still fixed a lot. The community member that contributed the fixes is a python beginner and will use this to learn more about python. This is just great because this shows that we truly are the newcomer friendly community we want to be. You can join and improve your skills while you work on something that can change the world!

**Want to contribute?** The three issues are still open for volunteers. You could for example work on the [pep8 errors](https://github.com/openspending/openspending/issues/691). Nobody has called dibs on that one.

### Other Changes

There were of course some other changes we did in December like swapping out a footer link to YourTopia for [Spending Stories](http://spendingstories.org/). We still don't think we've done Spending Stories enough justice on the page so we'll be looking into making it more prominent. If you haven't checked that project go to [http://spendingstories.org](http://spendingstories.org) and have a look around.

Remember that you can help develop OpenSpending on many fronts, be it the core [OpenSpending platform](https://github.com/openspending/openspending), [OpenSpendingJS](https://github.com/openspending/openspendingjs), [Taxman](https://github.com/openspending/taxman), [the satellite site template](https://github.com/openspending/satellite-template) or any other software project in the [OpenSpending project list](https://github.com/openspending/). Just have a look at our [OpenSpending issue tracker](https://github.com/openspending/openspending/issues) or our [OpenSpendingJS issue tracker](https://github.com/openspending/openspendingjs/issues), that's where most of the issues are being tracked. Feel free though to add features you think are missing in any project and become a contributor to the OpenSpending project.

Don't know where to start? We've highlighted some stuff on our [OpenHatch page](http://openhatch.org/projects/openspending).

### Thanks

**agonar**, **Neil Ashton**, **Nikesh Balami**, **Vitor Baptista**, **Mark Brough**, **Sukma Budi**, **Lucy Chambers**, **Pierre Chrzanowski**, **Iván Cruz**, **Manish Dangol**, **DarisLi**, **inxaoc**, **jbricetetka**, **Martin Keegan**, **kshitizkhanal7**, **Friedrich Lindenberg**, **Elisabetta Lombardo**, **M2M**, **Leandro Martelli**, **Alexey Medvetsky**, **michalskop**, **Randy Moore**, **Prakash Neupane**, **Nela**, **nichtsistwahr**, **nkissel**, **Olga Parkhimovich**, **Anders Pedersen**, **Rufus Pollock**, **Bansaj Pradhan**, **JanaSekaninova**, **Nick Stenning**, **rajansilwal**, and **Marco Voormolen**.

The community contributions continue to grow so this list is getting difficult to compile and there are probably a lot more community members who have contributed somehow to OpenSpending. Just let us know and we'll add you to the list.

<small>Image of bar chart sketch used in this blog post is by [mattcornock](http://www.flickr.com/photos/mattcornock/) on [Flickr](http://flickr.com), released under [Creative Commons Attribution, version 2.0](http://creativecommons.org/licenses/by/2.0/).</small>

