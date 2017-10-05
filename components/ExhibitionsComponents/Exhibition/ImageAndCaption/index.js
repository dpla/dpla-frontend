import React from "react";
import Link from "next/link";

import HeadingRule from "components/shared/HeadingRule";
import Button from "components/shared/Button";
import { classNames, stylesheet } from "./ImageAndCaption.css";
import { classNames as utilClassNames } from "css/utils.css";

const { container } = utilClassNames;
const ImageAndCaption = ({ exhibition, route }) =>
  <figure className={classNames.wrapper}>
    <div className={[container, classNames.imageAndCaption].join(" ")}>
      <div className={classNames.imageWrapper}>
        <div
          className={classNames.image}
          alt={exhibition.title}
          style={{
            backgroundImage: `url(${exhibition.thumbnailUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
        <div className={classNames.overlay}>
          <div className={classNames.overlayContent}>
            <p className={classNames.exhibitionTitle}>{exhibition.title}</p>
            <HeadingRule color="rgba(255,255,255,0.75)" />
            <Button
              type="primary"
              size="large"
              prefetch
              className={classNames.exploreLink}
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
                  .sections[0].slug}/`
              }}
            >
              Explore Exhibition
            </Button>
          </div>
        </div>
      </div>
      <figcaption className={classNames.caption}>
        <span className={classNames.captionLeadIn}>Image: </span>
        <span dangerouslySetInnerHTML={{ __html: exhibition.caption }} />
      </figcaption>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </figure>;

export default ImageAndCaption;
