import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/Nav'
import Input from '../components/search/Input'

export default function Home() {
  return (
    <>
      <Head>
        <title>Portal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <section className="flex mt-10 ml-40 justify-center">
        <div>
          <img src="/banner.png" width="500" />
        </div>
        <div className="mx-32">
          <h1 className="text-4xl font-thin">Find, Share and Publish <br /> Quality Data with <span className="text-orange-500">Datahub</span>
          </h1>
          <p className="text-md font-light w-4/5">At Datahub, we have over thousands of datasets for free and a Premium Data Service for additional or customised data with guaranteed updates.</p>
          <Input query={{}} />
        </div>
      </section>
    </>
  )
}
