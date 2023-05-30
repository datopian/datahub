---
redirect_from: /2014/05/meet-openspending-version-0-13-0/
title: Meet OpenSpending version 0.13.0
authors:
- Tryggvi Björgvinsson
---
This is going to be a slightly technical post (and has already been posted to the <a href="https://lists.okfn.org/mailman/listinfo/openspending-dev">developer mailing list</a>), but still it's an important change so everyone is encouraged to read it. If you don't understand something, then that's just fine, it probably does not have anything to do with you and you can skip it.

For a long time we have had version 0.11 of OpenSpending (since October 2011). We then for a short time had a version 2.0 alongside our 0.11 (we had not reached 2.0 so it was kind of confusing, but it snuck in with the re-theme of <a href="http://docs.openspending.org">our docs</a> back in January -- 2.0 came in according to the python convention while OpenSpending (version 0.11) had its own convention).

This has all now been corrected and we redid how versions are handled (this happened about a month ago). We now do versioning as recommended by <a href="https://en.wikipedia.org/wiki/Zooko_Wilcox-O%27Hearn">Zooko</a> (probably best known for <a href="https://tahoe-lafs.org/trac/tahoe-lafs">Tahoe-LAFS</a> and <a href="https://en.wikipedia.org/wiki/Zooko%27s_triangle">Zooko's Triangle</a>). This is a nice mix of the two conflicting versions we had so this confusion should not happen again.

While making those changes and removing the erroneous 2.0 I decided it was time to bump up the version to version 0.12.0 without announcing anything per se. Versions aren't as big of a deal in our continuous deployment setup (meaning we deploy changes as soon as they're ready) so nobody is really looking at the versions.

But that's not entirely correct. Versioning, when done properly, can help both users and new contributors (and ourselves) better understand what is happening on the project and allows us later on to introduce backwards incompatible changes in a way that we can prepare users and contributors for (this is something we should always avoid, but still a safety pin worth having). Perhaps most importantly, it helps us plan for the future with milestones. What do we want to see in version 1.0.0 or 1.5.0 etc.?

We'll be using the <a href="http://semver.org/">Semantic versioning system</a>, introduced by <a href="https://en.wikipedia.org/wiki/Tom_Preston-Werner">Tom Preston-Werner</a> (who created Gravatar and is one of the founders of Github). The versioning syste is a convention had been used before by numerous projects, but never officially with explicit meaning like what Tom did. In the past it was more of a <em>project-members-decided-what-the-numbers-between-the-dots-mean</em> basis).

In this versioning system we have the <strong>&lt;major&gt;.&lt;minor&gt;.&lt;patch&gt;</strong> where <em>major</em> versions are backwards incompatible, <em>minor</em> are compatible changes, and <em>patches</em> are bug fixes etc (goals along the way to our next minor/major version).

...and with that I'm going to introduce backwards incompatible changes in a minor version by introducing version 0.13.0 (oh isn't it wonderful how you can break rules as soon as you set them). OpenSpending version probably won't update that frequently in the coming months, but as more contributors jump on board and more pull requests start pouring in we'll get closer to the open source development mantra: "release early, release <strong>often</strong>".

<strong>USERS HEADS UP</strong>: This is the important thing for you to know. We are going to have versions and as long as the number in the middle, or the last numbers change, you'll just be seeing a better OpenSpending platform. When you see the first number change you'll have to watch out. Things you expected to work might not work. Don't worry though these first number editions (major version) will not be thrown on you just like that but we'll prepare for them and let you know well in advance so you can prepare yourselves for the change if it affects you.

We've done a lot of changes over the past few months with a lot of help from the community, especially on the code cleanup front. We are now fully pep8 compliant and pyflakes error free (meaning the code easier to read and less unnecessary things in the code).

We should all be very thankful for the tremendous work of <strong>Jorge C. Leitão</strong>, <strong>Randal Moore</strong>, <strong>Justin Duke</strong>, and <strong>garethpdx</strong> who have helped us clean up our code base. There's still a lot of work to be done, but thanks to Jorge, Randal, Justin and garethpdx we can all now feel it, the code can be tamed! Thanks all of you!

In those changes I felt I had to make a substantial change to how celery worked in OpenSpending. We did a lot of weird magic to hook celery into paster as a command and we had to do this strange (unused) import:

<code>from openspending.command import celery</code>

to set some configuration variables in order for celery to work. That has now been scrapped and we have a new version of celery in OpenSpending (version 3.1.11).

Celery is no longer managed via paster, we can now use the celery commandline tool that comes with celery to launch our workers. Instead of manually setting a lot of stuff in a config file we can now just do something like:

<code>celery -A openspending.tasks -p &lt;ini-file&gt; -l info worker</code>

(The -p option there is still needed to provide the pylons ini file, and is an openspending extension of celery, since other configurations, such as the database are still managed by config files).

More information about the celery tool and how it can launch workers here:
<a href="http://docs.celeryproject.org/en/latest/userguide/workers.html" target="_blank">http://docs.celeryproject.org/<wbr />en/latest/userguide/workers.<wbr />html</a>

That's the big incompatible change which sparked off version 0.13.0. This is not a user facing change so I decided against a major version, but for those of us that have a development version that's a change which is pretty important to know about.

With this announcement of a new versioning system and the new version I think it is in order to ask the community (please reply on our mailing lists so we can have a great discussion about this):

<ul>
<li>What would you like to see in version 0.14.0?</li>
<li>What would you like to see in version 1.0.0?<span style="color: #888888;">
</span></li>
</ul>
Need help in figuring out what to suggest? Just visit our <a href="https://github.com/openspending/openspending/issues/">issue tracker</a> for some ideas.

Welcome to the new versioned OpenSpending. I hope you'll all enjoy :-)

