import { gaTrackingId } from "constants/env";

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = ({ url, path, title }) => {
  window.gtag("config", gaTrackingId, {
    page_location: url,
    page_path: path,
    page_title: title
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = gaEvent => {
  window.gtag("event", gaEvent.contributor, {
    event_category: `${gaEvent.type} : ${gaEvent.partner}`,
    event_label: `${gaEvent.itemId} : ${gaEvent.title}`
  });
};
