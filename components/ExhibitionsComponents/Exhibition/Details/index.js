import React from "react";
import Link from "next/link";
import { withRouter } from "next/router";

import Button from "shared/Button";
import CiteButton from "shared/CiteButton";

import { buildGaEvent, GA_EVENTS, parseDplaItemRecord, gtag } from "lib";

import css from "./Details.module.css";
import utils from "stylesheets/utils.module.css";

class Details extends React.Component {
  // Google Analytics tracking for exhibit home view event
  componentDidMount() {
    this.trackEvent();
  }

  trackEvent() {
    // asPath commits with props.
    // window.location can run ahead of them on back and forward navigation.
    const fullPath = this.props.router.asPath;

    if (fullPath !== this.lastTrackedPath) {
      const { dplaItemId, dplaItemJson, slug } = this.props;

      // The home page shows one item as its hero image.
      // That counts as an exhibition item view.
      // The exhibition_section value "home" lets reports split it out.
      gtag.event(
        buildGaEvent(GA_EVENTS.EXHIBITION_ITEM_VIEW, {
          itemId: dplaItemId,
          ...parseDplaItemRecord(dplaItemJson),
          exhibition: slug,
          exhibition_section: "home",
        }),
      );
      this.lastTrackedPath = fullPath;
    }
  }

  render() {
    const { slug, sections, description, title, text, credits } = this.props;
    if (!Array.isArray(sections) || sections.length === 0) return null;
    return (
      <div className={css.wrapper}>
        <div className={`${utils.container} ${css.details}`}>
          <div className={css.tableOfContents}>
            <h2 className={css.tableOfContentsHeader}>In This Exhibition</h2>
            <div className={css.tableOfContentsContents}>
              <ul className={css.tableOfContentsSections}>
                {sections.map((section) => (
                  <li key={section.slug} className={css.tableOfContentsSection}>
                    <Link
                      href={`/exhibitions/${slug}/${section.slug}`}
                      className="hover-underline"
                    >
                      {section.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className={css.faveAndCiteButtonsWrapper}>
              <CiteButton
                toCiteText="exhibition"
                className={css.citeButton}
                freeText={description}
                title={title}
              />
            </div>
          </div>
          <div className={css.body}>
            <div
              className={css.bodyText}
              dangerouslySetInnerHTML={{ __html: text }}
            />
            <div className={css.exploreButton}>
              <Button
                type="primary"
                size="large"
                className={css.exploreLink}
                url={`/exhibitions/${slug}/${sections[0].slug}`}
              >
                Explore Exhibition
              </Button>
            </div>
            <p className={css.credits}>
              <span className={css.creditsBold}>Credit: </span>
              <span className={css.creditsText}>{credits}</span>
            </p>
            <div className={css.faveAndCiteButtonsWrapper}>
              <CiteButton
                toCiteText="exhibition"
                className={css.citeButton}
                freeText={description}
                title={title}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Details);
