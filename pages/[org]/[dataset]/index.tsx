import { GetServerSideProps } from 'next'
import config from '../../../config'
import utils from '../../../utils'
import About from '../../../components/dataset/About'
import Org from '../../../components/dataset/Org'
import Resources from '../../../components/dataset/Resources'

function Dataset({ datapackage }) {
  return (
    <>
      <About datapackage={datapackage} />
      <Org org={datapackage.organization} />
      <Resources resources={datapackage.resources} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`${config.get('DMS')}/api/3/action/package_show?id=${context.query.dataset}`)
  const ckanResult = (await res.json()).result
  const datapackage = utils.ckanToDataPackage(ckanResult)
  return { props: { datapackage } }
}

export default Dataset
