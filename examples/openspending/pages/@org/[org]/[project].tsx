import { NextSeo } from 'next-seo';
import getConfig from 'next/config';
import {
  getAllProjectsFromOrg,
  getProjectDataPackage,
  getProjectMetadata,
  getProjectReadme,
} from '../../../lib/project';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { loadDataPackage } from '../../../lib/loader';
import Layout from '../../../components/_shared/Layout';
import Link from 'next/link';
import { Project } from '../../../lib/project.interface';
import ExternalLinkIcon from '../../../components/icons/ExternalLinkIcon';
import { FlatUiTable } from '@portaljs/components';

export default function ProjectPage({
  project,
  readme,
}: {
  project: Project;
  readme: string;
}) {
  //  Get description from datapackage or  calculate
  //  excerpt from README by getting all the content
  //  up to the first dot.
  const description =
    project.description || (readme && readme.slice(0, readme.indexOf('.') + 1));

  return (
    <Layout>
      <NextSeo title={`${project.title} - OpenSpending`} />
      <main className="prose mx-auto my-8">
        <h1 className="mb-1 mt-16">{project.title || project.name}</h1>
        <Link target="_blank" href={project.repo.url}>
          @{project.repo.full_name}
        </Link>

        {description && (
          <div className="inline-block min-w-full py-2 align-middle mt-5">
            {description}
          </div>
        )}

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
                {project.datapackage.countryCode && (
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Country
                  </th>
                )}
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Metadata
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {project.name}
                </td>
                {project.datapackage.countryCode && (
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {project.datapackage.countryCode}
                  </td>
                )}

                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <Link
                    // TODO: this link may be incorrect for some datasets
                    href={`https://github.com/${project.owner.name}/${project.repo.name}/blob/main/datapackage.json`}
                    target="_blank"
                    className="flex items-center hover:text-gray-700"
                  >
                    datapackage.json <ExternalLinkIcon className="ml-1" />
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="mb-1 mt-10">Data files</h3>
        <p>
          This dataset contains {project.files.length} file
          {project.files.length == 1 ? '' : 's'}
        </p>
        <div className="inline-block min-w-full py-2 align-middle">
          <table className="mt-0 min-w-full divide-y divide-gray-300">
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
                  Format
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
              {project.files?.map((file) => {
                let size: number | string = file.size;

                if (!size) {
                  if (file.bytes) {
                    if (file.bytes > 1000000) {
                      size = (file.bytes / 1000000).toFixed(2) + ' MB';
                    } else {
                      size = (file.bytes / 1000).toFixed(2) + ' kB';
                    }
                  }
                }
                return (
                  <tr key={file.name}>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {file.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {file.format}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {size}
                    </td>

                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <Link
                        target="_blank"
                        href={
                          file.path.startsWith('http')
                            ? file.path
                            : `https://raw.githubusercontent.com/${project.owner.name}/${project.repo.name}/main/${file.path}`
                        }
                      >
                        Download
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-y-16 ">
          {project.files?.map((file) => {
            let size: number | string = file.size;

            if (!size) {
              if (file.bytes) {
                if (file.bytes > 1000000) {
                  size = (file.bytes / 1000000).toFixed(2) + ' MB';
                } else {
                  size = (file.bytes / 1000).toFixed(2) + ' kB';
                }
              }
            }
            return (
              <div key={file.name}>
                {file.path && (
                  <>
                    <h4>
                      {file.name}
                      {file.format ? `.${file.format}` : ''}
                    </h4>
                    {file.bytes >= 5132288 && (
                      <span>Previewing 5MB out of {size}</span>
                    )}
                    <FlatUiTable
                      url={
                        file.path.startsWith('http')
                          ? file.path
                          : `https://raw.githubusercontent.com/${project.owner.name}/${project.repo.name}/main/${file.path}`
                      }
                    />
                  </>
                )}
              </div>
            );
          })}
        </div>

        {readme && (
          <>
            <hr />

            <h2 className="uppercase font-black">Readme</h2>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{readme}</ReactMarkdown>
          </>
        )}
      </main>
    </Layout>
  );
}

// Generates `/posts/1` and `/posts/2`
export async function getStaticPaths() {
  const github_pat = getConfig().serverRuntimeConfig.github_pat;

  const allProjects = await getAllProjectsFromOrg(
    'os-data',
    'main',
    github_pat
  );

  const paths = allProjects.results.map((project) => ({
    params: {
      // TODO: dynamize the org
      org: 'os-data',
      project: project.repo.name,
    },
  }));

  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const { org: orgName, project: projectName } = params;

  const github_pat = getConfig().serverRuntimeConfig.github_pat;
  const datapackage = await getProjectDataPackage(
    orgName,
    projectName,
    'main',
    github_pat
  );

  const repo = await getProjectMetadata(orgName, projectName, github_pat);

  const project = loadDataPackage(datapackage, repo);

  // TODO: should this be moved to the loader?
  const readme = await getProjectReadme(
    orgName,
    projectName,
    'main',
    github_pat
  );

  return {
    props: {
      project,
      readme,
    },
  };
}
