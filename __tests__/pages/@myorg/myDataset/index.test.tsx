import React from 'react'
import { render } from '@testing-library/react'
import renderer from 'react-test-renderer'
import Index from '../../../../pages/@myorg/myDataset/index'

test('showcase page renders a snapshot', () => {
  const tree = renderer.create(<Index />).toJSON()
  expect(tree).toMatchSnapshot()
})

test('render data package page successfully', () => {
  const { getByText } = render(<Index />)
  const element = getByText('Download files in this dataset')
  expect(element).toBeInTheDocument()
})
