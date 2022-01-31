import Document, { Html, Head, Main, NextScript } from "next/document";

import { gaTrackingId } from "constants/env";

export default class MyDocument extends Document {
  render() {
      console.log(gaTrackingId);
    return (
      <Html lang={"en"} >
        <Head>

        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
