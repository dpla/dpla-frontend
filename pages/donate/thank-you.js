import React from "react";
import fetch from "isomorphic-fetch";
import Router from "next/router";

import MainLayout from "components/MainLayout";
import ContentPagesSidebar from "components/shared/ContentPagesSidebar";

import {
  classNames as contentClasses,
  stylesheet as contentStyles
} from "css/pages/content-pages-wysiwyg.css";
import { stylesheet, classNames } from "css/pages/donate.css";
import {
  classNames as utilClassNames,
  stylesheet as utilStyles
} from "css/utils.css";
import { SEO_TITLE } from "constants/donate";

const DonateThankYou = ({ url }) =>
  <MainLayout route={url} pageTitle={SEO_TITLE}>
    <div
      className={`${utilClassNames.container}
      ${contentClasses.sidebarAndContentWrapper}`}
    >
      <div className="row">
        <div className={`col-md-2 col-xs-12`} />
        <div
          id="main"
          className={`${contentClasses.content} ${classNames.thankYou} col-md-8 col-xs-12`}
        >
          <h1>
            Thank you for your donation
          </h1>
          <p>
            From all of us at the DPLA, thank you! Your support makes our work
            possible. Your transaction has been completed, and a receipt for
            your purchase has been emailed to you. You may log into your account
            at <a href="//www.paypal.com/us">www.paypal.com/us</a> to view
            details of this transaction.
          </p>
        </div>
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: utilStyles }} />
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    <style dangerouslySetInnerHTML={{ __html: contentStyles }} />
  </MainLayout>;

export default DonateThankYou;
