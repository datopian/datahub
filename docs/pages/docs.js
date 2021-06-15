import Head from 'next/head'
import Link from 'next/link'
import path from 'path'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { formatMD } from '../lib/utils'

export default function Docs({ mdFile }) {
  return (
    <>
      <Head>
        <title>Portal.js API Documentation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <div className="prose mx-auto my-24">
        <div dangerouslySetInnerHTML={{ __html: mdFile }} />
        <p className="text-center">
          <Link href="/installation">
            <button>Next Page</button>
          </Link>
        </p>
      </div>
      <Footer />
    </>
  )
}


export async function getStaticProps() {
    const mdFilePath = path.join(process.cwd(), "markdowns/api-doc/introduction.md")
    const mdFile = await formatMD(mdFilePath)
    return {
        props: {
            mdFile
        }
    }
}
