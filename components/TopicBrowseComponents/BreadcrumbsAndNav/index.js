import React from "react";

import Breadcrumbs from "shared/Breadcrumbs";
import NavLinks from "./components/NavLinks";

import utils from "stylesheets/utils.scss";

import { classNames, stylesheet } from "./BreadcrumbsAndNav.css";

const BreadcrumbsAndNav = ({
  breadcrumbs,
  previousSubtopic,
  nextSubtopic,
  topic,
  route
}) =>
  <div className={utils.breadcrumbsWrapper}>
    <div className={[classNames.breadcrumbsAndNav, utils.container].join(" ")}>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default BreadcrumbsAndNav;
