import React from "react";
import { classNames, stylesheet } from "./Content.css";

const Row = ({ heading, value }) =>
  value
    ? <tr className={classNames.tableRow}>
        <td className={classNames.tableHeading}>
          {heading}
        </td>
        <td
          className={[classNames.tableItem, classNames.otherMetadataItem].join(
            " "
          )}
        >
          {value}
        </td>
      </tr>
    : null;

const OtherMetadata = ({ item }) =>
  console.log(item) ||
  <div className={classNames.otherMetadata}>
    <table className={classNames.contentTable}>
      <tbody>
        <Row
          heading="Creator"
          value={
            Array.isArray(item.creator) ? item.creator.join(" ") : item.creator
          }
        />
        <Row heading="Partner" value={item.partner} />
        <Row heading="Contributor" value={item.contributor} />
        <Row
          heading="Publisher"
          value={
            Array.isArray(item.publisher)
              ? item.publisher.join(" ")
              : item.publisher
          }
        />
        <Row
          heading="Subjects"
          value={item.subject && item.subject.map(subj => subj.name).join(", ")}
        />
        <Row heading="Type" value={item.type} />
        <Row
          heading="URL"
          value={
            Array.isArray(item.identifier)
              ? item.identifier.join(" ")
              : item.identifier
          }
        />
      </tbody>
    </table>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default OtherMetadata;
