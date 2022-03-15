import fs from 'fs'
import path from 'path'

import parse from '../lib/markdown.js'

import DataLiterate from '../components/DataLiterate'

import { postFilePaths, POSTS_PATH } from '../lib/mdxUtils'


export default function PostPage({ source, frontMatter }) {
  return (
    <DataLiterate source={source} frontMatter={frontMatter} />
  )
}

export const getStaticProps = async ({ params }) => {
  const mdxPath = path.join(POSTS_PATH, `${params.slug.join('/')}.mdx`)
  const postFilePath = fs.existsSync(mdxPath) ? mdxPath : mdxPath.slice(0, -1)
  const source = fs.readFileSync(postFilePath)

  const { mdxSource, frontMatter } = await parse(source)

  return {
    props: {
      source: mdxSource,
      frontMatter: frontMatter,
    },
  }
}

export const getStaticPaths = async () => {
  var paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ''))

  // Map the path into the static paths object required by Next.js
  paths = paths.map((slug) => {
    // /demo => [demo]
    const parts = slug.slice(1).split('/')
    return { params: { slug: parts } }
  })

  return {
    paths,
    fallback: false,
  }
}
