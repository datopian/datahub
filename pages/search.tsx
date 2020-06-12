import { GetServerSideProps } from 'next'
import querystring from 'querystring'
import config from '../config'
import utils from '../utils'
import Input from '../components/search/Input'
import Total from '../components/search/Total'
import Sort from '../components/search/Sort'
import List from '../components/search/List'

function Search({ ckanResult, datapackages, query }) {
  return (
    <div>
      <Input query={query} />
      <Total total={ckanResult.count} />
      <Sort sort={query.sort} />
      <List datapackages={datapackages} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query || {}
  const ckanQuery = querystring.stringify(
    utils.convertToCkanSearchQuery(query)
  )
  console.log(ckanQuery)
  const res = await fetch(`${config.get('DMS')}/api/3/action/package_search?${ckanQuery}`)
  const ckanResult = (await res.json()).result
  const datapackages = ckanResult.results.map(item => utils.ckanToDataPackage(item))

  return { props: { ckanResult, datapackages, query } }
}

export default Search
