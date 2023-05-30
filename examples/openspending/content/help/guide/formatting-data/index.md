---
section: help
lead: true
title: Formatting data
authors:
- Neil Ashton
---
OpenSpending expects all data to be in a simple format.

#### CSV

OpenSpending accepts data in a single file format, the Comma-Separated Values (CSV) file. A CSV is a plain text file that represents data as a table, which is similar to a spreadsheet. In a table, each data point is represented by a row, and each data point's properties are represented by a column. CSV files encode tables by giving each row a line in the text file and by separating columns with commas.

CSVs accepted by OpenSpending do not save space by removing redundant values. If your spreadsheet omits any repeated values, those omitted values must be filled in before OpenSpending can use your data. OpenSpending-ready CSVs are also *rectangular*, meaning that they have exactly the same number of columns in each row.

#### The OpenSpending format

CSVs for OpenSpending must have the following properties.

1. One header row. The first row of the CSV file should contain the names of the columns, separated by commas. All other rows are treated as data rows.

2. At least three columns. The bare minimum of columns are an amount, a date (which could be just a year), and a spender or a recipient (which could just be the name of an account).

3. Consistent columns. Each column must consistently represent a single type of value for all rows. (There can be no subheader rows, for example.)

4. Rows are single data points. Rows should contain *only one* transaction or one budget line. Each row must represent a maximum of one time period.

5. No blank rows or cells. Each row should be completely filled in. Some spreadsheets leave redundant data cells blank or have other ways of saving space, but OpenSpending requires each row to be complete on its own.

6. No pre-aggregated totals (e.g. sub-totals or "roll-ups"). OpenSpending will do the maths and compute these automatically.

7. Rows have values that uniquely identify them. Each row must have some column (or combination of column) whose value(s) can be used as an "ID" for the row. Each row's ID must be unique. For example, your data could have a column named "ID" which contains a different number for each row. An easy way to create such an ID column in Excel is to add a new column, write "1" in the top cell of the column, write "2" in the second cell from the top, select both cells, and then click and drag the lower right corner of the selection to the bottom of the spreadsheet.

8. Dates in the correct format. Dates must be in the format "yyyy-mm-dd".

9. Numbers in the correct format. Numbers must contain only digits and an optional period—no commas! (Readable numbers like "12,345.67" should be converted to numbers like “12345.67”.)

The OpenSpending community has gathered some [example spreadsheets](https://drive.google.com/a/okfn.org/#folders/0B_dkMlz2NopEbmRoTExsMDFMR2M) in order to illustrate what "good" and “bad” tabular data looks like. Here are some examples of badly formatted spreadsheets:

* [Many blank cells](https://docs.google.com/a/okfn.org/spreadsheet/ccc?key=0AvdkMlz2NopEdEtIMFlEVDZXOWdDUEthUTQ0c21aV2c#gid=0) (probably redundant info omitted)

* [Multiple transactions, one row](https://docs.google.com/a/okfn.org/spreadsheet/ccc?key=0AvdkMlz2NopEdG5kR0kzQ0E5V3BuTS16MndBT3dMdEE#gid=0) (multiple years on one row)

* [Bad numbers](https://docs.google.com/a/okfn.org/spreadsheet/ccc?key=0AvdkMlz2NopEdEo1Y2p2R0VvdnJvRXMwUVREbHRoLXc#gid=0) (numbers have commas for readability)

Here is a good spreadsheet:

* [Washington, DC](https://docs.google.com/a/okfn.org/spreadsheet/ccc?key=0AvdkMlz2NopEdDhrZnRkWl9ZX2ZZNVptTzdueWw3emc#gid=0)

**Next**: [Publishing data on the web](../publishing-data)

**Up**: [OpenSpending Guide](../)
