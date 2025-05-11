// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = ({ url, path, title }) => {
  if (window.gtag) {
    window.gtag("config", process.env.NEXT_PUBLIC_GA_TRACKING_ID, {
      page_location: url,
      page_path: path,
      page_title: title,
    });
  } else {
    console.log("WARNING: gtag not loaded.");
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = (gaEvent) => {
  if (window.gtag) {
    const action = gaEvent.contributor ? gaEvent.contributor : "Broken ID";
    window.gtag("event", action, {
      event_category: `${gaEvent.type} : ${gaEvent.partner}`,
      event_label: `${gaEvent.itemId} : ${gaEvent.title}`,
    });
  } else {
    console.log("WARNING: gtag not loaded.");
  }
};

const gtag = { event, pageview };

export default gtag;
