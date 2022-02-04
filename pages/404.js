import utils from "stylesheets/utils.module.scss";
import contentCss from "stylesheets/content-pages.module.scss";
import donateCss from "stylesheets/donate.module.scss";
import {SITE_ENV} from "constants/env";
import ErrorLinksUser from "components/ErrorComponents/ErrorLinksUser";
import ErrorLinksPro from "components/ErrorComponents/ErrorLinksPro";
import MinimalLayout from "components/MainLayout/components/MinimalLayout";
import React from "react";

export default function Custom404() {
    return (
        <MinimalLayout>
            <div
                className={`${utils.container} ${contentCss.sidebarAndContentWrapper}`}
            >
                <div className="row">
                    <div className={`col-md-2 col-xs-12`}/>
                    <div
                        id="main"
                        role="main"
                        className={`${contentCss.content} ${donateCss.thankYou} col-md-8 col-xs-12`}
                    >
                        <div>
                            <h1>
                                Page not found.
                            </h1>
                            <p>
                                We are sorry that the page you requested cannot be found.
                                Instead, try one of these:
                            </p>
                        </div>
                        <div>
                            {SITE_ENV === "user" && <ErrorLinksUser/>}
                            {SITE_ENV === "pro" && <ErrorLinksPro/>}
                        </div>
                    </div>
                </div>
            </div>
        </MinimalLayout>
    )
}

export const getStaticProps = ({ res, err }) => {
    if (res) {
        res.setHeader(
            "Cache-Control",
            "max-age=60, must-revalidate"
        );
    }
    return { props: {} };
};

