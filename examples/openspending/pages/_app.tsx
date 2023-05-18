import { AppProps } from 'next/app';
import './styles.css';
import { NextSeo } from 'next-seo';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextSeo title="OpenSpending" />
      <main className="app">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
