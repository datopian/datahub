import Head from 'next/head'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import styles from '../styles/Home.module.css'

export default function Home() {

  return (
    <>
      <Head>
        <title>Create Portal App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <div className={styles.container}>

        <main className={styles.main}>

          <h1 className={styles.title}>
            Welcome to <a href="https://github.com/datopian/portal.js">Portal.js!</a>
          </h1>

          <p className={styles.description}>
            Rapidly build rich data portals using a modern frontend framework!
          </p>

          <div className={styles.grid}>
            <a href="/docs" className={styles.card}>
              <h3>Documentation &rarr;</h3>
              <p>Find in-depth information about Portal.js features and API.</p>
            </a>

            <a href="/learn" className={styles.card}>
              <h3>Learn &rarr;</h3>
              <p>Learn about Portal.js with examples!</p>
            </a>

            <a
              href="/gallery"
              className={styles.card}
            >
              <h3>Gallery &rarr;</h3>
              <p>Discover examples of Portal.js projects.</p>
            </a>

            <a
              href="https://github.com/datopian/portal.js"
              className={styles.card}
            >
              <h3>Contribute &rarr;</h3>
              <p>
                Checkout the Portal.js repository on github
            </p>
            </a>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}
