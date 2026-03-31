import * as Sentry from "@sentry/nextjs";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");

    // ALB restricts api-internal.dp.la to requests carrying this header.
    const internalAccessToken = process.env.DPLA_INTERNAL_ACCESS;
    const apiUrlPrefix = process.env.API_URL;
    if (internalAccessToken && apiUrlPrefix) {
      const apiBase = new URL(apiUrlPrefix);
      const apiBasePath = apiBase.pathname.endsWith("/")
        ? apiBase.pathname
        : `${apiBase.pathname}/`;
      const _originalFetch = globalThis.fetch;
      globalThis.fetch = (url, init) => {
        try {
          const target = new URL(
            url instanceof Request ? url.url : url.toString(),
          );
          if (
            target.origin === apiBase.origin &&
            (target.pathname === apiBase.pathname ||
              target.pathname.startsWith(apiBasePath))
          ) {
            const headers = new Headers(init?.headers);
            headers.set("DPLA-INTERNAL-ACCESS", internalAccessToken);
            init = { ...init, headers };
          }
        } catch {
          // Unparseable URL — pass through unmodified
        }
        return _originalFetch(url, init);
      };
    }
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}

export const onRequestError = Sentry.captureRequestError;
