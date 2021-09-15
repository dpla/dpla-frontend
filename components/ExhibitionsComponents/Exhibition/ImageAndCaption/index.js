import React from "react";

import HeadingRule from "shared/HeadingRule";
import Button from "shared/Button";

import css from "./ImageAndCaption.module.scss";
import utils from "stylesheets/utils.module.scss"

const ImageAndCaption = ({ exhibition, route }) =>
  <figure className={css.wrapper}>
    <div className={[utils.container, css.imageAndCaption].join(" ")}>
      <p className={css.exhibitionTitle}>{exhibition.title}</p>
      <div className={css.imageWrapper}>
        <div
          className={css.image}
          alt={exhibition.title}
          style={{
            backgroundImage: `url(${exhibition.thumbnailUrl})`
          }}
        />
        <div className={css.overlay}>
          <div className={css.overlayContent}>
            <h1 className={css.exhibitionTitle}>{exhibition.title}</h1>
            <div className={css.headingRule}>
              <HeadingRule color="rgba(255,255,255,0.75)" />
            </div>
            <Button
              type="primary"
              size="large"
              className={css.exploreLink}
              url={{
                pathname: "/exhibitions/exhibition/section/subsection",
                query: Object.assign({}, route.query, {
                  section: exhibition.sections[0].slug,
                  exhibition: exhibition.slug,
                  subsection: ""
                })
              }}
              as={{
                pathname: `/exhibitions/${exhibition.slug}/${exhibition
                  .sections[0].slug}`
              }}
            >
              Explore Exhibition
            </Button>
          </div>
        </div>
      </div>
      <figcaption className={css.caption}>
        <span className={css.captionLeadIn}>Image: </span>
        <div dangerouslySetInnerHTML={{ __html: exhibition.caption }} />
      </figcaption>
    </div>
  </figure>;

export default ImageAndCaption;
