import React from "react";
import Link from "next/link";

import { classNames, stylesheet } from "./ImageAndCaption.css";
import { classNames as utilClassNames } from "css/utils.css";

const { module } = utilClassNames;
const ImageAndCaption = ({ exhibition, route }) =>
  <figure className={classNames.wrapper}>
    <div className={[module, classNames.imageAndCaption].join(" ")}>
      <div className={classNames.imageWrapper}>
        <div
          className={classNames.image}
          alt={exhibition.title}
          style={{
            backgroundImage: `url(${exhibition.thumbnailUrl})`,
            backgroundSize: "cover"
          }}
        />
        <div className={classNames.overlay}>
          <div className={classNames.overlayContent}>
            <p className={classNames.exhibitionTitle}>{exhibition.title}</p>
            <div className={classNames.divider} />
            <Link href="">
              <a className={classNames.exploreLink}>Explore Exhibition</a>
            </Link>
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
