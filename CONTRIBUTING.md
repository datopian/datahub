# Contributing to Recline

We welcome patches and pull requests. There are a few guidelines.

## General

* Please run the tests :-) (see below)
* Please do **not** build the dist files (e.g. dist/recline.js) when submitting
  patches. dist files will get built automatically and if they are part of a
  patch or pull request it makes them harder to review and more likely to
  conflict.
* If possible have an issue to which the commits can relate. You can reference
  an issue in the commits by just including #{issue-number} somewhere in the
  commit message).  Note if no issue exists suggest creating one.

## For larger changes

* Cleanup your code and affected code parts
* Run the tests from `/test/index.html` in different browsers (at least Chrome and FF)
* Update the documentation and tutorials where necessary
* Update `/_includes/recline-deps.html` if you change required files (e.g. leaflet libraries)
* Try to build the demos in `/demos/` with jekyll and then check out the `/demos/multiview/` which utilizes most aspects of Recline

You will also probably want to take a quick look at outline of the architecture which can be found in the [documentation online](http://okfnlabs.org/recline).

## Running tests

Run the tests by opening `test/index.html` in your browser.

## Demos and Documentation

Note that the demos and documentation utilize the [jekyll templating
system][jekyll] and to use them *locally* you will need to build them using
jekyll. Once installed, all you need to do from the command line is run jekyll:

    jekyll serve

or if you're actively developing and want auto-reloading:

    jekyll serve --watch

[jekyll]: https://github.com/mojombo/jekyll

