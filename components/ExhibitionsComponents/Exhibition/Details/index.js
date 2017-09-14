import React from "react";
import Link from "next/link";

import { classNames, stylesheet } from "./Details.css";
import { classNames as utilClassNames } from "css/utils.css";
import FaveAndCiteButtons from "components/shared/FaveAndCiteButtons";

const { module } = utilClassNames;
const Details = ({ exhibition, route }) =>
  <div className={classNames.wrapper}>
    <div className={[module, classNames.details].join(" ")}>
      <div className={classNames.tableOfContents}>
        <p className={classNames.tableOfContentsHeader}>
          In This Exhibition
        </p>
        <div className={classNames.tableOfContentsContents}>
          <ul className={classNames.tableOfContentsSections}>
            {exhibition.sections.map(section =>
              <li className={classNames.tableOfContentsSection}>
                <Link
                  href={{
                    pathname: route.pathname,
                    query: Object.assign({}, route.query, {
                      section: section.slug
                    })
                  }}
                  as={{
                    pathname: `${route.pathname}/${section.slug}`
                  }}
                >
                  <a>
                    {section.title}
                  </a>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className={classNames.body}>
        <FaveAndCiteButtons />
        <span
          className={classNames.bodyText}
          dangerouslySetInnerHTML={{ __html: exhibition.text }}
        />
        <p className={classNames.credits}>
          <span className={classNames.creditsBold}>Credit: </span>
          <span>{exhibition.credits}</span>
        </p>
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default Details;
