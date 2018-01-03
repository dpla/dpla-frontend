import React from "react";
import Helmet from "react-helmet";
import DPLAHead from "../DPLAHead";
import SkipToContent from "../shared/SkipToContent";
import SmallScreenHeader from "./components/SmallScreenHeader";
import GlobalHeader from "./components/GlobalHeader";
import PageHeader from "./components/PageHeader";
import Footer from "./components/Footer";
import GaWrapper from "../shared/GaWrapper";

import { SITE_ENV } from "@env";

const MainLayout = ({
  children,
  route,
  hideSearchBar,
  isSearchPage,
  headLinks,
  pageTitle,
  seoType
}) =>
  <div>
    <Helmet htmlAttributes={{ lang: "en" }} />
    <DPLAHead
      additionalLinks={headLinks}
      pageTitle={pageTitle}
      seoType={seoType}
    />
    <SkipToContent />
    <SmallScreenHeader isSearchPage={isSearchPage} route={route} />
    <GlobalHeader />
    {!hideSearchBar && <PageHeader searchQuery={route.query.q} />}
    [{SITE_ENV}]
    /{process.env.NODE_ENV}/
    {children}
    <Footer />
  </div>;

export default GaWrapper(MainLayout);
