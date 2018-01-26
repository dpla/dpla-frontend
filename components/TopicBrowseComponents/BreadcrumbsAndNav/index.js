import React from "react";

import Breadcrumbs from "shared/Breadcrumbs";
import NavLinks from "./components/NavLinks";

import { classNames, stylesheet } from "./BreadcrumbsAndNav.css";
import { classNames as utilClassNames } from "css/utils.css";
const { container } = utilClassNames;

const BreadcrumbsAndNav = ({
  breadcrumbs,
  previousSubtopic,
  nextSubtopic,
  topic,
  route
}) =>
  <div className={utilClassNames.breadcrumbsWrapper}>
    <div className={[classNames.breadcrumbsAndNav, container].join(" ")}>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default BreadcrumbsAndNav;
