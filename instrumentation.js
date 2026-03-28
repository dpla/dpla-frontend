import * as Sentry from "@sentry/nextjs";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");

    // ALB restricts api-internal.dp.la to requests carrying this header.
    const internalAccessToken = process.env.DPLA_INTERNAL_ACCESS;
    const apiUrlPrefix = process.env.API_URL;
    if (internalAccessToken && apiUrlPrefix) {
      const _originalFetch = globalThis.fetch;
      globalThis.fetch = (url, init) => {
        const urlStr = typeof url === "string" ? url : url.toString();
        if (urlStr.startsWith(apiUrlPrefix)) {
          init = {
            ...init,
            headers: {
              ...init?.headers,
              "DPLA-INTERNAL-ACCESS": internalAccessToken,
            },
          };
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
