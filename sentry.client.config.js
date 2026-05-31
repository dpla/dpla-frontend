// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn:
    "https://9a96f55c94d9e0f332251d903fbb60aa@o4508229092769792.ingest.us.sentry.io/4508229094080512",

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  beforeSend(event, hint) {
    const ex = hint?.originalException;
    const rawMsg = typeof ex === "string" ? ex : ex?.message;
    const msg = typeof rawMsg === "string" ? rawMsg : "";

    // Stale JS chunks after a deploy cause Next.js to attempt a hard navigation
    // to the current URL, throwing this invariant. _app.js already handles it
    // with a window.location.reload(). Suppress the Sentry noise.
    if (msg.startsWith("Invariant: attempted to hard navigate to the same URL")) {
      return null;
    }

    // Sentry Replay serialises <img> elements by drawing them to a 2D canvas.
    // On iOS WebKit, drawing an SVG data-URI to canvas throws an unhandled
    // rejection with this message. The rejection is from Sentry's own
    // infrastructure, not from application code, and is not actionable.
    // The prefix covers both base64 (data:image/svg+xml;base64,...) and
    // URL-encoded (data:image/svg+xml,...) SVG data-URI forms.
    if (msg.startsWith("Unable to load image data:image/svg+xml")) {
      return null;
    }

    return event;
  },
});
