import React from "react";

import { classNames, stylesheet } from "./Content.css";

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

export default Row;
