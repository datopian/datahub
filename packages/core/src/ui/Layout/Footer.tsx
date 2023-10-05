import Link from "next/link.js";

import { AuthorConfig, NavLink } from "../types";

interface Props {
    author: AuthorConfig;
    links?: Array<NavLink>;
}

// TODO replace this with some nice tailwindui footer
export const Footer: React.FC<Props> = ({ links, author }) => {
    return (
        <footer className="bg-background dark:bg-background-dark text-primary dark:text-primary-dark pt-16 pb-20 px-14 flex flex-col items-center justify-center gap-3">
            {links && (
                <div className="flex w-full flex-wrap justify-center mb-2">
                    {links.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="inline-flex items-center mx-4 px-1 py-1 text-black hover:text-primary dark:text-white hover:dark:text-primary-dark no-underline font-semibold"
                        >
                            {/* TODO aria-current={item.current ? "page" : undefined} */}
                            {item.name}
                        </Link>
                    ))}
                </div>
            )}
            <p className="flex items-center justify-center gap-2">
                <span>Created by</span>
                {author.url ? (
                    <a
                        href={author.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 no-underline font-semibold text-black dark:text-white"
                    >
                        {author.logo && (
                            <img
                                src={author.logo}
                                alt="Logo"
                                className="h-6 block"
                            />
                        )}
                        <span>{author.name}</span>
                    </a>
                ) : (
                    <span
                        className="flex items-center gap-1 no-underline font-semibold text-black dark:text-white"
                    >
                        {author.logo && (
                            <img
                                src={author.logo}
                                alt={author.name}
                                className="h-6 block"
                            />
                        )}
                        <span>{author.name}</span>
                    </span>
                )}
            </p>
            <p className="flex items-center justify-center gap-1">
                <span>Made with</span>
                <a
                    href="https://flowershow.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 no-underline font-semibold text-black dark:text-white"
                >
                    <img
                        src="https://flowershow.app/images/logo.svg"
                        alt="Logo"
                        className="h-6 block"
                    />
                    <span>Flowershow</span>
                </a>
            </p>
        </footer>
    );
};
