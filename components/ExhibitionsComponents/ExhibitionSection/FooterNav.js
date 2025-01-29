import React from "react";
import Link from "next/link";

import BlackChevron from "components/svg/ChevronThickBlack";
import Chevron from "components/svg/ChevronThickWhite";
import DplaLogoBlack from "components/svg/DplaLogoBlack";

import css from "./ExhibitionSection.module.scss";
import utils from "stylesheets/utils.module.scss"


function NavButton({queryParams, nextOrPrevious = "next"}) {
    const label = nextOrPrevious === "next" ? "Next" : "Previous"
    if (queryParams) {
        return (
            <Link
                href={["/exhibitions/", queryParams.exhibitionSlug, "/", queryParams.sectionSlug, "/", queryParams.subsectionSlug ? queryParams.subsectionSlug : ""].join("")}
                className={nextOrPrevious === "next" ? css.nextButton : css.prevButton}
            >
                {nextOrPrevious === "previous" && <BlackChevron className={css.previousChevron} alt=""/>}
                <span>{label}</span>
                {nextOrPrevious === "next" && <Chevron className={css.nextChevron} alt=""/>}
            </Link>
        )
    } else {
        return (
            <span
                className={[nextOrPrevious === "next" ? css.nextButton : css.prevButton, css.disabledButton].join(" ")}>
            {nextOrPrevious === "previous" && <BlackChevron className={css.previousChevron} alt=""/>}
                <span>{label}</span>
                {nextOrPrevious === "next" && <Chevron className={css.nextChevron} alt=""/>}
            </span>
        )
    }
}

function FooterNav({nextQueryParams, previousQueryParams, nextSubsectionTitle}) {
    return (
        <div className={css.footerWrapper}>
            <div className={`${utils.container} ${css.footerNav}`}>
                <Link href={"/"}><DplaLogoBlack className={css.dplaLogo}/></Link>
                <div className={css.navButtons}>
                    <NavButton
                        queryParams={previousQueryParams}
                        nextOrPrevious="previous"
                    />
                    <div className={css.nextButtonAndTitleWrapper}>
                        {nextSubsectionTitle && <div className={css.nextSubsectionTitle}>{nextSubsectionTitle}</div>}
                        <NavButton
                            queryParams={nextQueryParams}
                            nextSubsectionTitle={nextQueryParams && nextSubsectionTitle}
                            nextOrPrevious="next"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FooterNav;
