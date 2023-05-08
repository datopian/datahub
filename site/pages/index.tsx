import fs from 'fs';

import Community from '@/components/Community';
import Features from '@/components/Features';
import Showcases from '@/components/Showcases';
import { Hero } from '@/components/Hero';
import Layout from '../components/Layout';

export default function Home({ sidebarTree }) {
  return (
    <>
      <Layout>
        <Hero />
        {/* <HomeLayout> */}
        <Features />
        <Showcases />
        <Community />
        {/* </HomeLayout> */}
      </Layout>
    </>
  );
}

// export function getStaticProps() {
//   const tree = fs.readFileSync('public/home-sidebar-tree.json', {
//     encoding: 'utf-8',
//   });
//   const sidebarTree = JSON.parse(tree);

//   return {
//     props: {
//       sidebarTree,
//     },
//   };
// }
