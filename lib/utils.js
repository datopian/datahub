import { simpleToPlotly, plotlyToPlotly, vegaToVega } from 'datapackage-render'


/**
 * Prepare views for dataset
 * @params {object} dataset object of the form: 
* { readme: readme,
    readmeHtml: readmeHtml,
    descriptor: descriptor,
    resources: resources 
  }
 */
export function addView(dataset) {
    const views = dataset.descriptor.views
    const countViews = views ? views.length : 0
    if (countViews === 0) {
        return {
            props: {
                dataset,
                error: true
            }
        }
    }

    const specs = {} //hold list of view specs
    for (let i = 0; i < countViews; i++) {
        const view = views[i]
        if (("resources" in view) && Array.isArray(view.resources)) {
            let resource;
            const resourceKey = view.resources[0]
            if (typeof resourceKey == 'number') {
                resource = dataset.resources[resourceKey]
                view.resources[0] = resource

            } else {
                resource = dataset.resources.filter((resource) => {
                    return resource.name == resourceKey
                })
                view.resources[0] = resource[0]
            }
        } else {
            view.resources = [dataset.resources[0]] //take the first resources in datapackage
        }
        view.resources[0].data = getDataForViewSpec(view.resources[0], view.specType)
        view.resources[0]._values = view.resources[0].data

        if (view.specType === 'simple') {
            try {
                const spec = simpleToPlotly(view)
                if (spec) {
                    spec.specType = 'simple'
                    specs[i] = spec
                }
            } catch (err) {
                console.log(err);
            }
        } else if (view.specType === 'plotly') {
            try {
                const spec = plotlyToPlotly(view)
                if (spec) {
                    spec.specType = 'plotly'
                    specs[i] = spec
                }
            } catch (err) {
                console.log(err);
            }
        } else if (view.specType === 'vega') {
            try {
                const spec = vegaToVega(view)
                if (spec) {
                    spec.specType = 'vega'
                    specs[i] = spec
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    return {
        props: {
            dataset,
            specs: JSON.stringify(specs),
            error: false
        }
    }
}

/**
 * Generates the data for each view spec. Plotly and Vega accept different data
 * formats.
 * @param {*} resource 
 * @param {*} specType 
 */
export function getDataForViewSpec(resource, specType) {
    if (specType == "vega") {
        return resource.sample
    } else if (["simple", 'plotly'].includes(specType)) {
        const sample = resource.sample
        let data = []
        data.push(Object.keys(sample[0])) //add the column names
        for (let i = 0; i < sample.length; i++) {
            const item = sample[i];
            data.push(Object.values(item)) //add the rows
        }
        return data
    }


}