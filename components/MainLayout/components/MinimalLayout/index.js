// for use in status/error pages
import React from "react";
import Router from "next/router";

import DPLAHead from "components/DPLAHead";
import SkipToContent from "shared/SkipToContent";
import PageHeader from "../PageHeader";

import * as gtag from "lib/gtag";
import { getFullPath, getCurrentFullUrl } from "lib";

import { SITE_ENV } from "constants/env";

class MinimalLayout extends React.Component {
  // Google Analytics tracking for MinimalLayout-using pages (404/500)
  componentDidMount() {
    this.trackPageview();
    Router.onRouteChangeComplete = url => this.trackPageview();
  }

  trackPageview() {
    const fullPath = getFullPath();
    const fullUrl = getCurrentFullUrl();

    if (fullPath !== this.lastTrackedPath) {
      gtag.pageview({
        path: fullPath,
        url: fullUrl,
        title: this.props.pageTitle
      });
      this.lastTrackedPath = fullPath;
    }
  }

  render() {
    const {
      children,
      route,
      headLinks,
      pageTitle,
      pageImage,
      seoType,
      isPrintable
    } = this.props;
    return (
      <div>
        <DPLAHead
          additionalLinks={headLinks}
          pageTitle={pageTitle}
          pageImage={pageImage}
          seoType={seoType}
        />
        {!isPrintable && <SkipToContent />}
        {!isPrintable &&
          <PageHeader
            searchQuery={route ? route.query.q : ""}
            hideSearchBar={SITE_ENV === "pro"}
          />}
        {children}
      </div>
    );
  }
}

export default MinimalLayout;
