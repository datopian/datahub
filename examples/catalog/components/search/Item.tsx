import { Item } from 'portal';

const SearchItem: React.FC<{ datapackage: any }> = ({ datapackage }) => {
  return <Item dataset={datapackage} />;
};

export default SearchItem;
