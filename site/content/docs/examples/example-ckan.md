---
title: "Example: Data catalog with data on CKAN"
authors: ['Luccas Mateus']
date: 2023-05-24
filetype: blog
---

The PortalJS CKAN example intendeds to provide users with an easy way to bootstrap a data catalog and share data stories backed by a CKAN back end, simply by setting a simple environment variable pointing to a CKAN instance.

## Demo

To get a feel of the project, users can check the [live deployment](https://ckan-example.portaljs.org).

#### Front page

![](https://hackmd.io/_uploads/S1CsQ9jr2.png)

#### Individual dataset page

![](https://hackmd.io/_uploads/ryZRXcorn.png)

## How to use this example as a template

### Create a new app with `create-next-app`:

Navigate to the directory in which you want to create the project folder and run the following command:

```
npx create-next-app <app-name> --example https://github.com/datopian/portaljs/tree/main/examples/ckan
cd <app-name>
```

### Point to the CKAN instance 

This project uses CKAN as a backend, so you need to point it to the desired CKAN instance URL. You can do so by setting up the `DMS` environment variable in your terminal or creating an `.env` file with the following content:

```
DMS=<ckan url>
```

### Run the app

To run the app in development mode, execute the following command on a terminal:

```
npm run dev
```

Congratulations, you now have something similar to this running on `http://localhost:3000`:

![](https://hackmd.io/_uploads/S1CsQ9jr2.png)

If you navigate to any of the dataset pages by clicking on the dataset title you will see something similar to this:

![](https://hackmd.io/_uploads/ryZRXcorn.png)

## Deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdatopian%2Fportaljs%2Ftree%2Fmain%2Fexamples%2Fckan&env=DMS&envDescription=URL%20For%20the%20CKAN%20Backend%20Ex%3A%20https%3A%2F%2Fdemo.dev.datopian.com)

By clicking on this button, you will be redirected to a page which allows you to clone the base project into your own GitHub/GitLab/BitBucket account and automatically deploy it.

## Extra commands

You can also build the project for production with

```
npm run build
```

And run using the production build like so:

```
npm run start
```

## Extra steps

Feel free to customize your portal, a few suggestions would be.

- Connecting to a different CKAN backend and seeing how it looks
- Using the CKAN Object to build a `orgs` or `groups` page listing all the groups and orgs
- A showcase page for a specific group or org
- You could even use some of our [components](https://storybook.portaljs.org/) e.g: You could get the datastore contents for a resource using the `ckan.datastoreSearch(resourceId: string)` function and then display that as a line chart or vega chart.

## CKAN API

Thanks to TypeScript, you can get a list of all the API methods in `@portaljs/ckan` and their respective input/output values from the autocomplete functionality on your own editor. Here is a list with all of them for quick retrieval:

- `getDatasetsList()` - Gets a list of all the datasets in the portal
- `getDatasetsListWithDetails(options: DatasetListQueryOptions)` - Gets a list of all the datasets including their respective resources
- `packageSearch(
    options: PackageSearchOptions
  )` - Calls `package_search`
- `getDatasetDetails(datasetName: string)` - Calls `package_show`
- `getDatasetDetails(datasetName: string)` - Calls `package_activity_list` and automatically fills in the user information
- `getUser(userId: string)` - Calls `user_show` 
- `getGroupList()` - Gets all the groups in the backend
- `getGroupsWithDetails()` - Gets all the groups in the backend with details
- `getGroupDetails(groupName: string)` - Gets all the details from a single group
- `getGroupActivityStream(groupName: string)` - Get a group activity list and automatically fills in the user information
- `getOrgList()` - Gets all the orgs in the backend
- `getOrgsWithDetails(accrossPages?: boolean)` - Calls `organization_list?all_fields=True`. If you set `accrossPages` to `true`, it will repeatedly call the API until all groups are returned.
- `getOrgDetails(orgName: string)` - Gets all the details from a single org
- `getOrgActivityStream(orgName: string)` -  Gets a org activity list and automatically fills in the user information
- `getAllTags()` - Gets all tags in system with details
- `getResourcesWithAliasList()` - Gets all the resources in the datastore that have an alias assigned to them
- `datastoreSearch(resourceId: string)` - Calls datastoreSearch
- `getResourceMetadata(resourceId: string)` - Calls `resource_show`
- `getResourceMetadata(resourceId: string)` - Calls `datastore_info` on a resource
- `getFacetFields(field: string)` - Gets the possible values eg: getFacetFields("tags") will get you all the tags that are currently assigned to a dataset + how many datasets have that particular tag. 


## Links

- [Repo](https://github.com/datopian/portaljs/tree/main/examples/ckan)  
- [Live Demo](http://ckan.portaljs.org/)  


