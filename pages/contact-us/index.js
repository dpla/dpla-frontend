import React from "react";
import fetch from "isomorphic-fetch";

import { ABOUT_MENU_ENDPOINT, GUIDES_ENDPOINT } from "constants/content-pages";
import MainLayout from "components/MainLayout";
import ContentPagesSidebar from "components/shared/ContentPagesSidebar";
import ContactForm from "components/ContactComponents/ContactForm";
import MoreWaysToContact from "components/ContactComponents/MoreWaysToContact";
import { classNames, stylesheet } from "css/pages/content-pages-wysiwyg.css";
import { classNames as utilClassNames } from "css/utils.css";
import { TITLE } from "constants/contact";

const Contact = ({ url, sidebarItems }) =>
  <MainLayout
    route={url}
    pageTitle={TITLE}
    headLinks={
      <link
        rel="stylesheet"
        href="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css"
      />
    }
  >
    <div className={classNames.backgroundTint}>
      <div
        className={`${utilClassNames.container}
        ${classNames.sidebarAndContentWrapper}`}
      >
        <div className="row">
          <ContentPagesSidebar
            route={url}
            activeItemId="contact-us"
            items={sidebarItems}
          />
          <div className="col-xs-12 col-md-8">
            <ContactForm />
            <MoreWaysToContact />
          </div>
        </div>
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </MainLayout>;

Contact.getInitialProps = async () => {
  const aboutMenuRes = await fetch(ABOUT_MENU_ENDPOINT);
  const aboutMenuJson = await aboutMenuRes.json();

  return { sidebarItems: aboutMenuJson.items };
};

export default Contact;
