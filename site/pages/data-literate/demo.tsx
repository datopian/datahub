import fs from "fs";

import parse from "../../lib/data-literate/markdown";

import DataLiterate from "../../components/data-literate/DataLiterate";

export default function PostPage({ source, frontMatter }) {
  return <DataLiterate source={source} frontMatter={frontMatter} />;
}

export const getStaticProps = async ({ params }) => {
  const mdxPath = "content/data-literate/demo.mdx";
  const source = fs.readFileSync(mdxPath);

  const { mdxSource, frontMatter } = await parse(source);

  return {
    props: {
      source: mdxSource,
      frontMatter: frontMatter,
    },
  };
};
