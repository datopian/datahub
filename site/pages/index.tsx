import Community from '@/components/Community';
import Features from '@/components/Features';
import Gallery from '@/components/Gallery';
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
          <Gallery />
          <Community />
        </UnstyledLayout>
      </Layout>
    </>
  );
}
