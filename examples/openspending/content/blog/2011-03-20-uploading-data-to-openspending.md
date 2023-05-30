--- 
authors:
- lucy
redirect_from: /2011/03/uploading-data-to-openspending/
title: Uploading Data to OpenSpending
---
The amount of datasets that are available on [OpenSpending.org](http://www.openspending.org) are growing fast and we want more! Currently the process looks like this:

1. You give us data.
2. We look at it, try to understand it, possibly ask you some more questions.
3. We write a custom loader script to load the data.

To make this process easier for us and faster for everybody, we offer an alternative process that requires a bit more work from you. But if you know how to transform your data to our CSV format, you will have your spending data online on OpenSpending more quickly and we can spend more time developing features! Here is how it works:

1. You create a CSV file that is formatted according to our [CSV schema](http://wiki.openspending.org/CSV_Schema). [Here is a really simple example of a CSV file][csv_example].
2. You use [our new web based uploader](http://www.openspending.org/sources/add) that automatically checks your CSV file for errors and stores it along with some meta data.
3. Contact us and we will do the final step and load the data into OpenSpending.org.

[csv_example]: https://spreadsheets1.google.com/ccc?hl=en&amp;key=t8rduOMdinCo0smZjQvQUow&amp;hl=en#gid=0

The schema and this alternative process are by no means set in stone: any feedback is appreciated! Most important: if you have spending data, but can't provide it in our CSV format, don't worry and just contact us. We always prefer some data over no data!
