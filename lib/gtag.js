const invokeGtag = (...args) => {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  try {
    window.gtag(...args);
  } catch (error) {
    // A broken gtag must not break the click
    console.error("gtag call failed", error);
  }
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
  // Fallback values, not dropped events
  const contributor = gaEvent.contributor || "Unknown contributor";
  const partner = gaEvent.partner || "Unknown partner";
  invokeGtag("event", contributor, {
    event_category: `${gaEvent.type} : ${partner}`,
    event_label: `${gaEvent.itemId || "unknown"} : ${gaEvent.title || "untitled"}`,
    transport_type: "beacon",
  });
};

const gtag = { event, pageview };

export default gtag;
