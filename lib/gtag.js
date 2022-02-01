import { gaTrackingId } from "constants/env";

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = ({ url, path, title }) => {
  console.log("PAGEVIEW.", url, path, title);
  if (window.gtag) {
    window.gtag("config", gaTrackingId, {
      page_location: url,
      page_path: path,
      page_title: title
    });
  } else {
    console.log("WARNING: gtag not loaded.");
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = gaEvent => {
  console.log("EVENT.", gaEvent);
  if (window.gtag) {
    window.gtag("event", gaEvent.contributor, {
      event_category: `${gaEvent.type} : ${gaEvent.partner}`,
      event_label: `${gaEvent.itemId} : ${gaEvent.title}`
    });
  } else {
    console.log("WARNING: gtag not loaded.")
  }
};

export default { event, pageview };
