import { AppProps } from 'next/app';
import './styles.css';
import '@portaljs/components/styles.css';
import { NextSeo } from 'next-seo';

import { useEffect } from 'react';
import Script from 'next/script';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  Layout,
  SearchProvider,
  pageview,
  ThemeProvider,
  NavItem,
  NavGroup,
} from '@portaljs/core';

export interface CustomAppProps {
  meta: {
    showToc: boolean;
    showEditLink: boolean;
    showSidebar: boolean;
    showComments: boolean;
    urlPath: string; // not sure what's this for
    editUrl?: string;
    [key: string]: any;
  };
  siteMap?: Array<NavItem | NavGroup>;
  [key: string]: any;
}

function CustomApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const GA_TOKEN = 'G-GXZF7NRXX6';

  useEffect(() => {
    const handleRouteChange = (url) => {
      pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <ThemeProvider
        disableTransitionOnChange
        attribute="class"
        forcedTheme={'light'}
      >
        <Head>
          <link rel="shortcut icon" href="/squared_logo.png" />
        </Head>
        <NextSeo title="OpenSpending" />
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-GXZF7NRXX6"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-GXZF7NRXX6', {
            page_path: window.location.pathname,
          });
        `,
          }}
        />

        <main className="app">
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </>
  );
}

export default CustomApp;
