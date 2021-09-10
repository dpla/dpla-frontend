import React from "react";

import Breadcrumbs from "shared/Breadcrumbs";

const BreadcrumbsModule = ({ route, breadcrumbs }) =>
  <div className={'.breadcrumbsWrapper'} data-cy={"pss-breadcrumbs"}>
    <div className={['.container', '.breadcrumbsModule'].join(" ")}>
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
