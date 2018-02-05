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
      <div className={classNames.imageWrapper}>
        <img src={imageSrc} className={classNames.image} />
      </div>}
    <h2 className={classNames.title}>{title}</h2>
    <p className={classNames.text}>
      Quia adipisci a cupiditate inventore. Fugit ratione quia cumque ipsum.
      Aut porro occaecati id quasi. Et nemo dolores et et ut.
    </p>
    <Button type="secondary" url={buttonUrl}>
      {buttonText}
    </Button>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default WebsiteFeature;
