import React from "react";
import Link from "next/link";

import Button from "components/shared/Button";

import { SECTIONS as PRO_SECTIONS } from "constants/pro";

import { classNames, stylesheet } from "./Footer.css";

const FooterPro = () =>
  <div className={`${classNames.footer} site-max-width`}>
    <div className="row">
      <div className={`${classNames.linkGroup} col-xs-12 col-sm-6 col-md-6`}>
        <h2 className={classNames.linkHeader}>DPLA Pro</h2>
        <ul>
          {PRO_SECTIONS.map((section, index) => {
            return (
              <li key={index}>
                <Link
                  as={`/${section.slug}`}
                  href={`/pro/wp?section=${section.slug}`}
                >
                  <a>{section.name}</a>
                </Link>
              </li>
            );
          })}
          <li>
            <Link href="/news">
              <a>News</a>
            </Link>
          </li>
        </ul>
      </div>
      <div className={`${classNames.linkGroup} col-xs-6 col-sm-6 col-md-3`}>
        <h2 className={classNames.linkHeader}>DPLA</h2>
        <ul>
          <li>
            <Link href="//beta.dp.la">
              <a>DPLA Main Site</a>
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

export default FooterPro;
