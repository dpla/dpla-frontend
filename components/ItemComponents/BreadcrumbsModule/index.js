import React from "react";
import Link from "next/link";

import Breadcrumbs from "shared/Breadcrumbs";

import { removeQueryParams } from "lib";
import { UNTITLED_TEXT } from "constants/site";

import utils from "stylesheets/utils.module.scss"

const chevron = "/static/images/chevron-thick-orange.svg";

const BreadcrumbsModule = ({
  breadcrumbs
}) =>
  <div className={".breadcrumbsWrapper"}>
    <div className={`${utils.container} .breadcrumbsModule`}>
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
