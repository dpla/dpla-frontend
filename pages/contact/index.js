import React from "react";
import fetch from "isomorphic-fetch";

import { CONTENT_PAGE_NAMES } from "constants/content-pages";
import MainLayout from "components/MainLayout";
import ContentPagesSidebar from "components/shared/ContentPagesSidebar";
import ContactForm from "components/ContactComponents/ContactForm";
import MoreWaysToContact from "components/ContactComponents/MoreWaysToContact";
import {
  classNames,
  stylesheet
} from "components/ContactComponents/ContactComponents.css";
import { classNames as utilClassNames } from "css/utils.css";

const Contact = ({ url }) =>
  <MainLayout
    route={url}
    headLinks={
      <link
        rel="stylesheet"
        href="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css"
      />
    }
  >
    <div className={classNames.wrapper}>
      <div className={[utilClassNames.module, classNames.content].join(" ")}>
        <ContentPagesSidebar page={CONTENT_PAGE_NAMES.CONTACT} />
        <div className={classNames.formAndMoreWays}>
          <ContactForm />
          <MoreWaysToContact />
        </div>
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </MainLayout>;

export default Contact;
