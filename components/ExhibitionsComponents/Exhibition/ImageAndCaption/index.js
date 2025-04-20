import React from "react";

import HeadingRule from "shared/HeadingRule";
import Button from "shared/Button";

import css from "./ImageAndCaption.module.scss";
import utils from "stylesheets/utils.module.scss"
import {useRouter} from "next/router";

function ImageAndCaption({
                             title, thumbnailUrl, sectionSlug, slug, caption
                         }) {
    const router = useRouter();
    return (<figure className={css.wrapper}>
        <div className={`${utils.container} ${css.imageAndCaption}`}>
            <p className={css.exhibitionTitle}>{title}</p>
            <div className={css.imageWrapper}>
                <div
                    className={css.image}
                    style={{
                        backgroundImage: `url(${thumbnailUrl})`
                    }}
                />
                <div className={css.overlay}>
                    <div className={css.overlayContent}>
                        <h1 className={css.exhibitionTitle}>{title}</h1>
                        <div className={css.headingRule}>
                            <HeadingRule color="rgba(255,255,255,0.75)"/>
                        </div>
                        <Button
                            type="primary"
                            size="large"
                            className={css.exploreLink}
                            url={{
                                pathname: "/exhibitions/exhibition/section/subsection",
                                query: {...router.query, section: sectionSlug, exhibition: slug, subsection: ""}
                            }}
                            as={{
                                pathname: `/exhibitions/${slug}/${sectionSlug}`
                            }}
                        >
                            Explore Exhibition
                        </Button>
                    </div>
                </div>
            </div>
            <figcaption className={css.caption}>
                <span className={css.captionLeadIn}>Image: </span>
                <div dangerouslySetInnerHTML={{__html: caption}}/>
            </figcaption>
        </div>
    </figure>);
}

export default ImageAndCaption;
