import Image from 'next/image';
import { Container } from './Container';
import logo from '../public/logo.svg';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export function Header() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const router = useRouter();

  const isActive = (navLink) => {
    return router.asPath.split('?')[0] == navLink.href;
  };

  const navLinks = [
    {
      title: 'Home',
      href: '/',
    },
    {
      title: 'Datasets',
      href: '/#datasets',
    },
    // {
    //   title: "Community",
    //   href: "https://community.openspending.org/"
    // }
  ];

  return (
    <header className="relative z-50 pb-11 lg:pt-11">
      <Container className="flex flex-wrap items-center justify-between lg:flex-nowrap mt-10 lg:mt-0">
        <Link href="/" className="lg:mt-0 lg:grow lg:basis-0 flex items-center">
          <Image src={logo} alt="OpenSpending" className="h-12 w-auto" />
        </Link>
        <ul className="hidden list-none sm:flex gap-x-5 text-base font-medium">
          {navLinks.map((link, i) => (
            <li key={`nav-link-${i}`}>
              <Link
                className={`text-emerald-900 hover:text-emerald-600 ${
                  isActive(link) ? 'text-emerald-600' : ''
                }`}
                href={link.href}
                scroll={false}
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="hidden xl:block xl:grow"></div>
        <div className="sm:hidden sm:mt-10 lg:mt-0 lg:grow lg:basis-0 lg:justify-end">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <Bars3Icon className="w-8 h-8" />
          </button>
        </div>
        {menuOpen && (
          <div className={`sm:hidden basis-full mt-5 text-center`}>
            <ul className="gap-x-5 text-base font-medium">
              {navLinks.map((link, i) => (
                <li key={`nav-link-${i}`}>
                  <Link
                    className={`text-emerald-900 hover:text-emerald-600 ${
                      isActive(link) ? 'text-emerald-600' : ''
                    }`}
                    href={link.href}
                    scroll={false}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </header>
  );
}
