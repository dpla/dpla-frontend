import React from "react";
import Link from "next/link";

import Button from "components/shared/Button";
import FeedbackForm from "components/FeedbackForm";

import css from "./Footer.module.scss";
import utils from "stylesheets/utils.module.scss";

function FooterPro() {
  const userBaseUrl = process.env.NEXT_PUBLIC_USER_BASE_URL;
  return (
    <div className={`${css.footer} ${utils.siteMaxWidth}`}>
      <div className={utils.row}>
        <div
          className={`${css.linkGroup} ${utils.colXs12} ${utils.colSm6} ${utils.colMd3}`}
        >
          <h2 className={css.linkHeader}>About Us</h2>
          <ul>
            <li>
              <Link href="/about">About DPLA Pro</Link>
            </li>
            <li>
              <Link href="/contact">Contact Us</Link>
            </li>
            <li>
              <FeedbackForm />
            </li>
            <li>
              <Link href="/projects">Projects</Link>
            </li>
            <li>
              <Link href="/events">Events</Link>
            </li>
          </ul>
        </div>
        <div
          className={`${css.linkGroup} ${utils.colXs12} ${utils.colSm} ${utils.colMd3}`}
        >
          <h2 className={css.linkHeader}>Communities</h2>
          <ul>
            <li>
              <Link href="/hubs">Hub Network</Link>
            </li>
            <li>
              <Link href="/prospective-hubs">Prospective Hubs</Link>
            </li>
            <li>
              <Link href="/developers">Developers</Link>
            </li>
            <li>
              <Link href="/education">Education</Link>
            </li>
            <li>
              <Link href="/ebooks">Ebooks</Link>
            </li>
          </ul>
        </div>
        <div
          className={`${css.linkGroup} ${utils.colXs6} ${utils.colSm6} ${utils.colMd3}`}
        >
          <h2 className={css.linkHeader}>DPLA</h2>
          <ul>
            <li>
              <Link href={userBaseUrl}>DPLA Home</Link>
            </li>
            <li>
              <Link href={userBaseUrl + "/primary-source-sets"}>
                Primary Source Sets
              </Link>
            </li>
            <li>
              <Link href={userBaseUrl + "/browse-by-partner"}>
                Browse by Partner
              </Link>
            </li>
            <li>
              <Link href={userBaseUrl + "/browse-by-topic"}>
                Browse by Topic
              </Link>
            </li>
            <li>
              <Link href={userBaseUrl + "/exhibitions"}>Exhibitions</Link>
            </li>
            <li>
              <Link href={userBaseUrl + "/search"}>Search</Link>
            </li>
          </ul>
        </div>
        <div className={`${utils.colXs12} ${utils.colMd3}`}>
          <Button
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

export default FooterPro;
