import React from "react";

import Breadcrumbs from "./components/Breadcrumbs";
import StudentMode from "./components/StudentMode";

import styles from "./BreadcrumbsModule.css";
import { module } from "../../css/utils.css";

const BreadcrumbsModule = ({
  routerProps,
  showStudentMode,
  showNavArrows,
  breadcrumbs
}) =>
  <div className={styles.wrapper}>
    <div className={[styles.breadcrumbsModule, module].join(" ")}>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      {showStudentMode && <StudentMode routerProps={routerProps} />}
    </div>
  </div>;

export default BreadcrumbsModule;
