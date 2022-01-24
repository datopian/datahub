# portal-cli-app
Simple CLI for displaying and publishing datasets
## Features

### Show
Easily preview data locally. 
I have a dataset `my-data` with the following content:
```
README.md
data.csv
## descriptor is optional (we infer if not there) 
# datapackage.json
```
I can do the following:
```
cd my-data
portal show
```
I get a nice dataset page like:
The single show command gives me access to the following:

* Elegant presentation
* Shows the data in a table etc (searchable / filterable)
* Supports other data formats e.g. json, xlsx etc
* Show graphs
* Data summary

Show works with: 
* README + csv
* Frictionless dataset
* Frictionless resource
* Pure README with frontmatter
 

### Deploy [Not implemented yet]
Easily publish your dataset online. 
If i have a dataset `my_data`:
```
cd my-data
portal deploy
```
Gives me a url like: 
 
`Myusername-my-dataset.datahub.io`

Deploy: what does it do?
* Deploys a shareable url with the content of show
    * Semi-private
    * Can integrate access control (?)
* Deploys a data API
* [Other integrations e.g. push to google spreadsheets]
* Dashboard showing your DataHub/Portal projects


## User Guide

Install portal-cli-app globally on your computer
```bash
npm install -g git+https://github.com/datopian/portal-experiment.git 
```
>Note: It is recommended you install portal-cli-app globally so you can run the portal show command from anywhere in your computer. 

In a folder with your dataset and optionally datapackage.json, run the command:
```bash
portal show 
```

You can also specify a folder from directory:
```bash
portal show path=\some\path\dataset 
```

Optional args you can pass yo the show command are:

- path: The path to a dataset directory. If blank, defaults to current working directory
- port: The port number to display your dataset in. Defaults to 3000.
- npm: Whether or not to use npm when install packages. Defaults to `false`, uses yarn. 

```
portal show [path=/some/path/dataset | port=4000 | npm=true]
```