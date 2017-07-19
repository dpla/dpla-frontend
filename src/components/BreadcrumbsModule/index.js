import React from "react";
import { Link } from "react-router-dom";

import styles from "./BreadcrumbsModule.css";
import { module } from "../../utils.css";
import chevron from "../../images/chevron-thick-orange.svg";
import question from "../../images/question.svg";

const isStudentMode = location =>
  /\/primary-source-sets\/.+\/.+/.exec(location.pathname) &&
  location.search.includes("student");

const BreadcrumbsModule = ({ routerProps }) =>
  <div className={styles.wrapper}>
    <div className={[styles.breadcrumbsModule, module].join(" ")}>
      <div className={styles.breadcrumbs}>
        <Link className={styles.breadcrumbLink} to="/primary-source-sets">
          Primary Source Sets
        </Link>
        <img alt="" src={chevron} className={styles.chevron} />
        <div className={styles.activeBreadcrumb}>Race to the Moon</div>
      </div>
      {isStudentMode(routerProps.location) &&
        <div className={styles.studentMode}>
          <h3 className={styles.studentModeText}>Student Mode</h3>
          <img src={question} alt="" className={styles.questionIcon} />
        </div>}
    </div>
  </div>;

export default BreadcrumbsModule;
