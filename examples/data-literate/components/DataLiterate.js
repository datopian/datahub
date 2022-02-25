import Layout from '../components/Layout'
import Head from 'next/head'
import Excel from '../components/Excel'
import Table from '../components/Table'
import TableGrid from '../components/TableGrid'
import LineChart from '../components/LineChart'
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
  TableGrid
}


export default function DataLiterate({ children }) {
  const { Component, pageProps } = children

  return (
    <Layout title={pageProps.title}>
      <div className="prose mx-auto">
        <header>
          <div className="mb-6">
            <h1>{pageProps.title}</h1>
            {pageProps.author && (
              <div className="-mt-6"><p className="opacity-60 pl-1">{pageProps.author}</p></div>
            )}
            {pageProps.description && (
              <p className="description">{pageProps.description}</p>
            )}
          </div>
        </header>
        <main>
          <MDXProvider components={components}>
            <Component {...pageProps} />
          </MDXProvider>
        </main>
      </div>
    </Layout>
  )
}
