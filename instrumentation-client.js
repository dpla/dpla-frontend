// Sentry client-side init (runs before the app loads in the browser)

import * as Sentry from "@sentry/nextjs";

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

    // iOS translation engines (Google App, Chrome Mobile iOS on WKWebView) inject
    // scripts that recursively traverse the DOM and can overflow the call stack on
    // complex pages. The crash is in the injected script, not our code — all frames
    // resolve to "undefined" (no file path). This is not fixable from our end.
    if (msg.startsWith("Maximum call stack size exceeded")) {
      const frames = event?.exception?.values?.[0]?.stacktrace?.frames ?? [];
      if (frames.length > 0 && frames.every((f) => !f.filename || f.filename === "undefined")) {
        return null;
      }
    }

    return event;
  },
});
