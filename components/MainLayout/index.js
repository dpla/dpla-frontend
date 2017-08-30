import React from "react";

import Head from "../Head";
import GlobalHeader from "./components/GlobalHeader";
import PageHeader from "./components/PageHeader";
import Footer from "./components/Footer";

const MainLayout = ({ children, hideSearchBar, headLinks }) =>
  <div>
    <Head additionalLinks={headLinks} />
    <GlobalHeader />
    {!hideSearchBar && <PageHeader />}
    {children}
    <Footer />
  </div>;

export default MainLayout;
