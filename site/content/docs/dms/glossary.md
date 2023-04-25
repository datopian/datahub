# Glossary

[Resource]: #Resource

## Data Management System

A Data Management System is a *framework* for building data management solutions such as data catalogs, data portals, data factories, data workflows and various combinations and extensions of these.

## Dataset

Dataset is a collection of related and (potentially) interconnected [Resource][]s. Example: Excel file with mulitple sheets, Database etc.

## DMS

DMS is an acronym for Data Management System.

## File

Usually a *data* file. See Resource.

## Profile

The structure for general metadata for data. E.g. this dataset follows the "Biodiversity Data Publication v1.3 Profile".

## Resource

Resource (aka File) is a single data file or object. Strictly, the Resource should correspond to a single logical data structure e.g. a single table vs multiple tables. Example: CSV file, single sheet spreadsheet, geojson file.

Confusingly, an actual physical file/resource can correspond to multiple logical resources e.g. an Excel file with multiple sheets corresponds conceptually to a (logical) Dataset with multiple (logical) Resources.

## Schema

A schema for data (specifically a resource). For example:

* The set of fields present e.g the columns in the spreadsheet
* Thee type of each field e.g. is this column a string, number, date etc
* Other restrictions e.g. all values in this field are positive

See Frictionless Table Schema for a detailed spec: http://frictionlessdata.io/table-schema/
