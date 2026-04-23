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
import { safeFetch, isUpstreamUnavailable, upstreamUnavailable } from "lib/safeFetch";
import ServiceUnavailable from "components/shared/ServiceUnavailable";

function Contact(props) {
  const { sidebarItems, temporarilyUnavailable } = props;
  if (temporarilyUnavailable) return <ServiceUnavailable />;
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

export const getServerSideProps = async (context) => {
  const siteEnv = process.env.NEXT_PUBLIC_SITE_ENV;
  const aboutMenuRes = await safeFetch(
    siteEnv === "user" ? ABOUT_MENU_ENDPOINT : PRO_MENU_ENDPOINT,
  );

  if (isUpstreamUnavailable(aboutMenuRes)) return upstreamUnavailable(context.res, aboutMenuRes);
  if (!aboutMenuRes?.ok) return { notFound: true };

  const aboutMenuJson = await aboutMenuRes.json();

  return { props: washObject({ sidebarItems: aboutMenuJson.items }) };
};

export default Contact;
