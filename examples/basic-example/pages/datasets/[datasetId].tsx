import { promises as fs } from 'fs';
import { GetStaticProps } from 'next';
import path from 'path';
import parse from '../../lib/markdown';
import DRD from '../../components/DRD';

export async function getStaticPaths() {
  const contentDir = path.join(process.cwd(), '/content');
  const datasets = await fs.readdir(contentDir);
  return {
    paths: datasets.map((dataset) => ({ params: { datasetId: dataset } })),
    fallback: false, // can also be true or 'blocking'
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { datasetId } = context.params;
  const jsonDirectory = path.join(
    process.cwd(),
    '/content/' + datasetId + '/README.md'
  );
  const readme = await fs.readFile(jsonDirectory, 'utf8');
  let { mdxSource, frontMatter, excerpt } = await parse(readme, '.mdx');
  console.log(mdxSource, frontMatter, excerpt)
  return {
    props: {
      mdxSource,
      frontMatter,
      excerpt,
    },
  };
};

export default function DatasetPage({ mdxSource, frontMatter, excerpt }) {
  return (
    <div className="prose mx-auto">
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
        <DRD source={mdxSource} />
      </main>
    </div>
  );
}
