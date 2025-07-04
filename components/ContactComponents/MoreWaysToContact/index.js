import React from "react";

import css from "./MoreWaysToContact.module.scss";
import utils from "stylesheets/utils.module.scss"

function MoreWaysToContact() {
    return <div>
        <h2 className={css.header}>More Ways To Contact Us</h2>
        <table className={css.contentTable}>
            <thead>
            <tr>
                <th scope="col"></th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
            <tr className={`${utils.row} ${css.paddedRow}`}>
                <td className={`${utils.colXs12} ${utils.colSm5} ${css.tableHeading}`}>
                    General Email
                </td>
                <td className={`${utils.colXs12} ${utils.colSm7} ${css.tableItem}`}>
                    <a className={css.mailToLink} href="mailto:info@dp.la">
                        info@dp.la
                    </a>
                </td>
            </tr>
            <tr className={`${utils.row} ${css.paddedRow}`}>
                <td className={`${utils.colXs12} ${utils.colSm5} ${css.tableHeading}`}>
                    Telephone
                </td>
                <td className={`${utils.colXs12} ${utils.colSm7} ${css.tableItem}`}>
                    888-444-0612
                </td>
            </tr>
            <tr className={`${utils.row} ${css.paddedRow}`}>
                <td className={`${utils.colXs12} ${utils.colSm5} ${css.tableHeading}`}>
                    Mailing Address
                </td>
                <td className={`${utils.colXs12} ${utils.colSm7} ${css.tableItem}`}>
                    Digital Public Library of America
                    <br/>
                    (at Government Center)
                    <br/>
                    1 Washington Mall #1019
                    <br/>
                    Boston, MA 02108
                    <br/>
                </td>
            </tr>
            <tr className={`${utils.row} ${css.paddedRow}`}>
                <td className={`${utils.colXs12} ${utils.colSm5} ${css.tableHeading}`}>
                    Social Media
                </td>
                <td className={`${utils.colXs12} ${utils.colSm7} ${css.tableItem}`}>
                    <ul>
                        <li>
                            <a href="https://twitter.com/dpla">Twitter</a>
                        </li>
                        <li>
                            <a href="https://www.facebook.com/digitalpubliclibraryofamerica">
                                Facebook
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/digpublib/">Instagram</a>
                        </li>
                        <li>
                            <a href="https://www.youtube.com/user/digpublib/videos">YouTube</a>
                        </li>
                    </ul>
                </td>
            </tr>
            <tr className={`${utils.row} ${css.paddedRow}`}>
                <td className={`${utils.colXs12} ${utils.colSm5} ${css.tableHeading}`}>
                    Mailing Lists
                </td>
                <td className={`${utils.colXs12} ${utils.colSm7} ${css.tableItem}`}>
                    <ul>
                        <li>
                            <a href="https://us4.list-manage.com/subscribe?u=e1490d1305c4b651f3ad0ace4&id=1ee988aadc">
                                General List
                            </a>
                        </li>
                        <li>
                            <a href="http://dp.us4.list-manage.com/subscribe?u=e1490d1305c4b651f3ad0ace4&id=de870d2705">
                                Education List
                            </a>
                        </li>
                        <li>
                            <a href="http://dp.us4.list-manage2.com/subscribe?u=e1490d1305c4b651f3ad0ace4&id=f36418b975">
                                Genealogy List
                            </a>
                        </li>
                        <li>
                            <a href="https://dp.us4.list-manage.com/subscribe?u=e1490d1305c4b651f3ad0ace4&id=f8292db847">
                                Ebooks List
                            </a>
                        </li>
                    </ul>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
}

export default MoreWaysToContact;