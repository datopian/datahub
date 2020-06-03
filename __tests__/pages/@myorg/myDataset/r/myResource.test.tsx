import React from 'react'
import { render, screen } from '@testing-library/react'
import renderer from 'react-test-renderer'
import Resource from '../../../../../pages/@myorg/myDataset/r/myresource'

test('showcase renders a snapshot', () => {
  const tree = renderer.create(<Resource />).toJSON()
  expect(tree).toMatchSnapshot()
})

test('render resource page successfully', () => {
  const { getByText } = render(<Resource />)
  const element = getByText('This is a preview version. There might be more data in the original version.')
  const message = 'this is not a preview version'
  expect(element).toBeInTheDocument()
  expect(screen.queryByText(message)).toBeNull()
})
