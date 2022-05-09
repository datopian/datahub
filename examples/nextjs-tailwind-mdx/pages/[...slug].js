import fs from 'fs'
import path from 'path'

import parse from '../lib/mdx.js'
import MdxPage from '../components/MDX'


export default function Page({ source, frontMatter, title }) {
  return (
    <MdxPage source={source} frontMatter={frontMatter} />
  )
}


const CONTENT_PATH = path.join(process.cwd(), 'content/')

export const getStaticProps = async ({ params }) => {
  const mdxPath = path.join(CONTENT_PATH, `${params.slug.join('/')}.mdx`)
  const postFilePath = fs.existsSync(mdxPath) ? mdxPath : mdxPath.slice(0, -1)
  const source = fs.readFileSync(postFilePath)

  const { mdxSource, frontMatter } = await parse(source)

  return {
    props: {
      source: mdxSource,
      frontMatter: frontMatter,
      title: frontMatter.title || ''
    },
  }
}

export const getStaticPaths = async () => {
  const walkSync = (dir, filelist = []) => {
    fs.readdirSync(dir).forEach(file => {
      const tpath = fs.statSync(path.join(dir, file))
      if (tpath.isDirectory()) {
        filelist = walkSync(path.join(dir, file), filelist)
      } else {
        filelist = filelist.concat(path.join(dir, file))
      }
    })
    return filelist
  }

  // postFilePaths is the list of all mdx files inside the CONTENT_PATH directory
  var filePaths = walkSync(CONTENT_PATH)
    .map((file) => { return file.slice(CONTENT_PATH.length) })
    // Only include md(x) files
    .filter((path) => /\.mdx?$/.test(path))

  var filePaths = filePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ''))

  // Map the path into the static paths object required by Next.js
  const paths = filePaths.map((slug) => {
    // /demo => [demo]
    const parts = slug.split('/')
    return { params: { slug: parts } }
  })

  return {
    paths,
    fallback: false,
  }
}

