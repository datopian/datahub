import Image from 'next/image'
export default function Footer() {
  return (
    <footer>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between md:flex-row">
        <Image alt="Datopian logo" src="/datopian-logotype.png" width={160} height={40} />
        <p className="mt-6 text-base text-slate-500 md:mt-0">
          Copyright © 2023 Datopian, LLC. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
