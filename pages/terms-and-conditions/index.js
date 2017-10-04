import React from "react";
import fetch from "isomorphic-fetch";

import MainLayout from "components/MainLayout";
import ContentPagesSidebar from "components/shared/ContentPagesSidebar";
import { classNames, stylesheet } from "css/pages/terms-and-conditions.css";
import {
  T_AND_C_ENDPOINT,
  CONTENT_PAGE_NAMES,
  GUIDES_ENDPOINT
} from "constants/content-pages";
import {
  classNames as contentClasses,
  stylesheet as contentStyles
} from "css/pages/content-pages-wysiwyg.css";
import { classNames as utilClassNames } from "css/utils.css";

const TermsAndConditions = ({ url, termsAndConditions, guides }) =>
  <MainLayout route={url}>
    <div
      className={`
        ${utilClassNames.container}
        ${contentClasses.sidebarAndContentWrapper}
      `}
    >
      <div className="row">
        <ContentPagesSidebar
          route={url}
          guides={guides}
          page={CONTENT_PAGE_NAMES.TERMS_AND_CONDITIONS}
        />
        <div className="col-xs-12 col-md-7">
          <div
            dangerouslySetInnerHTML={{
              __html: termsAndConditions.content
            }}
            className={contentClasses.content}
          />
        </div>
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    <style dangerouslySetInnerHTML={{ __html: contentStyles }} />
  </MainLayout>;

TermsAndConditions.getInitialProps = async () => {
  const termsAndConditionsRes = await fetch(T_AND_C_ENDPOINT);
  const termsAndConditionsJson = await termsAndConditionsRes.json();
  const termsAndConditions = Object.assign({}, termsAndConditionsJson, {
    title: termsAndConditionsJson.title.rendered,
    content: termsAndConditionsJson.content.rendered
  });

  const guidesRes = await fetch(GUIDES_ENDPOINT);
  const guidesJson = await guidesRes.json();
  const guides = guidesJson.map(guide =>
    Object.assign({}, guide, {
      displayTitle: guide.acf.display_title
    })
  );

  return { termsAndConditions, guides };
};

export default TermsAndConditions;
