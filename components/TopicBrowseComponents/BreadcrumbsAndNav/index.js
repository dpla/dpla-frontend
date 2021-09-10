import React from "react";

import Breadcrumbs from "shared/Breadcrumbs";
import css from "./BreadcrumbsAndNav.module.scss";

const BreadcrumbsAndNav = ({
  breadcrumbs,
  previousSubtopic,
  nextSubtopic,
  topic,
  route
}) =>
  <div className={`.breadcrumbsWrapper`}>
    <div className={[css.breadcrumbsAndNav, `.container`].join(" ")}>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
    </div>
  </div>;

export default BreadcrumbsAndNav;
