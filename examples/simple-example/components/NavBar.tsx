export default function NavBar() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 justify-between">
        <div className="flex">
          <div className="flex flex-shrink-0 items-center">
            <img
              className="block h-8 w-auto lg:hidden"
              src="/logo.png"
              alt="Your Company"
            />
            <img
              className="hidden h-8 w-auto lg:block mt-4"
              src="/logo.png"
              alt="Your Company"
            />
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
            <a
              href="/"
              className="inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900"
            >
              Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
