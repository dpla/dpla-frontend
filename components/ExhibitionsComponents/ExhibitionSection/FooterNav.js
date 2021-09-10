import React from "react";
import Link from "next/link";
import { withRouter } from "next/router"

import DPLALogoWide from "../../../static/images/dpla-logo-black.svg";

import css from "./ExhibitionSection.module.scss";

const chevron = "/static/images/chevron-thick-white.svg";
const blackChevron = "/static/images/chevron-thick-black.svg";

const NavButton = withRouter(({ queryParams, router, nextOrPrevious = "next" }) =>
  queryParams
    ? <Link
        prefetch
        href={{
          pathname: route.pathname,
          query: {
            exhibition: queryParams.exhibition,
            section: queryParams.section,
            subsection: queryParams.subsection
          }
        }}
        as={`/exhibitions/${queryParams.exhibition}/${queryParams.section}/${queryParams.subsection}`}
      >
        <a
          className={
            nextOrPrevious === "next" ? css.nextButton : css.prevButton
          }
        >
          {nextOrPrevious === "previous" &&
            <img src={blackChevron} className={css.previousChevron} alt="" />}
          <span>{nextOrPrevious === "next" ? "Next" : "Previous"}</span>
          {nextOrPrevious === "next" &&
            <img src={chevron} className={css.nextChevron} alt="" />}
        </a>
      </Link>
    : <span
        className={[
          nextOrPrevious === "next" ? css.nextButton : css.prevButton,
          css.disabledButton
        ].join(" ")}
      >
        {nextOrPrevious === "previous" &&
          <img src={blackChevron} className={css.previousChevron} alt="" />}
        <span>{nextOrPrevious === "next" ? "Next" : "Previous"}</span>
        {nextOrPrevious === "next" &&
          <img src={chevron} className={css.nextChevron} alt="" />}
      </span>);

const FooterNav = withRouter(({
  exhibition,
  router,
  nextQueryParams,
  previousQueryParams,
  nextSubsectionTitle
}) =>
  <div className={css.footerWrapper}>
    <div className={[utils.container, css.footerNav].join(" ")}>
      <Link prefetch href="/">
        <DPLALogoWide className={css.dplaLogo} />
      </Link>
      <div className={css.navButtons}>
        <NavButton
          route={route}
          queryParams={previousQueryParams}
          nextOrPrevious="previous"
        />
        <div className={css.nextButtonAndTitleWrapper}>
          {nextSubsectionTitle &&
            <div className={css.nextSubsectionTitle}>
              {nextSubsectionTitle}
            </div>}
          <NavButton
            route={route}
            queryParams={nextQueryParams}
            nextSubsectionTitle={nextQueryParams && nextSubsectionTitle}
            nextOrPrevious="next"
          />
        </div>
      </div>
    </div>
  </div>);

export default FooterNav;
