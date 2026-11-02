const { LOCALS } = require("./constants/local");
const SECTIONS = require("./constants/pro").SECTIONS;

const siteEnv = process.env.NEXT_PUBLIC_SITE_ENV;
const localId = process.env.NEXT_PUBLIC_LOCAL_ID;

function fourOhFour(source) {
  return {
    source: source,
    destination: "/404",
  };
}

function rewrite(source, dest) {
  return {
    source: source,
    destination: dest,
  };
}

function redirect(source, dest, permanent = true) {
  return {
    source: source,
    destination: dest,
    permanent: permanent,
  };
}

// CSP is set here rather than in the CloudFront response headers policy.
// CloudFront applies its policy to ALL responses, including AWS WAF challenge
// pages. WAF challenge pages contain per-request dynamic inline scripts whose
// hashes change on every request and cannot be statically whitelisted. By
// setting the CSP at the app layer, it only applies to origin responses; WAF
// challenge pages are served directly by CloudFront and never reach the origin.
//
// IMPORTANT — CSP HASH MAINTENANCE:
// The sha256 hashes in script-src below cover fixed inline scripts in every page:
//   - Two hashes for the Next.js bootstrap scripts (injected by the framework)
//   - One hash for the gtag dataLayer/window.gtag stub in pages/_app.js
// They do NOT cover __NEXT_DATA__ (dynamic, excluded from hashing). The Next.js
// hashes are stable across normal deploys but WILL change on Next.js upgrades.
// The gtag hash must be updated whenever the inline script in pages/_app.js changes.
//
// Whenever a Next.js version bump is part of a PR:
//   1. Do a production build locally: `npm run build && npm start`
//   2. Load any page in a browser with DevTools open
//   3. Check the Console for CSP violations ("Refused to execute inline script")
//   4. If violations appear, extract the correct hash from the browser's error
//      message and update the sha256 values below before merging.
//
// Failure to do this will block all JavaScript on dp.la immediately on deploy.
// TODO: migrate to nonce-based CSP via Next.js middleware to eliminate this.
const CLOUDFRONT_MEDIA = "https://d2jf00asb0fe6y.cloudfront.net";
const CSP_DIRECTIVES = [
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self' https://meta.wikimedia.org",
  "default-src 'self'",
  "script-src 'self' 'sha256-sYQvVdNrbb2ldJRpproLbB3h5LhCcbCA1SUM1wTfomI=' 'sha256-uZYgrdXqFswjbPEZxW2e6bv+djcz8D4kcJKjWyznRmk=' 'sha256-R7BycX6lCwOq9x3CZpytPnOyYvDNpLs38i6qKfpCcVY=' *.google-analytics.com *.googletagmanager.com *.sentry.io https://*.awswaf.com https://www.gstatic.com",
  "img-src 'self' http: https: data:",
  `connect-src 'self' https://dp.la https://*.dp.la ${CLOUDFRONT_MEDIA} *.google-analytics.com *.analytics.google.com *.sentry.io https://*.awswaf.com https://www.gstatic.com https://gitlab.wikimedia.org https://commons.wikimedia.org https://wikimedia.org https://wikidata.reconci.link https://wikidata-reconciliation.wmcloud.org https://raw.githubusercontent.com https://meta.wikimedia.org https://www.wikidata.org https://depictassist.toolforge.org https://dynamodb.us-east-1.amazonaws.com`,
  "style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://www.gstatic.com",
  "font-src 'self' https://cdnjs.cloudflare.com",
  `media-src 'self' *.dp.la ${CLOUDFRONT_MEDIA}`,
  "frame-src 'self' https://www.youtube.com",
];
const CSP = CSP_DIRECTIVES.join("; ");

// PDF.js 2.5.5 needs 'unsafe-eval' for Type3/custom font compilation. Scoped to
// /static/pdfjs/* only so the rest of the app keeps the stricter policy.
const CSP_PDFJS = CSP_DIRECTIVES.map((d) =>
  d.startsWith("script-src ") ? `${d} 'unsafe-eval'` : d
).join("; ");

