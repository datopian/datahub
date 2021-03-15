import React from 'react'
import { render } from '@testing-library/react';
import path from 'path'
import Table from '../../components/Table';
import { getDataset } from "../../lib/dataset"


let dataset

beforeAll(async () => {
    const datasetsDirectory = path.join(process.cwd(), 'fixtures', 'datasetsPlotlyView')
    dataset = await getDataset(datasetsDirectory)
});


/** @test {Table Component} */
describe('Table Component', () => {
    it('should render without crashing', async () => {
        const resource = dataset.resources[0]
        render(<Table data={resource.sample} schema={resource.schema} />)
    });
    it('tableGrid div is found', async () => {
        const resource = dataset.resources[0]
        const { findByTestId } = render(<Table data={resource.sample} schema={resource.schema} />)
        expect(await findByTestId('tableGrid'))
    });
});