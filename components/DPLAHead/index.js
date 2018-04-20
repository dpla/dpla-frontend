import React from "react";
import Head from "next/head";

import reset from "stylesheets/reset.scss";
import utils from "stylesheets/utils.scss";
import accessibility from "stylesheets/accessibility.scss";

import { getMetaPageTitle } from "lib";

const DPLAHead = ({ additionalLinks, pageTitle, seoType }) =>
  <div>
    <Head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta name="referrer" content="origin-when-cross-origin" />
      <meta name="og:site_name" content="Digital Public Library of America" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@dpla" />
      <meta name="twitter:creator" content="@dpla" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/static/favicons/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/static/favicons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/static/favicons/favicon-16x16.png"
      />
      <link rel="manifest" href="/manifest.json" />
      <link
        rel="mask-icon"
        href="/static/favicons/safari-pinned-tab.svg"
        color="#5bbad5"
      />
      <meta name="theme-color" content="#ffffff" />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      <link
        rel="stylesheet"
        href="https://unpkg.com/react-select@1.2.0/dist/react-select.css"
      />
      {additionalLinks}
      <title>{getMetaPageTitle(pageTitle)}</title>
      <meta
        name="og:title"
        content={pageTitle || "Digital Public Library of America"}
      />
      <meta name="og:type" content={seoType || "website"} />
      <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=default,es6,EventSource,Object.values,Object.entries,Array.prototype.includes,Intl.~locale.en" />
    </Head>
  </div>;

export default DPLAHead;
