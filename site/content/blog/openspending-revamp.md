---
title: The Openspending Revamp
date: 2023-10-12
authors: ['Luccas Mateus', 'João Demenech']
filetype: 'blog'
---

Following up [our previous blog post about the Open Spending revamp](), we now want to share the underlying technologies and tools we used to achieve our goals. 

First of all, we used PortalJS, a JavaScript library that provides a set of reusable React components for mainly for building data portals with data visualization. This is the core technology underlying the Open Spending website, and can be seen in action, for example, on the CSV previews powered by the [FlatUI Component](https://storybook.portaljs.org/?path=/story/components-flatuitable--from-url) from PortalJS. For more information, visit the official website at https://portaljs.org/. 

![](https://hackmd.io/_uploads/Sypq8irW6.png)

Following up on [our previous blog post about the Open Spending revamp](https://www.datopian.com/blog/the-open-spending-revamp), we now want to share the underlying technologies and tools we used to achieve our goals. 

First, we used PortalJS, a JavaScript library that provides a set of reusable React components primarily for building data portals with data visualization. This is the core technology behind the Open Spending website and can be seen in action, for example, in the CSV previews powered by PortalJS' [FlatUI Component](https://storybook.portaljs.org/?path=/story/components-flatuitable--from-url). More information can be found on the official website at https://portaljs.org/. 

![](https://hackmd.io/_uploads/rkUAvjBZp.png)
![](https://hackmd.io/_uploads/H1CjUjSWp.png)

Secondly, we stored the metadata as frictionless datapackages in the `os-data` GitHub organization. Frictionless datapackages are a simple format and standard for describing and packaging a collection of (in our case tabular) data. They are typically used to publish FAIR and open datasets. To learn more about frictionless datapackages, visit their documentation page at https://framework.frictionlessdata.io/.

Octokit, a GitHub API client for Node.js, was used to easily retrieve the metadata for the datasets from the repositories. You can find more information about Octokit on its GitHub repository: https://github.com/octokit/octokit.js, and you can find all the dataset repositories on https://github.com/os-data.

Finally, to store the data, we used Cloudflare R2, a cloud storage service that allows developers to store large amounts of blob data without the costly egress bandwidth fees associated with typical cloud storage services. We chose this product because it offers a generous free tier that we could use for our project. You can read more about Cloudflare R2 on their official announcement page at https://cloudflare.net/news/news-details/2021/Cloudflare-Announces-R2-Storage-Rapid-and-Reliable-S3-Compatible-Object-Storage-Designed-for-the-Edge/default.aspx.

You can check out the code for this project at https://github.com/datopian/portaljs/tree/main/examples/openspending. The website is live on [openspending.org](https://www.openspending.org/), you can file issues at https://github.com/datopian/portaljs/issues and get help by accessing our [Discord Channel](https://discord.com/invite/EeyfGrGu4U).
