import React from "react";

import { CONTENT_PAGE_NAMES, GUIDES_ENDPOINT } from "constants/content-pages";
import MainLayout from "components/MainLayout";
import ContentPagesSidebar from "components/shared/ContentPagesSidebar";
import ContactForm from "components/ContactComponents/ContactForm";
import MoreWaysToContact from "components/ContactComponents/MoreWaysToContact";
import { classNames, stylesheet } from "css/pages/content-pages-wysiwyg.css";
import { classNames as utilClassNames } from "css/utils.css";

const Contact = ({ url, guides }) =>
  <MainLayout
    route={url}
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
            page={CONTENT_PAGE_NAMES.CONTACT}
            guides={guides}
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
  const guidesRes = await fetch(GUIDES_ENDPOINT);
  const guidesJson = await guidesRes.json();
  const guides = guidesJson.map(guide =>
    Object.assign({}, guide, {
      displayTitle: guide.acf.display_title
    })
  );

  return { guides };
};

export default Contact;
