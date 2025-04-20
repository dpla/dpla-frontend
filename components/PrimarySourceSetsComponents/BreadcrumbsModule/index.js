import React from "react";

import Breadcrumbs from "shared/Breadcrumbs";
import utils from "stylesheets/utils.module.scss"

function BreadcrumbsModule({breadcrumbs}) {
  const breadcrumbsParams = breadcrumbs.map(breadcrumb => ({...breadcrumb, title: breadcrumb.title}))
  return (
    <div className={utils.breadcrumbsWrapper} data-cy={"pss-breadcrumbs"}>
      <div className={`${utils.container} ${utils.breadcrumbsModule}`}>
        <Breadcrumbs breadcrumbs={breadcrumbsParams}/>
      </div>
    </div>
  );
}

export default BreadcrumbsModule;
