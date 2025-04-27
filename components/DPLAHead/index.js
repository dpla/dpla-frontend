import React from "react";
import Head from "next/head";

import { getMetaPageTitle, getCurrentFullUrl } from "lib";

import { LOCALS } from "constants/local";

class DPLAHead extends React.Component {
  state = { defaultImageUrl: "" };

  componentDidMount() {
    const fullUrl = getCurrentFullUrl();
    let url = fullUrl.substring(0, fullUrl.indexOf("/", 8));
    const siteEnv = process.env.NEXT_PUBLIC_SITE_ENV;
    const localId = process.env.NEXT_PUBLIC_LOCAL_ID;
    if (siteEnv !== "local") {
      url += "/static/images/dpla-logo-square_250.png";
    } else {
      url += `/static/images/${LOCALS[localId].logo}`;
    }
    this.setState({ defaultImageUrl: url });
  }

  render() {
    const { defaultImageUrl } = this.state;
    const localId = process.env.NEXT_PUBLIC_LOCAL_ID;
    const siteEnv = process.env.NEXT_PUBLIC_SITE_ENV;

    const defaultDescription =
      siteEnv !== "local"
        ? "The Digital Public Library of America brings together the riches of America’s libraries, archives, and museums, and makes them freely available to the world."
        : LOCALS[localId].description;

    const defaultPageTitle =
      siteEnv !== "local"
        ? "Digital Public Library of America"
        : LOCALS[localId].name;

    const {
      additionalLinks,
      seoType,
      pageTitle,
      pageImage,
      pageImageCaption,
      pageDescription,
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
          {pageImageCaption && (
            <meta name="twitter:image:alt" content={pageImageCaption} />
          )}
          <meta
            name="og:image"
            itemProp="image"
            content={pageImage || defaultImageUrl}
          />
          <meta name="og:title" content={pageTitle || defaultPageTitle} />
          <meta name="og:type" content={seoType || "website"} />
          <meta name="theme-color" content="#ffffff" />
          {siteEnv !== "local" && [
            <link
              key="180"
              rel="apple-touch-icon"
              sizes="180x180"
              href="/static/favicons/apple-touch-icon.png"
            />,
            <link
              key="32"
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/static/favicons/favicon-32x32.png"
            />,
            <link
              key="16"
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/static/favicons/favicon-16x16.png"
            />,
            <link
              key="mask"
              rel="mask-icon"
              href="/static/favicons/safari-pinned-tab.svg"
              color="#5bbad5"
            />,
            <link key="manifest" rel="manifest" href="/manifest.json" />,
          ]}
          {siteEnv === "local" && [
            <link
              key="180"
              rel="apple-touch-icon"
              sizes="180x180"
              href={`/static/local/${localId}/${LOCALS[localId].favicon}`}
            />,
            <link
              key="32"
              rel="icon"
              type="image/png"
              sizes="32x32"
              href={`/static/local/${localId}/${LOCALS[localId].favicon}`}
            />,
            <link
              key="16"
              rel="icon"
              type="image/png"
              sizes="16x16"
              href={`/static/local/${localId}/${LOCALS[localId].favicon}`}
            />,
            <link
              key="mask"
              rel="mask-icon"
              href={`/static/local/${localId}/${LOCALS[localId].favicon}`}
              color="#ffffff"
            />,
            <link key="manifest" rel="manifest" href="/manifest.json" />,
          ]}
          {additionalLinks}
          <title>{getMetaPageTitle(pageTitle)}</title>
        </Head>
      </div>
    );
  }
}

export default DPLAHead;
