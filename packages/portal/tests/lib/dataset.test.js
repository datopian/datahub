import { getDataset } from "../../lib/dataset"
import path from 'path'

let directory
let dataset

beforeAll(async () => {
  directory = path.join(process.cwd(), 'fixtures', 'datasetsDoubleView')
  dataset = await getDataset(directory)
})

describe("Dataset", () => {
  it("loads a dataset from a local folder", async () => {

    expect(dataset).toStrictEqual(
      expect.objectContaining({
        readme: expect.any(String),
        readmeHtml: expect.any(String),
        descriptor: expect.any(Object),
        resources: expect.any(Object),
      })
    )
  })

  it("returns a resource with required fields", () => {
    const resource = dataset.resources[0]
    const expectedFields = ["path", "pathType", "name", "format", "mediatype",
      "schema", "encoding", "sample", "size"]
    expect(expectedFields).toStrictEqual(
      Object.keys(resource)
    )
  })
});