import React from "react";
import Link from "next/link";

import Button from "components/shared/Button";
import FeedbackForm from "components/FeedbackForm";

import css from "./Footer.module.scss";
import utils from "stylesheets/utils.module.scss";

class FooterUser extends React.Component {
  render() {
    const proBaseUrl = process.env.NEXT_PUBLIC_PRO_BASE_URL;
    return (
      <div
        className={`${css.footer} ${utils.siteMaxWidth}`}
        data-testid="footer"
      >
        <div className={utils.row}>
          <div
            className={`${css.linkGroup} ${utils.colXs6} ${utils.colSm4} ${utils.colMd3}`}
          >
            <h2 className={css.linkHeader}>DPLA</h2>
            <ul>
              <li>
                <Link
                  href="/about/frequently-asked-questions"
                  data-testid="footer-link-frequently-asked-questions"
                >
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/guides" data-testid="footer-link-guides">
                  How Can I Use DPLA?
                </Link>
              </li>
              <li>
                <Link
                  href="/about/terms-conditions"
                  data-testid="footer-link-terms-conditions"
                >
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/about/harmful-language-statement">
                  Harmful Content
                </Link>
              </li>
              <li>
                <Link href="/about" data-testid="footer-link-about">
                  About DPLA
                </Link>
              </li>
              <li>
                <Link href="/contact" data-testid="footer-link-contact">
                  Contact Us
                </Link>
              </li>
              <li>
                <FeedbackForm />
              </li>
              <li>
                <Link href="/news" data-testid="footer-link-news">
                  News
                </Link>
              </li>
            </ul>
          </div>
          <div
            className={`${css.linkGroup} ${utils.colXs6} ${utils.colSm4} ${utils.colMd3}`}
          >
            <h2 className={css.linkHeader}>Tools</h2>
            <ul>
              <li>
                <Link
                  href="/primary-source-sets"
                  data-testid="footer-link-primary-source-sets"
                >
                  Primary Source Sets
                </Link>
              </li>
              <li>
                <Link
                  href="/browse-by-partner"
                  data-testid="footer-link-browse-by-partner"
                >
                  Browse by Partner
                </Link>
              </li>
              <li>
                <Link
                  href="/browse-by-topic"
                  data-testid="footer-link-browse-by-topic"
                >
                  Browse by Topic
                </Link>
              </li>
              <li>
                <Link href="/exhibitions" data-testid="footer-link-exhibitions">
                  Exhibitions
                </Link>
              </li>
              <li>
                <Link href="/lists" data-testid="footer-link-lists">
                  My Lists
                </Link>
              </li>
              <li>
                <Link href="/search" data-testid="footer-link-search">
                  Search
                </Link>
              </li>
            </ul>
          </div>
          <div
            className={`${css.linkGroup} ${utils.colXs6} ${utils.colSm4} ${utils.colMd3}`}
          >
            <h2 className={css.linkHeader}>DPLA Pro</h2>
            <ul>
              <li>
                <Link href={proBaseUrl} data-testid="footer-link-pro">
                  DPLA Pro Home
                </Link>
              </li>
              <li>
                <Link
                  href={proBaseUrl + "/prospective-hubs"}
                  data-testid="footer-link-prospective-hubs"
                >
                  Prospective Hubs
                </Link>
              </li>
              <li>
                <Link
                  href={proBaseUrl + "/hubs"}
                  data-testid="footer-link-hub-network"
                >
                  Hub Network
                </Link>
              </li>
              <li>
                <Link
                  href={proBaseUrl + "/developers"}
                  data-testid="footer-link-developers"
                >
                  Developers
                </Link>
              </li>
              <li>
                <Link
                  href={proBaseUrl + "/education"}
                  data-testid="footer-link-education"
                >
                  Education
                </Link>
              </li>
              <li>
                <Link
                  href={proBaseUrl + "/projects"}
                  data-testid="footer-link-projects"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href={"https://ebooks.dp.la"}
                  data-testid="footer-link-ebooks"
                >
                  Ebooks
                </Link>
              </li>
              <li>
                <Link
                  href={proBaseUrl + "/events"}
                  data-testid="footer-link-events"
                >
                  Events
                </Link>
              </li>
            </ul>
          </div>
          <div className={`${utils.colXs12} ${utils.colMd3}`}>
            <Button
              data-testid="footer-donate"
              type="primary"
              size="large"
              className={css.donateButton}
              url="/donate"
            >
              Donate
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
export default FooterUser;
