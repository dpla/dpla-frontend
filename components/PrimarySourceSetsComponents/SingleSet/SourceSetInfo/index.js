import React from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

import {
  mapTimePeriodNameToSlug,
  mapSubjectNameToSlug
} from "constants/primarySourceSets";
import Button from "components/shared/Button";
import CiteButton from "components/shared/CiteButton";

import { stylesheet, classNames } from "./SourceSetInfo.css";
import { classNames as utilClassNames } from "css/utils.css";

const { container } = utilClassNames;

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
      <div id="main" role="main" className={classNames.wrapper}>
        <div className={[classNames.sourceSetInfo, container].join(" ")}>
          <div className={`${classNames.removeScroll} row`}>
            <div className={`${classNames.removeScroll} col-xs-12 col-md-8`}>
              <div className={classNames.banner}>
                <div
                  className={classNames.bannerImage}
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
                  ? classNames.open
                  : ""}`}
              />
              <div
                id="dpla-showmore"
                aria-hidden="true"
                className={`${classNames.showMore} ${this.state.isOpen
                  ? classNames.open
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
            <div className={`${classNames.removeScroll} col-xs-12 col-md-4`}>
              <div className={`${classNames.sidebar} sourceSetSidebar`}>
                <div className={classNames.metadata}>
                  <div className={classNames.metadatum}>
                    <h2 className={classNames.metadataHeader}>
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
                  <div className={classNames.metadatum}>
                    <h2 className={classNames.metadataHeader}>
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
                <div className={classNames.citeButton}>
                  <CiteButton
                    creator={authorList}
                    displayDate={new Date(set.dateCreated).getFullYear()}
                    sourceUrl={currentFullUrl}
                    className={classNames.citeButton}
                    toCiteText="set"
                    title={set.name.replace(/\*/g, "")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      </div>
    );
  }
}

export default SourceSetInfo;
