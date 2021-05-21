import {
  ResourceInfo,
  KeyInfo,
  PlotlyChart,
  Table,
  ReadMe
} from 'portal'
import path from 'path'
import Head from 'next/head'
import { getDataset } from '../lib/dataset'
import { addView } from '../lib/utils'

const datasetsDirectory = process.env.PORTAL_DATASET_PATH || path.join(process.cwd(), "public", "dataset")

export default function Home({ dataset, specs }) {

  if (!dataset) {
    return (
      <div className="container">
        <Head>
          <title>Dataset</title>
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Inconsolata&display=swap" rel="stylesheet" />
        </Head>
        <h1 data-testid="datasetTitle" className="text-3xl font-bold mb-8">
          No dataset found in path
        </h1>
      </div>
    )
  }

  const descriptor = dataset['descriptor']
  const resources = dataset['resources']

  const columns = resources[0].schema.fields.map((field) => {
    return { field: field.name, headerName: field.name }
  })
  const tableSample = resources[0].sample

  return (
    <div className="container">
      <Head>
        <title>Dataset</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inconsolata&display=swap" rel="stylesheet" />
      </Head>


      <section className="m-8" name="key-info">
        <KeyInfo descriptor={descriptor} resources={resources} />
      </section>

      <section className="m-8" name="file-list">
        <ResourceInfo resources={resources} />
      </section>

      <section className="m-8" name="graph">
        <h1 className="text-2xl font-bold mb-4">Graph</h1>
        {!specs || Object.keys(specs).length == 0 ? (<div>
          <h1>No graph to display</h1>
        </div>) :
          (
            Object.values(JSON.parse(specs)).map((spec, i) => {
              if (["simple", "plotly"].includes(spec.specType)) {
                return (
                  <div key={`${i}_views`}>
                    <PlotlyChart spec={spec} />
                  </div>
                )
              }
            })

          )}
      </section>

      <section className="m-8" name="sample-table" >
        <h1 className="text-2xl font-bold mb-4">Data Preview</h1>
        <h2 className="text-1xl">{descriptor.title}</h2>
        {resources[0].sample ? (
          <Table columns={columns} data={tableSample} />
        ) : (
          'No preview is available for this dataset'
        )}
      </section>

      <section className="m-8" name="sample-table">
        <h1 className="text-2xl font-bold mb-4">README</h1>
        <ReadMe readme={dataset.readmeHtml} />
      </section>

    </div>
  )
}


export async function getStaticProps() {
  if (!datasetsDirectory) {
    return { props: {} }
  }

  const dataset = await getDataset(datasetsDirectory)
  const datasetWithViews = addView(dataset)
  return datasetWithViews

}
