import React from 'react'
import { render } from '@testing-library/react'
import renderer from 'react-test-renderer'
import Sort from '../../../components/search/Sort'

test('📸 of Input component with empty', ()  => {
  const tree = renderer.create(<Sort />).toJSON()
  expect(tree).toMatchSnapshot()
})
