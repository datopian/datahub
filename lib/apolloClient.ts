import { useMemo } from 'react';
import getConfig from 'next/config';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { RestLink } from 'apollo-link-rest';

let apolloClient;

const restLink = new RestLink({
  uri: getConfig().publicRuntimeConfig.DMS + '/api/3/action/',
  typePatcher: {
    Search: (
      data: any,
      outerType: string,
      patchDeeper: RestLink.FunctionalTypePatcher
    ): any => {
      if (data.result != null) {
        data.result.__typename = 'SearchResponse';

        if (data.result.results != null) {
          data.result.results = data.result.results.map((item) => {
            if (item.organization != null) {
              item.organization.__typename = 'Organization';
            }
            return { __typename: 'Package', ...item };
          });
        }
      }
      return data;
    },
    Response: (
      data: any,
      outerType: string,
      patchDeeper: RestLink.FunctionalTypePatcher
    ): any => {
      if (data.result != null) {
        data.result.__typename = 'Package';
        if (data.result.organization != null) {
          data.result.organization.__typename = 'Organization';
        }

        if (data.result.resources != null) {
          data.result.resources = data.result.resources.map((item) => {
            return { __typename: 'Resource', ...item };
          });
        }
      }
      return data;
    },
  },
});

function createApolloClient() {
  return new ApolloClient({
    link: restLink,
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
