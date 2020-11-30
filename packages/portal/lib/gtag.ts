export const GA_TRACKING_ID = 'G-NX72GYFHFS';

//https://developers.google.com/analytics/devguides/collection/gtagjs/pages
//eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const pageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
