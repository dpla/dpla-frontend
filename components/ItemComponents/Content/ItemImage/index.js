import React from "react";

import { getDefaultThumbnail, probeImage } from "lib";

import css from "./ItemImage.module.scss";

class ItemImage extends React.Component {
  state = {
    updateToDefaultImage: false,
  };

  componentDidMount() {
    probeImage(this.props.url, () => {
      this.setState({ updateToDefaultImage: true });
    });
  }

  render() {
    const { title, type, url, useDefaultImage, defaultImageClass } = this.props;
    const { updateToDefaultImage } = this.state;
    const useDefaultWrapper = updateToDefaultImage || useDefaultImage;
    return (
      <div
        className={`${css.imageWrapper}
          ${
            useDefaultWrapper
              ? css.defaultImageWrapper + " " + defaultImageClass
              : ""
          }`}
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
