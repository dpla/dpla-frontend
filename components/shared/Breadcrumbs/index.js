import React from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

import css from "./Breadcrumbs.module.scss";

const Breadcrumbs = ({ breadcrumbs }) => (
  <div className={css.breadcrumbs}>
    {breadcrumbs.map((breadcrumb, idx) => {
      if (idx < breadcrumbs.length - 1) {
        return (
          <div className={css.breadcrumbLinkWrapper} key={idx}>
            <Link href={breadcrumb.url} as={breadcrumb.as}>
              <a>
                <ReactMarkdown
                  className={css.breadcrumbLink}
                  children={breadcrumb.title}
                />
              </a>
            </Link>
          </div>
        );
      } else {
        return (
          <ReactMarkdown
            className={css.activeBreadcrumb}
            children={breadcrumb.title}
            key={idx}
          />
        );
      }
    })}
  </div>
);

export default Breadcrumbs;
