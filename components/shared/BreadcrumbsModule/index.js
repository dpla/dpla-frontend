import React from "react";

import Breadcrumbs from "shared/Breadcrumbs";

import utils from "stylesheets/utils.scss";

const BreadcrumbsModule = ({ breadcrumbs }) =>
  <div className={utils.breadcrumbsWrapper}>
    <div className={[utils.container, utils.breadcrumbsModule].join(" ")}>
      <Breadcrumbs
        breadcrumbs={breadcrumbs.map(breadcrumb =>
          Object.assign({}, breadcrumb, {
            title: breadcrumb.title
          })
        )}
      />
    </div>
  </div>;

export default BreadcrumbsModule;
