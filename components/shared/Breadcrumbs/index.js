import React from "react";
import Link from "next/link";

import css from "./Breadcrumbs.scss";

const chevron = "/static/images/chevron-thick-orange.svg";

const Breadcrumbs = ({ breadcrumbs }) =>
  <div className={css.breadcrumbs}>
    {breadcrumbs.map((breadcrumb, idx) => {
      if (idx < breadcrumbs.length - 1) {
        return (
          <span
            className={css.breadcrumbLinkWrapper}
            key={`${breadcrumb.title}-${idx}`}
          >
            <Link prefetch href={breadcrumb.url} as={breadcrumb.as}>
              <a
                dangerouslySetInnerHTML={{ __html: breadcrumb.title }}
                className={`link ${css.breadcrumbLink}`}
              />
            </Link>
            <img alt="" src={chevron} className={css.chevron} />
          </span>
        );
      } else {
        return (
          <span
            className={css.activeBreadcrumb}
            dangerouslySetInnerHTML={{ __html: breadcrumb.title }}
            key={`${breadcrumb.title}-${idx}`}
          />
        );
      }
    })}
  </div>;

export default Breadcrumbs;
