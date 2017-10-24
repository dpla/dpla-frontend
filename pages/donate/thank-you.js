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
import { classNames as utilClassNames } from "css/utils.css";

const DonateThankYou = ({ url, content, items }) =>
  <MainLayout route={url}>
    <div
      className={`${utilClassNames.container}
      ${contentClasses.sidebarAndContentWrapper}`}
    >
      <div className="row">
        <div className={`col-xs-2`} />
        <div className={`${contentClasses.content} col-xs-8`}>
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
    <style dangerouslySetInnerHTML={{ __html: contentStyles }} />
  </MainLayout>;

export default DonateThankYou;
