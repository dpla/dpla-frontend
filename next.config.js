const { LOCALS } = require("./constants/local");
const SECTIONS = require("./constants/pro").SECTIONS;
const path = require("path");

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

let config = {
  async redirects() {
    if (siteEnv === "local") {
      return [];
    } else if (siteEnv === "pro") {
      const userUrl = process.env.NEXT_PUBLIC_USER_BASE_URL;
      return [
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
    } else {
      throw new Error("Invalid site environment");
    }
  },
  async rewrites() {
    if (siteEnv === "local") {
      const local = LOCALS[localId];
      const results = [
        rewrite("/", "/local"),
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
      console.log(results);
      return { beforeFiles: results };
    } else if (siteEnv === "pro") {
      const results = [
        rewrite("/", "/pro"),
        rewrite("/hubs", "/pro/hubs"),
        rewrite(
          "/hubs/:subsection",
          "/pro/wp?section=hubs&subsection=:subsection",
        ),
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
          fourOhFour("/pro"),
          fourOhFour("/pro/hubs"),
          fourOhFour("/pro/wp"),
          fourOhFour("/local/"),
          fourOhFour("/local/markdown"),
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
    //config.infrastructureLogging = { debug: /PackFileCache/ };
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
    enabled: process.env.ANALYZE === "true",
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
