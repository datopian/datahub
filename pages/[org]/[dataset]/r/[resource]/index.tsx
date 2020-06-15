import { GetServerSideProps } from 'next'
import { open } from 'data.js'
const toArray = require('stream-to-array')
import config from '../../../../../config'
import utils from '../../../../../utils'
import Head from 'next/head'
import Nav from '../../../../../components/Nav'
import About from '../../../../../components/resource/About'
import DataExplorer from '../../../../../components/resource/DataExplorer'
import DataView from '../../../../../components/resource/DataView'

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
        {
          resource.datastore_active
            ? <DataExplorer resource={resource} />
            : <DataView resource={resource} />
        }
        <About resource={resource} />
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
  // Fetch data and cache it under "_values" property
  // Consider 2 situations: data is in datastore vs data is in some other place, e.g., S3
  // If in datastore, we can use its API to get only first 100 rows etc.
  const file = open(resourceDescriptor)
  if (file.descriptor.datastore_active) {
    const api = file.descriptor.api || `${config.get('DMS')}/api/3/action/datastore_search?resource_id=${file.descriptor.id}`
    file.descriptor._values = (await (await fetch(api)).json()).result.records
  } else {
    const rowStream = await file.rows({ size: 100, keyed: true })
    file.descriptor._values = await toArray(rowStream)
  }
  await file.addSchema()
  return { props: { resource: file.descriptor } }
}

export default Resource
