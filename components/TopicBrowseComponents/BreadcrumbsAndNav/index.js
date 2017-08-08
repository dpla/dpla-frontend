import React from "react";

import Breadcrumbs from "../../../components/Breadcrumbs";
import NavLinks from "./components/NavLinks";

import { classNames, stylesheet } from "./BreadcrumbsAndNav.css";
import { classNames as utilClassNames } from "css/utils.css";
const { module } = utilClassNames;

const BreadcrumbsAndNav = ({ showNavLinks, breadcrumbs }) =>
  <div className={classNames.wrapper}>
    <div className={[classNames.breadcrumbsAndNav, module].join(" ")}>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      {showNavLinks && <NavLinks prevUrl="" nextUrl="" />}
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default BreadcrumbsAndNav;
