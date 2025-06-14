import React from "react";

import MainLayout from "components/MainLayout";
import ContentPagesSidebar from "shared/ContentPagesSidebar";
import ContactForm from "components/ContactComponents/ContactForm";
import MoreWaysToContact from "components/ContactComponents/MoreWaysToContact";
import FeatureHeader from "shared/FeatureHeader";

import {
  ABOUT_MENU_ENDPOINT,
  PRO_MENU_ENDPOINT,
  SEO_TYPE,
} from "constants/content-pages";

import { TITLE } from "constants/contact";

import contentCss from "stylesheets/content-pages.module.scss";
import utils from "stylesheets/utils.module.scss";
import { washObject } from "lib/washObject";

function Contact(props) {
  const { sidebarItems } = props;
  return (
    <MainLayout pageTitle={TITLE} seoType={SEO_TYPE}>
      <FeatureHeader title={TITLE} description={""} />
      <div>
        <div
          className={`${utils.container} ${contentCss.sidebarAndContentWrapper}`}
        >
          <div className={utils.row}>
            <ContentPagesSidebar
              activeItemId="contact-us"
              items={sidebarItems}
              className={contentCss.sidebar}
            />
            <div
              id="main"
              role="main"
              className={`${utils.colXs12} ${utils.colMd8}`}
            >
              <ContactForm />
              <MoreWaysToContact />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export const getServerSideProps = async () => {
  const siteEnv = process.env.NEXT_PUBLIC_SITE_ENV;
  const aboutMenuRes = await fetch(
    siteEnv === "user" ? ABOUT_MENU_ENDPOINT : PRO_MENU_ENDPOINT,
  );

  if (!aboutMenuRes.ok) {
    if (aboutMenuRes.status === 404) {
      return {
        notFound: true,
      };
    }
    throw new Error("Couldn't load about menu.");
  }

  const aboutMenuJson = await aboutMenuRes.json();
  const props = washObject({ sidebarItems: aboutMenuJson.items });

  return {
    props: props,
  };
};

export default Contact;
