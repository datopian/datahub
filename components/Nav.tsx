import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-white p-6">
      <div className="flex items-center flex-shrink-0 text-gray-700 mr-6">
        <span className="font-semibold text-xl tracking-tight">Portal</span>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-gray-700 border-teal-400 hover:text-black hover:border-black">
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link href="/search">
            <a className="block mt-4 lg:inline-block lg:mt-0 text-gray-700 hover:text-black mr-4">
              Search
            </a>
          </Link>
          <Link href="http://tech.datopian.com/frontend/">
            <a className="block mt-4 lg:inline-block lg:mt-0 text-gray-700 hover:text-black mr-4" target="_blank">
              Docs
            </a>
          </Link>
        </div>
        <div>
          <Link href="https://github.com/datopian/portal">
            <a className="inline-block text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-gray-700 hover:text-gray-700 hover:bg-white mt-4 lg:mt-0">Code</a>
          </Link>
        </div>
      </div>
    </nav>
  )
}
