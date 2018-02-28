import React from "react";
import Link from "next/link";

import Breadcrumbs from "shared/Breadcrumbs";

import { classNames as utilClassNames } from "css/utils.css";

const { container } = utilClassNames;

const BreadcrumbsModule = ({ route, breadcrumbs }) =>
  <div className={utilClassNames.breadcrumbsWrapper}>
    <div className={[container, utilClassNames.breadcrumbsModule].join(" ")}>
      <Breadcrumbs
        breadcrumbs={breadcrumbs.map(breadcrumb =>
          Object.assign({}, breadcrumb, {
            title: breadcrumb.title
          })
        )}
      />
    </div>
  </div>;

export default BreadcrumbsModule;
