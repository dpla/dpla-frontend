import React from "react";
import Link from "next/link";

import { stylesheet, classNames } from "./Breadcrumbs.css";
const chevron = "/static/images/chevron-thick-orange.svg";

const Breadcrumbs = ({ breadcrumbs }) =>
  <div className={classNames.breadcrumbs}>
    {breadcrumbs.map((breadcrumb, idx) => {
      if (idx < breadcrumbs.length - 1) {
        return (
          <span key={`${breadcrumb.title}-${idx}`}>
            <Link prefetch href={breadcrumb.url} as={breadcrumb.as}>
              <a
                dangerouslySetInnerHTML={{ __html: breadcrumb.title }}
                className={`link ${classNames.breadcrumbLink}`}
              />
            </Link>
            <img alt="" src={chevron} className={classNames.chevron} />
          </span>
        );
      } else {
        return (
          <span
            className={classNames.activeBreadcrumb}
            dangerouslySetInnerHTML={{ __html: breadcrumb.title }}
            key={`${breadcrumb.title}-${idx}`}
          />
        );
      }
    })}
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default Breadcrumbs;
