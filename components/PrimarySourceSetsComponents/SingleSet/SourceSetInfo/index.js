import React from "react";
import Link from "next/link";
import { markdown } from "markdown";

import { stylesheet, classNames } from "./SourceSetInfo.css";
import { classNames as utilClassNames } from "css/utils.css";
import {
  mapTimePeriodNameToSlug,
  mapSubjectNameToSlug
} from "constants/primarySourceSets";
import Button from "components/shared/Button";

const { container } = utilClassNames;

// only the time period has a sameAs field
const extractTimePeriod = tags => tags.filter(tag => tag.sameAs)[0].name;
const extractSubjects = tags =>
  tags.filter(tag => !tag.sameAs).map(tag => tag.name);
const extractAuthors = authors =>
  authors.map(author => author.name);

const SourceSetInfo = set =>
  <div className={classNames.wrapper}>
    <div className={[classNames.sourceSetInfo, container].join(" ")}>
      <div className={classNames.bannerAndDescription}>
        <div className={classNames.banner}>
          <div
            className={classNames.bannerImage}
            style={{
              backgroundImage: `url(${set.set.thumbnailUrl})`
            }}
          />
          <div className={classNames.bannerTextWrapper}>
            <h3 className={classNames.bannerResourceType}>
              Primary Source Set
            </h3>
            <h1
              dangerouslySetInnerHTML={{
                __html: markdown.toHTML(set.set.name)
              }}
              className={classNames.bannerTitle}
            />
          </div>
        </div>
        {/* TODO: shouldn't have to get rid of the extra text with split */}
        <div
          className={classNames.description}
          dangerouslySetInnerHTML={{
            __html: markdown.toHTML(
              set.set.hasPart.find(item => item.name === "Overview").text
            )
          }}
        />
      </div>
      <div className={classNames.sidebar}>
        <div className={classNames.metadata}>
          <div className={classNames.metadatum}>
            <h3 className={classNames.metadataHeader}>Prepared By</h3>
            {extractAuthors(set.set.author).map((name) =>
              <div
                dangerouslySetInnerHTML={{
                  __html: markdown.toHTML(name)
                }}
              />
            )}
          </div>
          <div className={classNames.metadatum}>
            <h3 className={classNames.metadataHeader}>Time Period</h3>
            <Link
              prefetch
              href={{
                pathname: "/primary-source-sets",
                query: {
                  timePeriod: mapTimePeriodNameToSlug(
                    extractTimePeriod(set.set.about)
                  )
                }
              }}
            >
              <a
                className={classNames.link}
                dangerouslySetInnerHTML={{
                  __html: markdown.toHTML(extractTimePeriod(set.set.about))
                }}
              />
            </Link>
          </div>
          <div className={classNames.metadatum}>
            <h3 className={classNames.metadataHeader}>Subjects</h3>
            {extractSubjects(set.set.about).map((subject, i, subjects) =>
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
                    className={classNames.link}
                    dangerouslySetInnerHTML={{
                      __html: markdown.toHTML(subject)
                    }}
                  />
                </Link>
                {i < subjects.length - 1 &&
                  <span className={classNames.comma}>, </span>}
              </span>
            )}
          </div>
        </div>
        <Button type="ghost" className={classNames.button}>
          Cite this set
        </Button>
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default SourceSetInfo;
