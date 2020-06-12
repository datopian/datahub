import { GetServerSideProps } from 'next'
import config from '../../../config'
import utils from '../../../utils'
import Head from 'next/head'
import Nav from '../../../components/Nav'
import About from '../../../components/dataset/About'
import Org from '../../../components/dataset/Org'
import Resources from '../../../components/dataset/Resources'

function Dataset({ datapackage }) {
  return (
    <>
      <Head>
        <title>Portal | {datapackage.title || datapackage.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <main className="p-6">
        <h1 className="text-3xl font-semibold text-primary mb-2">
          { datapackage.title || datapackage.name }
        </h1>
        <Org org={datapackage.organization} />
        <About datapackage={datapackage} />
        <Resources resources={datapackage.resources} />
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`${config.get('DMS')}/api/3/action/package_show?id=${context.query.dataset}`)
  const ckanResult = (await res.json()).result
  const datapackage = utils.ckanToDataPackage(ckanResult)
  return { props: { datapackage } }
}

export default Dataset
