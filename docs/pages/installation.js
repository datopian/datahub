import Link from 'next/link'
import path from 'path'

import Layout from '../components/layout'
import Prose from '../components/prose'
import { formatMD } from '../lib/utils'

export default function Docs({ mdFile }) {
  return (
    <Layout title="Portal.js Installation">
      <Prose mdFile={mdFile}>
        <p className="text-center">
          <Link href="/references">
            <button>Next Page</button>
          </Link>
        </p>
      </Prose>
    </Layout>
  )
}


export async function getStaticProps() {
    const mdFilePath = path.join(process.cwd(), "markdowns/api-doc/installation.md")
    const mdFile = await formatMD(mdFilePath)
    return {
        props: {
            mdFile
        }
    }
}
