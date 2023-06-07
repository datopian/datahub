import { useEffect, useCallback } from "react";
import { useTheme } from "next-themes";

export interface UtterancesConfig {
  provider: "utterances";
  pages?: Array<string>;
  config: {
    theme?: string;
    repo: string;
    label: string;
    issueTerm: string;
  };
}

export type UtterancesProps = UtterancesConfig["config"];

export const Utterances: React.FC<UtterancesProps> = ({
  repo,
  label = "comments",
  issueTerm = "pathname",
  theme = "github-light",
}) => {
  const { theme: nextTheme, resolvedTheme } = useTheme();
  // TODO: remove preferred-color-scheme after theme toggle fix
  const commentsTheme = nextTheme
    ? nextTheme === "dark" || resolvedTheme === "dark"
      ? "github-dark"
      : theme
    : "preferred-color-scheme";

  const COMMENTS_ID = "comments-container";

  const LoadComments = useCallback(() => {
    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.setAttribute("repo", repo);
    script.setAttribute("issue-term", issueTerm);
    script.setAttribute("label", label);
    script.setAttribute("theme", commentsTheme);
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    const comments = document.getElementById(COMMENTS_ID);
    if (comments) comments.appendChild(script);

    return () => {
      const comments = document.getElementById(COMMENTS_ID);
      if (comments) comments.innerHTML = "";
    };
  }, [commentsTheme, issueTerm]);

  // Reload on theme change
  useEffect(() => {
    LoadComments();
  }, [LoadComments]);

  // Added `relative` to fix a weird bug with `utterances-frame` position
  return <div className="utterances-frame relative" id={COMMENTS_ID} />;
};
