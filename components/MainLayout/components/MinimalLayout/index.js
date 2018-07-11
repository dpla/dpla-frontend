// for use in status/error pages
import React from "react";
import Helmet from "react-helmet";
import Router from "next/router";

import DPLAHead from "components/DPLAHead";
import SkipToContent from "shared/SkipToContent";
import PageHeader from "../PageHeader";

import * as gTag from "lib/gTag";
import { getFullPath } from "lib";

import { SITE_ENV } from "constants/env";

class MinimalLayout extends React.Component {
  // Google Analytics tracking for MinimalLayout-using pages (404/500)
  componentDidMount() {
    this.trackPageview();
    Router.onRouteChangeComplete = url => this.trackPageview();
  }

  trackPageview() {
    const fullPath = getFullPath();

    if (fullPath !== this.lastTrackedPath) {
      gTag.pageview(fullPath);
      this.lastTrackedPath = fullPath;
    }
  }

  render() {
    const {
      children,
      route,
      headLinks,
      pageTitle,
      seoType,
      isPrintable
    } = this.props;
    return (
      <div>
        <Helmet htmlAttributes={{ lang: "en" }} />
        <DPLAHead
          additionalLinks={headLinks}
          pageTitle={pageTitle}
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
