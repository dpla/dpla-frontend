import React from "react";

import css from "./MidPageBlock.scss";

const MidPageBlock = ({
  className,
  title,
  text,
  buttonText,
  buttonUrl,
  imageSrc,
  imageCaption,
  linkList,
}) => (
  <section className={`${className ? className : ""} ${css.midPageBlock}`}>
    <div className={`${css.midPageBlockWrapper} site-max-width`}>
      <div className={css.midPageBlockText}>
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
          <div className={css.midPageBlockButton}>
            <a className={css.button} href={buttonUrl}>
              {buttonText}
            </a>
          </div>
        )}
      </div>
      {imageSrc && (
        <div className={css.midPageBlockImage}>
          <img src={imageSrc} alt="" />
          <span>
            <strong>Image:</strong> {imageCaption}
          </span>
        </div>
      )}
    </div>
  </section>
);

export default MidPageBlock;