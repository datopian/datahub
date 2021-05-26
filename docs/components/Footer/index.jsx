import styles from '../../styles/Home.module.css'

export default function Footer() {
  return (
    <footer className="flex items-center justify-center w-full h-24 border-t">
      <a
        className="flex items-center justify-center"
        href="https://datopian.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Built by{' '}
        <img src="/datopian-logo.png" alt="Datopian Logo" className="h-6 ml-2" />
      </a>
    </footer>
  )
}
