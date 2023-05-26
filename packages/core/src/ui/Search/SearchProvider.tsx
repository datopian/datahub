import dynamic from "next/dynamic.js";
import {
  SearchProvider as SearchProviderType,
  SearchProviderConfig,
} from "../types";

const AlgoliaSearchProvider = dynamic(
  async () => {
    return await import("./Algolia").then((mod) => mod.AlgoliaSearchProvider);
  },
  { ssr: false }
);

const AlgoliaSearchContext = dynamic(
  async () => {
    return await import("./Algolia").then(
      (mod) => mod.AlgoliaSearchContext.Consumer
    );
  },
  { ssr: false }
);

const KBarProvider = dynamic(
  async () => {
    return await import("./KBar").then((mod) => mod.KBarSearchProvider);
  },
  { ssr: false }
);

const KBarSearchContext = dynamic(
  async () => {
    return await import("kbar").then((mod) => mod.KBarContext.Consumer);
  },
  { ssr: false }
);

export const SearchProvider = ({
  searchConfig,
  children,
}: {
  searchConfig: SearchProviderConfig;
  children: React.ReactNode;
}) => {
  switch (searchConfig?.provider) {
    case "algolia":
      return (
        <AlgoliaSearchProvider config={searchConfig.config}>
          {children}
        </AlgoliaSearchProvider>
      );
    case "kbar":
      return (
        <KBarProvider config={searchConfig.config}>{children}</KBarProvider>
      );
    default:
      return <>{children}</>;
  }
};

export const SearchContext = (provider: SearchProviderType) => {
  switch (provider) {
    case "algolia":
      return AlgoliaSearchContext;
    case "kbar":
      return KBarSearchContext;
    default:
      return undefined;
  }
};
