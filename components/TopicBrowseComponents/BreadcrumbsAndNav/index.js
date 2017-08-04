import React from "react";

import Breadcrumbs from "../../../../../../components/Breadcrumbs";
import NavLinks from "./components/NavLinks";

import styles from "./BreadcrumbsAndNav.css";
import { module } from "../../../../../../css/utils.css";

const BreadcrumbsAndNav = ({ routerProps, showNavLinks, breadcrumbs }) =>
  <div className={styles.wrapper}>
    <div className={[styles.breadcrumbsAndNav, module].join(" ")}>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      {showNavLinks && <NavLinks prevUrl="" nextUrl="" />}
    </div>
  </div>;

export default BreadcrumbsAndNav;
