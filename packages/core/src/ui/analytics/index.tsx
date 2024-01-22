/* eslint-disable @typescript-eslint/no-explicit-any */
import { GA, GoogleAnalyticsProps } from "./GoogleAnalytics";
import { Plausible, PlausibleProps } from "./Plausible";
import { SimpleAnalytics, SimpleAnalyticsProps } from "./SimpleAnalytics";
import { Umami, UmamiProps } from "./Umami";
import { Posthog, PosthogProps } from "./Posthog";

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        gtag?: (...args: any[]) => void;
        plausible?: (...args: any[]) => void;
        sa_event?: (...args: any[]) => void;
    }
}

export interface AnalyticsConfig {
    googleAnalytics?: GoogleAnalyticsProps;
    plausibleAnalytics?: PlausibleProps;
    umamiAnalytics?: UmamiProps;
    posthogAnalytics?: PosthogProps;
    simpleAnalytics?: SimpleAnalyticsProps;
}

/**
 * @example
 * const analytics: AnalyticsConfig = {
 *  plausibleDataDomain: '', // e.g. tailwind-nextjs-starter-blog.vercel.app
 *  simpleAnalytics: false, // true or false
 *  umamiWebsiteId: '', // e.g. 123e4567-e89b-12d3-a456-426614174000
 *  posthogProjectApiKey: '', // e.g. AhnJK8392ndPOav87as450xd
 *  googleAnalyticsId: '', // e.g. UA-000000-2 or G-XXXXXXX
 * }
 */
export interface AnalyticsProps {
    analyticsConfig: AnalyticsConfig;
}

const isProduction = true || process.env["NODE_ENV"] === "production";

/**
 * Supports Plausible, Simple Analytics, Umami, Posthog or Google Analytics.
 * All components default to the hosted service, but can be configured to use a self-hosted
 * or proxied version of the script by providing the `src` / `apiHost` props.
 *
 * Note: If you want to use an analytics provider you have to add it to the
 * content security policy in the `next.config.js` file.
 * @param {AnalyticsProps} { analytics }
 * @return {*}
 */
export const Analytics = ({ analyticsConfig }: AnalyticsProps) => {
    return (
        <>
            {isProduction && analyticsConfig.plausibleAnalytics && (
                <Plausible {...analyticsConfig.plausibleAnalytics} />
            )}
            {isProduction && analyticsConfig.simpleAnalytics && (
                <SimpleAnalytics {...analyticsConfig.simpleAnalytics} />
            )}
            {isProduction && analyticsConfig.posthogAnalytics && (
                <Posthog {...analyticsConfig.posthogAnalytics} />
            )}
            {isProduction && analyticsConfig.umamiAnalytics && (
                <Umami {...analyticsConfig.umamiAnalytics} />
            )}
            {isProduction && analyticsConfig.googleAnalytics && (
                <GA {...analyticsConfig.googleAnalytics} />
            )}
        </>
    );
};

export { GA, Plausible, SimpleAnalytics, Umami, Posthog };

export type {
    GoogleAnalyticsProps,
    PlausibleProps,
    UmamiProps,
    PosthogProps,
    SimpleAnalyticsProps,
};
