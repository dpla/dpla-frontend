import React from "react";
import Link from "next/link";

import { stylesheet, classNames } from "./SourceSetInfo.css";
import { classNames as utilClassNames } from "css/utils.css";
import {
  mapTimePeriodNameToSlug,
  mapSubjectNameToSlug
} from "constants/primarySourceSets";
import Button from "components/shared/Button";
import CiteButton from "components/shared/CiteButton";

const markdownit = require("markdown-it")({ html: true });
const { container } = utilClassNames;

// Only the time period has a sameAs field
const extractTimePeriod = tags =>
  tags.filter(tag => tag.sameAs).map(tag => tag.name);
const extractSubjects = tags =>
  tags.filter(tag => !tag.sameAs).map(tag => tag.name);

const showMoreDescription = className => {
  const description = document.getElementById("dpla-description");
  const showmore = document.getElementById("dpla-showmore");
  description.classList.add(className);
  showmore.remove();
};

class SourceSetInfo extends React.Component {
  render() {
    const { set, currentFullUrl } = this.props;
    const authorList = set.author.map(author => author.name);
    return (
      <div className={classNames.wrapper}>
        <div className={[classNames.sourceSetInfo, container].join(" ")}>
          <div className={`${classNames.removeScroll} row`}>
            <div className={`${classNames.removeScroll} col-xs-12 col-md-8`}>
              <div className={classNames.banner}>
                <div
                  className={classNames.bannerImage}
                  style={{
                    backgroundImage: `url(${set.repImageUrl ||
                      set.thumbnailUrl})`
                  }}
                />
                <div className={classNames.bannerTextWrapper}>
                  <h1
                    dangerouslySetInnerHTML={{
                      __html: markdownit.renderInline(set.name)
                    }}
                    className={classNames.bannerTitle}
                  />
                </div>
              </div>
              <div
                id="dpla-description"
                className={`${classNames.description} sourceSetDescription`}
                dangerouslySetInnerHTML={{
                  __html: markdownit.render(
                    set.hasPart.find(item => item.name === "Overview").text
                  )
                }}
              />
              <div id="dpla-showmore" aria-hidden="true">
                <span
                  className={`${classNames.showMore} link`}
                  onClick={() => showMoreDescription(classNames.open)}
                >
                  Show full description
                </span>
              </div>
            </div>
            <div className={`${classNames.removeScroll} col-xs-12 col-md-4`}>
              <div className={`${classNames.sidebar} sourceSetSidebar`}>
                <div className={classNames.metadata}>
                  <div className={classNames.metadatum}>
                    <h3 className={classNames.metadataHeader}>
                      Created By
                    </h3>
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
                    <h3 className={classNames.metadataHeader}>
                      Time Period
                    </h3>
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
