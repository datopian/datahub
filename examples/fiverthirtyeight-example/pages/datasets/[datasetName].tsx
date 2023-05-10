import { NextSeo } from 'next-seo';
import { promises as fs } from 'fs';
import path from 'path';
import getConfig from 'next/config';
import { getProjectReadme, GithubProject } from '@/lib/octokit';
import remarkGfm from 'remark-gfm';
import extract from 'remark-extract-frontmatter';
import { Dataset } from '..';
import { GetStaticProps } from 'next';
import { Table } from '@portaljs/components';
import Breadcrumbs from '@/components/Breadcrumbs';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkFrontmatter from 'remark-frontmatter';

export default function DatasetPage({
  dataset,
}: {
  dataset: Dataset & {
    readme: string | null;
  };
}) {
  return (
    <>
      <NextSeo title={`${dataset.name} page`} />
      <main className="max-w-5xl px-2 prose mx-auto my-8 prose-thead:border-b-4 prose-table:max-w-5xl prose-table:overflow-scroll prose-thead:overflow-scroll prose-tbody:overflow-scroll prose-thead:pb-2 prose-thead:border-zinc-900 prose-th:uppercase prose-th:text-left prose-th:font-light prose-th:text-xs">
        <Breadcrumbs links={[{ title: dataset.name, href: '' }]} />
        <h1 className="uppercase mb-0 mt-16">{dataset.name}</h1>
        <p className="mb-8">
          <span className="font-semibold">Repository:</span>{' '}
          <a target="_blank" href={dataset.url}>
            {dataset.url}
          </a>
        </p>

        <h2 className="mb-0 mt-10">FILES</h2>
        <div className="inline-block min-w-full py-2 align-middle">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="border-b-4 pb-2 border-zinc-900">
              <tr>
                <th
                  className="uppercase text-left font-light text-xs pb-3"
                  scope="col"
                >
                  Name
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {dataset.files?.map((file) => (
                <tr key={file}>
                  <td className="whitespace-nowrap text-left py-4 text-sm text-gray-500">
                    <a href={file}>{file.split('/').slice(-1)}</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {dataset.files && dataset.files.length > 0 && (
          <>
            <h2 className="mb-0 mt-10">PREVIEWS</h2>
            {dataset.files?.map((file) => (
              <div key={file} className="preview-table my-8">
                <Table url={file} />
              </div>
            ))}
          </>
        )}
        {dataset.readme && (
          <>
            <h2 className="uppercase font-black">Readme</h2>
            {dataset.readme && (
              <ReactMarkdown
                remarkPlugins={[
                  remarkFrontmatter,
                  remarkGfm,
                  [extract, { remove: true }],
                ]}
              >
                {dataset.readme}
              </ReactMarkdown>
            )}
          </>
        )}
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const datasetsFile = path.join(process.cwd(), 'datasets.json');
  const datasets = await fs.readFile(datasetsFile, 'utf8');

  return {
    paths: JSON.parse(datasets).map((dataset: Dataset) => {
      return {
        params: { datasetName: dataset.name },
      };
    }),
    fallback: false, // can also be true or 'blocking'
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const datasetsFile = path.join(process.cwd(), 'datasets.json');
  const datasetsString = await fs.readFile(datasetsFile, 'utf8');
  const datasets: Dataset[] = JSON.parse(datasetsString);
  const dataset: Dataset | undefined = datasets.find(
    (_dataset) => _dataset.name === params?.datasetName
  );
  const github_pat = getConfig().serverRuntimeConfig.github_pat;
  const readmes = await Promise.all(['/README.md', '/readme.md', '/Readme.md'].map(async (readme) => await getProjectReadme(
    'fivethirtyeight',
    'data',
    'master',
    dataset?.name + readme,
    github_pat
  )));
  const readme = readmes.find(item => item !== null)
  if (!readme) console.log('Readme not found for ' + dataset?.name)
  return {
    props: {
      dataset: {
        ...dataset,
        readme,
        files: dataset && dataset.files ? dataset.files : null,
      },
    },
  };
};
