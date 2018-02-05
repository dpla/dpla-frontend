import "react";
import "next/link";

import Button from "shared/Button";

import { stylesheet, classNames } from "./CallToAction.css";

const CallToAction = ({
  className,
  title,
  text,
  buttonText,
  buttonUrl,
  imageSrc,
  imageCaption
}) =>
  <section
    className={`${className ? className : ""} ${classNames.callToAction}`}
  >
    <div className={`${classNames.callToActionWrapper} site-max-width`}>
      <div className={classNames.callToActionText}>
        <h2>{title}</h2>
        <p>{text}</p>
        <div className={classNames.callToActionButton}>
          <Button type="secondary" url={buttonUrl}>
            {buttonText}
          </Button>
        </div>
      </div>
      {imageSrc &&
        <div className={classNames.callToActionImage}>
          <img src={imageSrc} alt="" />
          <span>
            <strong>Image:</strong> {imageCaption}
          </span>
        </div>}
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </section>;

export default CallToAction;
