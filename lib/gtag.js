const invokeGtag = (...args) => {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag(...args);
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = ({ url, title }) => {
  invokeGtag("config", process.env.NEXT_PUBLIC_GA_TRACKING_ID, {
    page_title: title,
    page_location: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = (gaEvent) => {
  const action = gaEvent.contributor ? gaEvent.contributor : "Broken ID";
  invokeGtag("event", action, {
    event_category: `${gaEvent.type} : ${gaEvent.partner}`,
    event_label: `${gaEvent.itemId} : ${gaEvent.title}`,
  });
};

const gtag = { event, pageview };

export default gtag;
