import dynamic from "next/dynamic.js";
// import { useTheme } from "next-themes";

import type { MermaidProps } from "mdx-mermaid/lib/Mermaid";
// import type { Config } from "mdx-mermaid/lib/config.model";

const MdxMermaid = dynamic(
  () => import("mdx-mermaid/lib/Mermaid").then((res) => res.Mermaid),
  { ssr: false }
);

export const Mermaid: React.FC<MermaidProps> = ({ ...props }) => {
  // TODO: add light and dark theme configs
  // currently Mermaid component doesn't render if configs are passed as props.

  // const { theme } = useTheme()
  // const config: Config = {
  //   mermaid: {
  //     fontFamily: "inherit",
  //     theme: theme
  //   }
  // }

  return <MdxMermaid {...props} />;
};
