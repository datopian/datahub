import * as docsearch from "@docsearch/react";
import Head from "next/head.js";
import Link from "next/link.js";
import { useRouter } from "next/router.js";
import { createContext, useCallback, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

const { useDocSearchKeyboardEvents } = docsearch;

let DocSearchModal: any = null;

function Hit({ hit, children }) {
  return <Link href={hit.url}>{children}</Link>;
}

export const AlgoliaSearchContext = createContext({});

export function AlgoliaSearchProvider({ children, config }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [initialQuery, setInitialQuery] = useState(undefined);

  const importDocSearchModalIfNeeded = useCallback(async () => {
    if (DocSearchModal) {
      return Promise.resolve();
    }

    const [{ DocSearchModal: Modal }] = await Promise.all([docsearch]);
    // eslint-disable-next-line
    DocSearchModal = Modal;
  }, [DocSearchModal]);

  const onOpen = useCallback(() => {
    importDocSearchModalIfNeeded().then(() => {
      setIsOpen(true);
    });
  }, [importDocSearchModalIfNeeded, setIsOpen]);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const onInput = useCallback(
    (event) => {
      importDocSearchModalIfNeeded().then(() => {
        setIsOpen(true);
        setInitialQuery(event.key);
      });
    },
    [importDocSearchModalIfNeeded, setIsOpen, setInitialQuery]
  );

  // web accessibility
  // https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/keyboard-navigation/
  const navigator = useRef({
    navigate({ itemUrl }) {
      // Algolia results could contain URL's from other domains which cannot
      // be served through history and should navigate with window.location
      const isInternalLink = itemUrl.startsWith("/");
      const isAnchorLink = itemUrl.startsWith("#");
      if (!isInternalLink && !isAnchorLink) {
        window.location.href = itemUrl;
      } else {
        router.push(itemUrl);
      }
    },
  }).current;

  // https://docsearch.algolia.com/docs/api#transformitems
  const transformItems = (items) =>
    items.map((item) => {
      // If Algolia contains a external domain, we should navigate without
      // relative URL
      const isInternalLink = item.url.startsWith("/");
      const isAnchorLink = item.url.startsWith("#");
      if (!isInternalLink && !isAnchorLink) {
        return item;
      }

      // We transform the absolute URL into a relative URL.
      const url = new URL(item.url);
      return {
        ...item,
        // url: withBaseUrl(`${url.pathname}${url.hash}`),
        url: `${url.pathname}${url.hash}`,
      };
    });
  // ).current;

  useDocSearchKeyboardEvents({
    isOpen,
    onOpen,
    onClose,
    onInput,
  });

  const providerValue = useMemo(
    () => ({ query: { setSearch: setInitialQuery, toggle: onOpen } }),
    [setInitialQuery, onOpen]
  );

  return (
    <AlgoliaSearchContext.Provider value={providerValue}>
      <Head>
        {/* This hints the browser that the website will load data from Algolia,
        and allows it to preconnect to the DocSearch cluster. It makes the first
        query faster, especially on mobile. */}
        <link
          rel="preconnect"
          href={`https://${config.appId}-dsn.algolia.net`}
          crossOrigin="anonymous"
        />
      </Head>
      {children}
      {isOpen &&
        DocSearchModal &&
        createPortal(
          <DocSearchModal
            onClose={onClose}
            initialScrollY={window.scrollY}
            initialQuery={initialQuery}
            navigator={navigator}
            transformItems={transformItems}
            hitComponent={Hit}
            placeholder={config.placeholder ?? "Search"}
            {...config}
          />,
          document.body
        )}
    </AlgoliaSearchContext.Provider>
  );
}
