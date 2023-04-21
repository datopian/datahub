import Layout from '@/components/Layout';
import clientPromise from '@/lib/mddb';
import { BlogsList, SimpleLayout } from '@flowershow/core';

export default function Blog({ blogs }) {
  return (
    <>
      <Layout>
        <SimpleLayout title="Blog posts">
          <BlogsList blogs={blogs} />
        </SimpleLayout>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const mddb = await clientPromise;
  let blogs = await mddb.getFiles({
    folder: 'blog',
    extensions: ['md', 'mdx'],
  });

  //  Temporary, while MarkdownDB doesn't support filetypes
  //  Merges docs that have the "blog" filetype
  let docs = await mddb.getFiles({
    folder: 'docs',
    extensions: ['md', 'mdx'],
  });

  docs = docs.filter((doc) => doc.metadata.filetype === 'blog');

  blogs = [...blogs, ...docs];

  const blogsSorted = blogs.sort(
    (a, b) =>
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  );

  //  Temporary, flowershow/BlogsList expects the contentlayer fields
  const blogsObjects = blogsSorted.map((b) => {
    return { ...b, ...b.metadata };
  });

  return {
    props: {
      blogs: blogsObjects,
    },
  };
}
