import Image from 'next/image';
import { Container } from './Container';
import logo from '../public/logo.svg';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

export function Header() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const router = useRouter();

  const isActive = (navLink) => {
    return router.asPath.split('?')[0] == navLink.href;
  };

  const navLinks = [
    {
      title: 'Datasets',
      href: '/#datasets',
    },
    {
      title: 'Data Stories',
      href: '/stories',
    },
    {
      title: 'Blog',
      href: '/blog',
    },
    {
      title: 'About',
      href: '/about',
      children: [
        {
          title: 'Fiscal Data Package',
          href: '/about/fiscaldatapackage/',
        },
        {
          title: 'Tools',
          href: '/about/tools/',
        },
        {
          title: 'Funders',
          href: '/about/funders/',
        },
        {
          title: 'Presentations',
          href: '/about/presentations/',
        },
      ],
    },
    {
      title: 'Contributing',
      href: '/contributing',
    },
    {
      title: 'Help',
      href: '/help',
    },
    {
      title: 'Resources',
      href: '/resources',
      children: [
        {
          title: 'Follow the money',
          href: '/resources/journo',
        },
        {
          title: 'Map of Spending Projects',
          href: '/resources/map-of-spending-projects/',
        },
        {
          title: 'Working Group On Open Spending Data',
          href: '/resources/wg/',
        },
        {
          title: 'UK Departamental Spending',
          href: '/resources/gb-spending',
        },
      ],
    },
  ];

  return (
    <header className="relative z-50 pb-11 lg:pt-11">
      <Container className="flex flex-wrap justify-between lg:flex-nowrap mt-10 lg:mt-0">
        <Link href="/" className="lg:mt-0 lg:grow lg:basis-0 flex items-center">
          <Image src={logo} alt="OpenSpending" className="h-12 w-auto" />
        </Link>
        <ul className="hidden list-none sm:flex gap-x-5 text-base font-medium">
          {navLinks.map((link, i) => (
            <li key={`nav-link-${i}`}>
              <Dropdown navItem={link} />
            </li>
          ))}
        </ul>
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

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Dropdown({ navItem }: { navItem: any }) {
  const [showDropDown, setShowDropDown] = useState(false);
  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <div>
            <Menu.Button
              onMouseEnter={() => setShowDropDown(true)}
              onMouseLeave={() => setShowDropDown(false)}
              className="text-emerald-900 hover:text-emerald-600 inline-flex w-full justify-center gap-x-1.5 px-3 py-2 text-sm font-semibold"
            >
              <Link href={navItem.href}>{navItem.title}</Link>
              {navItem.children && (
                <ChevronDownIcon
                  className="-mr-1 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              )}
            </Menu.Button>
          </div>

          {navItem.children && (
            <Transition
              as={Fragment}
              show={showDropDown}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <div>
                <Menu.Items
                  static
                  onMouseEnter={() => setShowDropDown(true)}
                  onMouseLeave={() => setShowDropDown(false)}
                  className="absolute right-0 z-10 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div className="py-1">
                    {navItem.children.map((item) => (
                      <Menu.Item key={item.href}>
                        {({ active }) => (
                          <a
                            key={item.href}
                            href={item.href}
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-emerald-900 hover:text-emerald-600'
                                : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            {item.title}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </div>
            </Transition>
          )}
        </>
      )}
    </Menu>
  );
}
