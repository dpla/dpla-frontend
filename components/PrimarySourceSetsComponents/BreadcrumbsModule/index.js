import React from "react";
const markdownit = require("markdown-it")({ html: true });

import Breadcrumbs from "../../Breadcrumbs";
import StudentMode from "./components/StudentMode";

import { stylesheet, classNames } from "./BreadcrumbsModule.css";
import { classNames as utilClassNames } from "css/utils.css";

const { container } = utilClassNames;

const BreadcrumbsModule = ({ route, breadcrumbs }) =>
  <div className={classNames.wrapper}>
    <div className={[container, classNames.breadcrumbsModule].join(" ")}>
      <Breadcrumbs
        breadcrumbs={breadcrumbs.map(breadcrumb =>
          Object.assign({}, breadcrumb, {
            title: markdownit.render(breadcrumb.title)
          })
        )}
      />
      {route.query.studentMode && <StudentMode route={route} />}
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default BreadcrumbsModule;
