---
title: Data Literate Documents
author: Rufus Pollock and Friends
---

**What?** An experiment in simple, lightweight approach to creating, displaying and sharing datasets and data-driven stories.

**Why?** a simple, fast, extensible way to present data(sets) and author data-driven content. I want to work with markdown for content and quickly add data in the simplest way possible e.g. dropping in links, pasting tables or adding links to the metadata.

**How?** Technically the essence is Markdown+React (MDX) + a curated toolkit of components for data-presentation + NextJS for framework and deployment.

Check out the [demo](/data-literate/demo).

## Background

I have observed two converging data-rich use cases:

* **Data Publishing**:  quickly presenting data whether a single file or a full dataset.
* **Data Stories**: creating data-driven content from the simplest of a blog post with a graph to high end there is sophisticated data journalism and visualization.

Both of these can now be well served by a simple markdown-plus approach. Taking data publishing first. I've long been a fan of ultra-simple `README + metadata + csv` datasets. With the evolution of frontmatter we can merge the metadata into the README. However, we still need to "present" the dataset and the key thing for a dataset is the data and this is not something markdown ever supported well ... But now with MDX and the richness of the javascript ecosystem it's quite easy to enhance our markdown and build a rendering pipeleine.
