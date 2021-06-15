import Link from 'next/link'
import path from 'path'

import Layout from '../components/layout'
import Prose from '../components/prose'
import { formatMD } from '../lib/utils'

export default function Docs({ mdFile }) {
  return (
    <Layout title="Portal.js Reference Documentation">
      <Prose mdFile={mdFile}>
      </Prose>
    </Layout>
  )
}



export async function getStaticProps() {
    const mdFilePath = path.join(process.cwd(), "markdowns/api-doc/references.md")
    const mdFile = await formatMD(mdFilePath)
    return {
        props: {
            mdFile
        }
    }
}
