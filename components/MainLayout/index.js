import React from "react";

import Head from "../Head";
import GlobalHeader from "./components/GlobalHeader";
import PageHeader from "./components/PageHeader";
import Footer from "./components/Footer";

const MainLayout = ({ children, route, hideSearchBar, headLinks }) =>
  <div>
    <Head additionalLinks={headLinks} />
    <GlobalHeader />
    {!hideSearchBar && <PageHeader searchQuery={route.query.q} />}
    {children}
    <Footer />
  </div>;

export default MainLayout;
