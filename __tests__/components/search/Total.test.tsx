import React from 'react'
import { render } from '@testing-library/react'
import renderer from 'react-test-renderer'
import Total from '../../../components/search/Total'

test('📸 of Total component', ()  => {
  const tree = renderer.create(<Total total={2} />).toJSON()
  expect(tree).toMatchSnapshot()
})
