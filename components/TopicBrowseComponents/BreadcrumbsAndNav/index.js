import React from "react";

import Breadcrumbs from "shared/Breadcrumbs";
import NavLinks from "./components/NavLinks";

import utils from "stylesheets/utils.scss";
import css from "./BreadcrumbsAndNav.scss";

const BreadcrumbsAndNav = ({
  breadcrumbs,
  previousSubtopic,
  nextSubtopic,
  topic,
  route
}) =>
  <div className={utils.breadcrumbsWrapper}>
    <div className={[css.breadcrumbsAndNav, utils.container].join(" ")}>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
    </div>
  </div>;

export default BreadcrumbsAndNav;
