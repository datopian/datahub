import { useEffect, useState } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { useApollo } from '../lib/apolloClient';
import { DEFAULT_THEME } from '../themes';
import { applyTheme } from '../themes/utils';

import '../styles/app.css';

export default function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const [theme, setTheme] = useState(DEFAULT_THEME);

  useEffect(() => {
    /**
     * We can switch theme.
     * e.g. setTheme('primary');
     * */

    applyTheme(theme);
  }, [theme]);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
