export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-8 sm:py-12 lg:px-8">
        <div className="mt-10 flex justify-center space-x-10">
          <span className="text-gray-400 hover:text-gray-500 flex gap-4 items-center">
            <span className="mt-2">Powered by</span>
            <a href="https://datopian.com">
              <img src="/logo.png" className="w-32 h-10" />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
