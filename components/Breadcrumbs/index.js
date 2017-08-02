import React from "react";
import { Link } from "react-router-dom";

import styles from "./Breadcrumbs.css";
import chevron from "../../../../images/chevron-thick-orange.svg";

const Breadcrumbs = ({ breadcrumbs }) =>
  <div className={styles.breadcrumbs}>
    {breadcrumbs.map((breadcrumb, idx) => {
      if (idx < breadcrumbs.length - 1) {
        return (
          <span>
            <Link
              className={styles.breadcrumbLink}
              to={{
                pathname: breadcrumb.url,
                search: breadcrumb.search
              }}
            >
              {breadcrumb.title}
            </Link>
            <img alt="" src={chevron} className={styles.chevron} />
          </span>
        );
      } else {
        return (
          <span className={styles.activeBreadcrumb}>{breadcrumb.title}</span>
        );
      }
    })}
  </div>;

export default Breadcrumbs;
