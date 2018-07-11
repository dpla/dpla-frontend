import React from "react";
import Router from "next/router";

import Helmet from "react-helmet";
import DPLAHead from "components/DPLAHead";
import SkipToContent from "shared/SkipToContent";
import SmallScreenHeader from "./components/SmallScreenHeader";
import GlobalHeader from "./components/GlobalHeader";
import PageHeader from "./components/PageHeader";
import Footer from "./components/Footer";

import * as gTag from "lib/gTag";
import { getFullPath } from "lib";

import { SITE_ENV } from "constants/env";

class MainLayout extends React.Component {
  // Google Analytics tracking for MainLayout-using pages
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
      hideSearchBar,
      hidePageHeader,
      isSearchPage,
      headLinks,
      pageTitle,
      pageDescription,
      seoType
    } = this.props;
    const isHome =
      (SITE_ENV === "local" && route.pathname === "/local") ||
      (SITE_ENV === "pro" && route.pathname === "/pro") ||
      (SITE_ENV === "user" && route.pathname === "/");
    return (
      <div>
        <Helmet htmlAttributes={{ lang: "en" }} />
        <DPLAHead
          additionalLinks={headLinks}
          pageTitle={pageTitle}
          seoType={seoType}
          pageDescription={pageDescription}
        />
        <SkipToContent />
        <SmallScreenHeader
          isSearchPage={isSearchPage}
          route={route}
          isHome={isHome}
        />
        <GlobalHeader isHome={isHome} />
        {!hidePageHeader &&
          <PageHeader
            query={route.query}
            searchQuery={route.query.q}
            hideSearchBar={hideSearchBar}
          />}
        {children}
        <Footer route={route} />
      </div>
    );
  }
}

export default MainLayout;
