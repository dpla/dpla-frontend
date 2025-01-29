import React from "react";

import css from "./HarmfulContent.module.scss";
import utils from "stylesheets/utils.module.scss"

import {SITE_ENV, LOCAL_ID} from "constants/env";
import {LOCALS} from "constants/local";

function HarmfulContent() {
    let linkUrl = "https://dp.la/about/harmful-language-statement";
    let linkText = "DPLA's Statement on Potentially Harmful Content";

    if (SITE_ENV === "local") {
        const local = LOCALS[LOCAL_ID];
        linkUrl = local['hlsLink'] ? local['hlsLink'] : linkUrl;
        linkText = local['hlsLinkText'] ? local['hlsLinkText'] : linkText;
    }

    let hlsLink = <>Please read <a href={linkUrl}>{linkText}</a>.</>;

    return (
        <div className={css.wrapper}>
            <div className={utils.container}>
                <p className={css.harmfulContent}>
                    {hlsLink}
                </p>
            </div>
        </div>
    );
}

export default HarmfulContent;
