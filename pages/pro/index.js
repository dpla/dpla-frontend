import React from "react";

import MainLayout from "components/MainLayout";
import ProHome from "components/HomePageComponents/ProHome";

import { SITE_ENV } from "constants/env";

const Home = ({ url }) =>
  <MainLayout
    hidePageHeader={SITE_ENV === "user"}
    hideSearchBar={SITE_ENV === "pro"}
    route={url}
  >
    <div id="main">
      <ProHome />
    </div>
  </MainLayout>;

Home.getInitialProps = async ({ req }) => {
  return {};
};

export default Home;
