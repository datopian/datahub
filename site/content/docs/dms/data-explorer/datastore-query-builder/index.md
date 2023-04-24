---
sidebar: auto
---

# Datastore Query Builder

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The code repository is located at github - https://github.com/datopian/datastore-query-builder.

## Usage

Install it:

```
yarn add @datopian/datastore-query-builder
```

Basic usage in a React app:

```JavaScript
import React from 'react'
import { QueryBuilder } from 'datastore-query-builder'


export const MyComponent = props => {
  // `resource` is a resource descriptor that must have 'name', 'id' and
  // 'schema' properties.

  // `action` - this should be a Redux action that expects back the resource
  // descriptor with updated 'api' property. It is up to your app to fetch data.
  return (
    <QueryBuilder resource={resource} filterBuilderAction={action} />
  )
}
```

Note that this app doesn't fetch any data - it only builds API URI based on user
selection.

It's easier to learn by examples provided in the `/__fixtures__/` directory.


## Features

* Date Picker - if the resource descriptor has a field with `date` type it will be displayed as a date picker element:
![Date Picker](/static/img/docs/dms/data-explorer/date-picker.png)

## Available Scripts

In the project directory, you can run:

### `yarn cosmos` or `npm run cosmos`

Runs dev server with the fixtures from `__fixtures__` directory. Learn more about `cosmos` - https://github.com/react-cosmos/react-cosmos

### `yarn start` or `npm start`

Runs the app in the development mode.<br/>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br/>
You will also see any lint errors in the console.

### `yarn test` or `npm test`

Launches the test runner in the interactive watch mode.<br/>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build:package` or `npm run build:package`

Run this to compile your code so it is installable via yarn/npm.

### `yarn build` or `npm run build`

Builds the app for production to the `build` folder.<br/>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br/>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Release

When releasing a new version of this module, please, make sure you've built compiled version of the files:

```bash
yarn build:package
# Since this a release, you need to change version number in package.json file.
# E.g., this is a patch release so my `0.3.6` will become `0.3.7`.
# Now commit the changes
git add dist/ package.json
git commit -m "[v0.3.7]: your commit message."
```

Next, you need to tag your commit and add some descriptive message about the release:

```bash
git tag -a v0.3.7 -m "Your release message."
```

Now you can push your commits and tags:

```bash
git push origin branch && git push origin branch --tags
```

The tag will initiate a Github action that will publish the release to NPM.
