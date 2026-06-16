import React from "react";
import Link from "next/link";
import Markdown from "react-markdown";

import css from "./Breadcrumbs.module.css";

function Breadcrumbs({ breadcrumbs }) {
  if (!Array.isArray(breadcrumbs)) return null;
  return (
    <div className={css.breadcrumbs}>
      {breadcrumbs.map((breadcrumb, idx) => {
        if (idx < breadcrumbs.length - 1) {
          return (
            <div className={css.breadcrumbLinkWrapper} key={breadcrumb.title}>
              <Link href={breadcrumb.url} title={breadcrumb.title}>
                <span className={css.breadcrumbLink}>
                  <Markdown
                    allowedElements={["emphasis", "text"]}
                    unwrapDisallowed
                  >
                    {breadcrumb.title}
                  </Markdown>
                </span>
              </Link>
            </div>
          );
        } else {
          return (
            <span className={css.activeBreadcrumb} key={breadcrumb.title}>
              <Markdown
                allowedElements={["emphasis", "text"]}
                unwrapDisallowed
              >
                {breadcrumb.title}
              </Markdown>
            </span>
          );
        }
      })}
    </div>
  );
}

export default Breadcrumbs;
