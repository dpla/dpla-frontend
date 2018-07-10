import { gaTrackingId } from "constants/env";

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = url => {
  alert("gtag view: " + url);
  window.gtag("config", gaTrackingId, {
    page_location: url
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = gaEvent => {
  alert(`gtag event! ${gaEvent.type} : ${gaEvent.partner}`);
  window.gtag("event", {
    category: `${gaEvent.type} : ${gaEvent.partner}`,
    action: `${gaEvent.contributor}`,
    label: `${gaEvent.itemId} : ${gaEvent.title}`
  });
};
