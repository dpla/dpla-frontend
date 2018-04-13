// for use in status/error pages

import React from "react";
import Helmet from "react-helmet";
import DPLAHead from "components/DPLAHead";
import SkipToContent from "shared/SkipToContent";
import PageHeader from "../PageHeader";
import GaWrapper from "shared/GaWrapper";

import { SITE_ENV } from "constants/env";

const MinimalLayout = ({
  children,
  route,
  headLinks,
  pageTitle,
  seoType,
  isPrintable
}) =>
  <div>
    <Helmet htmlAttributes={{ lang: "en" }} />
    <DPLAHead
      additionalLinks={headLinks}
      pageTitle={pageTitle}
      seoType={seoType}
    />
    {!isPrintable && <SkipToContent />}
    {!isPrintable &&
      <PageHeader
        searchQuery={route ? route.query.q : ""}
        hideSearchBar={SITE_ENV === "pro"}
      />}
    {children}
  </div>;

export default GaWrapper(MinimalLayout);
