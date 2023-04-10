import Layout from '../Layout'

import { MDXRemote } from 'next-mdx-remote'
import dynamic from 'next/dynamic'
import Head from 'next/head'

import CustomLink from '../CustomLink'
import { Vega, VegaLite } from 'react-vega'

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  a: CustomLink,
  Table: dynamic(() => import('./Table')),
  Excel: dynamic(() => import('./Excel')),
  // TODO: try and make these dynamic ...
  Vega: Vega,
  VegaLite: VegaLite,
  LineChart: dynamic(() => import('./LineChart')),
  Head,
}

export default function DataLiterate({ source, frontMatter }) {
  return (
    <Layout title={frontMatter.title}>
      <div className="prose mx-auto">
        <header>
          <div className="mb-6">
            <h1>{frontMatter.title}</h1>
            {frontMatter.author && (
              <div className="-mt-6"><p className="opacity-60 pl-1">{frontMatter.author}</p></div>
            )}
            {frontMatter.description && (
              <p className="description">{frontMatter.description}</p>
            )}
          </div>
        </header>
        <main>
          <MDXRemote {...source} components={components} />
        </main>
      </div>
    </Layout>
  )
}
