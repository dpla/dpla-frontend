// Sentry client-side init (runs before the app loads in the browser)

import * as Sentry from "@sentry/nextjs";
import { filterClientEvent } from "./lib/sentryClientFilters";

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;

Sentry.init({
  dsn:
    "https://9a96f55c94d9e0f332251d903fbb60aa@o4508229092769792.ingest.us.sentry.io/4508229094080512",

  // Sample rate for performance traces (1 = 100%)
  tracesSampleRate: 1,

  debug: false,

  // Drops errors from injected third-party scripts
  // Rules and reasons live in lib/sentryClientFilters.js
  beforeSend: filterClientEvent,
});
