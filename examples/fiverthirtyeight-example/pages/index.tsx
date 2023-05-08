import Image from 'next/image';
import { Inter } from 'next/font/google';
import { format } from 'timeago.js'
import { promises as fs } from 'fs';
import path from 'path';

const inter = Inter({ subsets: ['latin'] });

interface Article {
  date: string;
  title: string;
  url: string;
}

interface Dataset {
  url: string;
  name: string;
  displayName: string;
  articles: Article[];
}

export function MobileItem({dataset} : { dataset: Dataset}) {
  return (
    <div className="flex gap-x-2 pb-2 py-4 items-center justify-between border-b border-zinc-600">
      <div className="flex flex-col">
        <span className="font-light">{dataset.name}</span>
        {dataset.articles.map((article) => (
          <div className='py-1 flex flex-col'>
            <span className="font-bold hover:underline">{article.title}</span>
            <span className="font-light text-base">{format(article.date)}</span>{' '}
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-start">
        <a
          className="border border-zinc-900 font-light px-4 py-1 text-sm transition hover:bg-zinc-900 hover:text-white"
          href={dataset.url}
          target="_blank"
        >
          info
        </a>
        {/*
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-12 h-12 text-blue-400 hover:text-blue-300 transition mt-1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-.53 14.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V8.25a.75.75 0 00-1.5 0v5.69l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button> */}
      </div>
    </div>
  );
}

export function DesktopItem({dataset} : { dataset: Dataset}) {
  return (
    <>
      {dataset.articles.map((article, index) => (
        <tr className={`${index === (dataset.articles.length - 1) ? 'border-b' : ''} border-zinc-400`}>
          <td className="py-8 font-light">{index === 0 ? dataset.name : ''}</td>
          <td>
            <a className="py-8 font-bold hover:underline" href={article.url}>
              {article.title}
            </a>
          </td>
          <td className="py-8 font-light text-base min-w-[120px]">{format(article.date)}</td>
          <td className="py-8">
            {index === 0 && (
              <a
                className="border border-zinc-900 font-light px-[25px] py-2.5 text-sm transition hover:bg-zinc-900 hover:text-white"
                href={dataset.url}
                target="_blank"
              >
                info
              </a>
            )}
          </td>
          {/*
              <td>
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-12 h-12 text-blue-400 hover:text-blue-300 transition mt-1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-.53 14.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V8.25a.75.75 0 00-1.5 0v5.69l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </td>*/}
        </tr>
      ))}
    </>
  );
}

export async function getStaticProps() {
  const jsonDirectory = path.join(
    process.cwd(),
    '/datasets.json'
  );
  const datasetString = await fs.readFile(jsonDirectory, 'utf8');
  const datasets = JSON.parse(datasetString)
  return {
    props: { datasets },
  };
}

export default function Home( { datasets }: { datasets: Dataset[] }) {
  return (
    <>
      <header className="max-w-5xl mx-auto mt-8 w-full">
        <div className="border-b-2 pb-2.5 mx-2 border-zinc-800">
          <h1>
            <span className="sr-only">FiveThirtyEight</span>
            <a className='flex gap-x-2 items-center' href="http://fivethirtyeight.com">
              <img
                width="197"
                height="25"
                alt="FiveThirtyEight"
                src="data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MjEgNTMuNzYiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDojMDEwMTAxO308L3N0eWxlPjwvZGVmcz48dGl0bGU+QXJ0Ym9hcmQgOTU8L3RpdGxlPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTAgMGgyNXY4SDl2MTBoMTV2OEg5djE3SDBWMHpNMzEgMzZoNVYxOGgtNXYtOGgxM3YyNmg0djdIMzF6bTUtMzZoOHY4aC04ek0xNzkgMzZoNVYxOGgtNXYtOGgxM3YyNmg0djdoLTE3em01LTM2aDh2OGgtOHpNMzE2IDM2aDVWMThoLTV2LThoMTN2MjZoNHY3aC0xN3ptNS0zNmg4djhoLTh6TTU0IDI3VjEwaDh2MTVsNCA5Ljk4aDFMNzEgMjVWMTBoOHYxN2wtNyAxNkg2MWwtNy0xNnpNMTExIDQzSDk3LjQyQzg5LjIzIDQzIDg1IDM5LjE5IDg1IDMxLjE3VjIyYzAtNy41NyA0LjMtMTMgMTMtMTMgOS4zMyAwIDEzIDUuMDcgMTMgMTR2N0g5NHYxLjc0YzAgMi42MiAxIDQuMjYgMy40MiA0LjI2SDExMXpNOTQgMjNoOHYtMS41NWMwLTIuNjItMS4wNi01LjQ1LTQuMTMtNS40NS0yLjc5IDAtMy44NyAyLjItMy44NyA1LjQ1ek0xMjUgOGgtMTBWMGgyOXY4aC0xMHYzNWgtOVY4ek0yMDIgNDNWMTBoOHY0YzEuMTQtMi40NSAzLjc1LTQgNy4yMi00SDIyMHY4aC02Yy0yLjg0IDAtNCAuOTQtNCAzLjlWNDN6TTI0NSA0M2gtNC44NEMyMzMuMDUgNDMgMjMwIDM5LjMxIDIzMCAzMS44NVYxOGgtNnYtOGg2VjNoOHY3aDd2OGgtN2wtLjA3IDEzLjkzYzAgMi4yMi45MyA0LjA3IDMuNjYgNC4wN0gyNDV6TTQyMSA0M2gtNC44NEM0MDkuMDUgNDMgNDA2IDM5LjMxIDQwNiAzMS44NVYxOGgtNnYtOGg2VjNoOHY3aDd2OGgtN2wtLjA3IDEzLjkzYzAgMi4yMi45MyA0LjA3IDMuNjYgNC4wN0g0MjF6TTI1NC4yNiA1My43Nmw0LjYxLTkuNUwyNTEgMjdWMTBoOHYxNWw0IDEwaDFsNC0xMFYxMGg4djE3bC0xMi4zIDI2Ljc2aC05LjQ0ek0yODQgMGgyNXY4aC0xNnY5aDE1djhoLTE1djEwaDE2djhoLTI1VjB6TTMzNyA0OHYtMmgxNi4xYzIgMCAyLjktLjE4IDIuOS0xLjI3di0uMzRjMC0xLjA4LS45MS0xLjM5LTIuOS0xLjM5SDM0MHYtNWw1LTVjLTUuMjktMS40OC04LTUuNDMtOC0xMXYtMWMwLTcuNTYgNC40NC0xMiAxNC0xMmEyMS45MyAyMS45MyAwIDAgMSA1Ljk1IDFMMzYxIDRsNSAzLTQgNmMxLjM3IDEuOTMgMyA0LjkzIDMgOHYxYzAgNy0zLjMgMTAuNjYtMTIgMTFsLTMgNGg2YzUuOTIgMCA5IDIuNjIgOSA3LjY4di4xMWMwIDUuMDYtMi43MSA4LjIxLTguNjIgOC4yMWgtMTNjLTQuMjkgMC02LjM4LTEuODQtNi4zOC01em0xOS0yNXYtM2MwLTMuMy0xLjMzLTQtNS00cy01IC43LTUgNHYzYzAgMy4zIDEuMzkgNCA1IDRzNS0uNyA1LTR6TTM4MCA0M2gtOFYwaDh2MTRjMS4xNC0yLjY3IDMuNC00IDctNCA2LjI2IDAgOSAzLjA4IDkgMTAuNzZWNDNoLThWMjJjMC0zLjEzLTEuMDctNS00LTVzLTQgMS44Ny00IDV6TTE1NyA0M2gtOFYwaDh2MTRjMS4xNC0yLjY3IDMuOTEtNCA3LjQ5LTQgNi4yNiAwIDguNTEgMy4xMyA4LjUxIDEwLjgxVjQzaC04VjIxYzAtMy4xMy0xLjA3LTQuNDQtNC00LjQ0cy00IDIuMjYtNCA1LjM5eiIvPjwvc3ZnPg=="
              /> by PortalJS
            </a>
          </h1>
        </div>
      </header>
      <main
        className={`flex min-h-screen flex-col items-center max-w-5xl mx-auto pt-20 px-2.5 ${inter.className}`}
      >
        <div>
          <h1 className="text-[40px] font-bold text-zinc-800 text-center">
            Our Data
          </h1>
          <p className="max-w-2xl text-lg text-center text-zinc-700">
            We’re sharing the data and code behind some of our articles and
            graphics. We hope you’ll use it to check our work and to create
            stories and visualizations of&nbsp;your&nbsp;own.
          </p>
        </div>
        <article className="w-full px-2 md:hidden py-4">{datasets.map(dataset => <MobileItem dataset={dataset} />)}</article>
        <table className="w-full mt-10 mb-4 hidden md:table">
          <thead className="border-b-4 pb-2 border-zinc-900">
            <tr>
              <th className="uppercase text-left font-light text-xs pb-3">
                data set
              </th>
              <th className="uppercase text-left font-light text-xs pb-3">
                related content
              </th>
              <th className="uppercase text-left font-light text-xs pb-3">
                last updated
              </th>
            </tr>
          </thead>
          <tbody>{datasets.map(dataset => <DesktopItem dataset={dataset} />)}</tbody>
        </table>
        <p className="text-[13px] py-8">
          Unless otherwise noted, our data sets are available under the{' '}
          <a
            className="text-blue-400 hover:underline"
            href="http://creativecommons.org/licenses/by/4.0/"
          >
            Creative Commons Attribution 4.0 International license
          </a>
          , and the code is available under the{' '}
          <a
            className="text-blue-400 hover:underline"
            href="http://opensource.org/licenses/MIT"
          >
            MIT license
          </a>
          . If you find this information useful, please{' '}
          <a
            className="text-blue-400 hover:underline"
            href="mailto:data@fivethirtyeight.com"
          >
            let us know
          </a>
          .
        </p>
      </main>
    </>
  );
}
