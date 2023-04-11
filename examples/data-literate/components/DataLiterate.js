import Layout from '../components/Layout'
import { MDXRemote } from 'next-mdx-remote'
import Head from 'next/head'
import TableGrid from './TableGrid'
import Table from '../components/Table'
import Excel from '../components/Excel'
import LineChart from '../components/LineChart'
import { Vega, VegaLite } from 'react-vega'

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  Table,
  TableGrid,
  Excel,
  Vega,
  VegaLite,
  LineChart,
  Head,
}

export default function DataLiterate({ children, source, frontMatter }) {
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
