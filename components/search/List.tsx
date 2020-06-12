import Item from './Item'

export default function List({ datapackages }) {
  return (
    <ul>
      {datapackages.map((datapackage, index) => <Item datapackage={datapackage} key={index} />)}
    </ul>
  )
}
