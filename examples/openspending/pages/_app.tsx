import { AppProps } from 'next/app';
import './styles.css';
import { NextSeo } from 'next-seo';

import { useEffect } from 'react';
import { pageview } from '@flowershow/core';
import Script from 'next/script';
import Head from 'next/head';
import { useRouter } from 'next/router';

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
      <Head>
        <link rel="shortcut icon" href="/squared_logo.png" />
      </Head>
      <NextSeo title="OpenSpending" />
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TOKEN}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', ${GA_TOKEN}, {
            page_path: window.location.pathname,
          });
        `,
        }}
      />

      <main className="app">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
