import React from "react";

import { classNames, stylesheet } from "./Content.css";

const Row = ({ heading, value, linkInfo, children, className }) =>
  children
    ? <tr className={[classNames.tableRow, className].join(" ")}>
        <td><h2 className={classNames.tableHeading}>{heading}</h2></td>
        <td
          className={[classNames.tableItem, classNames.otherMetadataItem].join(
            " "
          )}
        >
          {children}
        </td>
      </tr>
    : null;

export default Row;
