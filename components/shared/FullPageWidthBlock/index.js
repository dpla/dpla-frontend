import React from "react";

import css from "./FullPageWidthBlock.scss";
import hub from "stylesheets/hubs.scss";

const FullPageWidthBlock = ({
  className,
  title,
  text,
  buttonText,
  buttonUrl,
  imageSrc,
  imageCaption,
  imageAlt,
  links,
}) => (
  <section className={`${className ? className : ""} ${css.fullPageWidthBlock} site-max-width`}>
    <div className={`${css.fullPageWidthBlockWrapper} site-max-width`}>
      <div className={css.fullPageWidthBlockText}>
        <h2>{title}</h2>
        <p>{text}</p>

        {links && (
          <ul className={hub.sectionQuicklinks}>
          {links.map((listItem, index) => {
            return (
            <li key={`listItem-${index}`} className={hub.sectionQuicklink}>
              <a href={listItem.href} target="_blank">{listItem.text}</a>
            </li>
            )
          })}
            
          </ul>
        )}

        {buttonText && (
          <div className={css.fullPageWidthBlockButton}>
            <a className={css.button} href={buttonUrl}>
              {buttonText}
            </a>
          </div>
        )}
      </div>

      {imageSrc && (
        <div className={css.fullPageWidthBlockImage}>
          <img src={imageSrc} alt={imageAlt} />
          <span>
            <strong>Image:</strong> {imageCaption}
          </span>
        </div>
      )}
    </div>
  </section>
);

export default FullPageWidthBlock;