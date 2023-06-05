import Image from 'next/image';
import Link from 'next/link';
export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-100 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between md:flex-row">
        <div className="flex gap-x-2 items-center justify-center mx-auto">
          <p className="text-base text-slate-500">Maintained by</p>
          <a href="https://www.datopian.com/" target="_blank">
            <Image
              alt="Datopian logo"
              className="mb-1"
              src="/datopian-logotype.png"
              width={120}
              height={30}
            />
          </a>
        </div>
        <div className="flex gap-x-2 items-center mx-auto h-20">
          <p className="mt-8 text-base text-slate-500 md:mt-0">Built with <a href="https://portaljs.org" target="_blank" className='text-xl font-medium'>🌀 PortalJS</a></p>
        </div>
      </div>
    </footer>
  );
}
