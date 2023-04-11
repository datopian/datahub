import Head from 'next/head'
import SheetJSApp from '../components/ExcelViewerApp.js'
import Layout from '../components/Layout'

export default function Index() {
  return (
    <Layout title='Excel Viewer'>
      <h1>Excel Viewer</h1>
      <SheetJSApp />
    </Layout>
  )
}
