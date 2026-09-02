import siteId from "./siteId.js";

// GA4 drops any parameter value longer than this.
// https://support.google.com/analytics/answer/9267744
const PARAM_VALUE_MAX = 100;

// The GA4 properties this build reports to.
// The site's own, plus the network one if set.
// gtag sends every event to all of them.
export const trackingIds = () =>
  [
    process.env.NEXT_PUBLIC_GA_TRACKING_ID,
    process.env.NEXT_PUBLIC_GA_NETWORK_ID,
  ].filter(Boolean);

// Set GA_LEGACY_EVENTS="false" in a site's deploy workflow.
// That stops the legacy event once its reports have moved.
const sendLegacy = () =>
  String(process.env.NEXT_PUBLIC_GA_LEGACY_EVENTS ?? "")
    .trim()
    .toLowerCase() !== "false";

const invokeGtag = (...args) => {
  // A build with no measurement ID sends nothing.
  // That holds even if something else defines window.gtag.
  // Some local hubs run without an ID.
  if (trackingIds().length === 0) return;
  if (typeof window === "undefined" || typeof window.gtag !== "function")
    return;
  try {
    window.gtag(...args);
  } catch (error) {
    // A broken gtag must not break the click
    console.error("gtag call failed", error);
  }
};

const isBlank = (value) =>
  value === undefined || value === null || value === "";

// Cut to the limit.
// Do not leave half of a surrogate pair.
const clip = (value) =>
  String(value)
    .slice(0, PARAM_VALUE_MAX)
    .replace(/[\uD800-\uDBFF]$/, "");

const clipParams = (params) =>
  Object.fromEntries(
    Object.entries(params)
      .filter(([, value]) => !isBlank(value))
      .map(([key, value]) => [key, clip(value)]),
  );

// https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications
// One page_view per client-side navigation.
// The first load's page_view comes from the config call in pages/_app.js.
// Turn off history-based page views in each property's Enhanced Measurement.
// With them on, GA4 counts each navigation twice.
// See README.md, "Google Analytics".
export const pageview = ({ url, title }) => {
  invokeGtag("event", "page_view", {
    page_title: title,
    page_location: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/ga4/events
// Takes the shape from buildGaEvent.
// Sends it twice.
// Once as the GA4 event, once as the legacy event that existing reports use.
export const event = ({ name, label, params = {} } = {}) => {
  // GA4 shape.
  // Fixed event name, one parameter per field.
  // GA4 drops blank fields.
  // Each parameter needs a custom dimension in GA4 Admin.
  // See README.md, "Google Analytics".
  invokeGtag("event", name, clipParams({ ...params, site: siteId() }));

  if (!sendLegacy()) return;

  // Legacy GA shape.
  // The contributor is the event name.
  const dplaId = params.dpla_id || "unknown";
  const title = params.item_title || "untitled";
  const partner = params.partner || "Unknown partner";
  invokeGtag("event", params.contributor || "Unknown contributor", {
    event_category: `${label} : ${partner}`,
    event_label: `${dplaId} : ${title}`,
    transport_type: "beacon",
  });
};

const gtag = { event, pageview };

export default gtag;
