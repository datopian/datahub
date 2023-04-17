import fs from 'fs';

import parse from '../lib/markdown.mjs';

import MDXPage from '../components/MDXPage';
import clientPromise from '@/lib/mddb';
import { getAuthorsDetails } from 'lib/getAuthorsDetails';
import Layout from 'components/Layout';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router.js';
import { collectHeadings } from '@flowershow/core';

export default function DRDPage({ source, frontMatter }) {
  source = JSON.parse(source);
  frontMatter = JSON.parse(frontMatter);

  const router = useRouter();

  const [tableOfContents, setTableOfContents] = useState([]);

  useEffect(() => {
    const headingNodes = document.querySelectorAll('h2,h3');
    const toc = collectHeadings(headingNodes);
    setTableOfContents(toc ?? []);
  }, [router.asPath]); // update table of contents on route change with next/link


  return (
    <Layout tableOfContents={tableOfContents} title={frontMatter.title}>
      <MDXPage source={source} frontMatter={frontMatter} />
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const urlPath = params.slug ? params.slug.join('/') : '';

  const mddb = await clientPromise;
  const dbFile = await mddb.getFileByUrl(urlPath);

  const dbBacklinks = await mddb.getLinks({
    fileId: dbFile._id,
    direction: 'backward',
  });
  // TODO temporary solution, we will have a method on MddbFile to get these links
  const dbBacklinkFilesPromises = dbBacklinks.map((link) =>
    mddb.getFileById(link.from)
  );
  const dbBacklinkFiles = await Promise.all(dbBacklinkFilesPromises);
  const dbBacklinkUrls = dbBacklinkFiles.map(
    (file) => file.toObject().url_path
  );

  // TODO we can already get frontmatter from dbFile.metadata
  // so parse could only return mdxSource
  const source = fs.readFileSync(dbFile.file_path, { encoding: 'utf-8' });
  const { mdxSource, frontMatter } = await parse(source, 'mdx', {
    backlinks: dbBacklinkUrls,
  });

  // Temporary, so that blogs work properly
  if (dbFile.url_path.startsWith('blog/')) {
    frontMatter.layout = 'blog';
    frontMatter.authorsDetails = await getAuthorsDetails(
      dbFile.metadata.authors
    );
  }

  return {
    props: {
      source: JSON.stringify(mdxSource),
      frontMatter: JSON.stringify(frontMatter),
    },
  };
};

export async function getStaticPaths() {
  const mddb = await clientPromise;
  let allDocuments = await mddb.getFiles({ extensions: ['md', 'mdx'] });

  //  Avoid duplicate path
  allDocuments = allDocuments.filter(
    (doc) => !doc.url_path.startsWith('data-literate/')
  );

  const paths = allDocuments.map((page) => {
    const parts = page.url_path.split('/');
    return { params: { slug: parts } };
  });

  return {
    paths,
    fallback: false,
  };
}
