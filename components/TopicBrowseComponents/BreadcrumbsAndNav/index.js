import React from "react";

import Breadcrumbs from "shared/Breadcrumbs";
import css from "./BreadcrumbsAndNav.module.scss";
import utils from "stylesheets/utils.module.scss";

function BreadcrumbsAndNav({ breadcrumbs }) {
  return (
    <div className={utils.breadcrumbsWrapper}>
      <div className={`${css.breadcrumbsAndNav} ${utils.container}`}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>
    </div>
  );
}

export default BreadcrumbsAndNav;
