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
// The script-src hashes must match the inline bootstrap script Next.js injects
// into the HTML. Update them after any deployment that changes client-side JS.
// TODO: migrate to nonce-based CSP via Next.js middleware to eliminate manual
// hash updates.
const CLOUDFRONT_MEDIA = "https://d2jf00asb0fe6y.cloudfront.net";
const CSP = [
  "frame-ancestors 'self'",
  "form-action 'self'",
  "default-src 'self'",
  "script-src 'self' 'sha256-sYQvVdNrbb2ldJRpproLbB3h5LhCcbCA1SUM1wTfomI=' 'sha256-uZYgrdXqFswjbPEZxW2e6bv+djcz8D4kcJKjWyznRmk=' *.google-analytics.com *.googletagmanager.com *.sentry.io https://cdn.polyfill.io https://*.awswaf.com",
  "img-src 'self' http: https:",
  `connect-src 'self' https://dp.la https://*.dp.la ${CLOUDFRONT_MEDIA} *.google-analytics.com *.analytics.google.com *.sentry.io https://*.awswaf.com`,
  "style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com",
  "font-src 'self' https://cdnjs.cloudflare.com",
  `media-src 'self' *.dp.la ${CLOUDFRONT_MEDIA}`,
  "frame-src 'self' https://www.youtube.com",
].join("; ");

let config = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "Content-Security-Policy", value: CSP }],
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
      ];
    } else if (siteEnv === "user") {
      return [
        redirect("/about-us", "/about"),
        redirect("/contact-us", "/contact"),
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
          fourOhFour("/qa"),
          fourOhFour("/pro"),
          fourOhFour("/pro/hubs"),
          fourOhFour("/pro/wp"),
          fourOhFour("/local/"),
          fourOhFour("/local/markdown"),
          fourOhFour("/projects/dpla-wikimedia/:slugs*"),
        ],
      };
    } else if (siteEnv === "cqa") {
      return {
        beforeFiles: [
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
  experimental: {
    instrumentationHook: true,
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
  project: "dpla-frontend",

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: false,
});

module.exports = config;
