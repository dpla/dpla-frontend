import React from "react";

import Head from "../Head";
import SmallScreenHeader from "./components/SmallScreenHeader";
import GlobalHeader from "./components/GlobalHeader";
import PageHeader from "./components/PageHeader";
import Footer from "./components/Footer";
import GaWrapper from "../shared/GaWrapper";

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
    <Head additionalLinks={headLinks} pageTitle={pageTitle} seoType={seoType} />
    <SmallScreenHeader isSearchPage={isSearchPage} route={route} />
    <GlobalHeader />
    {!hideSearchBar && <PageHeader searchQuery={route.query.q} />}
    {children}
    <Footer />
  </div>;

export default GaWrapper(MainLayout);
