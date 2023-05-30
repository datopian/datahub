---
section: help
lead: true
title: Permissions API
authors:
- Tryggvi Björgvinsson
---
OpenSpending allows users to check for their permissions on a given dataset via an API call. The response will provide the authenticated user's permission on as true or false values for *CRUD* (create, read, update, and delete). This API call mainly exists to allow software that uses the API (e.g. [the loading API](/help/api/loading)) to save bandwidth with big dataset updates.

For example if you as a developer are building a loading script that users of OpenSpending can use to download data from a location and update datasets in OpenSpending you might first run a check for permissions based on their [API key](http://community.openspending.org/help/api/conventions) before starting to download the updates (so you can skip it if they're not authorized.

The permission API works as follows. Make a *GET* request (wih user authenticated with the API key) to:

    /api/2/permissions?dataset=[dataset_name]

The response will be single json object with four properties, *create*, *read*, *update*, and *delete*. The value of each property is a boolean (true or false) that indicates if the authenticated user has that permission for the provided dataset:

    {
        "create": false,
        "read": true,
        "update": false,
        "delete": false
    }
