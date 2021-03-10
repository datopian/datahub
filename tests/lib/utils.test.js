import path from 'path'
import { getDataset } from "../../lib/dataset"
import { addView, getDataForViewSpec } from '../../lib/utils'
const plotlyDatasetsDirectory = path.join(process.cwd(), 'fixtures', 'datasetsPlotlyView')
const vegaDatasetsDirectory = path.join(process.cwd(), 'fixtures', 'datasetsVegaView')
const doubleDatasetsDirectory = path.join(process.cwd(), 'fixtures', 'datasetsDoubleView')

let plotlyDataset
let vegaDataset
let doubleDataset
let plotlyDatasetWithView
let vegaDatasetWithView
let doubleDatasetWithView

beforeAll(async () => {
    plotlyDataset = await getDataset(plotlyDatasetsDirectory)
    vegaDataset = await getDataset(vegaDatasetsDirectory)
    doubleDataset = await getDataset(doubleDatasetsDirectory)

    plotlyDatasetWithView = addView(plotlyDataset)
    vegaDatasetWithView = addView(vegaDataset)
    doubleDatasetWithView = addView(doubleDataset)
});


describe("AddView", () => {
    it("_value field is added to Plotly datapackage", () => {
        const resource = plotlyDatasetWithView.props.dataset.resources[0]
        expect("_values" in resource).toBe(true)
        expect(resource["_values"].length > 0).toBe(true)
    });
    it("Plotly spec is added to datapackage", () => {
        const spec = JSON.parse(plotlyDatasetWithView.props.specs)[0]
        expect(spec.specType).toBe("plotly")
        expect(spec.layout.title).toBe("Plotly Layout Title")
        expect(spec.data[0].x.length).toBeGreaterThan(0)
        expect(spec.data[0].y.length).toBeGreaterThan(0)
    });
    it("_value field is added to datapackage with double views", () => {
        const resources = doubleDatasetWithView.props.dataset.resources
        resources.map((resource) => {
            expect("_values" in resource).toBe(true)
            expect(resource["_values"].length > 0).toBe(true)
        })

    });
    it("view spec is created for each view in a datapackage", () => {
        const specs = JSON.parse(doubleDatasetWithView.props.specs)
        const simpleSpec = specs[0]
        const plotlySpec = specs[1]

        expect(simpleSpec.specType).toBe("simple")
        expect(simpleSpec.layout.title).toBe("title1")
        expect(simpleSpec.data[0].x.length).toBeGreaterThan(0)
        expect(simpleSpec.data[0].y.length).toBeGreaterThan(0)

        expect(plotlySpec.specType).toBe("plotly")
        expect(plotlySpec.layout.title).toBe("Plotly Layout Title")
        expect(plotlySpec.data[0].x.length).toBeGreaterThan(0)
        expect(plotlySpec.data[0].y.length).toBeGreaterThan(0)

    });
});

describe("getDataForViewSpec", () => { 
    it("Generates right data for vega spec", ()=>{
        const resource = vegaDataset.resources[0]
        const data = getDataForViewSpec(resource, "vega")
        expect(data).toStrictEqual(resource.sample)
    })
    it("Generates right data for plotly spec", ()=>{
        const resource = plotlyDataset.resources[0]
        const data = getDataForViewSpec(resource, "plotly")
        expect(data).not.toStrictEqual(resource.sample[0])
        expect(data[0]).toStrictEqual(Object.keys(resource.sample[0]))
    })

})