import { useEffect } from "react";
import Script from "next/script";
import { useRouter } from "next/router";
import { gtag } from "../lib";

import "stylesheets/colors.scss";
import "stylesheets/themes/themes.scss";
import "stylesheets/typography.scss";
import "stylesheets/local.scss";
import "stylesheets/reset.scss";
import "stylesheets/global.scss";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

  function gaLoad() {
    window.dataLayer = window.dataLayer || [];

    function gtag() {
      dataLayer.push(arguments);
    }

    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", gaTrackingId, {
      page_path: window.location.pathname,
    });
  }

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`}
        onLoad={() => gaLoad()}
      />
      <Component {...pageProps} />
    </>
  );
}

export default App;
