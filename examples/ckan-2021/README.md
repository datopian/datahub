# 🌀 PortalJS example with CKAN and Apollo

**🚩 UPDATE April 2023: This example is now deprecated - though still works!. Please use the [new CKAN examples](https://github.com/datopian/portaljs/tree/main/examples)**

## Guide

### Styling 🎨

We use Tailwind as a CSS framework. Take a look at `/styles/index.css` to see what we're importing from Tailwind bundle. You can also configure Tailwind using `tailwind.config.js` file.

Have a look at Next.js support of CSS and ways of writing CSS:

https://nextjs.org/docs/basic-features/built-in-css-support

### Backend

So far the app is running with mocked data behind. You can connect CMS and DMS backends easily via environment variables:

```console
$ export DMS=http://ckan:5000
$ export CMS=http://myblog.wordpress.com
```

> Note that we don't yet have implementations for the following CKAN features:
>
> - Activities
> - Auth
> - Groups
> - Facets

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

#### i18n configuration

Portal.js is configured by default to support both `English` and `French` subpath for language translation. But for subsequent users, this following steps can be used to configure i18n for other languages;

1.  Update `next.config.js`, to add more languages to the i18n locales

```js
i18n: {
  locales: ['en', 'fr', 'nl-NL'], // add more language to the list
  defaultLocale: 'en',  // set the default language to use
},
```

2. Create a folder for the language in `locales` --> `locales/en-Us`

3. In the language folder, different namespace files (json) can be created for each translation. For the `index.js` use-case, I named it `common.json`

```json
// locales/en/common.json
{
   "title" : "Portal js in English",
}

// locales/fr/common.json
{
   "title" : "Portal js in French",
}
```

4. To use on pages using Server-side Props.

```js
import { loadNamespaces } from './_app';
import useTranslation from 'next-translate/useTranslation';

const Home: React.FC = ()=> {
  const { t } = useTranslation();
  return (
    <div>{t(`common:title`)}</div> // we use common and title base on the common.json data
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
      ........  ........
  return {
    props : {
      _ns:  await loadNamespaces(['common'], locale),
    }
  };
};

```

5. Go to the browser and view the changes using language subpath like this `http://localhost:3000` and `http://localhost:3000/fr`. **Note** The subpath also activate chrome language Translator

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

Open [http://localhost:3000](http://localhost:3000) to see the home page 🎉

You can start editing the page by modifying `/pages/index.tsx`. The page auto-updates as you edit the file.

### Tests

We use Jest for running tests:

```bash
yarn test # or npm run test

# turn on watching
yarn test --watch
```

We use Cypress tests as well

```
yarn run e2e
```

### Architecture

- Language: Javascript
- Framework: NextJS - https://nextjs.org/
- Data layer API: GraphQL using Apollo. So controllers access data using GraphQL “gatsby like”

### Key Pages

See https://tech.datopian.com/frontend/
