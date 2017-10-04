import React from "react";
import { markdown } from "markdown";

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
            title: markdown.toHTML(breadcrumb.title)
          })
        )}
      />
      {route.query.studentMode && <StudentMode route={route} />}
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default BreadcrumbsModule;
