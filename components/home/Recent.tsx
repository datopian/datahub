import Link from 'next/link';

export default function Recent() {
  return (
    <section className="my-10 mx-4 lg:my-20">
      <h1 className="text-2xl font-thin mb-4">Recent Datasets</h1>
      <div className="flex flex-col lg:flex-row">
        <div className="border px-4 mb-4 mr-3 border-gray-100 w-5/6 shadow-sm">
          <h1 className="text-2xl font-thin">Our World in Data - COVID 19</h1>
          <p className="text-gray-500">Dataset</p>
          <p>
            data collected and managed by Our World in Data - COVID 19 pulled
            from GitHub on 06/10/2020 https://ourworldindata.org/coronavirus
          </p>
          <Link href="/">
            <a className="pt-3 flex justify-end text-orange-500">
              {' '}
              View Dataset{' '}
            </a>
          </Link>
        </div>
        <div className="border px-4 mb-4 mr-3 border-gray-100 w-5/6  shadow-sm">
          <h1 className="text-2xl font-thin">Our World in Data - COVID 19</h1>
          <p className="text-gray-500">Dataset</p>
          <p>
            data collected and managed by Our World in Data - COVID 19 pulled
            from GitHub on 06/10/2020 https://ourworldindata.org/coronavirus
          </p>
          <Link href="/">
            <a className="pt-3 flex justify-end  text-orange-500">
              {' '}
              View Dataset{' '}
            </a>
          </Link>
        </div>
        <div className="border px-4 mb-4 border-gray-100 w-5/6 shadow-sm">
          <h1 className="text-2xl font-thin">Our World in Data - COVID 19</h1>
          <p className="text-gray-500 mb-2">Dataset</p>
          <p>
            data collected and managed by Our World in Data - COVID 19 pulled
            from GitHub on 06/10/2020 https://ourworldindata.org/coronavirus
          </p>
          <Link href="/">
            <a className="pt-3 flex justify-end  text-orange-500">
              {' '}
              View Dataset{' '}
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
}
