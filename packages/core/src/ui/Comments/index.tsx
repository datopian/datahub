import dynamic from "next/dynamic.js";
import { GiscusReactComponent, GiscusConfig, GiscusProps } from "./Giscus";
import { Utterances, UtterancesConfig, UtterancesProps } from "./Utterances";
import { Disqus, DisqusConfig, DisqusProps } from "./Disqus";

export type CommentsConfig = GiscusConfig | UtterancesConfig | DisqusConfig;

export interface CommentsProps {
  commentsConfig: CommentsConfig;
  slug?: string;
}

const GiscusComponent = dynamic<GiscusProps>(
  () => {
    return import("./Giscus").then((mod) => mod.GiscusReactComponent);
  },
  { ssr: false }
);

const UtterancesComponent = dynamic<UtterancesProps>(
  () => {
    return import("./Utterances").then((mod) => mod.Utterances);
  },
  { ssr: false }
);

const DisqusComponent = dynamic<DisqusProps>(
  () => {
    return import("./Disqus").then((mod) => mod.Disqus);
  },
  { ssr: false }
);

export const Comments = ({ commentsConfig, slug }: CommentsProps) => {
  switch (commentsConfig.provider) {
    case "giscus":
      return <GiscusComponent {...commentsConfig.config} />;
    case "utterances":
      return <UtterancesComponent {...commentsConfig.config} />;
    case "disqus":
      return <DisqusComponent slug={slug} {...commentsConfig.config} />;
  }
};

export { GiscusReactComponent, Utterances, Disqus };
export type {
  GiscusConfig,
  GiscusProps,
  UtterancesConfig,
  UtterancesProps,
  DisqusConfig,
  DisqusProps,
};
