import React from "react";
import Link from "next/link";
import {withRouter} from "next/router"

const dplaLogoWide = "/static/images/dpla-logo-black.svg";

import css from "./ExhibitionSection.module.scss";
import utils from "stylesheets/utils.module.scss"

const chevron = "/static/images/chevron-thick-white.svg";
const blackChevron = "/static/images/chevron-thick-black.svg";

const NavButton = withRouter(({queryParams, router, nextOrPrevious = "next"}) => {
        return queryParams
            ? <Link
                href={[
                    "/exhibitions/",
                    queryParams.exhibitionSlug,
                    "/",
                    queryParams.sectionSlug,
                    "/",
                    queryParams.subsectionSlug ? queryParams.subsectionSlug : ""
                ].join("")}
            >
                <a
                    className={
                        nextOrPrevious === "next" ? css.nextButton : css.prevButton
                    }
                >
                    {nextOrPrevious === "previous" &&
                        <img src={blackChevron} className={css.previousChevron} alt=""/>}
                    <span>{nextOrPrevious === "next" ? "Next" : "Previous"}</span>
                    {nextOrPrevious === "next" &&
                        <img src={chevron} className={css.nextChevron} alt=""/>}
                </a>
            </Link>
            : <span
                className={[
                    nextOrPrevious === "next" ? css.nextButton : css.prevButton,
                    css.disabledButton
                ].join(" ")}
            >
        {nextOrPrevious === "previous" &&
            <img src={blackChevron} className={css.previousChevron} alt=""/>}
                <span>{nextOrPrevious === "next" ? "Next" : "Previous"}</span>
                {nextOrPrevious === "next" &&
                    <img src={chevron} className={css.nextChevron} alt=""/>}
      </span>
    }
);

const FooterNav = ({
                       nextQueryParams,
                       previousQueryParams,
                       nextSubsectionTitle
                   }) =>
    <div className={css.footerWrapper}>
        <div className={`${utils.container} ${css.footerNav}`}>
            <Link href={"/"}>
                <img
                    alt="Digital Public Library of America"
                    src={dplaLogoWide}
                    className={css.dplaLogo}
                />
            </Link>
            <div className={css.navButtons}>
                <NavButton
                    queryParams={previousQueryParams}
                    nextOrPrevious="previous"
                />
                <div className={css.nextButtonAndTitleWrapper}>
                    {nextSubsectionTitle &&
                        <div className={css.nextSubsectionTitle}>
                            {nextSubsectionTitle}
                        </div>}
                    <NavButton
                        queryParams={nextQueryParams}
                        nextSubsectionTitle={nextQueryParams && nextSubsectionTitle}
                        nextOrPrevious="next"
                    />
                </div>
            </div>
        </div>
    </div>;

export default FooterNav;
