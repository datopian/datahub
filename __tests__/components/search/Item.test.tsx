import React from 'react';
import renderer from 'react-test-renderer';
import Item from '../../../components/search/Item';

test('📸 of Input component with empty', () => {
  const fixture = {
    name: 'qw',
    title: '12',
    organization: null,
    __typename: 'Package',
  };
  const tree = renderer
    .create(<Item datapackage={fixture} key={0} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
