import React from "react";
import Link from "next/link";
import { classNames, stylesheet } from "./Content.css";
import { joinIfArray } from "utilFunctions";

const Row = ({ heading, value, linkInfo, children, className }) =>
  children ? (
    <tr className={[classNames.tableRow, className].join(" ")}>
      <td className={classNames.tableHeading}>{heading}</td>
      <td
        className={[classNames.tableItem, classNames.otherMetadataItem].join(
          " "
        )}
      >
        {children}
      </td>
    </tr>
  ) : null;

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
        <Row heading="Creator">{joinIfArray(item.creator, ", ")}</Row>
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
        {item.spatial && (
          <Row heading="Location">
            {item.type && (
              <FacetLink facet="location" value={item.spatial[0].name} />
            )}
          </Row>
        )}
        <Row heading="Type">
          {item.type && <FacetLink facet="type" value={item.type} />}
        </Row>
        <Row heading="Format">
          {item.format && <span>{joinIfArray(item.format, ", ")}</span>}
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
      </tbody>
    </table>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>
);

export default OtherMetadata;
