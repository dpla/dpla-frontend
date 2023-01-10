import React from "react";
import Link from "next/link";
import {withRouter} from "next/router"

import DPLALogoWide from "components/svg/DplaLogoBlack";

import css from "./ExhibitionSection.module.scss";
import utils from "stylesheets/utils.module.scss"

const Chevron = "components/svg/ChevronThickWhite";
const BlackChevron = "components/svg/ChevronThickBlack";

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
                        <Chevron className={css.nextChevron} alt=""/>}
                </a>
            </Link>
            : <span
                className={[
                    nextOrPrevious === "next" ? css.nextButton : css.prevButton,
                    css.disabledButton
                ].join(" ")}
            >
        {nextOrPrevious === "previous" &&
            <BlackChevron className={css.previousChevron} alt=""/>}
                <span>{nextOrPrevious === "next" ? "Next" : "Previous"}</span>
                {nextOrPrevious === "next" &&
                    <Chevron className={css.nextChevron} alt=""/>}
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
                <DPLALogoWide className={css.dplaLogo}/>
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
