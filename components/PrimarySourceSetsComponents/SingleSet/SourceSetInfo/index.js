import React from "react";
import Markdown from "react-markdown";

import CiteButton from "components/shared/CiteButton";

import { GOOGLE_CLASSROOMS_SHARE_URL } from "constants/site";
import { markdownLinks } from "lib";

import css from "./SourceSetInfo.module.scss";
import utils from "stylesheets/utils.module.scss";
import {
  mapSubjectNameToSlug,
  mapTimePeriodNameToSlug,
} from "constants/primarySourceSets";
import Link from "next/link";

import GoogleClassroom from "components/svg/GoogleClassroom";

// Only the time period has a sameAs field
const extractTimePeriod = (tags) =>
  tags.filter((tag) => tag.sameAs).map((tag) => tag.name);

const extractSubjects = (tags) =>
  tags.filter((tag) => !tag.sameAs).map((tag) => tag.name);

class SourceSetInfo extends React.Component {
  state = { isOpen: true, href: "" }; // show it if js is disabled

  componentDidMount() {
    this.setState({ isOpen: false, href: window.location.href });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.openDescription !== prevProps.openDescription) {
      this.setState({ isOpen: prevProps.openDescription || false });
    }
  }

  showMoreDescription() {
    this.setState({ isOpen: true });
  }

  render() {
    const { set, currentFullUrl } = this.props;
    const authorList = set.author.map((author) => author.name);
    return (
      <div
        id="main"
        role="main"
        className={css.wrapper}
        data-testid={"pss-main"}
      >
        <div className={`${css.sourceSetInfo} ${utils.container}`}>
          <div className={`${css.removeScroll} ${utils.row}`}>
            <div
              className={`${css.removeScroll} ${utils.colXs12} ${utils.colMd8}`}
            >
              <div className={css.banner}>
                <div
                  className={css.bannerImage}
                  style={{
                    backgroundImage: `url(${set.repImageUrl || set.thumbnailUrl})`,
                    backgroundPosition: "50% 25%",
                  }}
                />
                <div className={css.bannerTextWrapper}>
                  <h1 className={css.bannerTitle}>
                    <Markdown
                      allowedElements={["emphasis", "text"]}
                      unwrapDisallowed
                    >
                      {set.name}
                    </Markdown>
                  </h1>
                </div>
              </div>
              <Markdown
                id="dpla-description"
                className={`${css.description} ${css.description} ${
                  this.state.isOpen ? css.open : ""
                }`}
                components={{
                  a(props) {
                    return markdownLinks(props);
                  },
                }}
              >
                {set.hasPart.find((item) => item.name === "Overview").text}
              </Markdown>
              <div
                id="dpla-showmore"
                aria-hidden="true"
                className={`${css.showMore} ${css.link} ${
                  this.state.isOpen ? css.open : ""
                }`}
              >
                <span
                  className={`${utils.link} ${css.link}`}
                  onClick={() => this.showMoreDescription()}
                >
                  Show full overview
                </span>
              </div>
            </div>
            <div
              className={`${css.removeScroll} ${utils.colXs12} ${utils.colMd4}`}
            >
              <div className={css.sidebar}>
                <div className={css.metadata}>
                  <div className={css.metadatum}>
                    <h2 className={css.metadataHeader}>Created By</h2>
                    <ul>
                      {set.author.map((author) => (
                        <li key={author.name}>
                          <Markdown
                            allowedElements={["emphasis", "text"]}
                            unwrapDisallowed
                          >
                            {author.name + ", " + author.affiliation.name}
                          </Markdown>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={css.metadatum}>
                    <h2 className={css.metadataHeader}>Time Period</h2>
                    <ul>
                      {extractTimePeriod(set.about).map((period) => (
                        <li key={period}>
                          <Link
                            href={{
                              pathname: "/primary-source-sets",
                              query: {
                                timePeriod: mapTimePeriodNameToSlug(period),
                              },
                            }}
                            className={`${utils.link} ${css.link}`}
                          >
                            <Markdown
                              allowedElements={["emphasis", "text"]}
                              unwrapDisallowed
                            >
                              {period}
                            </Markdown>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={css.metadatum}>
                    <h2 className={css.metadataHeader}>Subjects</h2>
                    <ul>
                      {extractSubjects(set.about).map((subject) => (
                        <li key={subject}>
                          <Link
                            href={{
                              pathname: "/primary-source-sets",
                              query: {
                                subject: mapSubjectNameToSlug(subject),
                              },
                            }}
                            className={`${utils.link} ${css.link}`}
                          >
                            <Markdown
                              allowedElements={["emphasis", "text"]}
                              unwrapDisallowed
                            >
                              {subject}
                            </Markdown>
                          </Link>
                        </li>
                      ))}
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
                {this.state.href !== "" && (
                  <div className={css.tools}>
                    <div className={css.toolLinkAndIcon}>
                      <GoogleClassroom className={css.toolIcon} />
                      <a
                        href={`${GOOGLE_CLASSROOMS_SHARE_URL}?url=${this.state.href
                          .replace("teaching-guide", "")
                          .replace("additional-resources", "")}`}
                        className={css.toolLink}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Share to Google Classroom
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SourceSetInfo;
