import React from "react";
import Link from "next/link";
import Row from "./Row";

import { classNames, stylesheet } from "./Content.css";
import { makeURLsClickable, joinIfArray, readMyRights } from "utilFunctions";

const FacetLink = ({ facet, value, withComma }) => (
  <span>
    <Link
      prefetch
      href={{ pathname: "/search/", query: { [facet]: `"${value}"` } }}
    >
      <a className="link">{value}</a>
    </Link>
  </span>
);

const OtherMetadata = ({ item }) => (
  <div className={classNames.otherMetadata}>
    <table className={classNames.contentTable}>
      <tbody>
        <Row heading="Partner">
          <FacetLink facet="partner" value={item.partner} />
        </Row>
        <Row heading="Contributing Institution">
          <FacetLink facet="provider" value={item.contributor} />
        </Row>
        <Row heading="Supporting Institution">
          {item.intermediateProvider && (
            <FacetLink facet="provider" value={item.intermediateProvider} />
          )}
        </Row>
        <Row heading="Publisher">{joinIfArray(item.publisher)}</Row>
        <Row className={classNames.subjects} heading="Subjects">
          {item.subject &&
            item.subject.map((subj, i, subjects) => (
              <span key={i}>
                <FacetLink facet="subject" value={subj.name} />
                {i < subjects.length - 1 && <br />}
              </span>
            ))}
        </Row>
        <Row heading="Type">
          {item.type && <FacetLink facet="type" value={item.type} />}
        </Row>
        <Row heading="Format">
          {item.format && !Array.isArray(item.format) ? (
            <div>{item.format}</div>
          ) : (
            item.format.map((format, i, formats) => <div key={i}>{format}</div>)
          )}
        </Row>
        <Row heading="Language">
          {item.language && (
            <FacetLink
              facet="language"
              value={joinIfArray(item.language, ", ")}
            />
          )}
        </Row>
        <Row heading="URL">
          {item.sourceUrl && (
            <a className="link" href={item.sourceUrl}>
              {item.sourceUrl}
            </a>
          )}
        </Row>
        {item.edmRights &&
        readMyRights(item.edmRights) && (
          <Row heading="Standardized Rights Statement">
            {readMyRights(item.edmRights).description}
            {readMyRights(item.edmRights).description !== "" && <br />}
            <a href={item.edmRights} className="link" rel="noopener noreferrer">
              {item.edmRights}
            </a>
          </Row>
        )}
        {item.rights && (
          <Row heading="Rights">
            <div
              dangerouslySetInnerHTML={{
                __html: makeURLsClickable(
                  joinIfArray(item.rights, "<br/> "),
                  "link"
                )
              }}
            />
          </Row>
        )}
      </tbody>
    </table>
  </div>
);

export default OtherMetadata;
