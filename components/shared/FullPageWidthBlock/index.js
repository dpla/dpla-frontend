import React from "react";

import css from "./FullPageWidthBlock.module.scss";
import hub from "stylesheets/hubs.module.scss";
import utils from "stylesheets/utils.module.scss"

const FullPageWidthBlock = ({
  className,
  title,
  text,
  buttonText,
  buttonUrl,
  imageSrc,
  imageCaption,
  imageAlt,
  imageHref,
  links,
}) => (
    <section className={`${className ? className : ""} ${css.fullPageWidthBlock} ${utils.siteMaxWidth}`}>
      <div className={`${css.fullPageWidthBlockWrapper} ${utils.siteMaxWidth}`}>
        <div className={css.fullPageWidthBlockText}>
          <h2>{title}</h2>
          <p>{text}</p>

          {links && (
            <ul className={hub.sectionQuicklinks}>
              {links.map((listItem, index) => {
                return (
                  <li key={`listItem-${index}`} className={hub.sectionQuicklink}>
                    <a href={listItem.href}>{listItem.text}</a>
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
            <a href={imageHref}>
              <img src={imageSrc} alt={imageAlt} />
              <span>
                {imageCaption}
              </span>
            </a>
          </div>

        )}
      </div>
    </section>
  );

export default FullPageWidthBlock;