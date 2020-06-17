import React from 'react'
import { render } from '@testing-library/react'
import renderer from 'react-test-renderer'
import Input from '../../../components/search/Input'

test('📸 of Input component with empty', ()  => {
  const query = {}
  const tree = renderer.create(<Input query={query} />).toJSON()
  expect(tree).toMatchSnapshot()
})

test('📸 of Input component with query', ()  => {
  const query = {
    q: 'gdp'
  }
  const tree = renderer.create(<Input query={query} />).toJSON()
  expect(tree).toMatchSnapshot()
})
