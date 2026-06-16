// Sentry client-side init (runs before the app loads in the browser)

import * as Sentry from "@sentry/nextjs";

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;

Sentry.init({
  dsn:
    "https://9a96f55c94d9e0f332251d903fbb60aa@o4508229092769792.ingest.us.sentry.io/4508229094080512",

  // Sample rate for performance traces (1 = 100%)
  tracesSampleRate: 1,

  debug: false,

  beforeSend(event, hint) {
    const ex = hint?.originalException;
    const rawMsg = typeof ex === "string" ? ex : ex?.message;
    const msg = typeof rawMsg === "string" ? rawMsg : "";

    // Stale chunks post-deploy trigger this; _app.js already handles it with a reload
    if (msg.startsWith("Invariant: attempted to hard navigate to the same URL")) {
      return null;
    }

    // Sentry Replay throws this on iOS WebKit when drawing SVG to canvas
    if (msg.startsWith("Unable to load image data:image/svg+xml")) {
      return null;
    }

    return event;
  },
});
