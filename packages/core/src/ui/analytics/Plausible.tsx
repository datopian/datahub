import Script from 'next/script.js'

export interface PlausibleProps {
  plausibleDataDomain: string
  dataApi?: string
  src?: string
}

/**
 * Plausible analytics component.
 * To proxy the requests through your own domain, you can use the dataApi and src attribute.
 * See [Plausible docs](https://plausible.io/docs/proxy/guides/nextjs#step-2-adjust-your-deployed-script)
 * for more information.
 *
 */
export const Plausible = ({
  plausibleDataDomain,
  dataApi = undefined,
  src = 'https://plausible.io/js/plausible.js',
}: PlausibleProps) => {
  return (
    <>
      <Script
        strategy="lazyOnload"
        data-domain={plausibleDataDomain}
        data-api={dataApi}
        src={src}
      />
      <Script strategy="lazyOnload" id="plausible-script">
        {`
            window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }
        `}
      </Script>
    </>
  )
}

// https://plausible.io/docs/custom-event-goals
export const logEvent = (eventName, ...rest) => {
  return window.plausible?.(eventName, ...rest)
}
