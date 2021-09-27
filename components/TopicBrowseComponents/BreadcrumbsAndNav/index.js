import React from "react";

import Breadcrumbs from "shared/Breadcrumbs";
import css from "./BreadcrumbsAndNav.module.scss";
import utils from "stylesheets/utils.module.scss"

const BreadcrumbsAndNav = ({
  breadcrumbs
}) =>
  <div className={utils.breadcrumbsWrapper}>
    <div className={[css.breadcrumbsAndNav, utils.container].join(" ")}>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
    </div>
  </div>;

export default BreadcrumbsAndNav;
