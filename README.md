🌀 `Portal` is a framework for rapidly building rich data portal frontends using a modern frontend approach (javascript, React, SSR).

`Portal` assumes a "decoupled" approach where the frontend is a separate service from the backend and interacts with backend(s) via an API. It can be used with any backend and has out of the box support for [CKAN][]. `portal` is built in Javascript and React on top of the popular [Next.js][] framework.

[ckan]: https://ckan.org/
[next.js]: https://nextjs.com/

Live DEMO: https://portal.datopian1.now.sh

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

- Home `/`
- Search `/search`
- Dataset `/@org/dataset`
- Resource `/@org/dataset/r/resource`
- Organization `/@org`
- Collection (aka group in CKAN) (?) - suggest to merge into org
- Static pages, eg, `/about` etc. from CMS or can do it without external CMS, e.g., in Next.js

### New Routes

TODO

### Data fetching

We use Apollo client which allows us to query data with GraphQL. We have setup CKAN API for the demo (it uses demo.ckan.org as DMS):

http://portal.datopian1.now.sh/

Note that we don't have Apollo Server but we connect CKAN API using [`apollo-link-rest`](https://www.apollographql.com/docs/link/links/rest/) module. You can see how it works in [lib/apolloClient.ts](https://github.com/datopian/portal/blob/master/lib/apolloClient.ts) and then have a look at [pages/\_app.tsx](https://github.com/datopian/portal/blob/master/pages/_app.tsx).

For development/debugging purposes, we suggest installing the Chrome extension - https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm.

#### Pre-fetch data in the server-side

When visiting a dataset page, you may want to fetch the dataset metadata in the server-side. To do so, you can use `getServerSideProps` function from NextJS:

```javascript
import { GetServerSideProps } from 'next';
import { initializeApollo } from '../lib/apolloClient';
import gql from 'graphql-tag';

const QUERY = gql`
  query dataset($id: String) {
    dataset(id: $id) @rest(type: "Response", path: "package_show?{args}") {
      result
    }
  }
`;

...

export const getServerSideProps: GetServerSideProps = async (context) => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: QUERY,
    variables: {
      id: 'my-dataset'
    },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};
```

This would fetch the data from DMS and save it in the Apollo cache so that we can query it again from the components.

#### Access data from a component

Consider situation when rendering a component for org info on the dataset page. We already have pre-fetched dataset metadata that includes `organization` property with attributes such as `name`, `title` etc. We can now query only organization part for our `Org` component:

```javascript
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export const GET_ORG_QUERY = gql`
  query dataset($id: String) {
    dataset(id: $id) @rest(type: "Response", path: "package_show?{args}") {
      result {
        organization {
          name
          title
          image_url
        }
      }
    }
  }
`;

export default function Org({ variables }) {
  const { loading, error, data } = useQuery(
    GET_ORG_QUERY,
    {
      variables: { id: 'my-dataset' }
    }
  );

  ...

  const { organization } = data.dataset.result;

  return (
    <>
      {organization ? (
        <>
          <img
            src={
              organization.image_url
            }
            className="h-5 w-5 mr-2 inline-block"
          />
          <Link href={`/@${organization.name}`}>
            <a className="font-semibold text-primary underline">
              {organization.title || organization.name}
            </a>
          </Link>
        </>
      ) : (
        ''
      )}
    </>
  );
}
```

#### Add a new data source

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
