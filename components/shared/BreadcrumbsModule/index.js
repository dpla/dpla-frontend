import React from "react";

import Breadcrumbs from "shared/Breadcrumbs";

const BreadcrumbsModule = ({ breadcrumbs }) =>
  <div className={'.breadcrumbsWrapper'}>
    <div className={['.container', utils.breadcrumbsModule].join(" ")}>
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
