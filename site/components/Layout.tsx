import { NextSeo } from "next-seo";

import Nav from "./Nav";

export default function Layout({
  children,
  title,
}: {
  children;
  title?: string;
}) {
  return (
    <>
      {title && <NextSeo title={title} />}
      <Nav />
      <div className="mx-auto p-6">{children}</div>
      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://datopian.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Built by{" "}
          <img
            src="/datopian-logo.png"
            alt="Datopian Logo"
            className="h-6 ml-2"
          />
        </a>
      </footer>
    </>
  );
}
