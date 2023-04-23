import Head from 'next/head';
import { useRouter } from 'next/router';

import { NextSeo } from 'next-seo';
import { promises as fs } from 'fs';
import path from 'path';
import getConfig from 'next/config';
import { getProject, GithubProject } from '../../../lib/octokit';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';

export default function ProjectPage({ project }) {
  return (
    <>
      <NextSeo title={`PortalJS - @${project.repo_config.owner}/${project.repo_config.repo}${project.base_path !== '/' ? '/' + project.base_path : ''}`} />
      <main className="prose mx-auto my-8">
        <Link href='/'>Back to homepage</Link>
        <h1 className="mb-0">Data</h1>
        <div className="inline-block min-w-full py-2 align-middle">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Size
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {project.files.map((file) => (
                <tr key={file.download_url}>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <a href={file.download_url}>{file.name}</a>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {file.size} Bytes
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h1>Readme</h1>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {project.readmeContent}
        </ReactMarkdown>
      </main>
    </>
  );
}

// Generates `/posts/1` and `/posts/2`
export async function getStaticPaths() {
  const project_name = getConfig().serverRuntimeConfig.project_name;
  const jsonDirectory = path.join(
    process.cwd(),
    `/examples/${project_name}/datasets.json`
  );
  const repos = await fs.readFile(jsonDirectory, 'utf8');

  return {
    paths: JSON.parse(repos).map((repo) => {
      const projectPath =
        repo.readme.split('/').length > 1
          ? repo.readme.split('/').slice(0, -1)
          : null;
      let path = [repo.repo];
      if (projectPath) {
        projectPath.forEach((element) => {
          path.push(element);
        });
      }
      return {
        params: { org: repo.owner, path },
      };
    }),
    fallback: false, // can also be true or 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const project_name = getConfig().serverRuntimeConfig.project_name;
  const jsonDirectory = path.join(
    process.cwd(),
    `/examples/${project_name}/datasets.json`
  );
  const reposFile = await fs.readFile(jsonDirectory, 'utf8');
  const repos: GithubProject[] = JSON.parse(reposFile);
  const repo = repos.find((_repo) => {
    const projectPath =
      _repo.readme.split('/').length > 1
        ? _repo.readme.split('/').slice(0, -1)
        : null;
    let path = [_repo.repo];
    if (projectPath) {
      projectPath.forEach((element) => {
        path.push(element);
      });
    }
    return (
      _repo.owner == params.org &&
      JSON.stringify(path) === JSON.stringify(params.path)
    );
  });
  const github_pat = getConfig().serverRuntimeConfig.github_pat;
  const project = await getProject(repo, github_pat);
  return {
    props: {
      project: { ...project, repo_config: repo },
    },
  };
}
