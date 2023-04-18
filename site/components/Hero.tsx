import clsx from 'clsx';
import Highlight, { defaultProps } from 'prism-react-renderer';
import { Fragment, useRef } from 'react';

const codeLanguage = 'javascript';
const code = `export default {
  strategy: 'predictive',
  engine: {
    cpus: 12,
    backups: ['./storage/cache.wtf'],
  },
}`;

const tabs = [
  { name: 'cache-advance.config.js', isActive: true },
  { name: 'package.json', isActive: false },
];

function TrafficLightsIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 42 10" fill="none" {...props}>
      <circle cx="5" cy="5" r="4.5" />
      <circle cx="21" cy="5" r="4.5" />
      <circle cx="37" cy="5" r="4.5" />
    </svg>
  );
}

/* eslint jsx-a11y/label-has-associated-control: off */
export function Hero() {
  const el = useRef(null);

  return (
    <div className="overflow-hidden -mb-32 mt-[-4.5rem] pb-32 pt-[4.5rem] lg:mt-[-4.75rem] lg:pt-[4.75rem]">
      <div className="py-16 sm:px-2 lg:relative lg:py-20 lg:px-0">
        {/* Commented code on line 37, 39 and 113 will reenable the two columns hero */}
        {/* <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-y-16 gap-x-8 px-4 lg:max-w-8xl lg:grid-cols-2 lg:px-8 xl:gap-x-16 xl:px-12"> */}
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-y-16 gap-x-8 px-4 lg:max-w-4xl lg:grid-cols-1 lg:px-8 xl:gap-x-16 xl:px-12">
          {/* <div className="relative mb-10 lg:mb-0 md:text-center lg:text-left"> */}
          <div className="relative mb-10 lg:mb-0 md:text-center lg:text-center">
            <div role="heading">
              <h1 className="inline bg-gradient-to-r from-blue-500 via-blue-300 to-blue-500 bg-clip-text text-5xl tracking-tight text-transparent">
                The JavaScript framework for data portals
              </h1>
            </div>
            <p className="mt-4 text-xl tracking-tight text-slate-400">
              Portal.JS is a framework for rapidly building rich data portal
              frontends using a modern frontend approach. It can be used to
              present a single dataset or build a full-scale data
              catalog/portal.
            </p>
            <div className="mt-8 sm:mx-auto sm:text-center lg:text-left lg:mx-0">
              <p className="text-base font-medium text-slate-400 dark:text-slate-400">
                Sign up to get notified about updates
              </p>
              <form
                method="POST"
                name="get-updates"
                data-netlify="true"
                action="/subscribed"
                className="mt-3 sm:flex"
              >
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="block w-full sm:flex-auto sm:w-32 px-2 py-3 text-base rounded-md bg-slate-200 dark:bg-slate-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 focus:ring-offset-gray-900"
                />
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Your email"
                  className="block w-full mt-3 sm:flex-auto sm:w-64 sm:mt-0 sm:ml-3 px-2 py-3 text-base rounded-md bg-slate-200 dark:bg-slate-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 focus:ring-offset-gray-900"
                />
                <input type="hidden" name="form-name" value="get-updates" />
                <button
                  type="submit"
                  className="flex-none mt-3 px-6 py-3 border border-transparent text-base font-medium rounded-md text-slate-900 bg-blue-400 hover:bg-blue-300 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300/50 active:bg-sky-500 sm:mt-0 sm:ml-3"
                >
                  Notify me
                </button>
              </form>
              {/* <p className="mt-3 text-sm text-slate-400 dark:text-slate-300 sm:mt-4">
                We are actively trialling and developing Flowershow. If you'd
                like to get notified about our progress and important updates,
                please sign up.
              </p> */}
            </div>
            <p className="my-10 text-l tracking-wide">
              <span>A project of</span>
              <a
                href="https://www.datopian.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/images/datopian_logo.png"
                  alt="Datopian"
                  className="mx-2 mb-1 h-6 inline bg-black rounded-full"
                />
                <span>Datopian</span>
              </a>
            </p>
          </div>
          {/* <div className="relative">
            <div className="relative rounded-2xl bg-[#0A101F]/80 ring-1 ring-white/10 backdrop-blur">
              <div className="absolute -top-px left-20 right-11 h-px bg-gradient-to-r from-sky-300/0 via-sky-300/70 to-sky-300/0" />
              <div className="absolute -bottom-px left-11 right-20 h-px bg-gradient-to-r from-blue-400/0 via-blue-400 to-blue-400/0" />
              <div className="pl-4 pt-4">
                <TrafficLightsIcon className="h-2.5 w-auto stroke-slate-500/30" />
                <div className="mt-4 flex space-x-2 text-xs">
                  {tabs.map((tab) => (
                    <div
                      key={tab.name}
                      className={clsx(
                        'flex h-6 rounded-full',
                        tab.isActive
                          ? 'bg-gradient-to-r from-sky-400/30 via-sky-400 to-sky-400/30 p-px font-medium text-sky-300'
                          : 'text-slate-500'
                      )}
                    >
                      <div
                        className={clsx(
                          'flex items-center rounded-full px-2.5',
                          tab.isActive && 'bg-slate-800'
                        )}
                      >
                        {tab.name}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-start px-1 text-sm">
                  <div
                    aria-hidden="true"
                    className="select-none border-r border-slate-300/5 pr-4 font-mono text-slate-600"
                  >
                    {Array.from({
                      length: code.split('\n').length,
                    }).map((_, index) => (
                      <Fragment key={index}>
                        {(index + 1).toString().padStart(2, '0')}
                        <br />
                      </Fragment>
                    ))}
                  </div>
                  <Highlight
                    {...defaultProps}
                    code={code}
                    language={codeLanguage}
                    theme={undefined}
                  >
                    {({
                      className,
                      style,
                      tokens,
                      getLineProps,
                      getTokenProps,
                    }) => (
                      <pre
                        className={clsx(className, 'flex overflow-x-auto pb-6')}
                        style={style}
                      >
                        <code className="px-4">
                          {tokens.map((line, lineIndex) => (
                            <div key={lineIndex} {...getLineProps({ line })}>
                              {line.map((token, tokenIndex) => (
                                <span
                                  key={tokenIndex}
                                  {...getTokenProps({ token })}
                                />
                              ))}
                            </div>
                          ))}
                        </code>
                      </pre>
                    )}
                  </Highlight>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
