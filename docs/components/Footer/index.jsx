import styles from '../../styles/Home.module.css'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <a
                href="https://www.datopian.com/"
                target="_blank"
                rel="noopener noreferrer"
            >
                Built by{' '}
                <img src="/datopian-logo.png" alt="Datopian Logo" className={styles.logo} />
            </a>
        </footer>
    )
}
