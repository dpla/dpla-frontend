import React from "react";
import Link from "next/link";

import { classNames } from "./ExhibitionSection.css";
import { classNames as utilClassNames } from "css/utils.css";

const { container } = utilClassNames;

const dplaLogo = "/static/images/dpla-logo-black.svg";
const chevron = "/static/images/chevron-thick-white.svg";
const blackChevron = "/static/images/chevron-thick-black.svg";

const NavButton = ({ queryParams, route, nextOrPrevious = "next" }) =>
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
            nextOrPrevious === "next"
              ? classNames.nextButton
              : classNames.prevButton
          }
        >
          {nextOrPrevious === "previous" &&
            <img
              src={blackChevron}
              className={classNames.previousChevron}
              alt=""
            />}
          <span>{nextOrPrevious === "next" ? "Next" : "Previous"}</span>
          {nextOrPrevious === "next" &&
            <img src={chevron} className={classNames.nextChevron} alt="" />}
        </a>
      </Link>
    : <button
        disabled
        className={[
          nextOrPrevious === "next"
            ? classNames.nextButton
            : classNames.prevButton,
          classNames.disabledButton
        ].join(" ")}
      >
        {nextOrPrevious === "previous" &&
          <img
            src={blackChevron}
            className={classNames.previousChevron}
            alt=""
          />}
        <span>{nextOrPrevious === "next" ? "Next" : "Previous"}</span>
        {nextOrPrevious === "next" &&
          <img src={blackChevron} className={classNames.nextChevron} alt="" />}
      </button>;

const FooterNav = ({
  exhibition,
  route,
  nextQueryParams,
  previousQueryParams,
  nextSubsectionTitle
}) =>
  <div className={classNames.footerWrapper}>
    <div className={[container, classNames.footerNav].join(" ")}>
      <Link prefetch href="/">
        <img src={dplaLogo} alt="DPLA" className={classNames.dplaLogo} />
      </Link>
      <div className={classNames.navButtons}>
        <NavButton
          route={route}
          queryParams={previousQueryParams}
          nextOrPrevious="previous"
        />
        <div className={classNames.nextButtonAndTitleWrapper}>
          {nextSubsectionTitle &&
            <div className={classNames.nextSubsectionTitle}>
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
  </div>;

export default FooterNav;
