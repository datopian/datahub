import React from 'react'
import { render } from '@testing-library/react'
import renderer from 'react-test-renderer'
import Item from '../../../components/search/Item'

test('📸 of Item component', ()  => {
  const datapackage = {
    name: 'test',
    title: 'Title',
    description: 'A description.',
    organization: {
      title: 'test org',
      name: 'test-org'
    }
  }
  const tree = renderer.create(<Item datapackage={datapackage} />).toJSON()
  expect(tree).toMatchSnapshot()
})
