import React from "react";
import Link from "next/link";

import Button from "components/shared/Button";

import { classNames, stylesheet } from "./Footer.css";

const FooterUser = () =>
  <div className={`${classNames.footer} site-max-width`}>
    <div className="row">
      <div className={`${classNames.linkGroup} col-xs-6 col-sm-4 col-md-3`}>
        <h2 className={classNames.linkHeader}>DPLA</h2>
        <ul>
          <li>
            <Link
              href="/about?section=frequently-asked-questions"
              as="/about/frequently-asked-questions"
            >
              <a>Frequently Asked Questions</a>
            </Link>
          </li>
          <li>
            <Link href="/guides">
              <a>How Can I Use DPLA?</a>
            </Link>
          </li>
          <li>
            <Link
              href="/about?section=terms-conditions"
              as="/about/terms-conditions"
            >
              <a>Terms &amp; Conditions</a>
            </Link>
          </li>
          <li>
            <Link
              href="/about?section=our-supporters"
              as="/about/our-supporters"
            >
              <a>Our Supporters</a>
            </Link>
          </li>
          <li>
            <Link href="/about?section=about" as="/about/about">
              <a>About DPLA</a>
            </Link>
          </li>
          <li>
            <Link href="/about?section=contact-us" as="/about/contact">
              <a>Contact Us</a>
            </Link>
          </li>
          <li>
            <Link href="/news">
              <a>News</a>
            </Link>
          </li>
        </ul>
      </div>
      <div className={`${classNames.linkGroup} col-xs-6 col-sm-4 col-md-3`}>
        <h2 className={classNames.linkHeader}>Tools</h2>
        <ul>
          <li>
            <Link href="/primary-source-sets">
              <a>Primary Source Sets</a>
            </Link>
          </li>
          <li>
            <Link href="/browse-by-partner">
              <a>Browse by Partner</a>
            </Link>
          </li>
          <li>
            <Link href="/browse-by-topic">
              <a>Browse by Topic</a>
            </Link>
          </li>
          <li>
            <Link href="/exhibitions">
              <a>Exhibitions</a>
            </Link>
          </li>
          <li>
            <Link href="/search">
              <a>Search</a>
            </Link>
          </li>
        </ul>
      </div>
      <div className={`${classNames.linkGroup} col-xs-6 col-sm-4 col-md-3`}>
        <h2 className={classNames.linkHeader}>DPLA Pro</h2>
        <ul>
          <li>
            <Link href="//pro.dp.la">
              <a>DPLA Pro Community Site</a>
            </Link>
          </li>
        </ul>
      </div>
      <div className="col-xs-12 col-md-3">
        <Button
          type="primary"
          size="large"
          className={classNames.donateButton}
          url="/donate"
        >
          Donate
        </Button>
      </div>
    </div>
  </div>;

export default FooterUser;
