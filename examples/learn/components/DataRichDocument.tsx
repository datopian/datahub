import { MDXRemote } from 'next-mdx-remote';
import dynamic from 'next/dynamic';
import { Mermaid } from '@flowershow/core';

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  Table: dynamic(() => import('../portaljs/components/Table').then(mod => mod.Table)),
  Catalog: dynamic(() => import('../portaljs/components/Catalog').then(mod => mod.Catalog)),
  mermaid: Mermaid,
  Vega: dynamic(() => import('../portaljs/components/Vega').then(mod => mod.Vega)),
  VegaLite: dynamic(() => import('../portaljs/components/VegaLite').then(mod => mod.VegaLite)),
  LineChart: dynamic(() => import('../portaljs/components/LineChart').then(mod => mod.LineChart)),
  FlatUiTable: dynamic(() => import('../portaljs/components/FlatUiTable').then(mod => mod.FlatUiTable)),
} as any;

export default function DRD({ source }: { source: any }) {
  return <MDXRemote {...source} components={components} />;
}
