import Head from 'next/head';
import { useRouter } from 'next/router';

import DRD from '../../../../components/drd/DRD';
import parse from '../../../../lib/markdown';
import Project from '../../../../lib/project';
import { NextSeo } from 'next-seo';
import MDLayout from 'examples/simple-example/components/MDLayout';
import { promises as fs } from 'fs';
import path from 'path';

function CollectionsLayout({ children, ...frontMatter }) {
  const { title, date, description } = frontMatter;

  return (
    <article className="docs prose text-primary dark:text-primary-dark dark:prose-invert prose-headings:font-headings prose-a:break-words mx-auto p-6">
      <header>
        <div className="mb-6">
          {date && (
            <p className="text-sm text-zinc-400 dark:text-zinc-500">
              <time dateTime={date}>{date}</time>
            </p>
          )}
          {title && <h1 className="mb-2">{title}</h1>}
          {description && <p className="text-xl mt-0">{description}</p>}
        </div>
      </header>
      <section>{children}</section>
    </article>
  );
}

export default function ProjectPage({
  mdxSource,
  frontMatter,
  excerpt,
  project,
}) {
  const router = useRouter();

  return (
    <>
      <NextSeo title={`PortalJS - @${project.owner}/${project.name}`} />
      <Head>
        {/* 
          On index files, add trailling slash to the base path 
          see notes: https://github.com/datopian/datahub-next/issues/69
        */}
        <base href={router.asPath.split('#')[0] + '/'} />
      </Head>
      <main>
        <MDLayout
          layout={frontMatter.layout}
          excerpt={excerpt}
          project={project}
          {...frontMatter}
        >
          <DRD
            source={mdxSource}
            frictionless={{
              views: project.metadata?.views,
              resources: project.metadata?.resources,
            }}
          />
        </MDLayout>
      </main>
    </>
  );
}

// Generates `/posts/1` and `/posts/2`
export async function getStaticPaths() {
  const jsonDirectory = path.join(process.cwd(), '/examples/simple-example/datasets.json');
  const repos = await fs.readFile(jsonDirectory, 'utf8');

  return {
    paths: JSON.parse(repos).map(repo => ({ params: { org: repo.owner, project: repo.repo}})),
    fallback: false, // can also be true or 'blocking'
  }
}

export async function getStaticProps({ params }) {
  const { org: orgName, project: projectName } = params;

  const project = await Project.getFromGitHub(orgName, projectName);

  //  Defaults to README
  let content = project.readme;

  if (content === null) {
    return {
      notFound: true,
    };
  }

  let { mdxSource, frontMatter, excerpt } = await parse(content, '.mdx');

  if (project.metadata?.resources) {
    frontMatter.layout = 'datapackage';
  }

  return {
    props: {
      mdxSource,
      frontMatter,
      excerpt,
      project: project.serialize(),
    },
  };
}
