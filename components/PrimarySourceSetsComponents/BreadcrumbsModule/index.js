import React from "react";
const markdownit = require("markdown-it")({ html: true });

import Breadcrumbs from "shared/Breadcrumbs";

import { stylesheet, classNames as utilClassNames } from "css/utils.css";

const { container } = utilClassNames;

const BreadcrumbsModule = ({ route, breadcrumbs }) =>
  <div className={utilClassNames.breadcrumbsWrapper}>
    <div className={[container, utilClassNames.breadcrumbsModule].join(" ")}>
      <Breadcrumbs
        breadcrumbs={breadcrumbs.map(breadcrumb =>
          Object.assign({}, breadcrumb, {
            title: markdownit.renderInline(breadcrumb.title)
          })
        )}
      />
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default BreadcrumbsModule;
