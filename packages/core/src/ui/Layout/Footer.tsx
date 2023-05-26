import Link from "next/link.js";

import { AuthorConfig, NavLink } from "../types";

interface Props {
  links: Array<NavLink>;
  author: AuthorConfig;
}

export const Footer: React.FC<Props> = ({ links, author }) => {
  return (
    <footer className="bg-background dark:bg-background-dark prose dark:prose-invert max-w-none flex flex-col items-center justify-center w-full h-auto pt-10 pb-20">
      <div className="flex w-full flex-wrap justify-center">
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="inline-flex items-center mx-4 px-1 pt-1 font-regular hover:text-slate-300 no-underline"
          >
            {/* TODO aria-current={item.current ? "page" : undefined} */}
            {item.name}
          </Link>
        ))}
      </div>
      <p className="flex items-center justify-center">
        Created by
        <a
          href={author.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center no-underline"
        >
          {author.logo && (
            <img
              src={author.logo}
              alt={author.name}
              className="my-0 mx-1 h-6 block"
            />
          )}
          {author.name}
        </a>
      </p>
      <p className="flex items-center justify-center">
        Made with
        <a
          href="https://flowershow.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center no-underline"
        >
          <img
            src="https://flowershow.app/images/logo.svg"
            alt="Flowershow"
            className="my-0 mx-1 h-6 block"
          />
          Flowershow
        </a>
      </p>
    </footer>
  );
};
