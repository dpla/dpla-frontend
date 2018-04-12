import React from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

import {
  mapTimePeriodNameToSlug,
  mapSubjectNameToSlug
} from "constants/primarySourceSets";
import Button from "components/shared/Button";
import CiteButton from "components/shared/CiteButton";

import utils from "stylesheets/utils.scss";
import css from "./SourceSetInfo.scss";

import { GOOGLE_CLASSROOMS_SHARE_URL } from "constants/site";
const googleClassroom = "/static/images/google-classroom.svg";

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
                <div className={classNames.bannerTextWrapper}>
                  <h1 className={classNames.bannerTitle}>
                    <ReactMarkdown
                      source={set.name}
                      allowedTypes={["emphasis"]}
                      unwrapDisallowed
                    />
                  </h1>
                </div>
              </div>
              <ReactMarkdown
                id="dpla-description"
                source={set.hasPart.find(item => item.name === "Overview").text}
                className={`${classNames.description} sourceSetDescription ${classNames.description} ${this
                  .state.isOpen
                  ? css.open
                  : ""}`}
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
                      <ReactMarkdown
                        key={author.name}
                        source={author.name + ", " + author.affiliation.name}
                        allowedTypes={["emphasis"]}
                        unwrapDisallowed
                      />
                    )}
                  </div>
                  <div className={css.metadatum}>
                    <h2 className={css.metadataHeader}>
                      Time Period
                    </h2>
                    <ul>
                      {extractTimePeriod(set.about).map((period, i, periods) =>
                        <li key={period}>
                          <Link
                            prefetch
                            href={{
                              pathname: "/primary-source-sets",
                              query: {
                                timePeriod: mapTimePeriodNameToSlug(period)
                              }
                            }}
                          >
                            <a className={`link ${classNames.link}`}>
                              <ReactMarkdown
                                source={period}
                                allowedTypes={["emphasis"]}
                                unwrapDisallowed
                              />
                            </a>
                          </Link>
                        </li>
                      )}
                    </ul>
                  </div>
                  <div className={classNames.metadatum}>
                    <h2 className={classNames.metadataHeader}>Subjects</h2>
                    <ul>
                      {extractSubjects(set.about).map((subject, i, subjects) =>
                        <li key={subject}>
                          <Link
                            prefetch
                            href={{
                              pathname: "/primary-source-sets",
                              query: {
                                subject: mapSubjectNameToSlug(subject)
                              }
                            }}
                          >
                            <a className={`link ${classNames.link}`}>
                              <ReactMarkdown
                                source={subject}
                                allowedTypes={["emphasis"]}
                                unwrapDisallowed
                              />
                            </a>
                          </Link>
                        </li>
                      )}
                    </ul>
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
                <div className={classNames.tools}>
                  <div className={classNames.toolLinkAndIcon}>
                    <img
                      src={googleClassroom}
                      alt=""
                      className={classNames.toolIcon}
                    />
                    <a
                      href={`${GOOGLE_CLASSROOMS_SHARE_URL}?url=${window.location.href
                        .replace("teaching-guide", "")
                        .replace("additional-resources", "")}`}
                      className={classNames.toolLink}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Share to Google Classroom
                    </a>
                  </div>
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
