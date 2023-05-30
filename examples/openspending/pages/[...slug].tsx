import fs from 'fs';
import clientPromise from '@/lib/mddb';
import { GetStaticProps } from 'next';
import Layout from '../components/_shared/Layout';
import ReactMarkdown from 'react-markdown';
import { formatDate } from '@/utils/formatDate';
import rehypeRaw from "rehype-raw";
import matter from 'gray-matter'

export default function Page({ source, meta }) {
  return (
    <Layout>
      <article className="docs prose-a:text-primary dark:prose-a:text-primary-dark prose-strong:text-primary dark:prose-strong:text-primary-dark prose-code:text-primary dark:prose-code:text-primary-dark prose-headings:text-primary dark:prose-headings:text-primary-dark prose text-primary dark:text-primary-dark prose-headings:font-headings dark:prose-invert prose-a:break-words mx-auto p-6">
        <header>
          <div className="mb-4 flex-col items-center">
            {meta.title && (
              <h1 className="flex justify-center">{meta.title}</h1>
            )}
            {meta.date && (
              <p className="text-sm text-zinc-400 dark:text-zinc-500 flex justify-center">
                <time dateTime={meta.date}>{formatDate(meta.date)}</time>
              </p>
            )}
          </div>
        </header>
        <section>
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>{source}</ReactMarkdown>
        </section>
      </article>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const urlPath = params?.slug ? (params.slug as string[]).join('/') : '/';

  const mddb = await clientPromise;
  const dbFile = await mddb.getFileByUrl(urlPath);

  let source = fs.readFileSync(dbFile.file_path, { encoding: 'utf-8' });
  let {content } = matter(source);
  return {
    props: {
      source: content,
      meta: dbFile.metadata,
    },
  };
};

export async function getStaticPaths() {
  const mddb = await clientPromise;
  let allDocuments = await mddb.getFiles({ extensions: ['md', 'mdx'] });

  const paths = allDocuments
    .filter((page) => page.metadata?.isDraft !== true)
    .map((page) => {
      const parts = page.url_path!.split('/');
      return { params: { slug: parts } };
    });

  return {
    paths,
    fallback: false,
  };
}
