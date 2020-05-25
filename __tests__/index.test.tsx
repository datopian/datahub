import React from 'react'
import { render } from '@testing-library/react'
import Index from '../pages/index'

test('renders homepage successfully', () => {
  const { getByText } = render(<Index />)
  const linkElement = getByText(
    /Get started with Next.js/
  )
  expect(linkElement).toBeInTheDocument()
})