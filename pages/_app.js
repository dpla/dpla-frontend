import { useEffect } from "react";
import Script from "next/script";
import { useRouter } from "next/router";
import { gtag } from "../lib";
import { patchDOMForGoogleTranslate } from "../lib/patchDOMForGoogleTranslate";

import "stylesheets/colors.scss";
import "stylesheets/themes/themes.scss";
import "stylesheets/typography.scss";
import "stylesheets/local.scss";
import "stylesheets/reset.scss";
import "stylesheets/global.scss";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

patchDOMForGoogleTranslate();

function App({ Component, pageProps }) {
  const gaTrackingId = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview({
        url: window.location.href,
        title: window.document.title,
      });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  // When a JS chunk fails to load after a deploy, Next.js's error recovery
  // tries to hard-navigate to the current URL, which the router rejects with
  // this invariant. By the time it fires, history.pushState has already run,
  // so reloading sends the user to the intended destination via a full SSR load.
  useEffect(() => {
    const handleStaleChunkError = (event) => {
      if (
        event.reason?.message?.startsWith(
          "Invariant: attempted to hard navigate to the same URL "
        )
      ) {
        event.preventDefault();
        window.location.reload();
      }
    };
    window.addEventListener("unhandledrejection", handleStaleChunkError);
    return () =>
      window.removeEventListener("unhandledrejection", handleStaleChunkError);
  }, []);

  return (
    <>
      {/* Define window.gtag synchronously so calls during hydration are queued,
          not dropped. The external script below processes the queue on load. */}
      <script
        id="gtag-init"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}`,
        }}
      />
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`}
        onLoad={() => {
          window.gtag("js", new Date());
          window.gtag("config", gaTrackingId, {
            page_path: window.location.pathname,
          });
        }}
      />
      <Component {...pageProps} />
    </>
  );
}

export default App;
