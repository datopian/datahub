import DRD from "../../../components/drd/DRD";
import MDLayout from "../../../components/MDLayout";
import parse from "../../../lib/markdown";
import Project from "../../../lib/project";
import { NextSeo } from "next-seo";

export default function ProjectFile({ mdxSource, frontMatter, project }) {
  return (
    <>
      <NextSeo title={`DataHub - @${project.owner}/${project.name}`} />
      <MDLayout layout={frontMatter.layout} {...frontMatter}>
        <DRD source={mdxSource} />
      </MDLayout>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { org: orgName, project: projectName, slug } = params;

  const project = await Project.getFromGitHub(orgName, projectName);

  let content = null;

  try {
    content = await project.getFileContent(slug.join("/") + ".md");
  } catch (e) {
    return {
      notFound: true,
    };
  }

  const { mdxSource, frontMatter } = await parse(content, ".mdx");

  return {
    props: {
      mdxSource,
      frontMatter,
      project: project.serialize(),
      slug: slug || [],
    },
  };
}

