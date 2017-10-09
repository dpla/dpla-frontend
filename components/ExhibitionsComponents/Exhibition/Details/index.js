import React from "react";
import Link from "next/link";

import { classNames, stylesheet } from "./Details.css";
import { classNames as utilClassNames } from "css/utils.css";
import FaveAndCiteButtons from "components/shared/FaveAndCiteButtons";

const { container } = utilClassNames;
const Details = ({ exhibition, route }) =>
  <div className={classNames.wrapper}>
    <div className={[container, classNames.details].join(" ")}>
      <div className={classNames.tableOfContents}>
        <p className={classNames.tableOfContentsHeader}>
          In This Exhibition
        </p>
        <div className={classNames.tableOfContentsContents}>
          <ul className={classNames.tableOfContentsSections}>
            {exhibition.sections.map(section =>
              <li className={classNames.tableOfContentsSection}>
                <Link
                  prefetch
                  href={{
                    pathname: "/exhibitions/exhibition/section/subsection",
                    query: Object.assign({}, route.query, {
                      section: section.slug,
                      exhibition: exhibition.slug,
                      subsection: ""
                    })
                  }}
                  as={{
                    pathname: `/exhibitions/${exhibition.slug}/${section.slug}/`
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
        <div className={classNames.faveAndCiteButtonsWrapper}>
          <FaveAndCiteButtons />
        </div>
      </div>
      <div className={classNames.body}>
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
