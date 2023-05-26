import Giscus, { BooleanString, Mapping, Repo } from "@giscus/react";
import { useTheme } from "next-themes";

export interface GiscusConfig {
  provider: "giscus";
  pages?: Array<string>;
  config: {
    theme?: string;
    mapping: Mapping;
    repo: Repo;
    repositoryId: string;
    category: string;
    categoryId: string;
    reactions: BooleanString;
    metadata: BooleanString;
    inputPosition?: string;
    lang?: string;
  };
}

export type GiscusProps = GiscusConfig["config"];

export const GiscusReactComponent: React.FC<GiscusProps> = ({
  repo,
  repositoryId,
  category,
  categoryId,
  reactions = "0",
  metadata = "0",
  mapping = "pathname",
  theme = "light",
}) => {
  const { theme: nextTheme, resolvedTheme } = useTheme();
  const commentsTheme =
    nextTheme === "dark" || resolvedTheme === "dark"
      ? "transparent_dark"
      : theme;

  return (
    <Giscus
      repo={repo}
      repoId={repositoryId}
      category={category}
      categoryId={categoryId}
      mapping={mapping}
      inputPosition="top"
      reactionsEnabled={reactions}
      emitMetadata={metadata}
      // TODO: remove transparent_dark after theme toggle fix
      theme={nextTheme ? commentsTheme : "transparent_dark"}
    />
  );
};
