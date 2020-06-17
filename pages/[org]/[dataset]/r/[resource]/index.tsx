import { GetServerSideProps } from 'next'
import config from '../../../../../config'
import utils from '../../../../../utils'
import Head from 'next/head'
import Nav from '../../../../../components/Nav'
import About from '../../../../../components/resource/About'
import DataExplorer from '../../../../../components/resource/DataExplorer'

function Resource({ resource }) {
  return (
    <>
      <Head>
        <title>Portal | {resource.title || resource.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <main className="p-6">
        <h1 className="text-3xl font-semibold text-primary mb-2">
          { resource.title || resource.name }
        </h1>
        <About resource={resource} />
        <DataExplorer resource={resource} />
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`${config.get('DMS')}/api/3/action/package_show?id=${context.query.dataset}`)
  const ckanResult = (await res.json()).result
  // Only keep single resource
  ckanResult.resources = ckanResult.resources.filter(resource => {
    return resource.name === context.query.resource || resource.id === context.query.resource
  })
  const resourceDescriptor = utils.ckanToDataPackage(ckanResult).resources[0]
  return { props: { resource: resourceDescriptor } }
}

export default Resource
