import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="icon"
          type="image/x-icon"
          href="https://projects.fivethirtyeight.com/shared/favicon.ico"
        />
      </Head>
      <body>
        <header className="max-w-5xl mx-auto mt-8 w-full">
          <div className="border-b-2 pb-2.5 mx-2 border-zinc-800">
            <h1>
              <span className="sr-only">FiveThirtyEight</span>
              <a
                className="flex gap-x-2 items-center"
                href="http://fivethirtyeight.com"
              >
                <img
                  width="197"
                  height="25"
                  alt="FiveThirtyEight"
                  src="data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MjEgNTMuNzYiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDojMDEwMTAxO308L3N0eWxlPjwvZGVmcz48dGl0bGU+QXJ0Ym9hcmQgOTU8L3RpdGxlPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTAgMGgyNXY4SDl2MTBoMTV2OEg5djE3SDBWMHpNMzEgMzZoNVYxOGgtNXYtOGgxM3YyNmg0djdIMzF6bTUtMzZoOHY4aC04ek0xNzkgMzZoNVYxOGgtNXYtOGgxM3YyNmg0djdoLTE3em01LTM2aDh2OGgtOHpNMzE2IDM2aDVWMThoLTV2LThoMTN2MjZoNHY3aC0xN3ptNS0zNmg4djhoLTh6TTU0IDI3VjEwaDh2MTVsNCA5Ljk4aDFMNzEgMjVWMTBoOHYxN2wtNyAxNkg2MWwtNy0xNnpNMTExIDQzSDk3LjQyQzg5LjIzIDQzIDg1IDM5LjE5IDg1IDMxLjE3VjIyYzAtNy41NyA0LjMtMTMgMTMtMTMgOS4zMyAwIDEzIDUuMDcgMTMgMTR2N0g5NHYxLjc0YzAgMi42MiAxIDQuMjYgMy40MiA0LjI2SDExMXpNOTQgMjNoOHYtMS41NWMwLTIuNjItMS4wNi01LjQ1LTQuMTMtNS40NS0yLjc5IDAtMy44NyAyLjItMy44NyA1LjQ1ek0xMjUgOGgtMTBWMGgyOXY4aC0xMHYzNWgtOVY4ek0yMDIgNDNWMTBoOHY0YzEuMTQtMi40NSAzLjc1LTQgNy4yMi00SDIyMHY4aC02Yy0yLjg0IDAtNCAuOTQtNCAzLjlWNDN6TTI0NSA0M2gtNC44NEMyMzMuMDUgNDMgMjMwIDM5LjMxIDIzMCAzMS44NVYxOGgtNnYtOGg2VjNoOHY3aDd2OGgtN2wtLjA3IDEzLjkzYzAgMi4yMi45MyA0LjA3IDMuNjYgNC4wN0gyNDV6TTQyMSA0M2gtNC44NEM0MDkuMDUgNDMgNDA2IDM5LjMxIDQwNiAzMS44NVYxOGgtNnYtOGg2VjNoOHY3aDd2OGgtN2wtLjA3IDEzLjkzYzAgMi4yMi45MyA0LjA3IDMuNjYgNC4wN0g0MjF6TTI1NC4yNiA1My43Nmw0LjYxLTkuNUwyNTEgMjdWMTBoOHYxNWw0IDEwaDFsNC0xMFYxMGg4djE3bC0xMi4zIDI2Ljc2aC05LjQ0ek0yODQgMGgyNXY4aC0xNnY5aDE1djhoLTE1djEwaDE2djhoLTI1VjB6TTMzNyA0OHYtMmgxNi4xYzIgMCAyLjktLjE4IDIuOS0xLjI3di0uMzRjMC0xLjA4LS45MS0xLjM5LTIuOS0xLjM5SDM0MHYtNWw1LTVjLTUuMjktMS40OC04LTUuNDMtOC0xMXYtMWMwLTcuNTYgNC40NC0xMiAxNC0xMmEyMS45MyAyMS45MyAwIDAgMSA1Ljk1IDFMMzYxIDRsNSAzLTQgNmMxLjM3IDEuOTMgMyA0LjkzIDMgOHYxYzAgNy0zLjMgMTAuNjYtMTIgMTFsLTMgNGg2YzUuOTIgMCA5IDIuNjIgOSA3LjY4di4xMWMwIDUuMDYtMi43MSA4LjIxLTguNjIgOC4yMWgtMTNjLTQuMjkgMC02LjM4LTEuODQtNi4zOC01em0xOS0yNXYtM2MwLTMuMy0xLjMzLTQtNS00cy01IC43LTUgNHYzYzAgMy4zIDEuMzkgNCA1IDRzNS0uNyA1LTR6TTM4MCA0M2gtOFYwaDh2MTRjMS4xNC0yLjY3IDMuNC00IDctNCA2LjI2IDAgOSAzLjA4IDkgMTAuNzZWNDNoLThWMjJjMC0zLjEzLTEuMDctNS00LTVzLTQgMS44Ny00IDV6TTE1NyA0M2gtOFYwaDh2MTRjMS4xNC0yLjY3IDMuOTEtNCA3LjQ5LTQgNi4yNiAwIDguNTEgMy4xMyA4LjUxIDEwLjgxVjQzaC04VjIxYzAtMy4xMy0xLjA3LTQuNDQtNC00LjQ0cy00IDIuMjYtNCA1LjM5eiIvPjwvc3ZnPg=="
                />{' '}
                by PortalJS
              </a>
            </h1>
          </div>
        </header>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
