import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Index from '../../pages/index';

test('📸 of Home page', () => {
  const tree = renderer.create(<Index />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders text from hero section', () => {
  const { getByText } = render(<Index />);
  const linkElement = getByText(/Find, Share and Publish/);
  expect(linkElement).toBeInTheDocument();
});
