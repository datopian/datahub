import { existsSync, promises as fs } from 'fs';
import path from 'path';
import parse from '../lib/markdown';

import DataRichDocument from '../components/DataRichDocument';
import clientPromise from '../lib/mddb';

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

  let datasets = [];
  const mddbFileExists = existsSync('markdown.db');
  if (mddbFileExists) {
    const mddb = await clientPromise;
    const datasetsFiles = await mddb.getFiles({
      extensions: ['md', 'mdx'],
    });
    datasets = datasetsFiles
      .filter((dataset) => dataset.url_path !== '/')
      .map((dataset) => ({
        _id: dataset._id,
        url_path: dataset.url_path,
        file_path: dataset.file_path,
        metadata: dataset.metadata,
      }));
  }

  const indexFile = path.join(process.cwd(), '/content/' + pathToFile);
  const readme = await fs.readFile(indexFile, 'utf8');

  let { mdxSource, frontMatter } = await parse(readme, '.mdx', { datasets });

  return {
    props: {
      mdxSource,
      frontMatter: JSON.stringify(frontMatter),
    },
  };
};

export default function DatasetPage({ mdxSource, frontMatter }) {
  frontMatter = JSON.parse(frontMatter);
  return (
    <div className="prose dark:prose-invert mx-auto py-8">
      <header>
        <div className="mb-6">
          <>
            <h1 className="mb-2">{frontMatter.title}</h1>
            {frontMatter.author && (
              <p className="my-0">
                <span className="font-semibold">Author: </span>
                <span className="my-0">{frontMatter.author}</span>
              </p>
            )}
            {frontMatter.description && (
              <p className="my-0">
                <span className="font-semibold">Description: </span>
                <span className="description my-0">
                  {frontMatter.description}
                </span>
              </p>
            )}
            {frontMatter.modified && (
              <p className="my-0">
                <span className="font-semibold">Modified: </span>
                <span className="description my-0">
                  {new Date(frontMatter.modified).toLocaleDateString("en-US")}
                </span>
              </p>
            )}
            {frontMatter.files && (
              <section className="py-6">
                <h2 className="mt-0">Data files</h2>
                <table className="table-auto">
                  <thead>
                    <tr>
                      <th>File</th>
                      <th>Format</th>
                    </tr>
                  </thead>
                  <tbody>
                    {frontMatter.files.map((f) => {
                      const fileName = f.split('/').slice(-1);
                      return (
                        <tr key={`resources-list-${f}`}>
                          <td>
                            <a target="_blank" href={f}>
                              {fileName}
                            </a>
                          </td>
                          <td>
                            {fileName[0].split('.').slice(-1)[0].toUpperCase()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </section>
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
