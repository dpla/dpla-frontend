import React from "react";
import Link from "next/link";

import Button from "shared/Button";
import CiteButton from "shared/CiteButton";
import GaExhibitHomeWrapper from "./GaExhibitHomeWrapper";

import utils from "stylesheets/utils.scss";
import css from "./Details.scss";

const Details = ({ exhibition, route, currentFullUrl }) =>
  <div className={css.wrapper}>
    <div className={[utils.container, css.details].join(" ")}>
      <div className={css.tableOfContents}>
        <h2 className={css.tableOfContentsHeader}>
          In This Exhibition
        </h2>
        <div className={css.tableOfContentsContents}>
          <ul className={css.tableOfContentsSections}>
            {exhibition.sections.map((section, idx) =>
              <li key={idx} className={css.tableOfContentsSection}>
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
                    pathname: `/exhibitions/${exhibition.slug}/${section.slug}`
                  }}
                >
                  <a className="hover-underline">
                    {section.title}
                  </a>
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className={css.faveAndCiteButtonsWrapper}>
          <CiteButton
            toCiteText="exhibition"
            className={css.citeButton}
            freeText={exhibition.description}
            title={exhibition.name}
          />
        </div>
      </div>
      <div className={css.body}>
        <div
          className={css.bodyText}
          dangerouslySetInnerHTML={{ __html: exhibition.text }}
        />
        <div className={css.exploreButton}>
          <Button
            type="primary"
            size="large"
            prefetch
            className={css.exploreLink}
            url={{
              pathname: "/exhibitions/exhibition/section/subsection",
              query: Object.assign({}, route.query, {
                section: exhibition.sections[0].slug,
                exhibition: exhibition.slug,
                subsection: ""
              })
            }}
            as={{
              pathname: `/exhibitions/${exhibition.slug}/${exhibition
                .sections[0].slug}/`
            }}
          >
            Explore Exhibition
          </Button>
        </div>
        <p className={css.credits}>
          <span className={css.creditsBold}>Credit: </span>
          <span className={css.creditsText}>{exhibition.credits}</span>
        </p>
        <div className={css.faveAndCiteButtonsWrapper}>
          <CiteButton
            toCiteText="exhibition"
            className={css.citeButton}
            freeText={exhibition.description}
            title={exhibition.name}
          />
        </div>
      </div>
    </div>
  </div>;

export default GaExhibitHomeWrapper(Details);
