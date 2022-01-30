import Document, { Html, Head, Main, NextScript } from "next/document";

import Script from "next/script";

import { gaTrackingId } from "constants/env";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang={"en"} >
        <Head>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`}
                strategy="afterInteractive"
                onLoad={() => {
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', gaTrackingId);
                }}
            />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
