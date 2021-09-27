import React from "react";

import DPLAHead from "components/DPLAHead";
import SkipToContent from "shared/SkipToContent";
import SmallScreenHeader from "./components/SmallScreenHeader";
import GlobalHeader from "./components/GlobalHeader";
import PageHeader from "./components/PageHeader";
import Footer from "./components/Footer";

import { withRouter } from 'next/router'

import * as gtag from "lib/gtag";
import { getFullPath, getCurrentFullUrl } from "lib";

import { SITE_ENV } from "constants/env";

class MainLayout extends React.Component {
  // Google Analytics tracking for MainLayout-using pages
  componentDidMount() {
    this.props.router.onRouteChangeComplete = url => this.trackPageview();
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
      router,
      hideSearchBar,
      hidePageHeader,
      isSearchPage,
      headLinks,
      pageTitle,
      pageImage,
      pageDescription,
      seoType
    } = this.props;
    const isHome =
      (SITE_ENV === "local" && router.pathname === "/local") ||
      (SITE_ENV === "pro" && router.pathname === "/pro") ||
      (SITE_ENV === "user" && router.pathname === "/");
    return (
      <div>
        <DPLAHead
          additionalLinks={headLinks}
          pageTitle={pageTitle}
          pageImage={pageImage}
          seoType={seoType}
          pageDescription={pageDescription}
        />
        <SkipToContent />
        <SmallScreenHeader
          isSearchPage={isSearchPage}
          isHome={isHome}
        />
        <GlobalHeader            
          isHome={isHome} 
        />
        {!hidePageHeader &&
          <PageHeader
            query={router.query}
            searchQuery={router.query.q}
            hideSearchBar={hideSearchBar}
          />}
        {children}
        <Footer />
      </div>
    );
  }
}

export default withRouter(MainLayout);
