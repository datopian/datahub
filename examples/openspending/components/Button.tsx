import Link from 'next/link';
import clsx from 'clsx';

export function Button({ href, className = '', ...props }) {
  className = clsx(
    'inline-flex justify-center rounded-2xl bg-emerald-600 p-4 text-base font-semibold text-white hover:bg-emerald-500 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 active:text-white/70',
    className
  );

  return href ? (
    <Link scroll={false} href={href} className={className} {...props} />
  ) : (
    <button className={className} {...props} />
  );
}
