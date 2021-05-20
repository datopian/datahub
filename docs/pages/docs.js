import Head from 'next/head'
import Link from 'next/link'
import path from 'path'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import styles from '../styles/Home.module.css'
import { formatMD } from '../lib/utils'

export default function Docs({ mdFile }) {

    return (
        <>
            <Head>
                <title>Portal.js Api Documentation</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Nav />
            <div className={styles.container}>
                <div className="prose">
                    <div dangerouslySetInnerHTML={{ __html: mdFile }} />
                </div>
                <br />
                <Link href="/installation">
                    <button >Next Page</button>
                </Link>
            </div>

            <Footer />

        </>
    )
}


export async function getStaticProps() {
    const mdFilePath = path.join(process.cwd(), "markdowns/api-doc/introduction.md")
    const mdFile = await formatMD(mdFilePath)
    return {
        props: {
            mdFile
        }
    }
}