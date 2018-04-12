import React from "react";
import Link from "next/link";

import {
  mapTimePeriodNameToSlug,
  mapSubjectNameToSlug
} from "constants/primarySourceSets";
import Button from "components/shared/Button";
import CiteButton from "components/shared/CiteButton";

import utils from "stylesheets/utils.scss";
import css from "./SourceSetInfo.scss";

const markdownit = require("markdown-it")({ html: true });

// Only the time period has a sameAs field
const extractTimePeriod = tags =>
  tags.filter(tag => tag.sameAs).map(tag => tag.name);
const extractSubjects = tags =>
  tags.filter(tag => !tag.sameAs).map(tag => tag.name);

class SourceSetInfo extends React.Component {
  state = { isOpen: false };

  componentWillReceiveProps() {
    this.setState({ isOpen: this.props.openDescription || false });
  }

  showMoreDescription() {
    this.setState({ isOpen: true });
  }

  render() {
    const { set, currentFullUrl } = this.props;
    const authorList = set.author.map(author => author.name);
    return (
      <div id="main" role="main" className={css.wrapper}>
        <div className={[css.sourceSetInfo, utils.container].join(" ")}>
          <div className={`${css.removeScroll} row`}>
            <div className={`${css.removeScroll} col-xs-12 col-md-8`}>
              <div className={css.banner}>
                <div
                  className={css.bannerImage}
                  style={{
                    backgroundImage: `url(${set.repImageUrl ||
                      set.thumbnailUrl})`,
                    backgroundPosition: "50% 25%"
                  }}
                />
                <div className={css.bannerTextWrapper}>
                  <h1
                    dangerouslySetInnerHTML={{
                      __html: markdownit.renderInline(set.name)
                    }}
                    className={css.bannerTitle}
                  />
                </div>
              </div>
              <div
                id="dpla-description"
                className={`${css.description} sourceSetDescription ${css.description} ${this
                  .state.isOpen
                  ? css.open
                  : ""}`}
                dangerouslySetInnerHTML={{
                  __html: markdownit.render(
                    set.hasPart
                      .find(item => item.name === "Overview")
                      .text.replace(
                        /https?:\/\/.*?\/primary-source-sets\/sources\//g,
                        "sources/"
                      )
                      .replace(
                        /https?:\/\/.*?\/primary-source-sets\/sets\//g,
                        "/primary-source-sets/"
                      )
                  )
                }}
              />
              <div
                id="dpla-showmore"
                aria-hidden="true"
                className={`${css.showMore} ${this.state.isOpen
                  ? css.open
                  : ""}`}
              >
                <span
                  className={`link`}
                  onClick={() => this.showMoreDescription()}
                >
                  Show full overview
                </span>
              </div>
            </div>
            <div className={`${css.removeScroll} col-xs-12 col-md-4`}>
              <div className={`${css.sidebar} sourceSetSidebar`}>
                <div className={css.metadata}>
                  <div className={css.metadatum}>
                    <h2 className={css.metadataHeader}>
                      Created By
                    </h2>
                    {set.author.map(author =>
                      <div
                        key={author.name}
                        dangerouslySetInnerHTML={{
                          __html: markdownit.renderInline(
                            author.name + ", " + author.affiliation.name
                          )
                        }}
                      />
                    )}
                  </div>
                  <div className={css.metadatum}>
                    <h2 className={css.metadataHeader}>
                      Time Period
                    </h2>
                    {extractTimePeriod(set.about).map((period, i, periods) =>
                      <span key={period}>
                        <Link
                          prefetch
                          href={{
                            pathname: "/primary-source-sets",
                            query: {
                              timePeriod: mapTimePeriodNameToSlug(period)
                            }
                          }}
                        >
                          <a
                            className={`link ${css.link}`}
                            dangerouslySetInnerHTML={{
                              __html: markdownit.renderInline(period)
                            }}
                          />
                        </Link>
                        {i < periods.length - 1 && <br />}
                      </span>
                    )}
                  </div>
                  <div className={css.metadatum}>
                    <h2 className={css.metadataHeader}>Subjects</h2>
                    {extractSubjects(set.about).map((subject, i, subjects) =>
                      <span key={subject}>
                        <Link
                          prefetch
                          href={{
                            pathname: "/primary-source-sets",
                            query: {
                              subject: mapSubjectNameToSlug(subject)
                            }
                          }}
                        >
                          <a
                            className={`link ${css.link}`}
                            dangerouslySetInnerHTML={{
                              __html: markdownit.renderInline(subject)
                            }}
                          />
                        </Link>
                        {i < subjects.length - 1 && <br />}
                      </span>
                    )}
                  </div>
                </div>
                <div className={css.citeButton}>
                  <CiteButton
                    creator={authorList}
                    displayDate={new Date(set.dateCreated).getFullYear()}
                    sourceUrl={currentFullUrl}
                    className={css.citeButton}
                    toCiteText="set"
                    title={set.name.replace(/\*/g, "")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SourceSetInfo;
