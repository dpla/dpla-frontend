// for use in status/error pages
import React from "react";

import DPLAHead from "components/DPLAHead";
import SkipToContent from "shared/SkipToContent";
import PageHeader from "../PageHeader";

function MinimalLayout({
  children,
  headLinks,
  pageTitle,
  pageImage,
  seoType,
  isPrintable,
}) {
  const siteEnv = process.env.NEXT_PUBLIC_SITE_ENV;
  return (
    <div>
      <DPLAHead
        additionalLinks={headLinks}
        pageTitle={pageTitle}
        pageImage={pageImage}
        seoType={seoType}
      />
      {!isPrintable && <SkipToContent />}
      {!isPrintable && <PageHeader hideSearchBar={siteEnv === "pro"} />}
      {children}
    </div>
  );
}

export default MinimalLayout;
