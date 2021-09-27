import React from "react";

import { getDefaultThumbnail } from "lib";

import css from "./ItemImage.module.scss";

class ItemImage extends React.Component {
  state = {
    updateToDefaultImage: false
  };

  componentDidMount() {
    // Check for images that error so we can replace them with a default image
    const _img = document.createElement("img");
    _img.src = this.props.url;
    _img.onerror = () => {
      this.setState({ updateToDefaultImage: true });
    };
  }

  render() {
    const { title, type, url, useDefaultImage, defaultImageClass } = this.props;
    const { updateToDefaultImage } = this.state;
    const useDefaultWrapper = updateToDefaultImage || useDefaultImage;
    return (
      <div
        className={`${css.imageWrapper}
          ${useDefaultWrapper
            ? css.defaultImageWrapper + " " + defaultImageClass
            : ""}`}
      >
        <img
          src={updateToDefaultImage ? getDefaultThumbnail(type) : url}
          alt={title}
          className={css.image}
        />
      </div>
    );
  }
}

export default ItemImage;
