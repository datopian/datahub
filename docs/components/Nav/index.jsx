import { useState } from 'react'
import Link from 'next/link'

export default function Nav() {
  const [open, setOpen] = useState(false);
  const handleClick = (event) => {
    event.preventDefault();
    setOpen(!open);
  };

  const navMenu = [{ title: 'Home', path: '/' },
  { title: 'Gallery', path: '/gallery' },
  { title: 'Docs', path: '/docs' },
  { title: 'Learn', path: '/learn' },
  { title: 'Github', path: 'https://github.com/datopian/portal.js' }]

  return (
    <nav className="flex items-center justify-between flex-wrap bg-white p-4 border-b border-gray-200">
      <div className="flex items-center flex-shrink-0 text-gray-700 mr-6">
        <Link href="/">
          <img src="/logo.svg" alt="portal logo" width="110" />
        </Link>
      </div>
      <div className="block lg:hidden mx-4">
        <button
            onClick={handleClick}
            className="flex items-center px-3 py-2 border rounded text-gray-700 border-orange-400 hover:text-black hover:border-black"
          >
        <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
        </button>
      </div>
      <div className={`${open ? `block` : `hidden`} lg:block`}>
        {navMenu.map((menu, index) => {
          return (<Link href={menu.path} key={index}>
            <a className="block mt-4 lg:inline-block lg:mt-0 active:bg-primary-background text-gray-700 hover:text-black mr-6">
              {menu.title}
            </a>
          </Link>)
        })}
      </div>
    </nav>
  )
}
