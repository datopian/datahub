import { Container } from '../components/Container'
import clientPromise from '../lib/mddb'
import fs from 'fs'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { Card } from '../components/Card'

export const getStaticProps = async ({ params }) => {
  const urlPath = params.slug ? params.slug.join('/') : ''

  const mddb = await clientPromise
  const dbFile = await mddb.getFileByUrl(urlPath)

  const source = fs.readFileSync(dbFile.file_path, { encoding: 'utf-8' })
  const mdxSource = await serialize(source, { parseFrontmatter: true })

  return {
    props: {
      mdxSource,
    },
  }
}

export async function getStaticPaths() {
  const mddb = await clientPromise
  const allDocuments = await mddb.getFiles({ extensions: ['md', 'mdx'] })

  const paths = allDocuments.map((page) => {
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
  const meta = mdxSource.frontmatter
  const keyValuePairs = Object.entries(meta).filter(
    (entry) => entry[0] !== 'title'
  )
  return (
    <>
      <Container className="mt-16 lg:mt-32">
        <article>
          <header className="flex flex-col">
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              {meta.title}
            </h1>
            <Card as="article">
              <Meta keyValuePairs={keyValuePairs} />
            </Card>
          </header>
          <div className="prose dark:prose-invert">
            <MDXRemote {...mdxSource} />
          </div>
        </article>
      </Container>
    </>
  )
}
