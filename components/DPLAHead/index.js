import React from "react";
import Head from "next/head";

import { getMetaPageTitle, getCurrentFullUrl } from "lib";

import { LOCALS } from "constants/local";
import { SITE_ENV, LOCAL_ID } from "constants/env";

const defaultDescription = SITE_ENV !== "local"
  ? "The Digital Public Library of America brings together the riches of America’s libraries, archives, and museums, and makes them freely available to the world."
  : LOCALS[LOCAL_ID].description;

const defaultPageTitle = SITE_ENV !== "local"
  ? "Digital Public Library of America"
  : LOCALS[LOCAL_ID].name;

class DPLAHead extends React.Component {
  state = { defaultImageUrl: "" };

  componentDidMount() {
    const fullUrl = getCurrentFullUrl();
    let url = fullUrl.substr(0, fullUrl.indexOf("/", 8));
    if (SITE_ENV !== "local") {
      url += "/static/images/dpla-logo-square_250.png";
    } else {
      url += `/static/images/${LOCALS[LOCAL_ID].logo}`;
    }
    this.setState({ defaultImageUrl: url });
  }

  render() {
    const { defaultImageUrl } = this.state;
    const {
      additionalLinks,
      seoType,
      pageTitle,
      pageImage,
      pageImageCaption,
      pageDescription
    } = this.props;

    return (
      <div>
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta name="referrer" content="origin-when-cross-origin" />
          <meta
            name="description"
            content={pageDescription || defaultDescription}
          />
          <meta
            name="og:description"
            content={pageDescription || defaultDescription}
          />
          <meta name="og:site_name" content={defaultPageTitle} />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@dpla" />
          <meta name="twitter:creator" content="@dpla" />
          <meta name="twitter:image" content={pageImage || defaultImageUrl} />
          {pageImageCaption &&
            <meta name="twitter:image:alt" content={pageImageCaption} />}
          <meta name="og:image" itemProp="image" content={pageImage || defaultImageUrl} />
          <meta name="og:title" content={pageTitle || defaultPageTitle} />
          <meta name="og:type" content={seoType || "website"} />
          <meta name="theme-color" content="#ffffff" />
          {SITE_ENV !== "local" && [
            <link
              key="180"
              rel="apple-touch-icon"
              sizes="180x180"
              href="/public/static/favicons/apple-touch-icon.png"
            />,
            <link
              key="32"
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/public/static/favicons/favicon-32x32.png"
            />,
            <link
              key="16"
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/public/static/favicons/favicon-16x16.png"
            />,
            <link
              key="mask"
              rel="mask-icon"
              href="/public/static/favicons/safari-pinned-tab.svg"
              color="#5bbad5"
            />,
            <link key="manifest" rel="manifest" href="/manifest.json" />
          ]}
          {SITE_ENV === "local" && [
            <link
              key="180"
              rel="apple-touch-icon"
              sizes="180x180"
              href={`/static/local/${LOCAL_ID}/${LOCALS[LOCAL_ID].favicon}`}
            />,
            <link
              key="32"
              rel="icon"
              type="image/png"
              sizes="32x32"
              href={`/static/local/${LOCAL_ID}/${LOCALS[LOCAL_ID].favicon}`}
            />,
            <link
              key="16"
              rel="icon"
              type="image/png"
              sizes="16x16"
              href={`/static/local/${LOCAL_ID}/${LOCALS[LOCAL_ID].favicon}`}
            />,
            <link
              key="mask"
              rel="mask-icon"
              href={`/static/local/${LOCAL_ID}/${LOCALS[LOCAL_ID].favicon}`}
              color="#ffffff"
            />,
            <link key="manifest" rel="manifest" href="/manifest.json" />
          ]}
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
          {additionalLinks}
          <title>{getMetaPageTitle(pageTitle)}</title>
          <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=default,es6,EventSource,Object.values,Object.entries,Object.keys,Array.prototype.includes,Intl.~locale.en" />
          <script src="/public/static/js/localforage.min.js" type="text/javascript" />
        </Head>
      </div>
    );
  }
}

export default DPLAHead;
