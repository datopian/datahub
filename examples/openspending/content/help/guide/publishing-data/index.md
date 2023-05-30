---
section: help
lead: true
title: Publishing data on the web
authors:
- Neil Ashton
---
Data cannot (yet) be uploaded directly to OpenSpending. In order to be added to the OpenSpending database, data must first be made accessible from the web. This section introduces two convenient ways to publish sets of data online.

#### Google Drive

You can make your data accessible on the web by turning it into a Google Drive spreadsheet.

1. Import your data. Create a new Google Drive spreadsheet, then select *Import...* from the File menu. Select *Replace Spreadsheet*, click **Choose File**, and navigate to your CSV file.

2. Make sure Google Docs doesn't mis-format your data's dates. Select the column that contains dates. Click the *Format* menu and select *Number* -> *More formats* -> *2008-09-26*. Your dates should appear in the prescribed **yyyy-mm-dd** format.

3. Click the *File* menu and select *Publish to the web...*. In the box that appears, click **Start publishing**. Beneath *Get a link to the published data*, select **CSV (comma-separated values)**.

<a href="{{ site.baseurl }}/img/blog/2013/08/image_0.png"><img src="{{ site.baseurl }}/img/blog/2013/08/image_0.png" alt="image_0" width="596" height="578" class="alignnone size-full wp-image-577" /></a>

The URL at the bottom of the box now points to your data.

#### Gist

GitHub Gist is a convenient way to host small quantities of text, including CSV files.

1. Log in to GitHub (or register if you haven't already done so), then navigate to[ gist.github.com](https://gist.github.com/).

2. Click and drag your CSV file from your operating system's file manager onto the GitHub Gist page of your browser. The file's name and contents will appear.

3. Click **Create Public Gist** to be taken to the homepage of your new gist. The raw URL of your data is accessible through the "angle brackets" button in the top right corner of the file.

<a href="http://blog.openspending.org/files/2013/08/image_1-e1375888253802.png"><img src="http://blog.openspending.org/files/2013/08/image_1-e1375888253802.png" alt="image_1" width="600" height="141" class="alignnone size-full wp-image-578" /></a>

**Next**: [Creating a dataset on OpenSpending](../creating-dataset/)

**Up**: [OpenSpending Guide](../)
