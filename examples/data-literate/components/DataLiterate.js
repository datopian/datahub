import Layout from './Layout'
import Head from 'next/head'
import Excel from './Excel'
import Table from './Table'
import TableGrid from './TableGrid'
import LineChart from './LineChart'
import MetaData from './Metadata'
import { MDXProvider } from '@mdx-js/react'
import { Vega, VegaLite } from 'react-vega'

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  Table,
  Excel,
  Vega,
  VegaLite,
  LineChart,
  Head,
  TableGrid,
  MetaData,
}


export default function DataLiterate({ children }) {
  const { Component, pageProps } = children

  return (
    <Layout>
      <main>
        <MDXProvider components={components}>
          <div className="prose mx-auto">
            <Component {...pageProps} />
          </div>
        </MDXProvider>
      </main>
    </Layout>
  )
}
