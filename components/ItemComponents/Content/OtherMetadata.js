import React from "react";
import Link from "next/link";
import { classNames, stylesheet } from "./Content.css";
import { joinIfArray } from "utilFunctions";

const Row = ({ heading, value, linkInfo, children, className }) =>
  children
    ? <tr className={[classNames.tableRow, className].join(" ")}>
        <td className={classNames.tableHeading}>
          {heading}
        </td>
        <td
          className={[classNames.tableItem, classNames.otherMetadataItem].join(
            " "
          )}
        >
          {children}
        </td>
      </tr>
    : null;

const FacetLink = ({ facet, value, withComma }) =>
  <span>
    <Link href={{ pathname: "/search/", query: { [facet]: `"${value}"` } }}>
      <a className={classNames.facetLink}>
        <span className={classNames.facetLinkText}>{value}</span>
      </a>
    </Link>
  </span>;

const OtherMetadata = ({ item }) =>
  <div className={classNames.otherMetadata}>
    <table className={classNames.contentTable}>
      <tbody>
        <Row heading="Creator">{joinIfArray(item.creator)}</Row>
        <Row heading="Partner">
          <FacetLink facet="partner" value={item.partner} />
        </Row>
        <Row heading="Contributor">
          <FacetLink facet="provider" value={item.contributor} />
        </Row>
        <Row heading="Publisher">{joinIfArray(item.publisher)}</Row>
        <Row className={classNames.subjects} heading="Subjects">
          {item.subject &&
            item.subject.map((subj, i) =>
              <FacetLink facet="subject" value={subj.name} />
            )}
        </Row>
        <Row heading="Type"><FacetLink facet="type" value={item.type} /></Row>
        <Row heading="URL">
          {item.sourceUrl &&
            <span className={classNames.url}>{item.sourceUrl}</span>}
        </Row>
      </tbody>
    </table>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default OtherMetadata;
