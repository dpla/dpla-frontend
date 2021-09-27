import React from "react";

import Header from "./Header";
import Body from "./Body";
import FooterNav from "./FooterNav";

import css from "./ExhibitionSection.module.scss";

const ExhibitionView = ({
  exhibition,
  section,
  subsection,
  route,
  nextQueryParams,
  nextSubsectionTitle,
  previousQueryParams
}) =>
  <div className={css.exhibitionView} data-cy="exhibit-page">
    <Header title={exhibition.title} route={route} />
    <Body
      route={route}
      exhibition={exhibition}
      section={section}
      subsection={subsection}
    />
    <FooterNav
      route={route}
      exhibition={exhibition}
      previousQueryParams={previousQueryParams}
      nextQueryParams={nextQueryParams}
      nextSubsectionTitle={nextSubsectionTitle}
    />
  </div>;

export default ExhibitionView;
