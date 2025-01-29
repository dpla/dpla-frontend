import React from "react";

import Header from "./Header";
import Body from "./Body";
import FooterNav from "./FooterNav";

import css from "./ExhibitionSection.module.scss";

function ExhibitionView({
                            exhibitionTitle,
                            section,
                            subsection,
                            sectionMap,
                            subsectionMap,
                            exhibitionSlug,
                            nextQueryParams,
                            nextSubsectionTitle,
                            previousQueryParams
                        }) {
    return (
        <div className={css.exhibitionView} data-cy="exhibit-page">
            <Header title={exhibitionTitle}/>
            <Body
                section={section}
                subsection={subsection}
                sectionMap={sectionMap}
                subsectionMap={subsectionMap}
                exhibitionSlug={exhibitionSlug}
            />
            <FooterNav
                previousQueryParams={previousQueryParams}
                nextQueryParams={nextQueryParams}
                nextSubsectionTitle={nextSubsectionTitle}
            />
        </div>
    );
}

export default ExhibitionView;