🌀 `Portal` is a framework for rapidly building rich data portal frontends using a modern frontend approach (javascript, React, SSR).

`Portal` assumes a "decoupled" approach where the frontend is a separate service from the backend and interacts with backend(s) via an API. It can be used with any backend and has out of the box support for [CKAN][]. `portal` is built in Javascript and React on top of the popular [Next.js][] framework.

[CKAN]: https://ckan.org/
[Next.js]: https://nextjs.com/


## Getting Started

### Setup

Install a recent version of Node. You'll need Node 10.13 or later.

### Create a Portal app

To create a Portal app, open your terminal, cd into the directory you'd like to create the app in, and run the following command:

```console
npm init portal-app my-data-portal
```

> NB: Under the hood, this uses the tool called create-next-app, which bootstraps a Next.js app for you. It uses this template through the --example flag.
> 
> If it doesn’t work, please open an issue.


## Guide

### Styling :art: 

We use Tailwind as a CSS framework. Take a look at `/styles/index.css` to see what we're importing from Tailwind bundle. You can also configure Tailwind using `tailwind.config.js` file.

Have a look at Next.js support of CSS and ways of writing CSS:

https://nextjs.org/docs/basic-features/built-in-css-support

### Backend

So far the app is running with mocked data behind. You can connect CMS and DMS backends easily via environment variables:

```console
$ export DMS=http://ckan:5000
$ export CMS=http://myblog.wordpress.com
```

### Routes

These are the default routes set up in the "starter" app.

* Home `/`
* Search `/search`
* Dataset `/@org/dataset`
* Resource `/@org/dataset/r/resource`
* Organization `/@org`
* Collection (aka group in CKAN) (?) - suggest to merge into org
* Static pages, eg, `/about` etc. from CMS or can do it without external CMS, e.g., in Next.js

### New Routes

TODO

## Developers

### Boot the local instance

Install the dependencies:

```bash
yarn # or npm i
```

Boot the demo portal:

```console
$ yarn dev # or npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the home page :tada: 

You can start editing the page by modifying `/pages/index.tsx`. The page auto-updates as you edit the file.


### Tests

We use Jest for running tests:

```bash
yarn test # or npm run test

# turn on watching
yarn test --watch
```
