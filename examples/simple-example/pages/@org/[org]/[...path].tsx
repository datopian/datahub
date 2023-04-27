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
import Footer from '../../../components/Footer';
import NavBar from '../../../components/NavBar';

export default function ProjectPage({ project }) {
  return (
    <>
      <NextSeo
        title={`PortalJS - @${project.repo_config.owner}/${
          project.repo_config.repo
        }${project.base_path !== '/' ? '/' + project.base_path : ''}`}
      />
      <NavBar />
      <main className="mx-auto my-8 max-w-7xl sm:px-6 lg:px-8 px-4">
        <div className="prose">
          <h1 className="mb-0">Data</h1>
        </div>
        <div className="inline-block min-w-full py-4 align-middle">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Size
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Download
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {project.files.map((file) => (
                  <tr key={file.download_url}>
                    <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {file.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {file.size} Bytes
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500">
                      <a
                        className="rounded-md bg-indigo-600 no-underline px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        href={file.download_url}
                      >
                        Download file
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="prose py-4 max-w-7xl">
          <h1>Readme</h1>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {project.readmeContent}
          </ReactMarkdown>
        </div>
      </main>
      <Footer />
    </>
  );
}

// Generates `/posts/1` and `/posts/2`
export async function getStaticPaths() {
  const jsonDirectory = path.join(process.cwd(), 'datasets.json');
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
  const jsonDirectory = path.join(process.cwd(), 'datasets.json');
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
