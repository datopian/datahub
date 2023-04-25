# Relationships (between Datasets)

## Why dataset relationships are a ~~bad~~ complex idea ...

Idea is simple: I want to show relationships between datasets e.g.

* This is part of that one
* This derives from that one
* This is a parent of (new version) of that one ...

But **why** do you want that? What does the user want to do? That turns out to be very variable. Furthermore, actual user experience and behaviour is quite complex. To take a couple of examples:

* **Parent-child**: parent/child is *really* "revisioning" where you have new revisions of a dataset (or maybe it is something else, something a bit like derivations …). But in revisioning the simple relationship is much less important than e.g. efficient storage of data versions, permissions structure etc.
* **Part-of**: this seems simple to start with. But actually quite complex. How many levels of nesting? Can a child have multiple parents? Furthermore, it's not clear what actual user experience this information supports? It is collections? Is it concatenation of data? Or is it just the modelling team have got excited and there's no actual end user need (common!).

 Background

* CKAN relationships were implemented pretty early (at Rufus' suggestion)
  * depends_on
  * dependency_of
  * derives_from
  * has_derivation
  * child_of
  * parent_of
* CKAN relationships module not really maintained - https://github.com/ckan/ckan/issues/4212 (Fix, document and rewrite tests for dataset relationships (or remove) - 30 apr 2018 - with no movement on it)
  * Some good example use cases
* https://github.com/ckan/ckan/wiki/Dataset-relationships 
