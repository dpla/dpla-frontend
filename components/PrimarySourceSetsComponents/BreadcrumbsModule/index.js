import React from "react";

import Breadcrumbs from "../../Breadcrumbs";
import StudentMode from "./components/StudentMode";

import { stylesheet, classNames } from "./BreadcrumbsModule.css";
import { classNames as utilClassNames } from "css/utils.css";

const { module } = utilClassNames;

const BreadcrumbsModule = ({ route, breadcrumbs }) =>
  <div className={classNames.wrapper}>
    <div className={[module, classNames.breadcrumbsModule].join(" ")}>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      {route.query.studentMode && <StudentMode route={route} />}
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default BreadcrumbsModule;
