import React from "react";
import Link from "next/link";

import { classNames } from "./ExhibitionSection.css";
import { classNames as utilClassNames } from "css/utils.css";

const { module } = utilClassNames;

const dplaLogo = "/static/images/dpla-logo-black.svg";
const chevron = "/static/images/chevron-thick-white.svg";
const disabledChevron = "/static/images/chevron-thick-black.svg";

const NavButton = ({ queryParams, route, nextOrPrevious = "next" }) =>
  queryParams
    ? <Link
        href={{
          pathname: route.pathname,
          query: queryParams
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
            <img src={chevron} className={classNames.previousChevron} alt="" />}
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
            src={disabledChevron}
            className={classNames.previousChevron}
            alt=""
          />}
        <span>{nextOrPrevious === "next" ? "Next" : "Previous"}</span>
        {nextOrPrevious === "next" &&
          <img
            src={disabledChevron}
            className={classNames.nextChevron}
            alt=""
          />}
      </button>;

const FooterNav = ({
  exhibition,
  route,
  nextQueryParams,
  previousQueryParams
}) =>
  <div className={classNames.footerWrapper}>
    <div className={[module, classNames.footerNav].join(" ")}>
      <Link href="/">
        <img src={dplaLogo} alt="DPLA" className={classNames.dplaLogo} />
      </Link>
      <div className={classNames.navButtons}>
        <NavButton
          route={route}
          queryParams={previousQueryParams}
          nextOrPrevious="previous"
        />
        <NavButton
          route={route}
          queryParams={nextQueryParams}
          nextOrPrevious="next"
        />
      </div>
    </div>
  </div>;

export default FooterNav;
