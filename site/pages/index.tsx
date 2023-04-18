import Features from '@/components/Features';
import { Hero } from '@/components/Hero';
import { UnstyledLayout } from '@flowershow/core';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <>
      <Layout>
        <UnstyledLayout>
          <Hero />
          <Features />
        </UnstyledLayout>
      </Layout>
    </>
  );
}
