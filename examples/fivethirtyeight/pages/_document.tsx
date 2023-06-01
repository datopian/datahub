import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="icon"
          type="image/x-icon"
          href="https://projects.fivethirtyeight.com/shared/favicon.ico"
        />
        <meta
          property="og:image"
          content="https://portaljs-fivethirtyeight.vercel.app/share_image.png"
        />
        <meta
          property="twitter:image"
          content="https://portaljs-fivethirtyeight.vercel.app/share_image.png"
        />
      </Head>
      <body>
        <Main />
      </body>
      <NextScript />
    </Html>
  );
}
