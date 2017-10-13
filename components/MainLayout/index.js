import React from "react";

import Head from "../Head";
import SmallScreenHeader from "./components/SmallScreenHeader";
import GlobalHeader from "./components/GlobalHeader";
import PageHeader from "./components/PageHeader";
import Footer from "./components/Footer";

const MainLayout = ({
  children,
  route,
  hideSearchBar,
  isSearchPage,
  headLinks
}) =>
  <div>
    <Head additionalLinks={headLinks} />
    <SmallScreenHeader isSearchPage={isSearchPage} route={route} />
    <GlobalHeader />
    {!hideSearchBar && <PageHeader searchQuery={route.query.q} />}
    {children}
    <Footer />
  </div>;

export default MainLayout;
