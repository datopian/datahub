import Image from 'next/image';
import Link from 'next/link';
export default function Footer() {
  return (
    <footer>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between md:flex-row">
        <div className="flex gap-x-2 items-center">
          <p className="mt-8 text-base text-slate-500 md:mt-0">Maintained by</p>
          <a href="https://www.datopian.com/">
            <Image
              alt="Datopian logo"
              className="mb-2"
              src="/datopian-logotype.png"
              width={160}
              height={40}
            />
          </a>
        </div>
        <p className="mt-6 text-base text-slate-500 md:mt-0">
          Copyright © 2023 Datopian, LLC. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
