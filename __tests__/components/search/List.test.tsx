import React from 'react'
import { render } from '@testing-library/react'
import renderer from 'react-test-renderer'
import List from '../../../components/search/List'

test('📸 of Input component with empty', ()  => {
  const datapackages = [
    {
      name: 'test',
      title: 'Title',
      description: 'A description.',
      organization: {
        title: 'test org',
        name: 'test-org'
      }
    }
  ]
  const tree = renderer.create(<List datapackages={datapackages} />).toJSON()
  expect(tree).toMatchSnapshot()
})
