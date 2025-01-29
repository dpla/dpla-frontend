import "react";
import "next/link";

import css from "./WebsiteFeature.module.scss";
import utils from "stylesheets/utils.module.scss";
import * as PropTypes from "prop-types";

function WebsiteFeature(props) {
  const { className, title, text, imageSrc, buttonText, buttonUrl } = props;
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

WebsiteFeature.propTypes = {
  className: PropTypes.any,
  title: PropTypes.any,
  text: PropTypes.any,
  imageSrc: PropTypes.any,
  buttonText: PropTypes.any,
  buttonUrl: PropTypes.any,
};

export default WebsiteFeature;
