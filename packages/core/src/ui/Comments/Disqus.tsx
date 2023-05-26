import { DiscussionEmbed } from "disqus-react";

export interface DisqusConfig {
  provider: "disqus";
  pages?: Array<string>;
  config: {
    shortname: string;
  };
}

export type DisqusProps = DisqusConfig["config"] & {
  slug?: string;
};

export const Disqus: React.FC<DisqusProps> = ({ shortname, slug }) => {
  return (
    <DiscussionEmbed
      shortname={shortname}
      config={{
        url: window?.location?.href,
        identifier: slug,
      }}
    />
  );
};
