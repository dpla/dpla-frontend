import React from "react";

import Head from "../Head";
import Header from "./components/Header";
import HeaderSearchBar from "./components/HeaderSearchBar";
import Footer from "./components/Footer";

const MainLayout = ({ children, hideSearchBar, headLinks }) =>
  <div>
    <Head additionalLinks={headLinks} />
    <Header />
    {!hideSearchBar && <HeaderSearchBar />}
    {children}
    <Footer />
  </div>;

export default MainLayout;
