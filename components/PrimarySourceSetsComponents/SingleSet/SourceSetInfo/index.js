import React from "react";
import Link from "next/link";

import { stylesheet, classNames } from "./SourceSetInfo.css";
import { classNames as utilClassNames } from "css/utils.css";
import {
  mapTimePeriodNameToSlug,
  mapSubjectNameToSlug
} from "constants/primarySourceSets";
import ShareButton from "components/shared/ShareButton";
import Button from "components/shared/Button";

const chevron = "/static/images/chevron-thick-cascade-blue.svg";
const markdownit = require("markdown-it")({ html: true });
const { container } = utilClassNames;

// only the time period has a sameAs field
const extractTimePeriod = tags =>
  tags.filter(tag => tag.sameAs).map(tag => tag.name);
const extractSubjects = tags =>
  tags.filter(tag => !tag.sameAs).map(tag => tag.name);

class SourceSetInfo extends React.Component {
  state = {
    hideDetailsOnSmallScreens: true
  };

  toggleHideDetails = () => {
    this.setState(
      {
        hideDetailsOnSmallScreens: !this.state.hideDetailsOnSmallScreens
      },
      () => {
        if (this.state.hideDetailsOnSmallScreens) {
          document.documentElement.scrollTop = 0;
        }
      }
    );
  };

  render() {
    const { set, currentFullUrl } = this.props;
    return (
      <div className={classNames.wrapper}>
        <div className={[classNames.sourceSetInfo, container].join(" ")}>
          <div className={classNames.bannerAndDescription}>
            <div className={classNames.banner}>
              <div
                className={classNames.bannerImage}
                style={{
                  backgroundImage: `url(${set.thumbnailUrl})`
                }}
              />
              <div className={classNames.bannerTextWrapper}>
                <h3 className={classNames.bannerResourceType}>
                  Primary Source Set
                </h3>
                <h1
                  dangerouslySetInnerHTML={{
                    __html: markdownit.render(set.name)
                  }}
                  className={classNames.bannerTitle}
                />
              </div>
            </div>
            {/* TODO: shouldn't have to get rid of the extra text with split */}
            <div
              className={`${classNames.description} ${this.state
                .hideDetailsOnSmallScreens
                ? classNames.hiddenOnSmallScreens
                : ""}`}
              dangerouslySetInnerHTML={{
                __html: markdownit.render(
                  set.hasPart.find(item => item.name === "Overview").text
                )
              }}
            />
          </div>
          <div
            className={`${classNames.sidebarWrapper} ${this.state
              .hideDetailsOnSmallScreens
              ? classNames.hiddenOnSmallScreens
              : ""}`}
          >
            <div className={classNames.sidebar}>
              <div className={classNames.metadata}>
                <div className={classNames.metadatum}>
                  <h3 className={classNames.metadataHeader}>Prepared By</h3>
                  {set.author.map(author =>
                    <div
                      key={author.name}
                      dangerouslySetInnerHTML={{
                        __html: markdownit.render(
                          author.name + ", " + author.affiliation.name
                        )
                      }}
                    />
                  )}
                </div>
                <div className={classNames.metadatum}>
                  <h3 className={classNames.metadataHeader}>Time Period</h3>
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
                          className={`link ${classNames.link}`}
                          dangerouslySetInnerHTML={{
                            __html: markdownit.render(period)
                          }}
                        />
                      </Link>
                      {i < periods.length - 1 && <br />}
                    </span>
                  )}
                </div>
                <div className={classNames.metadatum}>
                  <h3 className={classNames.metadataHeader}>Subjects</h3>
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
                          className={`link ${classNames.link}`}
                          dangerouslySetInnerHTML={{
                            __html: markdownit.render(subject)
                          }}
                        />
                      </Link>
                      {i < subjects.length - 1 && <br />}
                    </span>
                  )}
                </div>
              </div>
              <Button
                type="ghost"
                className={`${classNames.button} ${classNames.citeButton}`}
              >
                Cite this set
              </Button>
              <ShareButton
                toShareText="set"
                currentFullUrl={currentFullUrl}
                className={`${classNames.button} ${classNames.shareButton}`}
              />
            </div>
          </div>
          <div className={classNames.hideDetailsWrapper}>
            <button
              onClick={() => this.toggleHideDetails()}
              className={classNames.hideDetailsButton}
            >
              <span>
                {this.state.hideDetailsOnSmallScreens ? "Show" : "Hide"} Full
                Description and Details
              </span>
              <img src={chevron} alt="" className={classNames.chevron} />
            </button>
          </div>
        </div>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      </div>
    );
  }
}

export default SourceSetInfo;
