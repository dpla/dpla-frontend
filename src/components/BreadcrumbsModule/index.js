import React from "react";
import { Link } from "react-router-dom";

import styles from "./BreadcrumbsModule.css";
import { module } from "../../utils.css";
import chevron from "../../images/chevron-thick-orange.svg";

const BreadcrumbsModule = ({ breadcrumbs }) =>
  <div className={styles.wrapper}>
    <div className={[styles.breadcrumbsModule, module].join(" ")}>
      <div className={styles.breadcrumbs}>
        <Link className={styles.breadcrumbLink} to="/primary-source-sets">
          Primary Source Sets
        </Link>
        <img alt="" src={chevron} className={styles.chevron} />
        <div className={styles.activeBreadcrumb}>Race to the Moon</div>
      </div>
    </div>
  </div>;

export default BreadcrumbsModule;
