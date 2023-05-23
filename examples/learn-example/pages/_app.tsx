import '../styles/globals.css'
import '@portaljs/components/styles.css'

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
