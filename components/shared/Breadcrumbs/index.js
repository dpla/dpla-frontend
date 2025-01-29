import React from "react";
import Link from "next/link";
import Markdown from "react-markdown";

import css from "./Breadcrumbs.module.scss";

function Breadcrumbs({ breadcrumbs }) {
  return (
    <div className={css.breadcrumbs}>
      {breadcrumbs.map((breadcrumb, idx) => {
        if (idx < breadcrumbs.length - 1) {
          return (
            <div className={css.breadcrumbLinkWrapper} key={breadcrumb.url}>
              <Link href={breadcrumb.url} as={breadcrumb.as}>
                <Markdown
                  className={css.breadcrumbLink}
                  allowedElements={["emphasis", "text"]}
                  unwrapDisallowed
                >
                  {breadcrumb.title}
                </Markdown>
              </Link>
            </div>
          );
        } else {
          return (
            <Markdown
              className={css.activeBreadcrumb}
              allowedElements={["emphasis", "text"]}
              unwrapDisallowed
              key={breadcrumb.title}
            >
              {breadcrumb.title}
            </Markdown>
          );
        }
      })}
    </div>
  );
}

export default Breadcrumbs;
