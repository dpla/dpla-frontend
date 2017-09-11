import React from "react";
import Link from "next/link";
import { classNames, stylesheet } from "./Content.css";
import { joinIfArray } from "utilFunctions";

const Row = ({ heading, value, linkInfo, children }) =>
  children
    ? <tr className={classNames.tableRow}>
        <td className={classNames.tableHeading}>
          {heading}
        </td>
        <td
          className={[classNames.tableItem, classNames.otherMetadataItem].join(
            " "
          )}
        >
          {linkInfo
            ? <Link href={{ pathname: "/search/" }}>
                <a>
                  {children}
                </a>
              </Link>
            : children}
        </td>
      </tr>
    : null;

const OtherMetadata = ({ item }) =>
  <div className={classNames.otherMetadata}>
    <table className={classNames.contentTable}>
      <tbody>
        <Row heading="Creator">{joinIfArray(item.creator)}</Row>
        <Row heading="Partner">{item.partner}</Row>
        <Row heading="Contributor">{item.contributor}</Row>
        <Row heading="Publisher">{joinIfArray(item.publisher)}</Row>
        <Row heading="Subjects">
          {item.subject && item.subject.map(subj => subj.name).join(", ")}
        </Row>
        <Row heading="Type">{item.type}</Row>
        <Row heading="URL">{item.sourceUrl && <span className={classNames.url}>{item.sourceUrl}</span>}</Row>
      </tbody>
    </table>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default OtherMetadata;
