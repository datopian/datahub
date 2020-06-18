/* istanbul ignore file */
import '../styles/index.css';

import { ApolloProvider } from '@apollo/react-hooks';
import { useApollo } from '../lib/apolloClient';

// Setup mocks
// if (process.env.NODE_ENV === 'development') {
//   const mocks = require('../mocks');
//   mocks.initMocks();
//   console.warn('You have activated the mocks.');
// }

export default function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
