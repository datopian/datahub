import "../styles/globals.css";
import "../styles/tailwind.css";

import Script from "next/script";

import { DefaultSeo } from "next-seo";

import { pageview, ThemeProvider } from "@flowershow/core";
import { siteConfig } from "../config/siteConfig";
import { useEffect } from "react";
import { useRouter } from "next/dist/client/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if (siteConfig.analytics) {
      const handleRouteChange = (url) => {
        pageview(url);
      };
      router.events.on("routeChangeComplete", handleRouteChange);
      return () => {
        router.events.off("routeChangeComplete", handleRouteChange);
      };
    }
  }, [router.events]);

  return (
    <ThemeProvider
      disableTransitionOnChange
      attribute="class"
      defaultTheme={siteConfig.theme.default}
      forcedTheme={siteConfig.theme.default ? null : "light"}
    >
      <DefaultSeo defaultTitle={siteConfig.title} {...siteConfig.nextSeo} />
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      {siteConfig.analytics && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.analytics}`}
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${siteConfig.analytics}', {
            page_path: window.location.pathname,
          });
        `,
            }}
          />
        </>
      )}
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
