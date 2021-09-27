import React from "react";

import Breadcrumbs from "shared/Breadcrumbs";
import utils from "stylesheets/utils.module.scss"

const BreadcrumbsModule = ({ breadcrumbs }) =>
  <div className={utils.breadcrumbsWrapper} data-cy={"pss-breadcrumbs"}>
    <div className={`${utils.container} ${utils.breadcrumbsModule}`}>
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
