import React from "react";

import MainLayout from "components/MainLayout";
import BreadcrumbsModule from "shared/BreadcrumbsModule";

import utils from "stylesheets/utils.scss";

const TITLE = "List";

const Lists = ({ url }) =>
  <MainLayout route={url} pageTitle={TITLE}>
    <BreadcrumbsModule
      breadcrumbs={[
        {
          title: "Lists",
          url: "/lists",
          as: "/lists"
        },
        { title: "A list." }
      ]}
      route={url}
    />
    <div id="main" role="main" className={`${utils.container}`}>
      A list.
    </div>
  </MainLayout>;

Lists.getInitialProps = async ({ req }) => {
  return {};
};

export default Lists;
