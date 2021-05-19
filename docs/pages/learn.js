import Head from 'next/head'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import styles from '../styles/Home.module.css'

export default function Learn() {

  return (
    <>
      <Head>
        <title>Portal.js Learn by Examples</title>
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
