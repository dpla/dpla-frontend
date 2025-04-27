import { Html, Head, Main, NextScript } from "next/document";
import { LOCALS } from "constants/local";
export default function Document() {
  const siteEnv = process.env.NEXT_PUBLIC_SITE_ENV;
  const localEnv = process.env.NEXT_PUBLIC_LOCAL_ID;
  const theme = siteEnv === "local" ? LOCALS[localEnv].theme : "";
  return (
    <Html lang={"en"} className={theme}>
      <Head></Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
