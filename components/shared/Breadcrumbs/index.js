import React from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

import { stylesheet, classNames } from "./Breadcrumbs.css";
const chevron = "/static/images/chevron-thick-orange.svg";

const Breadcrumbs = ({ breadcrumbs }) =>
  <div className={classNames.breadcrumbs}>
    {breadcrumbs.map((breadcrumb, idx) => {
      if (idx < breadcrumbs.length - 1) {
        return (
          <span className={classNames.breadcrumbLinkWrapper} key={`${idx}`}>
            <Link prefetch href={breadcrumb.url} as={breadcrumb.as}>
              <a>
                <ReactMarkdown
                  className={`${classNames.breadcrumbLink}`}
                  source={breadcrumb.title}
                  allowedTypes={["emphasis"]}
                  unwrapDisallowed
                />
              </a>
            </Link>
            <img alt="" src={chevron} className={classNames.chevron} />
          </span>
        );
      } else {
        return (
          <ReactMarkdown
            className={classNames.activeBreadcrumb}
            source={breadcrumb.title}
            allowedTypes={["emphasis"]}
            unwrapDisallowed
            key={`${idx}`}
          />
        );
      }
    })}
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default Breadcrumbs;
