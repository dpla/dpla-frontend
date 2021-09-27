import React from "react";

import Breadcrumbs from "shared/Breadcrumbs";

import { UNTITLED_TEXT } from "constants/site";

import utils from "stylesheets/utils.module.scss"


const BreadcrumbsModule = ({
  breadcrumbs
}) =>
  <div className={utils.breadcrumbsWrapper}>
    <div className={`${utils.container} ${utils.breadcrumbsModule}`}>
      <Breadcrumbs
        breadcrumbs={breadcrumbs.map(breadcrumb =>
          Object.assign({}, breadcrumb, {
            title: breadcrumb.title ? breadcrumb.title : UNTITLED_TEXT
          })
        )}
      />
    </div>
  </div>;

export default BreadcrumbsModule;
