import fs from 'fs';
import React from 'react';
import { GetStaticProps } from 'next';
import { BlogsList, SimpleLayout } from '@flowershow/core';
import clientPromise from '../../lib/mddb';
import type { CustomAppProps } from '../_app';
import Layout from '@/components/_shared/Layout';

interface BlogIndexPageProps extends CustomAppProps {
  blogs: any[]; // TODO types
}

export default function StoriesList({
  stories,
  meta: { title, description },
}: BlogIndexPageProps) {
  return (
    <Layout>
      <div className="blog-list">
        <SimpleLayout title={title} description={description}>
          <BlogsList blogs={stories} />
        </SimpleLayout>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const mddb = await clientPromise;
  const storiesFiles = await mddb.getFiles({ folder: 'stories' });

  const stories = storiesFiles.map((item) => ({
    _id: item._id,
    file_path: item.file_path,
    urlPath: item.url_path,
    date: item.metadata.date,
    ...item.metadata,
  }));

  return {
    props: {
      meta: {
        title: 'Data Stories',
        showSidebar: false,
        showToc: false,
        showComments: false,
        showEditLink: false,
        urlPath: '/stories',
      },
      stories: stories.sort((a, b) => {
        const bDate = new Date(b.date);
        const aDate = new Date(a.date);
        return bDate.getTime() - aDate.getTime();
      }),
    },
  };
};
