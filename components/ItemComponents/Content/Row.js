import React from "react";

import css from "./Content.scss";

const Row = ({ heading, value, linkInfo, children, className }) =>
  children
    ? <tr className={[css.tableRow, className].join(" ")}>
        <td className={css.tableHeadingWrapper}>
          <h2 className={css.tableHeading}>{heading}</h2>
        </td>
        <td className={[css.tableItem, css.otherMetadataItem].join(" ")}>
          {children}
        </td>
      </tr>
    : null;

export default Row;
