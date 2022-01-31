## DataHub CLI

This command line tool helps you to instantly build and deploy data-driven pages. It doesn't require you to know any frontend technologies (HTML, CSS, JS) so that you can focus on your data. Simply run a command (`datahub deploy`) and get a URL for your data page.

You can still customize the look and feel of your data-driven pages. It uses [Portal.js][] under the hood and with some basic knowledge of frontend development users can easily get started.

[Portal.js]: https://portaljs.org/learn

## Install

Install the CLI tool:

```bash
npm install -g 'https://gitpkg.now.sh/datopian/portal.js/bin?main'
# or with yarn
yarn add 'https://gitpkg.now.sh/datopian/portal.js/bin?main'
```

Next, confirm if the `datahub` command is available:

```bash
which datahub
# should print path to the executable
```

> Note: It is recommended you install the CLI tool globally so you can run it from anywhere on your machine.

## Features

### Show

Easily preview data-driven pages locally. 

I have a dataset `my-data` with the following content:

```
README.md
data.csv
# descriptor is optional (we infer if not there) 
datapackage.json
```

I can do the following:

```
cd my-data
datahub show
```

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

Once you are ready to deploy your data:

```
datahub deploy
```

It starts building your production ready data-driven page and deploys it in the cloud. With the single command you get a URL for you page (e.g., `https://my-data-abcd123.datahub.io`). Now, share it with everyone!

Why to deploy my data?

* Deploys a shareable url with the content of show
    * Semi-private
    * Can integrate access control (?)
* Deploys a data API
* [Other integrations e.g. push to google spreadsheets]
* Dashboard showing your DataHub/Portal projects