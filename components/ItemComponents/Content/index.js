import React from "react";
import { classNames, stylesheet } from "./Content.css";

const Content = ({ item }) =>
  console.log(item) ||
  <div className={classNames.content}>
    <table className={classNames.contentTable}>
      <tbody>
        <tr className={classNames.tableRow}>
          <td className={classNames.tableHeading}>
            General Email
          </td>
          <td className={[classNames.tableItem]}>
            <a className={classNames.mailToLink} href="mailto:info@dp.la">
              info@dp.la
            </a>
          </td>
        </tr>
        <tr className={classNames.tableRow}>
          <td className={classNames.tableHeading}>
            Mailing Address
          </td>
          <td className={[classNames.tableItem]} />
        </tr>
      </tbody>
    </table>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default Content;
