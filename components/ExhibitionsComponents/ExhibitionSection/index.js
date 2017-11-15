import React from "react";

import { classNames, stylesheet } from "./ExhibitionSection.css";
import Header from "./Header";
import Body from "./Body";
import FooterNav from "./FooterNav";
import GaWrapper from "../../shared/GaWrapper";

const ExhibitionView = ({
  exhibition,
  section,
  subsection,
  route,
  nextQueryParams,
  nextSubsectionTitle,
  previousQueryParams
}) =>
  <div className={classNames.exhibitionView}>
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
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default GaWrapper(ExhibitionView);