let config = {
  async headers() {
    if (process.env.NODE_ENV !== "production") {
      return [];
    }
    return [
      {
        // Negative lookahead keeps this from also matching /static/pdfjs/*;
        // browsers AND-combine multiple CSP headers, so both rules must not fire.
        source: "/((?!static/pdfjs(?:/|$)).*)",
        headers: [{ key: "Content-Security-Policy", value: CSP }],
      },
      {
        source: "/static/pdfjs/:path*",
        headers: [{ key: "Content-Security-Policy", value: CSP_PDFJS }],
      },
    ];
  },
  async redirects() {
    if (siteEnv === "local") {
      return [];
    } else if (siteEnv === "pro") {
      const userUrl = process.env.NEXT_PUBLIC_USER_BASE_URL;
      return [
        redirect("/hubs/members-meeting", "/events/dpla-network-summit"),
        redirect("/news", userUrl + "/news"),
        redirect("/news/:slug", userUrl + "/news/:slug"),
        redirect("/search", userUrl + "/search"),
        redirect("/about", "/about-dpla-pro"),
        // /ebooks still renders;
        // only its retired sub-pages redirect
        redirect("/ebooks/:path+", "/ebooks"),
      ];
    } else if (siteEnv === "user") {
      const proUrl = process.env.NEXT_PUBLIC_PRO_BASE_URL;
      return [
        redirect("/about-us", "/about"),
        redirect("/contact-us", "/contact"),

        // Pre-2017 dp.la URLs, first match wins.
        // primary-source-sets paths are in constants/pss-redirects.json.

        // Community Reps (retired)
        redirect("/reps/:path*", proUrl + "/about-dpla-pro/historical-materials"),
        redirect(
          "/info/get-involved/reps/:path*",
          proUrl + "/about-dpla-pro/historical-materials",
        ),

        // Hubs
        redirect("/info/hubs", proUrl + "/hubs"),
        redirect("/info/hubs/become-a-hub", proUrl + "/prospective-hubs/become-a-hub"),
        redirect("/info/hubs/hub-network-members", proUrl + "/hubs/our-hubs"),
        redirect("/info/hubs/membership-program", proUrl + "/hubs/membership-program"),
        // 2018 membership meeting and its sub-pages → the summit that replaced it
        redirect(
          "/info/hubs/membership-program/2018-annual-dpla-network-membership-meeting/:path*",
          proUrl + "/events/dpla-network-summit",
        ),

        // Metadata Application Profile
        redirect("/about/map/:path*", proUrl + "/hubs/metadata-application-profile"),
        redirect("/about/schema/:path*", proUrl + "/hubs/metadata-application-profile"),
        redirect("/info/map/:path*", proUrl + "/hubs/metadata-application-profile"),
        redirect(
          "/info/developers/map/:path*",
          proUrl + "/hubs/metadata-application-profile",
        ),

        // Developers
        redirect("/platform", proUrl + "/developers/api-codex"),
        redirect("/info/developers/codex/:path*", proUrl + "/developers/api-codex"),
        redirect("/info/developers/download/:path*", proUrl + "/developers/bulk-download"),
        redirect("/info/developers/ideas-and-projects/:path*", proUrl + "/developers"),
        redirect(
          "/info/developers/sample-code-and-libraries/:path*",
          proUrl + "/developers/sample-code-libraries",
        ),
        redirect("/info/developers", proUrl + "/developers"),

        // Education
        redirect(
          "/info/education/national-history-day/:path*",
          proUrl + "/education/national-history-day",
        ),
        redirect("/info/education/:path*", proUrl + "/education"),
        redirect("/education/:path*", proUrl + "/education"),

        // Ebooks (retired)
        redirect("/info/get-involved/dpla-ebooks/:path*", proUrl + "/ebooks"),

        // Events
        redirect("/info/get-involved/dplafest", proUrl + "/events/dplafest"),
        redirect("/info/get-involved/dplafest/:path+", proUrl + "/events/past-dplafests"),
        redirect("/info/get-involved/groups/:path*", proUrl),
        redirect("/info/get-involved/workshops/:path*", proUrl + "/events/workshops"),
        redirect("/info/gif-it-up/:path*", proUrl + "/about-dpla-pro/historical-materials"),

        // About DPLA Pro
        redirect("/info/contact/jobs/:path*", proUrl + "/about-dpla-pro/jobs"),
        redirect("/info/about/projects/:path*", proUrl + "/projects"),
        redirect("/info/about/funding/:path*", proUrl + "/about-dpla-pro"),
        redirect("/info/about/values/:path*", proUrl + "/about-dpla-pro"),
        redirect("/info/about/history", proUrl + "/about-dpla-pro/history"),
        redirect(
          "/info/about/history/materials",
          proUrl + "/about-dpla-pro/historical-materials",
        ),
        redirect("/staff", proUrl + "/about-dpla-pro/staff"),
        redirect("/info/about/staff/:path*", proUrl + "/about-dpla-pro/staff"),
        redirect(
          "/info/about/strategic-plan/:path*",
          proUrl + "/about-dpla-pro/strategic-plan",
        ),
        redirect("/info/get-involved", proUrl),
        redirect(
          "/info/get-involved/events/oct2011plenary/:path*",
          proUrl + "/about-dpla-pro/historical-materials",
        ),
        redirect("/info/about/board", proUrl + "/about-dpla-pro/board"),
        redirect(
          "/info/beta-sprint/submissions/:path*",
          proUrl + "/about-dpla-pro/historical-materials",
        ),
        redirect("/info/entries/:path*", proUrl + "/about-dpla-pro/historical-materials"),

        // Pages that moved within dp.la
        redirect("/info/get-involved/follow/:path*", "/contact"),
        redirect("/info/about/awards/:path*", "/"),
        redirect("/info/contact/:path*", "/contact"),
        redirect("/info/about/leadership-transition/:path*", "/news"),
        redirect("/info/about/policies/:path*", "/about/terms-conditions"),
        redirect("/info/donate/:path*", "/donate"),
        redirect("/info/get-involved/shop/:path*", "/"),
        redirect("/info/help/browse", "/browse-by-topic"),
        redirect(
          "/info/help/family-research-at-dpla/:path*",
          "/guides/the-family-research-guide-to-dpla",
        ),
        redirect("/info/help/faq", "/about/frequently-asked-questions"),
        redirect("/info/help/search", "/about/frequently-asked-questions/search-tips"),
        redirect("/info/help", "/guides"),
        redirect("/info/news", "/news"),
        redirect("/info/news/press/:path*", "/news"),
        // /info/2016/04/12/some-post → /news/some-post
        redirect("/info/:year(\\d+)/:month(\\d+)/:day(\\d+)/:slug*", "/news/:slug*"),
        redirect("/info/terms", "/about/terms-conditions"),
        redirect("/info/terms/privacy/:path*", "/about/privacy-policy"),
        redirect("/info/tag/:path*", "/news"),
        redirect("/info", "/about"),
        redirect("/map/:path*", "/"),
        redirect("/partners/:path*", "/browse-by-partner"),
        redirect("/subjects/:path*", "/"),
        redirect("/timeline/:path*", "/"),

        // Omeka exhibitions. radio-homefront reused a slug; keep it first.
        redirect(
          "/exhibitions/exhibits/show/radio-golden-age/radio-frontlines/radio-homefront",
          "/exhibitions/radio-golden-age/radio-frontlines/radio-homefront-wwii",
        ),
        redirect("/exhibitions/exhibits/show/:path+", "/exhibitions/:path+"),

        // Primary source sets (per-source and per-guide paths are in the JSON map)
        redirect("/primary-source-sets/sets", "/primary-source-sets"),
        redirect(
          "/primary-source-sets/sets/:slug([0-9a-z-]+)/:rest*",
          "/primary-source-sets/:slug",
        ),
      ];
    } else if (siteEnv === "cqa") {
      return [];
    } else {
      throw new Error("Invalid site environment");
    }
  },
  async rewrites() {
    if (siteEnv === "local") {
      const local = LOCALS[localId];
      const results = [
        rewrite("/", "/local"),
        rewrite("/item/:id([0-9a-f]{32}).json", "/api/items/:id?single=1"),
        rewrite("/item/:id([0-9a-f]{32}).raw", "/api/items/raw/:id"),
        fourOhFour("/qa"),
        fourOhFour("/exhibitions"),
        fourOhFour("/exhibitions/:slugs*"),
        fourOhFour("/browse-by-topic"),
        fourOhFour("/browse-by-topic/:slugs*"),
        fourOhFour("/primary-source-sets"),
        fourOhFour("/primary-source-sets/:slugs*"),
        fourOhFour("/topics"),
        fourOhFour("/topics/:slugs*"),
        fourOhFour("/pro"),
        fourOhFour("/pro/hubs"),
        fourOhFour("/pro/wp"),
        fourOhFour("/donate"),
        fourOhFour("/donate/thank-you"),
      ];
      const dynamicRoutes = local?.routes || {};
      for (const route in dynamicRoutes) {
        const routePath = route.replace(/^\//, "");
        const pathComponents = routePath.split("/");
        const section = pathComponents[0];
        const subsection = pathComponents?.[1];

        if (section && !subsection) {
          results.push(
            rewrite(`/${section}`, `/local/markdown?section=${section}`),
          );
        } else if (section && subsection) {
          results.push(
            rewrite(
              `/${section}/${subsection}`,
              `/local/markdown?section=${section}&subsection=${subsection}`,
            ),
          );
        }
      }
      return { beforeFiles: results };
    } else if (siteEnv === "pro") {
      const results = [
        rewrite("/", "/pro"),
        rewrite("/hubs", "/pro/hubs"),
        rewrite(
          "/hubs/:subsection",
          "/pro/wp?section=hubs&subsection=:subsection",
        ),
        fourOhFour("/qa"),
        fourOhFour("/exhibitions"),
        fourOhFour("/exhibitions/:slugs*"),
        fourOhFour("/browse-by-topic"),
        fourOhFour("/browse-by-topic/:slugs*"),
        fourOhFour("/browse-by-partner"),
        fourOhFour("/browse-by-partner/:slugs*"),
        fourOhFour("/primary-source-sets"),
        fourOhFour("/primary-source-sets/:slugs*"),
        fourOhFour("/topics"),
        fourOhFour("/topics/:slugs*"),
        fourOhFour("/local"),
        fourOhFour("/local/markdown"),
      ];
      for (const key in SECTIONS) {
        const section = SECTIONS[key];
        if (section.slug) {
          results.push(
            rewrite(`/${section.slug}`, `/pro/wp?section=${section.slug}`),
            rewrite(
              `/${section.slug}/:subsection`,
              `/pro/wp?section=${section.slug}&subsection=:subsection`,
            ),
          );
        }
      }
      return { beforeFiles: results };
    } else if (siteEnv === "user") {
      return {
        beforeFiles: [
          rewrite("/item/:id([0-9a-f]{32}).json", "/api/items/:id?single=1"),
          rewrite("/item/:id([0-9a-f]{32}).raw", "/api/items/raw/:id"),
          fourOhFour("/qa"),
          fourOhFour("/pro"),
          fourOhFour("/pro/hubs"),
          fourOhFour("/pro/wp"),
          fourOhFour("/local/"),
          fourOhFour("/local/markdown"),
          fourOhFour("/projects/dpla-wikimedia/:slugs*"),
        ],
        fallback: [fourOhFour("/:slugs*")],
      };
    } else if (siteEnv === "cqa") {
      return {
        beforeFiles: [
          rewrite("/item/:id([0-9a-f]{32}).json", "/api/items/:id?single=1"),
          rewrite("/item/:id([0-9a-f]{32}).raw", "/api/items/raw/:id"),
          rewrite("/", "/qa"),
          fourOhFour("/about"),
          fourOhFour("/about/:slugs*"),

          fourOhFour("/browse-by-topic"),
          fourOhFour("/browse-by-topic/:slugs*"),

          fourOhFour("/contact"),
          fourOhFour("/contact/:slugs*"),

          fourOhFour("/donate"),
          fourOhFour("/donate/:slugs*"),

          fourOhFour("/exhibitions"),
          fourOhFour("/exhibitions/:slugs*"),

          fourOhFour("/guides"),
          fourOhFour("/guides/:slugs*"),

          fourOhFour("/lists"),
          fourOhFour("/lists/:slugs*"),

          fourOhFour("/local/"),
          fourOhFour("/local/:slugs*"),

          fourOhFour("/news"),
          fourOhFour("/news/:slugs*"),

          fourOhFour("/primary-source-sets"),
          fourOhFour("/primary-source-sets/:slugs*"),

          fourOhFour("/pro"),
          fourOhFour("/pro/:slugs*"),
        ],
      };
    } else {
      throw new Error("Invalid site environment");
    }
  },
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dp.la",
        pathname: "/api/exhibits/files/square_thumbnails/**",
      },
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      async_hooks: false,
      fs: false,
      path: false,
      process: false,
    };
    return config;
  },
};

// Nextjs Bundle Analyzer
if (process.env.ANALYZE === "true") {
  const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: true,
  });
  config = withBundleAnalyzer(config);
}

// Sentry

const { withSentryConfig } = require("@sentry/nextjs");

config = withSentryConfig(config, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: "dpla",
  authToken: process.env.SENTRY_AUTH_TOKEN,

  // Staging sends its events to a separate Sentry project
  project: process.env.SENTRY_PROJECT || "dpla-frontend",

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  webpack: {
    // Enables automatic instrumentation of Vercel Cron Monitors.
    // https://docs.sentry.io/product/crons/
    automaticVercelMonitors: false,
  },
});

module.exports = config;
