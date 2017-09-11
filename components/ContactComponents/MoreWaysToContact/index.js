import React from "react";
import { classNames, stylesheet } from "./MoreWaysToContact.css";

const ContactForm = () =>
  <div className={classNames.contactForm}>
    <h2 className={classNames.header}>More Ways To Contact Us</h2>
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
          <td className={[classNames.tableItem]}>
            Digital Public Library of America<br />
            c/o Boston Public Library<br />
            700 Boylston Street<br />
            Boston, MA 02116<br />
          </td>
        </tr>
      </tbody>
    </table>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default ContactForm;
