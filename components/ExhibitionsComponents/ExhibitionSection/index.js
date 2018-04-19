import React from "react";
import Helmet from "react-helmet";

import Header from "./Header";
import Body from "./Body";
import FooterNav from "./FooterNav";
import GaExhibitWrapper from "./GaExhibitWrapper";

import css from "./ExhibitionSection.scss";

const ExhibitionView = ({
  exhibition,
  section,
  subsection,
  route,
  nextQueryParams,
  nextSubsectionTitle,
  previousQueryParams
}) =>
  <div className={css.exhibitionView}>
    <Helmet htmlAttributes={{ lang: "en" }} />
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

export default GaExhibitWrapper(ExhibitionView);
