import Image from 'next/image';
import { Inter } from 'next/font/google';
import { format } from 'timeago.js';
import { promises as fs } from 'fs';
import path from 'path';

const inter = Inter({ subsets: ['latin'] });

export interface Article {
  date: string;
  title: string;
  url: string;
}

export interface Dataset {
  url: string;
  name: string;
  displayName: string;
  articles: Article[];
  files?: string[];
}

// Request a weekday along with a long date
const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
} as const;

export function MobileItem({ dataset }: { dataset: Dataset }) {
  return (
    <div className="flex gap-x-2 pb-2 py-4 items-center justify-between border-b border-zinc-600">
      <div className="flex flex-col">
        <span className="font-mono font-light">{dataset.name}</span>
        {dataset.articles.map((article) => (
          <div key={article.title} className="py-1 flex flex-col">
            <span className="font-bold hover:underline">{article.title}</span>
            <span className="font-light text-base">
              {format(article.date).includes('years')
                ? new Date(article.date).toLocaleString('en-US', options)
                : format(article.date)}
            </span>{' '}
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-start">
        <a
          className="ml-2 border border-zinc-900 font-light px-4 py-1 text-sm transition hover:bg-zinc-900 hover:text-white"
          href={dataset.url}
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

export function DesktopItem({ dataset }: { dataset: Dataset }) {
  return (
    <>
      {dataset.articles.map((article, index) => (
        <tr
          key={article.url}
          className={`${
            index === dataset.articles.length - 1 ? 'border-b' : ''
          } border-zinc-400`}
        >
          <td className="py-8 font-light font-mono text-[13px] text-zinc-700">
            {index === 0 ? dataset.name : ''}
          </td>
          <td>
            <a
              className="py-8 font-bold hover:underline pr-2"
              href={article.url}
            >
              {article.title}
            </a>
          </td>
          <td className="py-8 font-light text-[14px] min-w-[138px] font-mono text-[#999]">
            {format(article.date).includes('years')
              ? new Date(article.date).toLocaleString('en-US', options)
              : format(article.date)}
          </td>
          <td className="py-8">
            {index === 0 && (
              <a
                className="ml-2 border border-zinc-900 font-light px-[25px] py-2.5 text-sm transition hover:bg-zinc-900 hover:text-white"
                href={dataset.url}
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
  const jsonDirectory = path.join(process.cwd(), '/datasets.json');
  const datasetString = await fs.readFile(jsonDirectory, 'utf8');
  const datasets = JSON.parse(datasetString);
  return {
    props: { datasets },
  };
}

export default function Home({ datasets }: { datasets: Dataset[] }) {
  return (
    <>
      <div className="max-w-5xl mx-auto mt-2 px-2 text-[#3c3c3c]">
        <div className="border border-zinc-600 p-4 text-left">
          This page is a tribute to the{' '}
          <a className='hover:underline font-bold' href="https://data.fivethirtyeight.com">
            data.fivethirtyeight.com
          </a>{' '}
          website  made by the amazing 538 team. All content is credited to the original creators, intended for
          educational purposes only. Visit their{' '}
          <a className='hover:underline font-bold' href="https://fivethirtyeight.com/">website</a> for in-depth analyses
          on politics, sports, culture, and more. No copyright infringement
          intended.
        </div>
      </div>
      <main
        className={`flex min-h-screen flex-col items-center max-w-5xl mx-auto pt-20 px-2.5 ${inter.className}`}
      >
        <div>
          <h1 className="text-[40px] font-bold text-zinc-800 text-center">
            Our Data
          </h1>
          <p className="max-w-[600px] text-[17px] text-center text-[#6d6f71]">
            We’re sharing the data and code behind some of our articles and
            graphics. We hope you’ll use it to check our work and to create
            stories and visualizations of&nbsp;your&nbsp;own.
          </p>
        </div>
        <article className="w-full px-2 md:hidden py-4">
          {datasets.map((dataset) => (
            <MobileItem key={dataset.name} dataset={dataset} />
          ))}
        </article>
        <table className="w-full mt-10 mb-4 hidden md:table">
          <thead className="border-b-4 pb-2 border-zinc-900">
            <tr>
              <th className="uppercase text-left font-normal text-xs pb-3">
                data set
              </th>
              <th className="uppercase text-left font-normal text-xs pb-3">
                related content
              </th>
              <th className="uppercase text-left font-normal text-xs pb-3">
                last updated
              </th>
            </tr>
          </thead>
          <tbody>
            {datasets.map((dataset) => (
              <DesktopItem key={dataset.name} dataset={dataset} />
            ))}
          </tbody>
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
