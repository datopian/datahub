import { MDXRemote } from "next-mdx-remote";
import dynamic from "next/dynamic";
import { Mermaid } from "@flowershow/core";

import FrictionlessViewFactory from "./FrictionlessView";

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  Table: dynamic(() => import("./Table")),
  mermaid: Mermaid,
  // Excel: dynamic(() => import('../components/Excel')),
  // TODO: try and make these dynamic ...
  Vega: dynamic(() => import("./Vega")),
  VegaLite: dynamic(() => import("./VegaLite")),
  LineChart: dynamic(() => import("./LineChart")),
} as any;

export default function DRD({
  source,
  frictionless = {
    views: [],
    resources: [],
  },
}: {
  source: any;
  frictionless?: any;
}) {
  //  dynamic() can't be used inside of React rendering
  //  as it needs to be marked in the top level of the
  //  module for preloading to work
  components.FrictionlessView = FrictionlessViewFactory({
    views: frictionless.views,
    resources: frictionless.resources,
  });

  return <MDXRemote {...source} components={components} />;
}
