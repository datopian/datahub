import { Container } from '../components/Container'
import clientPromise from '../lib/mddb'
import { promises as fs } from 'fs';
import { MDXRemote } from 'next-mdx-remote'
import { Card } from '../components/Card'
import Head from 'next/head'
import parse from '../lib/markdown'
import { Mermaid } from '@portaljs/core';

export const getStaticProps = async ({ params }) => {
  const urlPath = params.slug ? params.slug.join('/') : ''

  const mddb = await clientPromise
  const dbFile = await mddb.getFileByUrl(urlPath)

  const source = await fs.readFile(dbFile.file_path,'utf-8')
  let mdxSource = await parse(source, '.mdx')

  return {
    props: {
      mdxSource,
    },
  }
}

export async function getStaticPaths() {
  const mddb = await clientPromise
  const allDocuments = await mddb.getFiles({ extensions: ['md', 'mdx'] })

  const paths = allDocuments.filter(document => document.url_path !== '/').map((page) => {
    const parts = page.url_path.split('/')
    return { params: { slug: parts } }
  })

  return {
    paths,
    fallback: false,
  }
}

const isValidUrl = (urlString) => {
  try {
    return Boolean(new URL(urlString))
  } catch (e) {
    return false
  }
}

const Meta = ({keyValuePairs}) => {
  const prettifyMetaValue = (value) => value.replaceAll('-',' ').charAt(0).toUpperCase() + value.replaceAll('-',' ').slice(1);
  return (
    <>
      {keyValuePairs.map((entry) => {
        return isValidUrl(entry[1]) ? (
          <Card.Description>
            <span className="font-semibold">
              {prettifyMetaValue(entry[0])}: {' '}
            </span>
              <a
                className="text-ellipsis underline transition hover:text-teal-400 dark:hover:text-teal-900"
                href={entry[1]}
              >
                {entry[1]}
              </a>
          </Card.Description>
        ) : (
          <Card.Description>
            <span className="font-semibold">{prettifyMetaValue(entry[0])}: </span>
            {Array.isArray(entry[1]) ? entry[1].join(', ') : entry[1]}
          </Card.Description>
        )
      })}
    </>
  )
}

export default function DRDPage({ mdxSource }) {
  const meta = mdxSource.frontMatter
  const keyValuePairs = Object.entries(meta).filter(
    (entry) => entry[0] !== 'title'
  )
  return (
    <>
      <Head>
        <title>{meta.title}</title>
      </Head>
      <Container className="mt-9 relative">
        <article>
          <header className="flex flex-col">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              {meta.title}
            </h1>
            <Card as="article">
              <Meta keyValuePairs={keyValuePairs} />
            </Card>
          </header>
          <div className="prose dark:prose-invert">
            <MDXRemote {...mdxSource.mdxSource} components={{mermaid: Mermaid}} />
          </div>
        </article>
      </Container>
    </>
  )
}
