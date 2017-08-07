import React from "react";

import Head from "../Head";
import Header from "./components/Header";
import HeaderSearchBar from "./components/HeaderSearchBar";
import Footer from "./components/Footer";

const MainLayout = ({ children, hideSearchBar }) =>
  <div>
    <Head />
    <Header />
    {!hideSearchBar && <HeaderSearchBar />}
    {children}
    <Footer />
  </div>;

export default MainLayout;
