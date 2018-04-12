import "react";
import "next/link";

import Button from "shared/Button";
import css from "./CallToAction.scss";

const CallToAction = ({
  className,
  title,
  text,
  buttonText,
  buttonUrl,
  imageSrc,
  imageCaption
}) =>
  <section className={`${className ? className : ""} ${css.callToAction}`}>
    <div className={`${css.callToActionWrapper} site-max-width`}>
      <div className={css.callToActionText}>
        <h2>{title}</h2>
        <p>{text}</p>
        <div className={css.callToActionButton}>
          <a className={css.button} href={buttonUrl}>
            {buttonText}
          </a>
        </div>
      </div>
      {imageSrc &&
        <div className={css.callToActionImage}>
          <img src={imageSrc} alt="" />
          <span>
            <strong>Image:</strong> {imageCaption}
          </span>
        </div>}
    </div>
  </section>;

export default CallToAction;
