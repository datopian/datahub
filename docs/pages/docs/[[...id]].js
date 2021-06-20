import path from 'path'
import * as fs from 'fs'
import Link from 'next/link'

import Layout from '../../components/layout'
import Prose from '../../components/prose'
import { formatMD } from '../../lib/utils'

export default function Docs({ title, mdFile }) {
  return (
    <Layout title="Portal.js Documentation - {title}">
      <Prose mdFile={mdFile}>
        <p className="text-center">
          <Link href="/installation">
            <button>Next Page</button>
          </Link>
        </p>
      </Prose>
    </Layout>
  )
}

const postsDirectory = 'markdowns/docs'

export async function getStaticProps({params}) {
  const postId = params.id ? params.id : 'index'
  const mdFilePath = path.join(postsDirectory, postId + '.md')
  const mdFile = await formatMD(mdFilePath)
  return {
    props: {
      mdFile
    }
  }
}

export async function getStaticPaths() {
  const fileNames = fs.readdirSync(postsDirectory)
  const paths = fileNames.map(fileName => {
    if (fileName == 'index.md') {
      return {
        params: {
          id: null
        }
      }
    } else {
      return {
        params: {
          id: [ fileName.replace(/\.md$/, '') ]
        }
      }
    }
  })
  return {
    paths: paths,
    fallback: false
  }
}
