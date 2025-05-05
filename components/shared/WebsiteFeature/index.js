import "react";
import "next/link";

import css from "./WebsiteFeature.module.scss";
import utils from "stylesheets/utils.module.scss";

function WebsiteFeature({ className, title, text, imageSrc, buttonText, buttonUrl }) {
  return (
    <div className={`${className || ""} ${css.wrapper} ${utils.siteMaxWidth}`}>
      {imageSrc && (
        <div
          className={css.imageWrapper}
          style={{ backgroundImage: `url(${imageSrc})` }}
        />
      )}
      <div className={`${css.textWrapper} ${imageSrc ? "" : css.noImage}`}>
        <h2 className={css.title}>{title}</h2>
        <p className={css.text}>{text}</p>
      </div>

      {buttonText && (
        <a className={css.button} href={buttonUrl}>
          {buttonText}
        </a>
      )}
    </div>
  );
}

export default WebsiteFeature;
