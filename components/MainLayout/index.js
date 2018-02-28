import React from "react";
import Helmet from "react-helmet";
import DPLAHead from "components/DPLAHead";
import SkipToContent from "shared/SkipToContent";
import SmallScreenHeader from "./components/SmallScreenHeader";
import GlobalHeader from "./components/GlobalHeader";
import PageHeader from "./components/PageHeader";
import Footer from "./components/Footer";
import FeedbackForm from "components/FeedbackForm";
import GaWrapper from "shared/GaWrapper";

import { SITE_ENV } from "constants/env";
import { getCurrentUrl, getCurrentFullUrl } from "utilFunctions";

const MainLayout = ({
  children,
  route,
  hideSearchBar,
  hidePageHeader,
  isSearchPage,
  headLinks,
  pageTitle,
  seoType
}) => {
  const isHome =
    (SITE_ENV === "pro" && route.pathname === "/pro") ||
    (SITE_ENV === "user" && route.pathname === "/");
  return (
    <div>
      <Helmet htmlAttributes={{ lang: "en" }} />
      <DPLAHead
        additionalLinks={headLinks}
        pageTitle={pageTitle}
        seoType={seoType}
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
          searchQuery={route.query.q}
          hideSearchBar={hideSearchBar}
        />}
      {children}
      <Footer />
      <FeedbackForm route={route} />
    </div>
  );
};

export default GaWrapper(MainLayout);
