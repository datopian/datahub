import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import "../styles/global.css";

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to simple-example!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
