import React from "react";
import Helmet from "react-helmet";
import { classNames, stylesheet } from "./ExhibitionSection.css";
import Header from "./Header";
import Body from "./Body";
import FooterNav from "./FooterNav";
import GaWrapper from "components/shared/GaWrapper";
import FeedbackForm from "components/FeedbackForm";

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
    <FeedbackForm route={route} />
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default GaWrapper(ExhibitionView);
