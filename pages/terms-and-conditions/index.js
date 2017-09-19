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
import { classNames as utilClassNames } from "css/utils.css";

const TermsAndConditions = ({ url, termsAndConditions, guides }) =>
  <MainLayout route={url}>
    <div>
      <div
        className={[
          utilClassNames.module,
          classNames.sidebarAndContentWrapper
        ].join(" ")}
      >
        <ContentPagesSidebar
          route={url}
          guides={guides}
          page={CONTENT_PAGE_NAMES.TERMS_AND_CONDITIONS}
        />
        <div className={classNames.content}>
          <h1
            dangerouslySetInnerHTML={{ __html: termsAndConditions.title }}
            className={classNames.title}
          />
          <div
            dangerouslySetInnerHTML={{
              __html: termsAndConditions.content
            }}
          />
        </div>
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
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
      title: guide.title.rendered
    })
  );

  return { termsAndConditions, guides };
};

export default TermsAndConditions;
