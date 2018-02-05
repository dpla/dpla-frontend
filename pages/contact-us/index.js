import React from "react";
import fetch from "isomorphic-fetch";

import MainLayout from "components/MainLayout";
import ContentPagesSidebar from "components/shared/ContentPagesSidebar";
import ContactForm from "components/ContactComponents/ContactForm";
import MoreWaysToContact from "components/ContactComponents/MoreWaysToContact";

import { SITE_ENV } from "constants/env";
import {
  PRO_MENU_ENDPOINT,
  ABOUT_MENU_ENDPOINT,
  SEO_TYPE
} from "constants/content-pages";
import { TITLE } from "constants/contact";

import { classNames, stylesheet } from "css/pages/content-pages-wysiwyg.css";
import { classNames as utilClassNames } from "css/utils.css";

const Contact = ({ url, sidebarItems }) =>
  <MainLayout route={url} pageTitle={TITLE} seoType={SEO_TYPE}>
    <div>
      <div
        className={`${utilClassNames.container}
        ${classNames.sidebarAndContentWrapper}`}
      >
        <div className="row">
          <ContentPagesSidebar
            route={url}
            activeItemId="contact-us"
            items={sidebarItems}
            className={classNames.sidebar}
          />
          <div id="main" role="main" className="col-xs-12 col-md-8">
            <ContactForm />
            <MoreWaysToContact />
          </div>
        </div>
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </MainLayout>;

Contact.getInitialProps = async () => {
  const aboutMenuRes = await fetch(
    SITE_ENV === "user" ? ABOUT_MENU_ENDPOINT : PRO_MENU_ENDPOINT
  );
  const aboutMenuJson = await aboutMenuRes.json();

  return { sidebarItems: aboutMenuJson.items };
};

export default Contact;
