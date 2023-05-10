import Image from 'next/image'
import { Button } from './Button'
import { Container } from './Container'
import logo from "../public/logo.svg"
import Link from 'next/link'
import { useRouter } from 'next/router'

export function Header() {
  const router = useRouter();

  const isActive = (navLink) => {
    return router.asPath.split("?")[0] == navLink.href;
  }

  const navLinks = [
    {
      title: "Home",
      href: "/#header"
    },
    {
      title: "Datasets",
      href: "/#datasets"
    },
    {
      title: "Community",
      href: "https://community.openspending.org/"
    }
  ]

  return (
    <header className="z-50 pb-5 lg:pt-11 sticky top-0 backdrop-blur" id="header">
      <Container className="flex flex-wrap items-center justify-center sm:justify-between lg:flex-nowrap">
        <div className="mt-10 lg:mt-0 lg:grow lg:basis-0 flex items-center">
          <Image src={logo} alt="OpenSpending" className="h-12 w-auto" />
        </div>
        <ul className='list-none flex gap-x-5 text-base font-medium'>
          {navLinks.map((link, i) => (
            <li key={`nav-link-${i}`}>
              <Link
                className={`text-emerald-900 hover:text-emerald-600 ${isActive(link) ? "text-emerald-600" : ""}`}
                href={link.href}
                scroll={false}
              >
                {link.title}
              </Link>
            </li>))}
        </ul>
        <div className="hidden sm:mt-10 sm:flex lg:mt-0 lg:grow lg:basis-0 lg:justify-end">
          <Button href="#">View on GitHub</Button>
        </div>
      </Container>
    </header >
  )
}
