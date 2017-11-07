import React from "react";
import Head from "next/head";

import { stylesheet as utilStylesheet } from "css/utils.css";
import { stylesheet as reset } from "css/reset.css";
import { getMetaPageTitle } from "utilFunctions";

export default ({ additionalLinks, pageTitle }) =>
  <div>
    <Head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta
        name="referrer"
        content="origin-when-cross-origin"
      />
      <meta 
        name="og:site_name"
        content="Digital Pulic Library of America"
      />
      <meta
        name="twitter:card"
        content="summary"
      />
      <meta
        name="twitter:site"
        content="@dpla"
      />
      <meta
        name="twitter:creator"
        content="@dpla"
      />
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
        href="https://fonts.googleapis.com/css?family=Lora:400,400i,700|Source+Sans+Pro:400,400i,600,600i"
        rel="stylesheet"
      />
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
        href="https://unpkg.com/react-select/dist/react-select.css"
      />
      {additionalLinks}
      <title>{getMetaPageTitle(pageTitle)}</title>
      <meta
        name="og:title"
        content={pageTitle || "Digital Public Library of America"}
      />
      <style>{reset}</style>
      <style>{utilStylesheet}</style>
    </Head>
  </div>;
