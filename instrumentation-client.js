// Sentry client-side init (runs before the app loads in the browser)

import * as Sentry from "@sentry/nextjs";
import { filterClientEvent } from "./lib/sentryClientFilters";

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT || "development",

  // Sample rate for performance traces (1 = 100%)
  tracesSampleRate: 1,

  debug: false,

  // Drops errors from injected third-party scripts
  // Rules and reasons live in lib/sentryClientFilters.js
  beforeSend: filterClientEvent,
});
