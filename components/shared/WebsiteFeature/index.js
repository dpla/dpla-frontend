import "react";
import "next/link";

import css from "./WebsiteFeature.scss";

const WebsiteFeature = ({
  className,
  title,
  text,
  imageSrc,
  buttonText,
  buttonUrl
}) =>
  <div
    className={`${className ? className : ""} ${css.wrapper} site-max-width`}
  >
    {imageSrc &&
      <div
        className={css.imageWrapper}
        style={{ backgroundImage: `url(${imageSrc})` }}
      />}
    <div className={`${css.textWrapper} ${imageSrc ? "" : css.noImage}`}>
      <h2 className={css.title}>{title}</h2>
      <p className={css.text}>
        {text}
      </p>
    </div>
    <a className={css.button} href={buttonUrl}>
      {buttonText}
    </a>
  </div>;

export default WebsiteFeature;
