// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = ({
  url,
  analyticsID,
}: {
  url: string;
  analyticsID: string;
}) => {
  if (typeof window.gtag !== undefined) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.gtag("config", analyticsID, {
      page_path: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  if (typeof window.gtag !== undefined) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value,
    });
  }
};
