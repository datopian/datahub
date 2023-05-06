# Showing metadata

If you go now to `http://localhost:3000/my-awesome-dataset`, you will see that we now have two titles on the page. That's because `title` is one of the default metadata fields supported by PortalJS.

![](https://i.imgur.com/O145uuc.png)

Change the content inside `/content/my-awesome-dataset/index.md` to this.

```
---
title: 'My awesome dataset'
author: 'Rufus Pollock'
description: 'An awesome dataset displaying some awesome data'
modified: '2023-05-04'
files: ['data.csv']
groups: ['Awesome']
---

Built with PortalJS

## Table

<Table url="data.csv" />
```

Once you refresh the page at `http://localhost:3000/my-awesome-dataset` you should see something like this at the top:

![](https://i.imgur.com/nvDYJQT.png)

These are the standard metadata fields that will be shown at the top of the page if you add them.

- `title` that gets displayed as a big header at the top of the page
- `author`, `description`, and `modified` which gets displayed below the title
- `files` that get displayed as a table with two columns: `File` which is linked directly to the file, and `Format` which show the file format.

<DocsPagination prev="/docs/searching-datasets" next="/docs/deploying-your-portaljs-app" />
