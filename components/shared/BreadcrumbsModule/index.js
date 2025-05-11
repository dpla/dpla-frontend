import React from "react";

import Breadcrumbs from "shared/Breadcrumbs";

import utils from "stylesheets/utils.module.scss";

function BreadcrumbsModule({ breadcrumbs }) {
  return (
    <div className={utils.breadcrumbsWrapper}>
      <div className={`${utils.container} ${utils.breadcrumbsModule}`}>
        <Breadcrumbs
          breadcrumbs={breadcrumbs.map((breadcrumb) => ({
            ...breadcrumb,
            title: breadcrumb.title,
          }))}
        />
      </div>
    </div>
  );
}

export default BreadcrumbsModule;
