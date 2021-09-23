import React from "react";
import fetch from "isomorphic-fetch";

import MainLayout from "components/MainLayout";
import ContentPagesSidebar from "shared/ContentPagesSidebar";
import ContactForm from "components/ContactComponents/ContactForm";
import MoreWaysToContact from "components/ContactComponents/MoreWaysToContact";
import FeatureHeader from "shared/FeatureHeader";

import { SITE_ENV } from "constants/env";

import {
  PRO_MENU_ENDPOINT,
  ABOUT_MENU_ENDPOINT,
  SEO_TYPE
} from "constants/content-pages";

import { TITLE } from "constants/contact";

import contentCss from "stylesheets/content-pages.module.scss";
import utils from "stylesheets/utils.module.scss"

const Contact = ({ url, sidebarItems }) =>
  <MainLayout route={url} pageTitle={TITLE} seoType={SEO_TYPE}>
    <FeatureHeader title={TITLE} description={""} />
    <div>
      <div
        className={`${utils.container} ${contentCss.sidebarAndContentWrapper}`}
      >
        <div className={utils.row}>
          <ContentPagesSidebar
            route={url}
            activeItemId="contact-us"
            items={sidebarItems}
            className={contentCss.sidebar}
          />
          <div id="main" role="main" className={`${utils.colXs12} ${utils.colMd8}`}>
            <ContactForm />
            <MoreWaysToContact />
          </div>
        </div>
      </div>
    </div>
  </MainLayout>;

Contact.getInitialProps = async () => {
  const aboutMenuRes = await fetch(
    SITE_ENV === "user" ? ABOUT_MENU_ENDPOINT : PRO_MENU_ENDPOINT
  );
  const aboutMenuJson = await aboutMenuRes.json();

  return { sidebarItems: aboutMenuJson.items };
};

export default Contact;
