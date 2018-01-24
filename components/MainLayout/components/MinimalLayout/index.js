// for use in status/error pages

import React from "react";
import Helmet from "react-helmet";
import DPLAHead from "components/DPLAHead";
import SkipToContent from "shared/SkipToContent";
import PageHeader from "../PageHeader";
import GaWrapper from "shared/GaWrapper";

const MinimalLayout = ({ children, route, headLinks, pageTitle, seoType }) =>
  <div>
    <Helmet htmlAttributes={{ lang: "en" }} />
    <DPLAHead
      additionalLinks={headLinks}
      pageTitle={pageTitle}
      seoType={seoType}
    />
    <SkipToContent />
    <PageHeader searchQuery={route.query.q} />
    {children}
  </div>;

export default GaWrapper(MinimalLayout);
