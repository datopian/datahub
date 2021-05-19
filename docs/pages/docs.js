import Head from 'next/head'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import styles from '../styles/Home.module.css'

export default function Docs() {

  return (
    <>
      <Head>
        <title>Portal.js Api Documentation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <div className={styles.container}>
        <main className={styles.main}>

        </main>
        <Footer />
      </div>
    </>
  )
}
