import React from "react";

import DPLAHead from "components/DPLAHead";
import SkipToContent from "shared/SkipToContent";
import SmallScreenHeader from "./components/SmallScreenHeader";
import GlobalHeader from "./components/GlobalHeader";
import PageHeader from "./components/PageHeader";
import Footer from "./components/Footer";

import {useRouter} from "next/router";

import {SITE_ENV} from "constants/env";

function MainLayout({
                      children,
                      hideSearchBar,
                      hidePageHeader,
                      isSearchPage,
                      headLinks,
                      pageTitle,
                      pageImage,
                      pageDescription,
                      seoType,
                    }) {
  const router = useRouter();
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
      <SkipToContent/>
      <SmallScreenHeader isSearchPage={isSearchPage} isHome={isHome}/>
      <GlobalHeader isHome={isHome}/>
      {!hidePageHeader && (
        <PageHeader
          query={router.query}
          searchQuery={router.query.q}
          hideSearchBar={hideSearchBar}
        />
      )}
      {children}
      <Footer/>
    </div>
  );
}

export default MainLayout;
