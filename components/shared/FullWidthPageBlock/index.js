import React from "react";

import css from "./FullWidthPageBlock.scss";

const FullWidthPageBlock = ({
  className,
  title,
  text,
  buttonText,
  buttonUrl,
  imageSrc,
  imageCaption,
  linkList,
}) => (
  <section className={`${className ? className : ""} ${css.fullWidthPageBlock}`}>
    <div className={`${css.fullWidthPageBlockWrapper} site-max-width`}>
      <div className={css.fullWidthPageBlockText}>
        <h2>{title}</h2>
        <p>{text}</p>

        {linkList && (
          <ul>
            <li>
              <Link href="#">
                <a>{linkListItem}</a>
              </Link>
            </li>
          </ul>
        )}

        {buttonText && (
          <div className={css.fullWidthPageBlockButton}>
            <a className={css.button} href={buttonUrl}>
              {buttonText}
            </a>
          </div>
        )}
      </div>
      {imageSrc && (
        <div className={css.fullWidthPageBlockImage}>
          <img src={imageSrc} alt="" />
          <span>
            <strong>Image:</strong> {imageCaption}
          </span>
        </div>
      )}
    </div>
  </section>
);

export default FullWidthPageBlock;