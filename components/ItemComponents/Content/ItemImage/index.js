import React from "react";

import { getDefaultThumbnail, probeImage } from "lib";

import css from "./ItemImage.module.scss";

class ItemImage extends React.Component {
  state = {
    updateToDefaultImage: false,
  };

  componentDidMount() {
    this.updateImage();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.url !== this.props.url) {
      if (this._cancelProbe) this._cancelProbe();
      this.setState({ updateToDefaultImage: false });
      this.updateImage();
    }
  }

  componentWillUnmount() {
    if (this._cancelProbe) this._cancelProbe();
  }

  updateImage() {
    const probedUrl = this.props.url;
    const { provider, thumbnailSourceUrl } = this.props;
    this._cancelProbe = probeImage(
      probedUrl,
      () => {
        if (this.props.url === probedUrl) {
          this.setState({ updateToDefaultImage: true });
        }
      },
      provider,
      thumbnailSourceUrl,
    );
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
