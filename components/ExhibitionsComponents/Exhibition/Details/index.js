import React from "react";
import Link from "next/link";

import Button from "shared/Button";
import CiteButton from "shared/CiteButton";

import { getFullPath, joinIfArray, parseDplaItemRecord, gtag } from "lib";

import css from "./Details.module.scss";
import utils from "stylesheets/utils.module.scss"

class Details extends React.Component {
  // Google Analytics tracking for exhibit home view event
  componentDidMount() {
    this.trackEvent();
  }

  trackEvent() {
    const fullPath = getFullPath();

    if (fullPath !== this.lastTrackedPath) {
      const dplaItemJson = this.props.dplaItemJson;
      const dplaItem = parseDplaItemRecord(dplaItemJson);

      const gaEvent = {
        type: "View Exhibition Item",
        itemId: this.props.dplaItemId,
        title: joinIfArray(dplaItem.title, ", "),
        partner: joinIfArray(dplaItem.partner, ", "),
        contributor: joinIfArray(dplaItem.dataProvider, ", ")
      };

      gtag.event(gaEvent);
      this.lastTrackedPath = fullPath;
    }
  }

  render() {
    const {
      slug,
      sections,
      description,
      title,
      text,
      credits
    } = this.props;
    return (
      <div className={css.wrapper}>
        <div className={`${utils.container} ${css.details}`}>
          <div className={css.tableOfContents}>
            <h2 className={css.tableOfContentsHeader}>
              In This Exhibition
            </h2>
            <div className={css.tableOfContentsContents}>
              <ul className={css.tableOfContentsSections}>
                {sections.map((section, idx) =>
                  <li key={idx} className={css.tableOfContentsSection}>
                    <Link
                      href={`/exhibitions/${slug}/${section.slug}`}
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

export default Details;
