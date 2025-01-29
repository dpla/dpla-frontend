import React from "react";

import MainLayout from "components/MainLayout";

import { SEO_TITLE } from "constants/donate";

import utils from "stylesheets/utils.module.scss";
import contentCss from "stylesheets/content-pages.module.scss";
import css from "stylesheets/donate.module.scss";

function DonateThankYou() {
  return (
    <MainLayout pageTitle={SEO_TITLE}>
      <div
        className={`${utils.container}
      ${contentCss.sidebarAndContentWrapper}`}
      >
        <div className="row">
          <div className={`${utils.colMd2} ${utils.colXs12}`} />
          <div
            id="main"
            role="main"
            className={`${contentCss.content} ${css.thankYou} ${utils.colMd8} ${utils.colXs12}`}
          >
            <h1>Thank you for your donation</h1>
            <p>
              From all of us at the DPLA, thank you! Your support makes our work
              possible. Your transaction has been completed, and a receipt for
              your purchase has been emailed to you. You may log into your
              account at <a href="//www.paypal.com/us">www.paypal.com/us</a> to
              view details of this transaction.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default DonateThankYou;
