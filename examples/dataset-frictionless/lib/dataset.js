import remark from 'remark'
import html from 'remark-html'
import { Dataset } from 'frictionless.js'
import toArray from 'stream-to-array'


export async function getDataset(directory) {
  try {

    if (!directory) {
      throw new Error('No directory provided.')
    }

    const f11sDataset = await Dataset.load(directory)
    const descriptor = f11sDataset.descriptor

    const resources = await Promise.all(f11sDataset.resources.map(async (resource) => {
      let _tmp = resource.descriptor
      let rowStream = await resource.rows({ keyed: true })
      _tmp.sample = await toArray(rowStream)
      _tmp.size = resource.size
      return _tmp
    }))

    const readme = descriptor.readme || ""

    const processed = await remark()
      .use(html)
      .process(readme)

    const readmeHtml = processed.toString()


    const dataset = {
      readme: readme,
      readmeHtml: readmeHtml,
      descriptor: descriptor,
      resources: resources,
      hasError: false,
      errorMsg: ""
    }
    return dataset
  } catch (err) {
    console.log(err)
    return {
      hasError: true,
      errorMsg: errorMessageMappings[err.message] || err.message
    }
  }
}


const errorMessageMappings = {
  "No datapackage.json at destination.":
    `
    <div>
      <p style="color:red;"><b>No datapackage.json file in the data directory!</b></p>
      <p >You need to add a datapackage.json file describing your dataset to the root folder.</p>
      <p>For more information, see <a style="color:blue;" href="https://specs.frictionlessdata.io/tabular-data-package/#example">the documentation</a></p>
    </div>
    `,
  "No directory provided.":
    `
    <div>
      <p style="color:red;"><b>No data directory found!</b></p>
      <p >You need to provide a data directory with CSV data, datapackage.json, and optionally a ReadMe file.</p>
      <p>For more information, see <a style="color:blue;" href="https://specs.frictionlessdata.io/tabular-data-package/#example">the documentation</a></p>
    </div>
  `,
}