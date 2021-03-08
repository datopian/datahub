import React from 'react'
import { render } from '@testing-library/react';
import path from 'path'
import Home from '../../pages/index';
import { getDataset } from "../../lib/dataset"
import { addView } from '../../lib/utils'


let plotlyDatasetWithView

beforeAll(async () => {
    const plotlyDatasetsDirectory = path.join(process.cwd(), 'fixtures', 'datasetsPlotlyView')

    const plotlyDataset = await getDataset(plotlyDatasetsDirectory)
    plotlyDatasetWithView = addView(plotlyDataset)
});


/** @test {Home Component} */
describe('Home Component', () => {
    it('should render without crashing', async () => {
        const dataset = plotlyDatasetWithView.props.dataset
        const specs = plotlyDatasetWithView.props.specs
        const { findAllByText } = render(<Home dataset={dataset} specs={specs} />)
        expect(await findAllByText('README'))

    });
    it('Sections are found in home page', async () => {
        const dataset = plotlyDatasetWithView.props.dataset
        const specs = plotlyDatasetWithView.props.specs
        const { findByTestId, findAllByText } = render(<Home dataset={dataset} specs={specs} />)
        expect(await findAllByText('Key info'))
        expect(await findAllByText('Data Files'))
        expect(await findAllByText('Graph'))
        expect(await findAllByText('Data Preview'))
        expect(await findByTestId('datasetTitle'))

    });
});