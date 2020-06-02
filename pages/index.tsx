import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/Nav'

export default function Home() {
  return (
    <div className="container mx-auto">
      <Head>
        <title>Portal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Nav />
        <section className="flex mt-10 ml-40 justify-center">
          <div>
            <img src="/banner.png" width="500" />
          </div>
          <div className="mx-32">
            <h1 className="text-4xl font-thin">Find, Share and Publish <br /> Quality Data with <span className="text-orange-500">Datahub</span>
            </h1>
            <p className="text-md font-light w-4/5">At Datahub, we have over thousands of datasets for free and a Premium Data Service for additional or customised data with guaranteed updates.</p>
            <form className="py-4 flex" action="/search" method="GET">
              <div className="border-2">
                <input type="text" className="pr-24 pl-4 py-2" placeholder="Search ..." name="q" required />
              </div>
              <div className="mx-3">
                <button className="bg-black text-white rounded-sm px-4 py-3 font-thin" type="submit">Search Datasets</button>
              </div>
            </form>
          </div>
        </section>
        <section className="flex mt-6">
          <div className="bg-gray-100 px-4 flex items-start py-5 mx-3">
            <div className="px-5 pt-4">
              <img src="/core.png" alt="core icon" width="100" />
            </div>
            <div>
              <h2 className="text-2xl font-thin">Core Datasets</h2>
              <p className="pb-3 sub">Datahub provides important, commonly-used data as high quality, easy-to-use and open data packages.</p>
              <Link href="#" >
                <a className="text-orange-500">View Collections ›</a>
              </Link>
            </div>
          </div>
          <div className="bg-gray-100 px-4 flex items-start py-5 mx-3">
            <div className="px-5 pt-4">
              <img src="/request.png" alt="core icon" width="100" />
            </div>
            <div>
              <h2 className="text-2xl font-thin">Request Data</h2>
              <p className="pb-3 sub">A service to locate and/or prepare data. There is no cost for making a request and all requests are completely confidential.</p>
              <Link href="#">
                <a className="text-orange-500">Request Now ›</a>
              </Link>
            </div>
          </div>
          <div className="bg-gray-100 px-4 flex items-start py-5 mx-3">
            <div className="px-5 pt-4">
              <img src="/earth-globe.png" alt="core icon" width="100" />
            </div>
            <div>
              <h2 className="text-2xl font-thin">Publish Data</h2>
              <p className="pb-3 sub">Securely share and elegantly put data online with quality checks, versioning, data APIs, notifications & integrations.</p>
              <Link href="#">
                <a className="text-orange-500"> Start Publishing ›</a>
              </Link>
            </div>
          </div>
        </section>
        <section className="core-datasets mt-20 flex justify-center" id="core-datasets">
          <div className="grid grid-cols-3 grid-rows-2 w-3/6">
            <div className="bg-gray-100 px-3 m-1">
              <div className="py-2">
                <h4 className="title font-thin">S&P 500 Companies</h4>
                <p className="sub mb-4">S&P 500 Companies with Financial Information</p>
                <a href="/core/s-and-p-500-companies" className="text-orange-500 text-base">View</a>
              </div>
            </div>
            <div className="bg-gray-100 px-3 m-1">
              <div className="py-2">
                <h4 className="title font-thin">Major cities of the world</h4>
                <p className="sub mb-4">List of all the major cities in the world</p>
                <a href="/core/world-cities" className="text-orange-500 text-base">View</a>
              </div>
            </div>
            <div className="bg-gray-100 row-span-2 px-3 m-1">
              <div className="py-2">
                <img src="/co2.png" width="70" />
                <h4 className="title font-thin">CO2 PPM</h4>
                <p className="sub mb-4">CO2 PPM - Trends in Atmospheric Carbon Dioxide
                        <br />co2-ppm | files 7 | 300kB</p>
                <a href="/core/co2-ppm" className="text-orange-500 text-base">View Dataset</a>
              </div>
            </div>
            <div className="bg-gray-100 row-span-2 px-3 m-1">
              <div className="py-2">
                <img src="/worldwide.png" width="70" />
                <h4 className="title font-thin">Country List</h4>
                <p className="sub mb-4">List of all countries with their 2 digit codes (ISO 3166-1)
                <br />country-list | files 2 | 27kB</p>
                <a href="/core/country-list" className="text-orange-500 text-base">View Dataset</a>
              </div>
            </div>
            <div className="bg-gray-100 px-3 m-1">
              <div className="py-2">
                <h4 className="title font-thin">ISO Language Codes</h4>
                <p className="sub mb-4">ISO Language Codes (639-1 and 693-2) and IETF Language Types</p>
                <a href="/core/language-codes" className="text-orange-500 text-base">View</a>
              </div>
            </div>
            <div className="bg-gray-100 px-3 m-1">
              <div className="py-2">
                <h4 className="title font-thin">Global Temperature</h4>
                <p className="sub mb-4">Data are included from the GISS Surface Temperature</p>
                <a href="/core/global-temp" className="text-orange-500 text-base">View</a>
              </div>
            </div>
          </div>
          <div className="ml-10">
            <h3 className="text-2xl font-thin">Core Datasets, data as you’d want to use it</h3>
            <h1 className="text-4xl py-3 font-thin">Quality Data ready to Integrate</h1>
            <ul className="list-disc mb-10">
              <li className="py-3">High quality data ready to inspect, download and use. <a href="/docs/core-data" className="text-orange-500">Read more &rsaquo;</a></li>
              <li className="py-3">Bulk and API access ready for automated integration with SDKs in Python, JS and many more. <a href="/docs/getting-started/getting-data" className="text-orange-500">Read more &rsaquo;</a></li>
              <li className="py-3">Send a request if you need a help to find some good, quality dataset.</li>
            </ul>
            <a href="/core" className="bg-black text-white px-5 py-4 rounded-sm">Discover Datasets</a>
          </div>
        </section>
      </main>
      <style jsx>{`
        main {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .title {
          font-size: 16px;
        }

        .sub {
          font-size: 12px;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div >
  )
}
