import React from 'react'
import {render } from '@testing-library/react';
import path from 'path'
import Chart from '../../components/Chart';
import { getDataset } from "../../lib/dataset"
import { addView } from '../../lib/utils'


let dataset
let datasetWithView

beforeAll(async () => {
    const datasetsDirectory = path.join(process.cwd(), 'fixtures', 'datasetsPlotlyView')
    dataset = await getDataset(datasetsDirectory)
    datasetWithView = addView(dataset)
});


/** @test {Chart Component} */
describe('Chart Component', () => {
    it('should render without crashing', async () => {
        const spec = JSON.parse(datasetWithView.props.specs)[0]
        const { findByTestId } = render(<Chart spec={spec} />)
        expect(await findByTestId("plotlyChart"))
    });
});