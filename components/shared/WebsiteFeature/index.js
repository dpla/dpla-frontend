import "react";
import "next/link";

import Button from "shared/Button";

import { stylesheet, classNames } from "./WebsiteFeature.css";

const WebsiteFeature = ({
  className,
  title,
  text,
  imageSrc,
  buttonText,
  buttonUrl
}) =>
  <div
    className={`${className
      ? className
      : ""} ${classNames.wrapper} site-max-width`}
  >
    {imageSrc &&
      <div
        className={classNames.imageWrapper}
        style={{ backgroundImage: `url(${imageSrc})` }}
      />}
    <div
      className={`${classNames.textWrapper} ${imageSrc
        ? ""
        : classNames.noImage}`}
    >
      <h2 className={classNames.title}>{title}</h2>
      <p className={classNames.text}>
        {text}
      </p>
    </div>
    <a className={classNames.button} href={buttonUrl}>
      {buttonText}
    </a>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default WebsiteFeature;
