import React from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

import css from "./Breadcrumbs.scss";

const Breadcrumbs = ({ breadcrumbs }) =>
  <div className={css.breadcrumbs}>
    {breadcrumbs.map((breadcrumb, idx) => {
      if (idx < breadcrumbs.length - 1) {
        return (
          <div className={css.breadcrumbLinkWrapper} key={`${idx}`}>
            <Link prefetch href={breadcrumb.url} as={breadcrumb.as}>
              <a>
                <ReactMarkdown
                  className={`${css.breadcrumbLink}`}
                  source={breadcrumb.title}
                  allowedTypes={["emphasis"]}
                  unwrapDisallowed
                />
              </a>
            </Link>
          </div>
        );
      } else {
        return (
          <ReactMarkdown
            className={css.activeBreadcrumb}
            source={breadcrumb.title}
            allowedTypes={["emphasis"]}
            unwrapDisallowed
            key={`${idx}`}
          />
        );
      }
    })}
  </div>;

export default Breadcrumbs;
