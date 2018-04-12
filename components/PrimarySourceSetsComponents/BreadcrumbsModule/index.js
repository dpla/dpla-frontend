import React from "react";
const markdownit = require("markdown-it")({ html: true });

import Breadcrumbs from "shared/Breadcrumbs";

import utils from "stylesheets/utils.scss";

const BreadcrumbsModule = ({ route, breadcrumbs }) =>
  <div className={utils.breadcrumbsWrapper}>
    <div className={[utils.container, utils.breadcrumbsModule].join(" ")}>
      <Breadcrumbs
        breadcrumbs={breadcrumbs.map(breadcrumb =>
          Object.assign({}, breadcrumb, {
            title: markdownit.renderInline(breadcrumb.title)
          })
        )}
      />
    </div>
  </div>;

export default BreadcrumbsModule;
