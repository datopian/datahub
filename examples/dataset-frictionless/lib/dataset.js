import remark from 'remark'
import html from 'remark-html'
import { Dataset } from 'frictionless.js'
import toArray from 'stream-to-array'


export async function getDataset(directory) {
  // get dataset descriptor and resources
  const f11sDataset = await Dataset.load(directory)
  const descriptor = f11sDataset.descriptor

  const resources = await Promise.all(f11sDataset.resources.map(async (resource) => {
    let _tmp = resource.descriptor
    let rowStream = await resource.rows({ keyed: true })
    _tmp.sample = await toArray(rowStream)
    _tmp.size = resource.size
    return _tmp
  }))
  const readme = descriptor.readme
  const processed = await remark()
    .use(html)
    .process(readme)

  const readmeHtml = processed.toString()
  const dataset = {
    readme: readme,
    readmeHtml: readmeHtml,
    descriptor: descriptor,
    resources: resources
  }
  return dataset
}
