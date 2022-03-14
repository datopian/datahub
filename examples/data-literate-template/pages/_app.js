import '../styles/globals.css'
import '../styles/tailwind.css'
import DataLiterate from '../components/DataLiterate'


function MyApp({ Component, pageProps }) {
  return (
    <DataLiterate children={{ Component, pageProps }}/>
  )
}

export default MyApp
