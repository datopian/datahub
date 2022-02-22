import React from 'react'
import {
  PlotlyChart,
  ReadMe,
  DataExplorer,
} from 'portal'
import path from 'path'
import Head from 'next/head'
import { getDataset } from '../lib/dataset'
import { addView } from '../lib/utils'

const datasetsDirectory = process.env.PORTAL_DATASET_PATH || path.join(process.cwd(), "public", "country-codes")

export default function Home({ dataset, specs }) {

  if (!dataset || dataset.hasError) {
    return (
      <div className="container">
        <Head>
          <title>Dataset</title>
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Inconsolata&display=swap" rel="stylesheet" />
        </Head>
        <h1
          data-testid="datasetTitle"
          className="m-10 text-center"
          dangerouslySetInnerHTML={{ __html: dataset.errorMsg }}>
        </h1>
      </div>
    )
  }

  const descriptor = dataset['descriptor']
  const resources = dataset['resources']

  return (
    <div className="container">
      <Head>
        <title>Dataset</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inconsolata&display=swap" rel="stylesheet" />
      </Head>


      <section name="key-info">
        <h1 className="text-3xl font-bold m-8">{descriptor.title}</h1>
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
        <div className='ml-3'>
          <DataExplorer resources={resources} />
        </div>
      </section>

      <section name="sample-table">
        {
          dataset.readmeHtml != "" ? (
            <div>
              <h1 className="text-2xl font-bold ml-8">README</h1>
              <ReadMe readme={dataset.readmeHtml} />
            </div>
          ) : (
            ""
          )
        }
      </section>

    </div>
  )
}


export async function getStaticProps() {
  const dataset = await getDataset(datasetsDirectory)

  if (dataset.hasError == true) {
    return {
      props: {
        dataset
      }
    }
  } else {
    const datasetWithViews = addView(dataset)
    return datasetWithViews
  }

}
