// for use in status/error pages
import React from "react";

import DPLAHead from "components/DPLAHead";
import SkipToContent from "shared/SkipToContent";
import PageHeader from "../PageHeader";

import { SITE_ENV } from "constants/env";

function MinimalLayout(props) {
  const { children, headLinks, pageTitle, pageImage, seoType, isPrintable } =
    props;
  return (
    <div>
      <DPLAHead
        additionalLinks={headLinks}
        pageTitle={pageTitle}
        pageImage={pageImage}
        seoType={seoType}
      />
      {!isPrintable && <SkipToContent />}
      {!isPrintable && <PageHeader hideSearchBar={SITE_ENV === "pro"} />}
      {children}
    </div>
  );
}

export default MinimalLayout;
