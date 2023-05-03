import { promises as fs } from 'fs';
import path from 'path';
import parse from '../lib/markdown';
import DataRichDocument from '../components/DataRichDocument';

export const getStaticPaths = async () => {
  const contentDir = path.join(process.cwd(), '/content/');
  const contentFolders = await fs.readdir(contentDir, 'utf8');
  const paths = contentFolders.map((folder: string) =>
    folder === 'index.md'
      ? { params: { path: [] } }
      : { params: { path: [folder] } }
  );
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  let pathToFile = 'index.md';
  if (context.params.path) {
    pathToFile = context.params.path.join('/') + '/index.md';
  }

  const indexFile = path.join(process.cwd(), '/content/' + pathToFile);
  const readme = await fs.readFile(indexFile, 'utf8');
  let { mdxSource, frontMatter } = await parse(readme, '.mdx');
  return {
    props: {
      mdxSource,
      frontMatter,
    },
  };
};

export default function DatasetPage({ mdxSource, frontMatter }) {
  return (
    <div className="prose dark:prose-invert mx-auto">
      <header>
        <div className="mb-6">
          <>
            <h1>{frontMatter.title}</h1>
            {frontMatter.author && (
              <div className="-mt-6">
                <p className="opacity-60 pl-1">{frontMatter.author}</p>
              </div>
            )}
            {frontMatter.description && (
              <p className="description">{frontMatter.description}</p>
            )}
          </>
        </div>
      </header>
      <main>
        <DataRichDocument source={mdxSource} />
      </main>
    </div>
  );
}
